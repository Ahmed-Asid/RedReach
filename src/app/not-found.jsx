import Link from "next/link";
import { Button } from "@heroui/react";
import { FiCompass, FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-[85vh] w-full max-w-2xl items-center justify-center px-4 py-12">
            <div className="w-full overflow-hidden rounded-3xl border border-default-200/80 bg-content1 shadow-xl shadow-black/[0.03]">
                {/* Header Banner */}
                <div className="relative overflow-hidden border-b border-danger-100 bg-gradient-to-r from-danger-50/80 via-danger-50/30 to-transparent px-6 py-10 text-center sm:px-10">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-danger text-white shadow-lg shadow-danger/25">
                        <FiCompass className="size-10" />
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-danger-100/60 px-3 py-1 text-xs font-semibold tracking-wide text-danger">
                        <span>Error 404</span>
                    </div>

                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">
                        Page Not Found
                    </h1>

                    <p className="mx-auto mt-2 max-w-md text-sm text-default-500">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Additional Info / Help text */}
                <div className="p-6 sm:p-8 text-center">
                    <p className="text-xs text-default-400">
                        Double-check the URL or use the navigation options below to get back on track.
                    </p>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-3 border-t border-default-200/80 bg-default-50/30 px-6 py-6 sm:px-10">
                    <Link href="/" className="w-full">
                        <Button
                            color="danger"
                            variant="flat"
                            className="w-full font-medium"
                            startContent={<FiHome className="size-4" />}
                        >
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/donation-requests" className="w-full">
                        <Button
                            color="danger"
                            className="w-full font-medium shadow-md shadow-danger/20"
                            startContent={<FiArrowLeft className="size-4" />}
                        >
                            Browse Requests
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}