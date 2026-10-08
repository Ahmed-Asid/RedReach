
"use client";

import { ListBox, Select } from "@heroui/react";
import { FiMapPin } from "react-icons/fi";

import districtsData from "@/data/bangladesh/districts.json";
import upazilasData from "@/data/bangladesh/upazilas.json";

const districts = normalizeLocationData(districtsData);
const upazilas = normalizeLocationData(upazilasData);

export default function LocationSelect({
    name,
    type = "district",
    value = "",
    districtId = null,
    onChange,
    label,
    placeholder,
    required = false,
    disabled = false,
}) {
    const options =
        type === "district"
            ? districts
            : getUpazilasByDistrict(districtId);

    const selectedItem = options.find(
        (item) =>
            String(item.name).toLowerCase() ===
            String(value).toLowerCase()
    );

    const selectedId = selectedItem
        ? String(selectedItem.id)
        : "";

    const defaultPlaceholder =
        type === "district"
            ? "Select district"
            : "Select upazila";

    const handleChange = (id) => {
        const selected = options.find(
            (item) => String(item.id) === String(id)
        );

        onChange?.(selected?.name || "");
    };

    return (
        <Select
            name={name}
            value={selectedId}
            onChange={handleChange}
            aria-label={label || defaultPlaceholder}
            isRequired={required}
            isDisabled={disabled || options.length === 0}
            className="w-full"
        >
            <Select.Trigger className="h-12 w-full rounded-xl bg-default-100 px-3 shadow-none">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <FiMapPin className="size-4 shrink-0 text-default-400" />

                    <Select.Value
                        className="truncate text-sm"
                        placeholder={
                            placeholder || defaultPlaceholder
                        }
                    />
                </div>

                <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
                <ListBox className="max-h-72 overflow-auto">
                    {options.map((item) => (
                        <ListBox.Item
                            key={item.id}
                            id={String(item.id)}
                            textValue={item.name}
                        >
                            {item.name}

                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>
        </Select>
    );
}

function getUpazilasByDistrict(districtValue) {
    if (!districtValue) {
        return [];
    }

    const district = districts.find(
        (item) =>
            String(item.id) === String(districtValue) ||
            String(item.name).toLowerCase() ===
            String(districtValue).toLowerCase()
    );

    if (!district) {
        return [];
    }

    return upazilas.filter(
        (item) =>
            String(item.district_id) ===
            String(district.id)
    );
}

function normalizeLocationData(data) {
    if (Array.isArray(data)) {
        return data;
    }

    if (Array.isArray(data?.data)) {
        return data.data;
    }

    if (!data || typeof data !== "object") {
        return [];
    }

    const array = Object.values(data).find((value) =>
        Array.isArray(value)
    );

    return array || [];
}