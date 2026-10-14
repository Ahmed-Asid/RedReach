import { FiDroplet } from "react-icons/fi";

export default function Loading() {
    return (
        <main className="mx-auto flex min-h-[85vh] w-full max-w-xl items-center justify-center px-4 py-12">
            <div className="w-full overflow-hidden rounded-3xl border border-default-200/80 bg-content1 shadow-xl shadow-black/[0.03]">
                {/* Header Loading Banner */}
                <div className="relative overflow-hidden border-b border-danger-100 bg-gradient-to-r from-danger-50/80 via-danger-50/30 to-transparent px-6 py-12 text-center sm:px-10">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-danger text-white shadow-lg shadow-danger/25 animate-pulse">
                        <FiDroplet className="size-10 animate-spin" />
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-danger-100/60 px-3 py-1 text-xs font-semibold tracking-wide text-danger">
                        <span className="size-2 rounded-full bg-danger animate-ping"></span>
                        <span>Please Wait</span>
                    </div>
                    {/* 
                    <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">
                        Loading RedReach...
                    </h1>

                    <p className="mx-auto mt-2 max-w-sm text-sm text-default-500">
                        Fetching the latest data securely from the database.
                    </p> */}
                </div>
            </div>
        </main>
    );
}