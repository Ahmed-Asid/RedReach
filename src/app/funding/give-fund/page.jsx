
"use client";

import Link from "next/link";
import { Button, Input } from "@heroui/react";
import {
    FiArrowLeft,
    FiArrowRight,
    FiCheckCircle,
    FiHeart,
    FiShield,
    FiUsers,
} from "react-icons/fi";
import { useState } from "react";

const suggestedAmounts = [100, 250, 500, 1000];

export default function GiveFundPage() {

    const [selectedAmount, setSelectedAmount] = useState("250");
    const [customAmount, setCustomAmount] = useState("");
    const isCustomAmount = customAmount.trim() !== "";
    const amount = isCustomAmount ? customAmount : selectedAmount;

    return (
        <main className="min-h-screen bg-default-50/50">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Back navigation */}
                <Link
                    href="/dashboard/funding"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-default-500 transition-colors hover:text-danger"
                >
                    <FiArrowLeft className="size-4" />
                    Back to Funding
                </Link>

                <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
                    {/* Main form */}
                    <section className="overflow-hidden rounded-3xl border border-default-200 bg-content1 shadow-sm">
                        <div className="relative overflow-hidden bg-danger px-6 py-8 text-white sm:px-9 sm:py-10">
                            <div className="relative z-10 max-w-xl">
                                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/15">
                                    <FiHeart className="size-6" />
                                </div>

                                <p className="text-sm font-medium text-white/80">
                                    REDREACH COMMUNITY
                                </p>

                                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                                    Give a little.
                                    <br />
                                    Help save a life.
                                </h1>

                                <p className="mt-3 max-w-md text-sm leading-6 text-white/80 sm:text-base">
                                    Your contribution supports our mission to
                                    connect blood donors with people who need
                                    them.
                                </p>
                            </div>

                            <div className="absolute -right-12 -top-16 size-56 rounded-full border-[28px] border-white/10" />
                            <div className="absolute -bottom-24 right-24 size-44 rounded-full bg-white/5" />
                        </div>

                        <form
                            action="/api/checkout_sessions"
                            method="POST"
                            className="space-y-7 p-6 sm:p-9"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    Choose your contribution
                                </h2>
                                <p className="mt-1 text-sm text-default-500">
                                    Select an amount to continue to secure
                                    checkout.
                                </p>
                            </div>

                            <fieldset>
                                <legend className="mb-3 text-sm font-semibold text-foreground">
                                    Select an amount (BDT)
                                </legend>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {suggestedAmounts.map((value) => (
                                        <label key={value} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="amount"
                                                value={value}
                                                checked={!isCustomAmount && selectedAmount === String(value)}
                                                onClick={(e) => {
                                                    // If it's already selected, clicking it again will deselect it
                                                    if (selectedAmount === String(value)) {
                                                        e.preventDefault(); // Prevent default radio behavior if needed
                                                        setSelectedAmount("");
                                                    } else {
                                                        setSelectedAmount(String(value));
                                                        setCustomAmount("");
                                                    }
                                                }}
                                                onChange={() => { }} // Required by React for controlled inputs alongside onClick
                                                className="peer sr-only"
                                            />

                                            <span className="flex min-h-14 items-center justify-center rounded-xl border border-default-200 bg-default-50 px-3 text-sm font-bold text-foreground transition hover:border-danger/50 peer-checked:border-danger peer-checked:bg-danger-50 peer-checked:text-danger">
                                                ৳{value.toLocaleString("en-BD")}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <div className="space-y-2">
                                <label
                                    htmlFor="custom-amount"
                                    className="block text-sm font-semibold text-foreground"
                                >
                                    Or enter a custom amount
                                </label>

                                <input
                                    id="custom-amount"
                                    type="number"
                                    min="100"
                                    max="5000"
                                    step="50"
                                    value={customAmount}
                                    onChange={(event) => setCustomAmount(event.target.value)}
                                    placeholder="Enter amount in BDT"
                                    className="h-11 w-full rounded-xl border border-default-200 bg-default-50 px-3 text-sm text-foreground outline-none focus:border-danger focus:ring-2 focus:ring-danger/10"
                                />

                                <p className="text-xs text-default-500">
                                    Minimum ৳100 · Maximum ৳5000
                                </p>
                            </div>

                            {/* This is the single amount submitted to checkout. */}
                            <input type="hidden" name="amount" value={amount} />

                            <div className="rounded-xl border border-danger/15 bg-danger-50/60 p-4">
                                <div className="flex items-start gap-3">
                                    <FiCheckCircle className="mt-0.5 size-5 shrink-0 text-danger" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            Every contribution counts
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-default-600">
                                            Your support helps RedReach build a
                                            stronger community of blood donors
                                            and recipients.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                color="danger"
                                size="lg"
                                className="w-full font-semibold"
                            >
                                Continue to Checkout
                                <FiArrowRight className="size-4" />
                            </Button>

                            <p className="text-center text-xs leading-5 text-default-400">
                                You will continue to the payment checkout to
                                complete your contribution.
                            </p>
                        </form>
                    </section>

                    {/* Supporting panel */}
                    <aside className="space-y-5">
                        <div className="rounded-2xl border border-default-200 bg-content1 p-6">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-danger-50 text-danger">
                                <FiUsers className="size-5" />
                            </div>

                            <h2 className="mt-4 text-lg font-bold text-foreground">
                                Be part of something meaningful
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-default-500">
                                RedReach brings donors and people in need
                                together. Your contribution helps support that
                                mission.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-default-200 bg-content1 p-6">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-default-100 text-default-700">
                                <FiShield className="size-5" />
                            </div>

                            <h2 className="mt-4 font-bold text-foreground">
                                Secure payment process
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-default-500">
                                Your payment will be handled through your
                                configured checkout integration.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-default-100/80 p-5">
                            <p className="text-sm font-semibold text-foreground">
                                Need help?
                            </p>
                            <p className="mt-1 text-sm leading-6 text-default-500">
                                If you encounter a checkout issue, contact the
                                RedReach support team.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}