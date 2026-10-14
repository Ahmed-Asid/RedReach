import { FiGrid } from "react-icons/fi";

export default function Loading() {
    return (
        <main className="mx-auto flex min-h-[75vh] w-full max-w-xl items-center justify-center px-4 py-12">
            <div className="w-full overflow-hidden rounded-3xl border border-default-200/80 bg-content1 shadow-xl shadow-black/[0.03]">
                <div className="relative overflow-hidden border-b border-danger-100 bg-gradient-to-r from-danger-50/80 via-danger-50/30 to-transparent px-6 py-12 text-center sm:px-10">
                    {/* Animated Icon Badge */}
                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-danger text-white shadow-lg shadow-danger/25">
                        <FiGrid className="size-8 animate-spin" />
                    </div>

                    {/* Status Pill */}
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-danger-100/60 px-3 py-1 text-xs font-semibold tracking-wide text-danger">
                        <span className="size-2 rounded-full bg-danger animate-ping"></span>
                        <span>Please wait</span>
                    </div>

                    <h1 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                        Loading ...
                    </h1>
                </div>

                {/* Animated Sliding Progress Bar */}
                <div className="p-6">
                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-default-100">
                        <div className="absolute inset-y-0 left-0 rounded-full bg-danger animate-[indeterminate_1.5s_infinite_ease-in-out]"></div>
                    </div>
                </div>
            </div>

            {/* Custom sliding keyframe animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes indeterminate {
                    0% { transform: translateX(-100%); width: 30%; }
                    50% { transform: translateX(120%); width: 40%; }
                    100% { transform: translateX(250%); width: 30%; }
                }
            `}} />

        </main>
    );
}