
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
    FiCheckCircle,
    FiDroplet,
    FiMail,
    FiUser,
    FiX,
} from "react-icons/fi";

import { confirmDonation } from "@/lib/actions/requests";

const DonateBloodModal = ({ requestId, request, user, status }) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleConfirm = async () => {
        setIsSubmitting(true);
        setError("");

        try {
            const result = await confirmDonation(requestId);

            if (result?.error) {
                throw new Error(
                    result.message || "Failed to confirm donation."
                );
            }

            setIsOpen(false);
            router.refresh();
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status !== "pending") {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-default-200 bg-default-50 px-4 py-3 text-sm text-default-500">
                <FiCheckCircle className="shrink-0 text-lg" />
                This request is {status || "no longer available"}.
            </div>
        );
    }

    return (
        <div className="mx-auto mb-2 w-full">
            <Button
                color="danger"
                size="lg"
                onPress={() => {
                    setError("");
                    setIsOpen(true);
                }}
                className="w-full font-semibold sm:w-auto"
            >
                <FiDroplet />
                Donate Blood
            </Button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-white/80 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (
                            event.target === event.currentTarget &&
                            !isSubmitting
                        ) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="donate-modal-title"
                        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-content1 shadow-2xl"
                    >
                        <div className="flex items-start justify-between border-b border-default-200 bg-danger-50 px-6 py-5">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-danger">
                                    <FiDroplet />
                                    Donation Confirmation
                                </div>

                                <h2
                                    id="donate-modal-title"
                                    className="mt-1 text-xl font-bold text-foreground"
                                >
                                    Confirm Your Donation
                                </h2>

                                <p className="mt-1 text-sm text-default-500">
                                    Please verify your details before continuing.
                                </p>
                            </div>

                            <button
                                type="button"
                                aria-label="Close dialog"
                                disabled={isSubmitting}
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-default-500 transition hover:bg-white hover:text-foreground disabled:opacity-50"
                            >
                                <FiX className="size-5" />
                            </button>
                        </div>

                        <div className="space-y-5 p-6">
                            <div className="rounded-xl border border-danger-100 bg-danger-50/50 p-4">
                                <p className="text-sm text-default-500">
                                    You are responding to a request for
                                </p>

                                <p className="mt-1 text-lg font-bold text-danger">
                                    {request?.bloodGroup} blood
                                </p>

                                <p className="mt-1 text-sm text-default-600">
                                    Recipient: {request?.recipientName}
                                </p>

                                <p className="mt-2 text-sm leading-6 text-default-600">
                                    By confirming, you agree to be contacted
                                    about this donation request.
                                </p>
                            </div>

                            <ReadOnlyField
                                icon={<FiUser />}
                                label="Donor Name"
                                value={user?.name}
                            />

                            <ReadOnlyField
                                icon={<FiMail />}
                                label="Donor Email"
                                value={user?.email}
                                type="email"
                            />

                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-lg border border-danger-200 bg-danger-50 p-3 text-sm text-danger"
                                >
                                    {error}
                                </p>
                            )}

                            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
                                <Button
                                    variant="flat"
                                    isDisabled={isSubmitting}
                                    onPress={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    color="danger"
                                    isDisabled={
                                        isSubmitting ||
                                        !user?.name ||
                                        !user?.email
                                    }
                                    onPress={handleConfirm}
                                >
                                    <FiCheckCircle />
                                    {isSubmitting
                                        ? "Confirming..."
                                        : "Confirm Donation"}
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

function ReadOnlyField({ icon, label, value, type = "text" }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
                {label}
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-default-200 bg-default-50 px-4 py-3">
                <span className="text-danger">{icon}</span>

                <input
                    type={type}
                    value={value || ""}
                    readOnly
                    aria-label={label}
                    className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none"
                />
            </div>
        </div>
    );
}

export default DonateBloodModal;