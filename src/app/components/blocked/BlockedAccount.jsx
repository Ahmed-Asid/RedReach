import { FiShield, FiMail, FiClock } from "react-icons/fi";

const BlockedAccount = () => {
    return (<div className="flex min-h-[60vh] items-center justify-center px-4 py-10"> <div className="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm sm:p-10"> <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50"> <FiShield className="text-3xl text-red-600" /> </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Account Restricted
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Your RedReach account is currently blocked, so you
            cannot access this section. If you believe this is a
            mistake, please contact our administration team for
            assistance.
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-left">
            <FiClock className="mt-1 shrink-0 text-lg text-red-600" />

            <div>
                <p className="font-semibold text-gray-900">
                    What can you do?
                </p>

                <p className="mt-1 text-sm leading-5 text-gray-600">
                    Contact an administrator and request a review
                    of your account status. Access will be restored
                    once your account is reactivated.
                </p>
            </div>
        </div>

        <a
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
            <FiMail className="text-lg" />
            Contact Support
        </a>

        <p className="mt-4 text-xs text-gray-400">
            We appreciate your understanding and patience.
        </p>
    </div>
    </div>
    );

};

export default BlockedAccount;
