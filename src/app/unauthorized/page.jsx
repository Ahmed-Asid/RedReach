
import Link from "next/link";
import { FiArrowLeft, FiLogIn } from "react-icons/fi";

export default function UnauthorizedPage() {
    return (
        <main className="min-h-screen bg-red-50 flex items-center justify-center px-6">
            <div className="w-full max-w-lg text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <FiLogIn size={36} />
                </div>

                {/* Status Code */}
                <p className="text-7xl font-extrabold tracking-tight text-red-600">
                    401
                </p>

                {/* Heading */}
                <h1 className="mt-4 text-3xl font-bold text-gray-900">
                    Unauthorized Access
                </h1>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-md text-gray-600">
                    Oops! You don&apos;t have permission to access this page. Please sign in with an authorized account or head back to the dashboard.
                </p>

                {/* Actions */}
                <div className="mt-8 flex justify-center gap-3">
                    <Link
                        href="/login"
                        color="danger"
                        variant="solid"
                        startContent={<FiLogIn size={18} />}
                    >
                        Login
                    </Link>

                    <Link
                        href="/"
                        color="default"
                        variant="bordered"
                        startContent={<FiArrowLeft size={18} />}
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
