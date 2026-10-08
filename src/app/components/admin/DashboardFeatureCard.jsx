
"use client";

import { Card } from "@heroui/react";
import {
    FiDroplet,
    FiDollarSign,
    FiUsers,
} from "react-icons/fi";

export default function DashboardFeatureCard({
    stats = {},
}) {
    const cards = [
        {
            title: "Total Donors",
            count: stats.totalDonors ?? 0,
            icon: FiUsers,
            description: "Registered blood donors",
        },
        {
            title: "Total Funding",
            count: stats.totalFunding ?? 0,
            icon: FiDollarSign,
            description: "Total amount donated",
        },
        {
            title: "Blood Donation Requests",
            count: stats.totalRequests ?? 0,
            icon: FiDroplet,
            description: "Total donation requests",
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <section>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <Card
                                key={card.title}
                                className="border border-slate-200 p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            {card.title}
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {card.count}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-400">
                                            {card.description}
                                        </p>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <Icon size={24} />
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}