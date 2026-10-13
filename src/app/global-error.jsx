'use client';

import { useEffect } from 'react';
import { FiAlertOctagon, FiRefreshCw } from 'react-icons/fi';

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error("Global Layout Crash caught:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="flex min-h-screen items-center justify-center bg-default-50 font-sans text-foreground antialiased">
                <main className="mx-auto w-full max-w-xl px-4 py-12">
                    <div className="w-full overflow-hidden rounded-3xl border border-default-200/80 bg-white shadow-2xl">
                        <div className="border-b border-danger-100 bg-danger-50 px-6 py-10 text-center sm:px-10">
                            <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-danger text-white shadow-lg">
                                <FiAlertOctagon className="size-10" />
                            </div>

                            <span className="mt-5 inline-block rounded-full bg-danger-100 px-3 py-1 text-xs font-semibold tracking-wide text-danger">
                                Critical System Failure
                            </span>

                            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">
                                Critical Root Error
                            </h1>

                            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                                A critical error occurred at the application root level. The system has intercepted the crash.
                            </p>
                        </div>

                        <div className="p-6 sm:p-10 space-y-4">
                            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                                    Root Exception
                                </p>
                                <p className="font-mono text-xs text-red-700 break-all mt-1">
                                    {error?.message || "Critical layout rendering failure."}
                                </p>
                            </div>

                            <button
                                onClick={() => reset()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-danger px-4 py-3 text-sm font-semibold text-white shadow-md shadow-danger/25 transition hover:opacity-90"
                            >
                                <FiRefreshCw className="size-4" />
                                Restart Application
                            </button>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}