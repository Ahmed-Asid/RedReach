"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import {
    FiArrowLeft,
    FiCalendar,
    FiClock,
    FiDroplet,
    FiFileText,
    FiMapPin,
    FiSend,
} from "react-icons/fi";

import LocationSelect from "@/components/forms/LocationSelect";
import BloodGroupSelect from "@/components/forms/BloodGroupSelect";

const API_URL = "http://localhost:8000";

const initialForm = {
    recipientName: "",
    recipientDistrict: "",
    recipientDistrictName: "",
    recipientUpazila: "",
    recipientUpazilaName: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
};

export default function CreateDonationRequestForm({ user }) {
    const router = useRouter();

    const [form, setForm] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const updateField = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleDistrictChange = (value) => {
        const district = String(value || "");

        setForm((current) => ({
            ...current,
            recipientDistrict: district,
            recipientDistrictName: "",
            recipientUpazila: "",
            recipientUpazilaName: "",
        }));
    };

    const handleUpazilaChange = (value) => {
        const upazila = String(value || "");

        setForm((current) => ({
            ...current,
            recipientUpazila: upazila,
            recipientUpazilaName: "",
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        setError("");

        const requiredFields = [
            [form.recipientName, "Recipient name is required."],
            [form.recipientDistrict, "Please select a recipient district."],
            [form.recipientUpazila, "Please select a recipient upazila."],
            [form.hospitalName, "Hospital name is required."],
            [form.fullAddress, "Full address is required."],
            [form.bloodGroup, "Please select a blood group."],
            [form.donationDate, "Donation date is required."],
            [form.donationTime, "Donation time is required."],
        ];

        const missingField = requiredFields.find(
            ([value]) => !String(value || "").trim()
        );

        if (missingField) {
            setError(missingField[1]);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/requests`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipientName: form.recipientName.trim(),

                    recipientDistrict: form.recipientDistrict,
                    recipientDistrictName:
                        form.recipientDistrictName || form.recipientDistrict,

                    recipientUpazila: form.recipientUpazila,
                    recipientUpazilaName:
                        form.recipientUpazilaName || form.recipientUpazila,

                    hospitalName: form.hospitalName.trim(),
                    fullAddress: form.fullAddress.trim(),

                    bloodGroup: form.bloodGroup,

                    donationDate: form.donationDate,
                    donationTime: form.donationTime,

                    requestMessage: form.requestMessage.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to create donation request."
                );
            }

            router.push("/dashboard/my-donation-requests");
            router.refresh();
        } catch (err) {
            console.error("Create donation request error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Requester information */}
            <section className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                    <h2 className="text-base font-semibold text-foreground">
                        Requester Information
                    </h2>

                    <p className="mt-1 text-sm text-default-500">
                        Your account information is automatically attached to
                        this request.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <Input
                        label="Requester name"
                        value={user?.name || ""}
                        isReadOnly
                    />

                    <Input
                        label="Requester email"
                        value={user?.email || ""}
                        isReadOnly
                    />
                </div>
            </section>

            {/* Recipient information */}
            <section className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                    <h2 className="text-base font-semibold text-foreground">
                        Recipient Information
                    </h2>

                    <p className="mt-1 text-sm text-default-500">
                        Tell us who needs the blood and where they are located.
                    </p>
                </div>

                <div className="space-y-5">
                    <Field label="Recipient name" required>
                        <Input
                            value={form.recipientName}
                            onChange={(event) =>
                                updateField(
                                    "recipientName",
                                    event.target.value
                                )
                            }
                            placeholder="Enter recipient name"
                        />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Recipient district" required>
                            <LocationSelect
                                name="recipientDistrict"
                                type="district"
                                value={form.recipientDistrict}
                                onChange={handleDistrictChange}
                                required
                            />
                        </Field>

                        <Field label="Recipient upazila" required>
                            <LocationSelect
                                name="recipientUpazila"
                                type="upazila"
                                value={form.recipientUpazila}
                                districtId={form.recipientDistrict}
                                onChange={handleUpazilaChange}
                                required
                                disabled={!form.recipientDistrict}
                            />
                        </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Hospital name" required>
                            <Input
                                value={form.hospitalName}
                                onChange={(event) =>
                                    updateField(
                                        "hospitalName",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter hospital name"
                                startContent={
                                    <FiMapPin className="size-4 text-default-400" />
                                }
                            />
                        </Field>

                        <Field label="Full address" required>
                            <Input
                                value={form.fullAddress}
                                onChange={(event) =>
                                    updateField(
                                        "fullAddress",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter full address"
                                startContent={
                                    <FiMapPin className="size-4 text-default-400" />
                                }
                            />
                        </Field>
                    </div>
                </div>
            </section>

            {/* Donation information */}
            <section className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                    <h2 className="text-base font-semibold text-foreground">
                        Donation Information
                    </h2>

                    <p className="mt-1 text-sm text-default-500">
                        Provide the blood group and when the donation is needed.
                    </p>
                </div>

                <div className="space-y-5">
                    <Field label="Blood group" required>
                        <BloodGroupSelect
                            value={form.bloodGroup}
                            onChange={(value) =>
                                updateField("bloodGroup", value)
                            }
                            required
                        />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Donation date" required>
                            <Input
                                type="date"
                                value={form.donationDate}
                                min={new Date()
                                    .toISOString()
                                    .split("T")[0]}
                                onChange={(event) =>
                                    updateField(
                                        "donationDate",
                                        event.target.value
                                    )
                                }
                                startContent={
                                    <FiCalendar className="size-4 text-default-400" />
                                }
                            />
                        </Field>

                        <Field label="Donation time" required>
                            <Input
                                type="time"
                                value={form.donationTime}
                                onChange={(event) =>
                                    updateField(
                                        "donationTime",
                                        event.target.value
                                    )
                                }
                                startContent={
                                    <FiClock className="size-4 text-default-400" />
                                }
                            />
                        </Field>
                    </div>

                    <Field label="Request message">
                        <textarea
                            value={form.requestMessage}
                            onChange={(event) =>
                                updateField(
                                    "requestMessage",
                                    event.target.value
                                )
                            }
                            placeholder="Write any additional information about the blood request..."
                            rows={5}
                            className="w-full resize-none rounded-xl border border-default-200 bg-default-100 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-default-400 focus:border-danger"
                        />
                    </Field>
                </div>
            </section>

            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="rounded-xl border border-danger/20 bg-danger-50 px-4 py-3 text-sm text-danger"
                >
                    {error}
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="ghost"
                    onPress={() => router.back()}
                    isDisabled={isSubmitting}
                >
                    <FiArrowLeft className="size-4" />
                    Cancel
                </Button>

                <Button
                    type="submit"
                    color="danger"
                    isDisabled={isSubmitting}
                >
                    <FiSend className="size-4" />
                    {isSubmitting ? "Submitting..." : "Request Blood"}
                </Button>
            </div>
        </form>
    );
}

function Field({ label, required = false, children }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
                {label}

                {required && (
                    <span className="ml-1 text-danger">*</span>
                )}
            </label>

            {children}
        </div>
    );
}