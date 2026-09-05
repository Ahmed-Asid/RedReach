"use client";

import { useEffect, useMemo, useState } from "react";
import { ListBox, Select } from "@heroui/react";
import { FiMapPin } from "react-icons/fi";

const LOCATION_FILES = {
    districts: "/data/bangladesh/districts.json",
    upazilas: "/data/bangladesh/upazilas.json",
};

export default function LocationSelect({
    name,
    type = "district",
    value = null,
    districtId = null,
    onChange,
    label,
    placeholder,
    required = false,
    disabled = false,
}) {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const loadLocations = async () => {
            try {
                setLoading(true);
                setError("");

                const [districtResponse, upazilaResponse] =
                    await Promise.all([
                        fetch(LOCATION_FILES.districts),
                        fetch(LOCATION_FILES.upazilas),
                    ]);

                if (!districtResponse.ok || !upazilaResponse.ok) {
                    throw new Error("Failed to load location data.");
                }

                const [districtData, upazilaData] = await Promise.all([
                    districtResponse.json(),
                    upazilaResponse.json(),
                ]);

                if (cancelled) return;

                setDistricts(normalizeLocationData(districtData));
                setUpazilas(normalizeLocationData(upazilaData));
            } catch (err) {
                if (cancelled) return;

                console.error("Location loading error:", err);
                setError("Unable to load location data.");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadLocations();

        return () => {
            cancelled = true;
        };
    }, []);

    const options = useMemo(() => {
        if (type === "district") {
            return districts;
        }

        if (!districtId) {
            return [];
        }

        return upazilas.filter(
            (item) =>
                String(item.district_id) === String(districtId)
        );
    }, [type, districtId, districts, upazilas]);

    const defaultPlaceholder =
        type === "district"
            ? "Select district"
            : "Select upazila";

    return (
        <Select
            name={name}
            value={value}
            onChange={onChange}
            aria-label={label || defaultPlaceholder}
            isRequired={required}
            isDisabled={disabled || loading || Boolean(error)}
            className="w-full"
        >
            <Select.Trigger className="h-12 w-full rounded-xl bg-default-100 px-3 shadow-none">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <FiMapPin className="size-4 shrink-0 text-default-400" />

                    <Select.Value
                        className="truncate text-sm"
                        placeholder={
                            loading
                                ? "Loading..."
                                : placeholder || defaultPlaceholder
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