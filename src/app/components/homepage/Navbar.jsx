"use client";

import { useState } from "react";
import { Link, Button, Avatar, Dropdown } from "@heroui/react";
import {
    FiHeart,
    FiMenu,
    FiX,
    FiGrid,
    FiLogOut,
} from "react-icons/fi";

export default function Navbar({ user = null }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isLoggedIn = !!user;

    const navItems = [
        { label: "Donation Requests", href: "/donation-requests" },
        ...(isLoggedIn
            ? [{ label: "Funding", href: "/funding" }]
            : []),
    ];

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-separator bg-background/80 backdrop-blur-xl">
            <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo + Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-default-100 lg:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <FiX className="h-5 w-5" />
                        ) : (
                            <FiMenu className="h-5 w-5" />
                        )}
                    </button>

                    <Link
                        href="/"
                        className="group flex items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger text-white shadow-sm shadow-danger/30 transition-transform group-hover:scale-105">
                            <FiHeart
                                className="h-5 w-5"
                                fill="currentColor"
                            />
                        </div>

                        <div className="flex flex-col leading-none">
                            <span className="text-lg font-bold tracking-tight text-foreground">
                                Read<span className="text-danger">Reach</span>
                            </span>

                            <span className="hidden text-[9px] font-medium uppercase tracking-wider text-default-400 sm:block">
                                Give Blood · Save Lives
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-default-600 transition-colors hover:bg-default-100 hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-2 lg:flex">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/login">
                                <Button
                                    color="danger"
                                    variant="light"
                                    radius="lg"
                                    className="px-4 font-semibold"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button
                                    color="danger"
                                    radius="lg"
                                    className="px-5 font-semibold shadow-sm shadow-danger/20"
                                >
                                    Create an account
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-danger"
                                    aria-label="Open user menu"
                                >
                                    <Avatar
                                        src={user?.image}
                                        name={user?.name || "User"}
                                        size="sm"
                                        className="cursor-pointer"
                                    />
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Popover placement="bottom end">
                                <Dropdown.Menu
                                    aria-label="User menu"
                                    onAction={(key) => {
                                        if (key === "dashboard") {
                                            window.location.href =
                                                "/dashboard";
                                        }

                                        if (key === "logout") {
                                            // Add logout logic
                                        }
                                    }}
                                >
                                    <Dropdown.Item
                                        id="dashboard"
                                        textValue="Dashboard"
                                    >
                                        <span className="flex items-center gap-3">
                                            <FiGrid className="h-4 w-4" />
                                            Dashboard
                                        </span>
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                        id="logout"
                                        textValue="Logout"
                                        className="text-danger"
                                    >
                                        <span className="flex items-center gap-3">
                                            <FiLogOut className="h-4 w-4" />
                                            Logout
                                        </span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    )}
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-separator bg-background lg:hidden">
                    <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="block w-full rounded-lg px-3 py-3 text-sm font-medium text-default-600 hover:bg-default-100 hover:text-foreground"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link
                                        href="/dashboard"
                                        onClick={closeMenu}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-default-600 hover:bg-default-100 hover:text-foreground"
                                    >
                                        <FiGrid className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            closeMenu();
                                            // Add logout logic
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-danger hover:bg-danger-50"
                                    >
                                        <FiLogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className="block w-full rounded-lg px-3 py-3 text-sm font-medium text-default-600 hover:bg-default-100 hover:text-foreground"
                                    >
                                        Login
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/register"
                                        onClick={closeMenu}
                                        className="block w-full rounded-lg px-3 py-3 text-sm font-medium text-danger hover:bg-danger-50"
                                    >
                                        Create an account
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}