
"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import {
    FiSearch,
    FiMapPin,
    FiDroplet,
    FiUsers,
    FiHeart,
    FiUser,
} from "react-icons/fi";

// Update these import paths to match your project.
import BloodGroupSelect from "@/app/components/forms/BloodGroupSelect";
import LocationSelect from "@/app/components/forms/LocationSelect";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SearchDonorsPage() {
    const [filters, setFilters] = useState({
        bloodGroup: "",
        district: "",
        upazila: "",
    });

    const [donors, setDonors] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setHasSearched(true);
        setDonors([]);

        try {
            const params = new URLSearchParams();

            if (filters.bloodGroup) {
                params.set("bloodGroup", filters.bloodGroup);
            }

            if (filters.district) {
                params.set("district", filters.district);
            }

            if (filters.upazila) {
                params.set("upazila", filters.upazila);
            }

            const response = await fetch(
                `${API_URL}/api/donors/search?${params.toString()}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to search donors.");
            }

            setDonors(Array.isArray(data) ? data : data.donors || []);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "district" ? { upazila: "" } : {}),
        }));
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-rose-500 px-4 py-16 text-white sm:py-20">
                <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-rose-300/20 blur-3xl" />

                <div className="relative mx-auto max-w-5xl text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur">
                        <FiHeart className="text-3xl" />
                    </div>

                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-red-100">
                        Every Drop Matters
                    </p>

                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                        Find Blood Donors Near You
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-red-50 sm:text-base">
                        Find generous donors in your area and connect with
                        people who can help save a life. Your search could make
                        someone&apos;s tomorrow possible.
                    </p>
                </div>
            </section>

            {/* Search form */}
            <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 pb-12">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-gray-200/60 sm:p-8">
                    <div className="mb-7">
                        <h2 className="text-xl font-bold text-gray-900">
                            Search for Donors
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Select your preferred blood group and location.
                        </p>
                    </div>

                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FiDroplet className="text-red-600" />
                                    Blood Group
                                </label>

                                <BloodGroupSelect
                                    value={filters.bloodGroup}
                                    onChange={(value) =>
                                        handleFilterChange("bloodGroup", value)
                                    }
                                    aria-label="Select blood group"
                                />
                            </div>

                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FiMapPin className="text-red-600" />
                                    District
                                </label>

                                <LocationSelect
                                    type="district"
                                    value={filters.district}
                                    onChange={(value) =>
                                        handleFilterChange("district", value)
                                    }
                                    aria-label="Select district"
                                />
                            </div>

                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <FiMapPin className="text-red-600" />
                                    Upazila
                                </label>

                                <LocationSelect
                                    type="upazila"
                                    district={filters.district}
                                    value={filters.upazila}
                                    onChange={(value) =>
                                        handleFilterChange("upazila", value)
                                    }
                                    aria-label="Select upazila"
                                />
                            </div>
                        </div>

                        <div className="mt-7 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-gray-500">
                                <FiHeart className="mr-1 inline text-red-500" />
                                Every search is a chance to save a life.
                            </p>

                            <Button
                                type="submit"
                                isDisabled={loading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 sm:w-auto"
                            >
                                <FiSearch />
                                {loading ? "Searching..." : "Search Donors"}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Results */}
            <section className="mx-auto max-w-5xl px-4 pb-20">
                {!hasSearched && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                            <FiSearch className="text-2xl text-red-500" />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-gray-800">
                            Ready to find a donor?
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            Choose a blood group, district, or upazila above
                            and click Search Donors to see matching donors.
                        </p>
                    </div>
                )}

                {loading && (
                    <div className="py-12 text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />
                        <p className="mt-4 text-sm font-medium text-gray-500">
                            Finding donors...
                        </p>
                    </div>
                )}

                {error && !loading && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {hasSearched && !loading && !error && (
                    <>
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-600">
                                    Search Results
                                </p>
                                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                    {donors.length}{" "}
                                    {donors.length === 1 ? "Donor" : "Donors"}{" "}
                                    Found
                                </h2>
                            </div>

                            <p className="text-sm text-gray-500">
                                Matching your selected filters
                            </p>
                        </div>

                        {donors.length === 0 ? (
                            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center">
                                <FiUsers className="mx-auto text-4xl text-gray-300" />
                                <h3 className="mt-4 text-lg font-bold text-gray-800">
                                    No donors found
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Try a different blood group or location.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {donors.map((donor) => (
                                    <article
                                        key={donor._id || donor.id}
                                        className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-red-50">
                                                {donor.image ? (
                                                    <img
                                                        src={donor.image}
                                                        alt={donor.name || "Donor"}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <FiUser className="text-2xl text-red-500" />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate font-bold text-gray-900">
                                                    {donor.name}
                                                </h3>
                                                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                                                    <FiMapPin className="shrink-0 text-red-500" />
                                                    <span className="truncate">
                                                        {[
                                                            donor.upazilaName ||
                                                            donor.upazila,
                                                            donor.districtName ||
                                                            donor.district,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(", ") ||
                                                            "Location unavailable"}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                            <span className="text-xs font-medium text-gray-500">
                                                Blood Group
                                            </span>
                                            <span className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-600">
                                                {donor.bloodGroup}
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}
