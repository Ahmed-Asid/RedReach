'use client'

import Link from "next/link";
import { Button } from "@heroui/react";
import { FiHeart, FiSearch, FiArrowRight } from "react-icons/fi";

export default function Banner() {
    return (
        <section className="relative overflow-hidden border-b border-separator bg-background">
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-danger/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-danger/5 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid w-full items-center gap-12 lg:grid-cols-2">

                    {/* Content */}
                    <div className="max-w-2xl">

                        {/* Small badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-danger/20 bg-danger-50 px-3.5 py-1.5 text-sm font-medium text-danger dark:bg-danger-50/10">
                            <FiHeart
                                className="h-4 w-4"
                                fill="currentColor"
                            />
                            <span>Every drop makes a difference</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Your blood can be{" "}
                            <span className="text-danger">
                                someone's hope.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-6 max-w-xl text-base leading-7 text-default-500 sm:text-lg">
                            Connect with people who need your help. Become a
                            donor, find blood donors nearby, and make a
                            difference when it matters most.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Link href="/register">
                                <Button
                                    color="danger"
                                    size="lg"
                                    radius="lg"
                                    className="h-12 px-6 font-semibold shadow-lg shadow-danger/20"
                                    endContent={
                                        <FiArrowRight className="h-4 w-4" />
                                    }
                                >
                                    Join as a donor
                                </Button>
                            </Link>

                            <Link href="/search-donors">
                                <Button
                                    variant="bordered"
                                    size="lg"
                                    radius="lg"
                                    className="h-12 border-default-300 px-6 font-semibold"
                                    startContent={
                                        <FiSearch className="h-4 w-4" />
                                    }
                                >
                                    Search Donors
                                </Button>
                            </Link>

                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative hidden lg:block">
                        <div className="relative mx-auto aspect-square max-w-md">

                            {/* Outer decoration */}
                            <div className="absolute inset-8 rounded-[3rem] bg-danger/5 rotate-6" />

                            {/* Main card */}
                            <div className="absolute inset-0 flex items-center justify-center rounded-[3rem] border border-danger/10 bg-danger-50/50 shadow-2xl shadow-danger/10 backdrop-blur-sm dark:bg-danger-50/5">

                                <div className="flex h-48 w-48 items-center justify-center rounded-full bg-danger shadow-2xl shadow-danger/30">
                                    <FiHeart
                                        className="h-24 w-24 text-white"
                                        fill="currentColor"
                                    />
                                </div>

                                {/* Floating card */}
                                <div className="absolute -bottom-5 -left-8 rounded-2xl border border-separator bg-background p-4 shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger-50 text-danger dark:bg-danger-50/10">
                                            <FiHeart
                                                className="h-5 w-5"
                                                fill="currentColor"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                Be a lifesaver
                                            </p>
                                            <p className="text-xs text-default-400">
                                                Donate blood today
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating search card */}
                                <div className="absolute -right-6 top-10 rounded-2xl border border-separator bg-background p-4 shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-default-100 text-default-600">
                                            <FiSearch className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                Find a donor
                                            </p>
                                            <p className="text-xs text-default-400">
                                                When every second counts
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}