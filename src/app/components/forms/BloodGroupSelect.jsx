"use client";

import { ListBox, Select } from "@heroui/react";
import { FiDroplet } from "react-icons/fi";

export const BLOOD_GROUPS = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

export default function BloodGroupSelect({
    name = "bloodGroup",
    value = "",
    onChange,
    required = false,
    disabled = false,
}) {
    return (
        <Select
            name={name}
            aria-label="blood group"
            selectedKeys={value ? new Set([value]) : new Set()}
            onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] ?? "";
                onChange?.(selected);
            }}
            isRequired={required}
            isDisabled={disabled}
            className="w-full"
        >
            <Select.Trigger
                aria-label="Blood group"
                className="h-12 w-full rounded-xl bg-default-100 px-3 shadow-none"
            >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <FiDroplet className="size-4 shrink-0 text-default-400" />

                    <Select.Value
                        className="truncate text-sm"
                        placeholder="Select blood group"
                    />
                </div>

                <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
                <ListBox>
                    {BLOOD_GROUPS.map((group) => (
                        <ListBox.Item
                            key={group}
                            id={group}
                            textValue={group}
                        >
                            {group}
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>
        </Select>
    );
}