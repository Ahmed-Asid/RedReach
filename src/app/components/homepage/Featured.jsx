"use client";

import { FiHeart, FiDroplet, FiArrowRight } from "react-icons/fi";

const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

export default function Featured() {
    return (
        <section className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="max-w-2xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-danger/20 bg-danger-50 px-3.5 py-1.5 text-sm font-medium text-danger dark:bg-danger-50/10">
                        <FiDroplet className="h-4 w-4" />
                        Blood compatibility
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        One donation can reach{" "}
                        <span className="text-danger">the right person.</span>
                    </h2>

                    <p className="mt-4 max-w-xl text-base leading-7 text-default-500 sm:text-lg">
                        Understanding blood groups helps donors and recipients
                        connect more effectively. Find out where your blood
                        type can make a difference.
                    </p>
                </div>

                {/* Main Content */}
                <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

                    {/* Blood Groups */}
                    <div className="rounded-3xl border border-separator bg-content1 p-6 sm:p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    Blood groups
                                </h3>

                                <p className="mt-1 text-sm text-default-500">
                                    Every blood type matters.
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger-50 text-danger dark:bg-danger-50/10">
                                <FiHeart
                                    className="h-5 w-5"
                                    fill="currentColor"
                                />
                            </div>
                        </div>

                        {/* Blood Group Grid */}
                        <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-4">
                            {bloodGroups.map((group) => (
                                <div
                                    key={group}
                                    className="group flex aspect-square items-center justify-center rounded-2xl border border-separator bg-background transition-all duration-200 hover:-translate-y-1 hover:border-danger/30 hover:bg-danger-50 hover:text-danger dark:hover:bg-danger-50/10"
                                >
                                    <span className="text-lg font-bold">
                                        {group}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-xs text-default-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                            Know your blood type before donating.
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">

                        {/* O- */}
                        <div className="relative overflow-hidden rounded-3xl bg-danger p-6 text-white shadow-xl shadow-danger/15 sm:p-8">
                            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10" />

                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-white/70">
                                        Universal donor
                                    </span>

                                    <FiDroplet className="h-5 w-5" />
                                </div>

                                <div className="mt-5 text-5xl font-bold tracking-tight">
                                    O−
                                </div>

                                <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                                    O negative red blood cells can be given to
                                    people of all blood types in emergencies.
                                </p>
                            </div>
                        </div>

                        {/* AB+ */}
                        <div className="rounded-3xl border border-separator bg-content1 p-6 sm:p-8">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-default-400">
                                    Universal recipient
                                </span>

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-default-100 text-default-500">
                                    <FiHeart className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="mt-4 text-4xl font-bold tracking-tight text-foreground">
                                AB+
                            </div>

                            <p className="mt-2 text-sm leading-6 text-default-500">
                                AB positive recipients can generally receive
                                red blood cells from all blood groups.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Message */}
                <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-danger/10 bg-danger-50/50 p-6 dark:bg-danger-50/5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                    <div>
                        <p className="font-semibold text-foreground">
                            Not sure where your blood type can help?
                        </p>

                        <p className="mt-1 text-sm text-default-500">
                            Explore compatible donation opportunities through
                            ReadReach.
                        </p>
                    </div>

                    <a
                        href="/search-donors"
                        className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-danger transition-all hover:gap-3"
                    >
                        Explore donors
                        <FiArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}