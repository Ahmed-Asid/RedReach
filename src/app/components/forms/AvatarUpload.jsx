"use client";

import { useEffect, useMemo } from "react";
import { Button } from "@heroui/react";
import {
    FiCamera,
    FiTrash2,
    FiUpload,
    FiUser,
} from "react-icons/fi";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const SIZE_CLASSES = {
    sm: "size-16 rounded-xl",
    md: "size-24 rounded-2xl",
    lg: "size-32 rounded-3xl",
};

export default function AvatarUpload({
    value = null,
    onChange,
    size = "md",
    disabled = false,
}) {
    /*
     * Create the preview URL from the selected file.
     * No preview state is necessary.
     */
    const preview = useMemo(() => {
        if (!value) return "";

        return URL.createObjectURL(value);
    }, [value]);

    /*
     * Clean up the object URL when the selected
     * file changes or the component unmounts.
     */
    useEffect(() => {
        if (!preview) return;

        return () => {
            URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            alert(
                "Please select a JPG, PNG, or WEBP image."
            );

            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            alert("Image must be smaller than 5MB.");

            event.target.value = "";
            return;
        }

        onChange?.(file);
    };

    const handleRemove = () => {
        onChange?.(null);

        const input = document.getElementById(
            "avatar-upload"
        );

        if (input) {
            input.value = "";
        }
    };

    const hasImage = Boolean(value && preview);

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-4">
                {/* Avatar preview */}
                <div
                    className={`shrink-0 overflow-hidden bg-danger-soft text-danger ${SIZE_CLASSES[size] || SIZE_CLASSES.md
                        }`}
                >
                    {hasImage ? (
                        <img
                            src={preview}
                            alt="Profile preview"
                            className="size-full object-cover"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center">
                            <FiUser className="size-8" />
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="space-y-2">
                    <div>
                        <p className="text-sm font-semibold text-foreground">
                            Profile photo
                        </p>

                        <p className="mt-1 text-xs text-default-400">
                            JPG, PNG or WEBP · Max 5MB
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="avatar-upload"
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-default-100 px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-default-200 ${disabled
                                    ? "pointer-events-none opacity-50"
                                    : ""
                                }`}
                        >
                            {hasImage ? (
                                <FiCamera className="size-3.5" />
                            ) : (
                                <FiUpload className="size-3.5" />
                            )}

                            {hasImage
                                ? "Change photo"
                                : "Upload photo"}
                        </label>

                        {hasImage && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                isDisabled={disabled}
                                onPress={handleRemove}
                                className="text-danger"
                            >
                                <FiTrash2 className="size-3.5" />
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <input
                id="avatar-upload"
                name="avatar"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={disabled}
                onChange={handleChange}
            />
        </div>
    );
}