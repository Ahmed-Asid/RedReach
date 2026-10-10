"use client";

import { useState } from "react";
import Image from "next/image";
import {
    FiMoreVertical,
    FiSearch,
    FiShield,
    FiUserCheck,
    FiUserX,
    FiUsers,
    FiX,
} from "react-icons/fi";
import { Button } from "@heroui/react";
import { updateUser } from "@/lib/actions/users";

const FILTERS = [
    { label: "All Users", value: "all" },
    { label: "Active", value: "active" },
    { label: "Blocked", value: "blocked" },
];

const getRoleStyle = (role) => {
    switch (role) {
        case "admin":
            return "bg-purple-50 text-purple-700";
        case "volunteer":
            return "bg-blue-50 text-blue-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const getStatusStyle = (status) =>
    status === "active"
        ? "bg-green-50 text-green-700"
        : "bg-red-50 text-red-700";

const AllUsersTable = ({ initialUsers = [] }) => {
    const [users, setUsers] = useState(initialUsers);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [openMenu, setOpenMenu] = useState(null);
    const [confirmation, setConfirmation] = useState(null);
    const [processingId, setProcessingId] = useState(null);
    const [error, setError] = useState("");

    const filteredUsers = users.filter((user) => {
        const matchesStatus =
            filter === "all" || user.status === filter;

        const searchText = search.trim().toLowerCase();

        const matchesSearch =
            !searchText ||
            [user.name, user.email, user.role]
                .some((value) =>
                    String(value || "")
                        .toLowerCase()
                        .includes(searchText)
                );

        return matchesStatus && matchesSearch;
    });

    const performAction = async () => {
        if (!confirmation) return;

        const { user, type, value } = confirmation;

        setProcessingId(user._id);
        setError("");

        try {
            const result = await updateUser(user._id, {
                [type]: value,
            });

            if (result?.error) {
                throw new Error(
                    result.message || "Failed to update user."
                );
            }

            setUsers((currentUsers) =>
                currentUsers.map((currentUser) =>
                    currentUser._id === user._id
                        ? { ...currentUser, [type]: value }
                        : currentUser
                )
            );

            setConfirmation(null);
            setOpenMenu(null);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setProcessingId(null);
        }

    };


    const askConfirmation = (user, type, value) => {
        setConfirmation({ user, type, value });
        setOpenMenu(null);
        setError("");
    };

    return (
        <div className="space-y-5">
            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Total Users</p>
                        <FiUsers className="text-xl text-red-600" />
                    </div>
                    <p className="mt-3 text-3xl font-bold text-gray-900">
                        {users.length}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Active Users</p>
                        <FiUserCheck className="text-xl text-green-600" />
                    </div>
                    <p className="mt-3 text-3xl font-bold text-gray-900">
                        {users.filter((user) => user.status === "active").length}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Blocked Users</p>
                        <FiUserX className="text-xl text-red-600" />
                    </div>
                    <p className="mt-3 text-3xl font-bold text-gray-900">
                        {users.filter((user) => user.status === "blocked").length}
                    </p>
                </div>
            </div>

            {/* Table container */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:p-5">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                User Management
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage account status and permissions.
                            </p>
                        </div>

                        <div className="relative w-full md:max-w-xs">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search name, email, role..."
                                aria-label="Search users"
                                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {FILTERS.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setFilter(item.value)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${filter === item.value
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {item.label}
                                <span className="ml-2 opacity-75">
                                    {item.value === "all"
                                        ? users.length
                                        : users.filter(
                                            (user) =>
                                                user.status === item.value
                                        ).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {error && !confirmation && (
                    <div
                        role="alert"
                        className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                {/* Responsive table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">
                        <thead className="bg-gray-50">
                            <tr className="text-xs uppercase tracking-wider text-gray-500">
                                <th className="px-5 py-4 font-semibold">User</th>
                                <th className="px-5 py-4 font-semibold">Role</th>
                                <th className="px-5 py-4 font-semibold">Status</th>
                                <th className="px-5 py-4 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="transition hover:bg-gray-50/70"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-50 text-sm font-semibold text-red-600">
                                                {user.image ? (
                                                    <Image
                                                        src={user.image}
                                                        alt={user.name || "User avatar"}
                                                        fill
                                                        sizes="44px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    (user.name || "U")
                                                        .charAt(0)
                                                        .toUpperCase()
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate font-medium text-gray-900">
                                                    {user.name || "Unnamed user"}
                                                </p>
                                                <p className="mt-1 truncate text-sm text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getRoleStyle(user.role)}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(user.status)}`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        {user.role === "admin" ? (
                                            <span className="inline-flex items-center gap-2 text-xs text-gray-400">
                                                <FiShield />
                                                Admin
                                            </span>
                                        ) : (
                                            <div className="relative inline-block">
                                                <button
                                                    type="button"
                                                    aria-label={`Actions for ${user.name}`}
                                                    aria-expanded={openMenu === user._id}
                                                    onClick={() =>
                                                        setOpenMenu(
                                                            openMenu === user._id
                                                                ? null
                                                                : user._id
                                                        )
                                                    }
                                                    disabled={
                                                        processingId === user._id
                                                    }
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
                                                >
                                                    <FiMoreVertical size={20} />
                                                </button>

                                                {openMenu === user._id && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            aria-label="Close actions menu"
                                                            className="fixed inset-0 z-10 cursor-default"
                                                            onClick={() =>
                                                                setOpenMenu(null)
                                                            }
                                                        />

                                                        <div className="absolute right-0 bottom-0 z-30 mt-2 w-52 rounded-xl border border-gray-200 bg-white p-1.5 text-left shadow-xl">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    askConfirmation(
                                                                        user,
                                                                        "status",
                                                                        user.status === "active"
                                                                            ? "blocked"
                                                                            : "active"
                                                                    )
                                                                }
                                                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                            >
                                                                {user.status === "active" ? (
                                                                    <FiUserX className="text-red-500" />
                                                                ) : (
                                                                    <FiUserCheck className="text-green-600" />
                                                                )}
                                                                {user.status === "active"
                                                                    ? "Block User"
                                                                    : "Unblock User"}
                                                            </button>

                                                            {user.role === "donor" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        askConfirmation(
                                                                            user,
                                                                            "role",
                                                                            "volunteer"
                                                                        )
                                                                    }
                                                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                                >
                                                                    <FiUserCheck className="text-blue-600" />
                                                                    Make Volunteer
                                                                </button>
                                                            )}

                                                            {(user.role === "donor" ||
                                                                user.role === "volunteer") && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            askConfirmation(
                                                                                user,
                                                                                "role",
                                                                                "admin"
                                                                            )
                                                                        }
                                                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        <FiShield className="text-purple-600" />
                                                                        Make Admin
                                                                    </button>
                                                                )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-5 py-14 text-center"
                                    >
                                        <FiUsers className="mx-auto text-3xl text-gray-300" />
                                        <p className="mt-3 font-medium text-gray-700">
                                            No users found
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Try changing the status filter or search term.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
            </div>

            {/* Confirmation dialog */}
            {confirmation && (
                <div
                    className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
                    onClick={(event) => {
                        if (event.target === event.currentTarget && !processingId) {
                            setConfirmation(null);
                            setError("");
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="user-action-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
                                {confirmation.type === "role" ? (
                                    <FiShield size={21} />
                                ) : (
                                    <FiUserX size={21} />
                                )}
                            </div>

                            <button
                                type="button"
                                aria-label="Close confirmation"
                                disabled={Boolean(processingId)}
                                onClick={() => {
                                    setConfirmation(null);
                                    setError("");
                                }}
                                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <h3
                            id="user-action-title"
                            className="mt-4 text-lg font-bold text-gray-900"
                        >
                            {confirmation.type === "status"
                                ? confirmation.value === "blocked"
                                    ? "Block this user?"
                                    : "Unblock this user?"
                                : `Make ${confirmation.value}?`}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {confirmation.type === "status"
                                ? confirmation.value === "blocked"
                                    ? `You are about to block ${confirmation.user.name}. Make sure your backend prevents blocked users from performing protected actions.`
                                    : `You are about to restore account access for ${confirmation.user.name}.`
                                : `You are about to change ${confirmation.user.name}'s role from ${confirmation.user.role} to ${confirmation.value}.`}
                        </p>

                        {error && (
                            <p
                                role="alert"
                                className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                            >
                                {error}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                isDisabled={Boolean(processingId)}
                                onPress={() => {
                                    setConfirmation(null);
                                    setError("");
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                onPress={performAction}
                                isDisabled={Boolean(processingId)}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                {processingId
                                    ? "Updating..."
                                    : "Confirm"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default AllUsersTable;
