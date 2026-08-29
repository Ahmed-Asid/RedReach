import Link from "next/link";
import {
    FiHeart,
    FiArrowUpRight,
    FiMail,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";

const footerLinks = {
    platform: [
        { label: "Home", href: "/" },
        { label: "Donation Requests", href: "/donation-requests" },
        { label: "Search Donors", href: "/search-donors" },
    ],
    getInvolved: [
        { label: "Join as a Donor", href: "/register" },
        { label: "Funding", href: "/funding" },
        { label: "How It Works", href: "/how-it-works" },
    ],
    support: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Help Center", href: "/help" },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-separator bg-content1">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

                    {/* Brand */}
                    <div className="max-w-sm">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger text-white shadow-sm shadow-danger/20 transition-transform group-hover:scale-105">
                                <FiHeart
                                    className="h-5 w-5"
                                    fill="currentColor"
                                />
                            </div>

                            <span className="text-xl font-bold tracking-tight text-foreground">
                                Read<span className="text-danger">Reach</span>
                            </span>
                        </Link>

                        <p className="mt-5 text-sm leading-6 text-default-500">
                            Connecting blood donors with people who need them.
                            Together, we can make sure that the right help
                            reaches the right person when it matters most.
                        </p>

                        {/* Contact */}
                        <div className="mt-6 space-y-3">
                            <a
                                href="tel:+8801000000000"
                                className="flex items-center gap-3 text-sm text-default-500 transition-colors hover:text-danger"
                            >
                                <FiPhone className="h-4 w-4 shrink-0 text-danger" />
                                +880 1000-000000
                            </a>

                            <a
                                href="mailto:hello@readreach.com"
                                className="flex items-center gap-3 text-sm text-default-500 transition-colors hover:text-danger"
                            >
                                <FiMail className="h-4 w-4 shrink-0 text-danger" />
                                hello@readreach.com
                            </a>

                            <div className="flex items-center gap-3 text-sm text-default-500">
                                <FiMapPin className="h-4 w-4 shrink-0 text-danger" />
                                Bangladesh
                            </div>
                        </div>
                    </div>

                    {/* Platform */}
                    <FooterColumn
                        title="Platform"
                        links={footerLinks.platform}
                    />

                    {/* Get Involved */}
                    <FooterColumn
                        title="Get involved"
                        links={footerLinks.getInvolved}
                    />

                    {/* Support */}
                    <FooterColumn
                        title="Support"
                        links={footerLinks.support}
                    />
                </div>

                {/* Mission Banner */}
                <div className="mt-14 overflow-hidden rounded-2xl border border-danger/10 bg-danger-50/50 dark:bg-danger-50/5">
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger text-white">
                                <FiHeart
                                    className="h-4 w-4"
                                    fill="currentColor"
                                />
                            </div>

                            <p className="text-sm font-medium text-foreground">
                                Every drop has the power to make a difference.
                            </p>
                        </div>

                        <Link
                            href="/register"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger transition-all hover:gap-2.5"
                        >
                            Become a donor
                            <FiArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 flex flex-col gap-4 border-t border-separator pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-default-400">
                        © {new Date().getFullYear()} ReadReach. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-5">
                        <Link
                            href="/privacy"
                            className="text-xs text-default-400 transition-colors hover:text-foreground"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="text-xs text-default-400 transition-colors hover:text-foreground"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-foreground">
                {title}
            </h3>

            <ul className="mt-5 space-y-3.5">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1 text-sm text-default-500 transition-colors hover:text-danger"
                        >
                            {link.label}

                            <FiArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}