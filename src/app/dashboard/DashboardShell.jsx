"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Avatar,
    Button,
    Drawer,
} from "@heroui/react";
import {
    FiActivity,
    FiDroplet,
    FiHome,
    FiLogOut,
    FiMenu,
    FiPlusCircle,
    FiUser,
    FiUsers,
    FiX,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";

const NAVIGATION = {
    donor: [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: FiHome,
        },
        {
            label: "My Donation Requests",
            href: "/dashboard/my-donation-requests",
            icon: FiDroplet,
        },
        {
            label: "Create Donation Request",
            href: "/dashboard/create-donation-request",
            icon: FiPlusCircle,
        },
        {
            label: "Profile",
            href: "/dashboard/profile",
            icon: FiUser,
        },
    ],

    volunteer: [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: FiHome,
        },
        {
            label: "All Blood Donation Requests",
            href: "/dashboard/all-blood-donation-request",
            icon: FiDroplet,
        },
        {
            label: "Profile",
            href: "/dashboard/profile",
            icon: FiUser,
        },
    ],

    admin: [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: FiHome,
        },
        {
            label: "All Users",
            href: "/dashboard/all-users",
            icon: FiUsers,
        },
        {
            label: "All Blood Donation Requests",
            href: "/dashboard/all-blood-donation-request",
            icon: FiDroplet,
        },
        {
            label: "Profile",
            href: "/dashboard/profile",
            icon: FiUser,
        },
    ],
};

const ROLE_LABELS = {
    donor: "Donor",
    volunteer: "Volunteer",
    admin: "Administrator",
};

export default function DashboardShell({ user, children }) {
    const pathname = usePathname();
    const router = useRouter();

    const role = user?.role || "donor";
    const navigation = NAVIGATION[role] || NAVIGATION.donor;

    const handleLogout = async () => {
        await authClient.signOut();

        router.replace("/login");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-default-50">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-default-200 bg-background lg:flex lg:flex-col">
                <SidebarHeader />

                <SidebarNavigation
                    navigation={navigation}
                    pathname={pathname}
                />

                <SidebarUser
                    user={user}
                    role={role}
                    onLogout={handleLogout}
                />
            </aside>

            {/* Mobile */}
            <div className="lg:hidden">
                <MobileHeader
                    user={user}
                    role={role}
                    navigation={navigation}
                    pathname={pathname}
                    onLogout={handleLogout}
                />
            </div>

            {/* Main content */}
            <main className="min-h-screen lg:pl-72">
                <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

/* -------------------------------- */
/* Desktop sidebar                  */
/* -------------------------------- */

function SidebarHeader() {
    return (
        <div className="flex h-20 items-center border-b border-default-200 px-6">
            <Link
                href="/"
                className="flex items-center gap-2.5"
            >
                <div className="flex size-10 items-center justify-center rounded-xl bg-danger text-white shadow-sm">
                    <FiDroplet className="size-5" />
                </div>

                <div>
                    <p className="text-lg font-bold tracking-tight text-foreground">
                        Red<span className="text-danger">Reach</span>
                    </p>

                    <p className="text-xs text-default-400">
                        Dashboard
                    </p>
                </div>
            </Link>
        </div>
    );
}

function SidebarNavigation({ navigation, pathname }) {
    return (
        <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-default-400">
                Menu
            </p>

            <div className="space-y-1.5">
                {navigation.map((item) => (
                    <NavItem
                        key={item.href}
                        item={item}
                        active={isActiveRoute(pathname, item.href)}
                    />
                ))}
            </div>
        </nav>
    );
}

function NavItem({ item, active, onPress }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            onClick={onPress}
            className={[
                "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors",
                active
                    ? "bg-danger text-white shadow-sm"
                    : "text-default-600 hover:bg-default-100 hover:text-foreground",
            ].join(" ")}
        >
            <Icon className="size-[18px] shrink-0" />
            <span>{item.label}</span>
        </Link>
    );
}

function SidebarUser({ user, role, onLogout }) {
    return (
        <div className="border-t border-default-200 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-default-50 p-3">
                <Avatar
                    src={user?.image || undefined}
                    name={user?.name || user?.email || "User"}
                    size="sm"
                />

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                        {user?.name || "User"}
                    </p>

                    <p className="truncate text-xs text-default-400">
                        {ROLE_LABELS[role] || "User"}
                    </p>
                </div>

                <Button
                    isIconOnly
                    variant="ghost"
                    size="sm"
                    aria-label="Log out"
                    onPress={onLogout}
                >
                    <FiLogOut className="size-4" />
                </Button>
            </div>
        </div>
    );
}

/* -------------------------------- */
/* Mobile header                    */
/* -------------------------------- */

function MobileHeader({
    user,
    role,
    navigation,
    pathname,
    onLogout,
}) {
    return (
        <Drawer>
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-default-200 bg-background/90 px-4 backdrop-blur-xl sm:px-6">
                <Drawer.Trigger
                    className="inline-flex size-10 items-center justify-center rounded-xl text-default-600 hover:bg-default-100"
                    aria-label="Open dashboard menu"
                >
                    <FiMenu className="size-5" />
                </Drawer.Trigger>

                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-danger text-white">
                        <FiDroplet className="size-4" />
                    </div>

                    <span className="font-bold tracking-tight">
                        Red<span className="text-danger">Reach</span>
                    </span>
                </Link>

                <Avatar
                    src={user?.image || undefined}
                    name={user?.name || user?.email || "User"}
                    size="sm"
                />
            </header>

            <Drawer.Backdrop variant="blur">
                <Drawer.Content placement="left">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />

                        <Drawer.Header>
                            <Drawer.Heading>
                                <div className="flex items-center gap-2.5">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-danger text-white">
                                        <FiDroplet className="size-4" />
                                    </div>

                                    <span>
                                        Red<span className="text-danger">Reach</span>
                                    </span>
                                </div>
                            </Drawer.Heading>
                        </Drawer.Header>

                        <Drawer.Body className="px-3">
                            <div className="mb-6 rounded-xl bg-default-100 p-3">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        src={user?.image || undefined}
                                        name={user?.name || user?.email || "User"}
                                        size="sm"
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {user?.name || "User"}
                                        </p>

                                        <p className="text-xs text-default-400">
                                            {ROLE_LABELS[role] || "User"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <nav className="space-y-1.5">
                                {navigation.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        item={item}
                                        active={isActiveRoute(pathname, item.href)}
                                        onPress={() => { }}
                                    />
                                ))}
                            </nav>
                        </Drawer.Body>

                        <Drawer.Footer>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-danger"
                                onPress={onLogout}
                            >
                                <FiLogOut className="size-4" />
                                Log out
                            </Button>
                        </Drawer.Footer>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}

/* -------------------------------- */
/* Helpers                          */
/* -------------------------------- */

function isActiveRoute(pathname, href) {
    if (href === "/dashboard") {
        return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}