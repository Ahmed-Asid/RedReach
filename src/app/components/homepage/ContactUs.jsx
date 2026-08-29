"use client";

import { Input, Button } from "@heroui/react";
import {
    FiMail,
    FiPhone,
    FiSend,
    FiHeart,
    FiClock,
} from "react-icons/fi";

export default function ContactUs() {
    return (
        <section className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-danger/20 bg-danger-50 px-3.5 py-1.5 text-sm font-medium text-danger dark:bg-danger-50/10">
                        <FiMail className="h-4 w-4" />
                        Get in touch
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        We're here to{" "}
                        <span className="text-danger">help.</span>
                    </h2>

                    <p className="mt-4 text-base leading-7 text-default-500 sm:text-lg">
                        Have a question about donating blood or using
                        ReadReach? Send us a message and we'll be happy to
                        help.
                    </p>
                </div>

                {/* Content */}
                <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

                    {/* Contact Form */}
                    <div className="relative overflow-hidden rounded-3xl border border-separator bg-content1 p-6 sm:p-8 lg:p-10">
                        {/* Decorative glow */}
                        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-danger/5 blur-3xl" />

                        <div className="relative">
                            {/* Header */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-danger-50 text-danger dark:bg-danger-50/10">
                                    <FiMail className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                                        Send us a message
                                    </h3>

                                    <p className="mt-1.5 text-sm leading-6 text-default-500">
                                        Have something to ask? We'd love to hear from you.
                                    </p>
                                </div>
                            </div>

                            <form className="mt-9 space-y-6">

                                {/* Name + Email */}
                                <div className="grid gap-6 sm:grid-cols-2">

                                    {/* Name */}
                                    <div className="space-y-2.5">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-foreground"
                                        >
                                            Full name
                                        </label>

                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            variant="flat"
                                            radius="lg"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2.5">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-foreground"
                                        >
                                            Email address
                                        </label>

                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            variant="flat"
                                            radius="lg"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2.5">
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Subject
                                    </label>

                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        placeholder="What can we help you with?"
                                        variant="flat"
                                        radius="lg"
                                        required
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-2.5">
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        placeholder="Tell us how we can help..."
                                        className="block w-full resize-none rounded-xl bg-default-100 px-3.5 py-3 text-sm text-foreground outline-none transition-all placeholder:text-default-400 hover:bg-default-200 focus:bg-background focus:ring-2 focus:ring-danger/20"
                                    />
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col gap-4 border-t border-separator pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs leading-5 text-default-400">
                                        We usually respond within one business day.
                                    </p>

                                    <Button
                                        type="submit"
                                        color="danger"
                                        radius="lg"
                                        size="lg"
                                        className="w-full px-7 font-semibold shadow-lg shadow-danger/15 sm:w-auto"
                                        endContent={<FiSend className="h-4 w-4" />}
                                    >
                                        Send message
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>


                    {/* Contact Information */}
                    <div className="flex flex-col gap-6">

                        {/* Phone */}
                        <div className="relative overflow-hidden rounded-3xl bg-danger p-7 text-white shadow-xl shadow-danger/15">
                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />

                            <div className="relative">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                                    <FiPhone className="h-5 w-5" />
                                </div>

                                <p className="mt-6 text-sm font-medium text-white/70">
                                    Need immediate assistance?
                                </p>

                                <h3 className="mt-2 text-xl font-semibold">
                                    Give us a call
                                </h3>

                                <a
                                    href="tel:+8801000000000"
                                    className="mt-4 block text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
                                >
                                    +880 1000-000000
                                </a>

                                <p className="mt-2 text-sm text-white/70">
                                    We're ready to answer your questions.
                                </p>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="flex-1 rounded-3xl border border-separator bg-content1 p-7">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-danger-50 text-danger dark:bg-danger-50/10">
                                <FiHeart
                                    className="h-5 w-5"
                                    fill="currentColor"
                                />
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-foreground">
                                Your questions matter
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-default-500">
                                Whether you're a first-time donor or looking
                                for help, our team is here to make your
                                ReadReach experience easier.
                            </p>

                            <div className="mt-6 flex items-center gap-3 border-t border-separator pt-5">
                                <FiClock className="h-4 w-4 text-danger" />

                                <span className="text-sm text-default-500">
                                    Support available during business hours
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}