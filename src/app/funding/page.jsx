

import Link from "next/link";
import {
    FiArrowDownLeft,
    FiArrowUpRight,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiDollarSign,
    FiHeart,
    FiSearch,
    FiTrendingUp,
    FiUsers,
} from "react-icons/fi";
import { Button } from "@heroui/react";
import Navbar from "../components/homepage/Navbar";
import { getFundingInfo } from "@/lib/api/fundings";


export default async function FundingPage() {

    const fundingData = await getFundingInfo();

    console.log(fundingData.length, 'total funds')
    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

    return (
        <main className="min-h-screen bg-default-50/50">
            <Navbar />
            <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

                {/* Page heading */}
                <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-danger">
                            <span className="h-2 w-2 rounded-full bg-danger" />
                            RedReach Community
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Funding
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-default-500 sm:text-base">
                            Every contribution helps RedReach support blood
                            donation initiatives and save lives.
                        </p>
                    </div>

                    <Link href="/funding/give-fund">
                        <Button
                            color="danger"
                            size="lg"
                            className="w-full font-semibold shadow-sm shadow-danger/20 sm:w-auto"
                        >
                            <FiHeart className="size-5" />
                            Give Fund
                            <FiArrowUpRight className="size-4" />
                        </Button>
                    </Link>
                </section>

                {/* Funding table */}
                <section className="overflow-hidden rounded-2xl border border-default-200 bg-content1 shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-default-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Funding Contributions
                            </h2>
                            <p className="mt-1 text-sm text-default-500">
                                A record of community contributions.
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <FiSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-default-400" />
                            <input
                                type="search"
                                placeholder="Search contributors..."
                                aria-label="Search contributors"
                                className="h-10 w-full rounded-xl border border-default-200 bg-default-50 pl-9 pr-3 text-sm text-foreground outline-none transition placeholder:text-default-400 focus:border-danger focus:ring-2 focus:ring-danger/10"
                            />
                        </div>
                    </div>

                    {fundingData.length === 0 ? (
                        <div className="px-6 py-20 text-center">
                            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-danger-50 text-danger">
                                <FiHeart className="size-6" />
                            </div>
                            <h3 className="mt-4 font-semibold text-foreground">
                                No contributions yet
                            </h3>
                            <p className="mt-1 text-sm text-default-500">
                                Contributions will appear here once funding
                                begins.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[680px] text-left">
                                    <thead>
                                        <tr className="border-b border-default-200 bg-default-50/80">
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-default-500">
                                                Contributor
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-default-500">
                                                Contribution
                                            </th>
                                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-default-500">
                                                Funding Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-default-100">
                                        {fundingData.map((fund) => (
                                            <tr
                                                key={fund.sessionId && fund.createdAt}
                                                className="transition-colors hover:bg-danger-50/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-danger-100 bg-danger-50 text-sm font-bold text-danger">
                                                            {getInitials(fund.name)}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-foreground">
                                                                {fund.name}
                                                            </p>
                                                            <p className="mt-0.5 text-sm text-default-500">
                                                                {fund.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <p className="font-bold tabular-nums text-foreground">
                                                        {fund.amount}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-default-600">
                                                        <FiCalendar className="size-4 shrink-0 text-default-400" />
                                                        {
                                                            formatDate(fund.createdAt)
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Table footer */}
                            <div className="flex flex-col gap-3 border-t border-default-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <p className="text-sm text-default-500">
                                    Showing{" "}
                                    <span className="font-medium text-foreground">
                                        {fundingData.length}
                                    </span>{" "}
                                    contributions
                                </p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        isDisabled
                                        isIconOnly
                                        size="sm"
                                        variant="bordered"
                                        aria-label="Previous page"
                                    >
                                        <FiChevronLeft />
                                    </Button>

                                    <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-danger px-2 text-sm font-semibold text-white">
                                        1
                                    </span>

                                    <Button
                                        isDisabled
                                        isIconOnly
                                        size="sm"
                                        variant="bordered"
                                        aria-label="Next page"
                                    >
                                        <FiChevronRight />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                {/* Closing note */}
                <div className="flex items-start gap-3 rounded-xl border border-danger-100 bg-danger-50/60 p-4 sm:p-5">
                    <div className="mt-0.5 shrink-0 text-danger">
                        <FiArrowDownLeft className="size-5" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">
                            Every contribution makes a difference
                        </p>
                        <p className="mt-1 text-sm leading-6 text-default-600">
                            Thank you to everyone helping RedReach connect
                            blood donors with people who need them.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

function SummaryCard({ icon, label, value, description, accent }) {
    const isRed = accent === "red";

    return (
        <div className="relative overflow-hidden rounded-2xl border border-default-200 bg-content1 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-default-500">
                        {label}
                    </p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${isRed
                        ? "bg-danger text-white"
                        : "bg-default-100 text-default-700"
                        }`}
                >
                    <span className="text-xl">{icon}</span>
                </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-default-500">
                {description}
            </p>

            {isRed && (
                <div className="absolute -bottom-8 -right-5 size-24 rounded-full border-[12px] border-danger/5" />
            )}
        </div>
    );
}

function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}