
import Link from "next/link";
import { FiArrowLeft, FiLock } from "react-icons/fi";

export default function ForbiddenPage() {
    return (
        <main className="min-h-screen bg-red-50 flex items-center justify-center px-6">
            <div className="w-full max-w-lg text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <FiLock size={36} />
                </div>

                {/* Status Code */}
                <p className="text-7xl font-extrabold tracking-tight text-red-600">
                    403
                </p>

                {/* Heading */}
                <h1 className="mt-4 text-3xl font-bold text-gray-900">
                    Access Forbidden
                </h1>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-md text-gray-600">
                    You don&apos;t have permission to access this page.
                    Please make sure you have the required permissions
                    to continue.
                </p>

                {/* Action */}
                <div className="mt-8 flex justify-center">
                    <Link
                        href="/dashboard"
                        color="danger"
                        variant="solid"
                        startContent={<FiArrowLeft size={18} />}
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}