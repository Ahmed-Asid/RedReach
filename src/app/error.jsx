'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Segment Error Boundary caught:", error);
    }, [error]);

    return (
        <main className="mx-auto flex min-h-[85vh] w-full max-w-2xl items-center justify-center px-4 py-12">
            <div className="w-full overflow-hidden rounded-3xl border border-default-200/80 bg-content1 shadow-xl shadow-black/[0.03]">
                <div className="relative overflow-hidden border-b border-danger-100 bg-gradient-to-r from-danger-50/80 via-danger-50/30 to-transparent px-6 py-10 text-center sm:px-10">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-danger text-white shadow-lg shadow-danger/25">
                        <FiAlertTriangle className="size-10" />
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-danger-100/60 px-3 py-1 text-xs font-semibold tracking-wide text-danger">
                        <span>Application Error</span>
                    </div>

                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">
                        Something went wrong!
                    </h1>

                    <p className="mx-auto mt-2 max-w-md text-sm text-default-500">
                        An error occurred while loading this page. You can try reloading or return home.
                    </p>
                </div>

                <div className="space-y-6 p-6 sm:p-10">
                    <div className="rounded-2xl border border-default-200/60 bg-default-50/50 p-4 space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-default-400">
                            Diagnostic Info
                        </p>
                        <p className="font-mono text-xs text-danger break-all leading-relaxed">
                            {error?.message || "An unknown error occurred."}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-3 border-t border-default-200/80 bg-default-50/30 px-6 py-6 sm:px-10">
                    <Button
                        color="danger"
                        variant="flat"
                        className="w-full font-medium"
                        onPress={() => reset()}
                        startContent={<FiRefreshCw className="size-4" />}
                    >
                        Try Again
                    </Button>
                    <Link href="/" className="w-full">
                        <Button
                            color="danger"
                            className="w-full font-medium shadow-md shadow-danger/20"
                            startContent={<FiHome className="size-4" />}
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}