
"use client";

import { useState } from "react";
import {
    Button,
    Card,
    Form,
    Input,
    InputGroup,
    Label,
    TextField,
    toast,
} from "@heroui/react";
import {
    FiEdit3,
    FiMail,
    FiSave,
    FiUser,
} from "react-icons/fi";

import LocationSelect from "@/app/components/forms/LocationSelect";
import BloodGroupSelect from "@/app/components/forms/BloodGroupSelect";

const API_URL = "http://localhost:8000";

export default function ProfileForm({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        image: user?.image || "",
        bloodGroup: user?.bloodGroup || "",
        district: user?.district || "",
        upazila: user?.upazila || "",
    });

    const getInitialForm = () => ({
        name: user?.name || "",
        email: user?.email || "",
        image: user?.image || "",
        bloodGroup: user?.bloodGroup || "",
        district: user?.district || "",
        upazila: user?.upazila || "",
    });

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleDistrictChange = (value) => {
        setForm((current) => ({
            ...current,
            district: value,
            upazila: "",
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setForm(getInitialForm());
        setIsEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isEditing) {
            return;
        }

        if (!form.name.trim()) {
            toast.danger("Name is required.");
            return;
        }

        if (!form.bloodGroup) {
            toast.danger("Please select your blood group.");
            return;
        }

        if (!form.district) {
            toast.danger("Please select your district.");
            return;
        }

        if (!form.upazila) {
            toast.danger("Please select your upazila.");
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch(
                `${API_URL}/auth/profile`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name.trim(),
                        bloodGroup: form.bloodGroup,
                        district: form.district,
                        upazila: form.upazila,
                        image: form.image,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    "Failed to update profile."
                );
            }

            setIsEditing(false);

            toast.success(
                "Profile updated successfully."
            );
        } catch (error) {
            console.error(
                "Profile update error:",
                error
            );

            toast.danger(
                error.message ||
                "Failed to update profile."
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card className="border border-default-200 bg-background shadow-sm">
            <Card.Header className="flex flex-col gap-4 border-b border-default-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Card.Title className="text-lg font-semibold">
                        Profile Information
                    </Card.Title>

                    <Card.Description>
                        View and update your personal information.
                    </Card.Description>
                </div>

                {!isEditing ? (
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={handleEdit}
                    >
                        <FiEdit3 />
                        Edit Profile
                    </Button>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="flat"
                            onPress={handleCancel}
                            isDisabled={isSaving}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="danger"
                            type="submit"
                            form="profile-form"
                            isDisabled={isSaving}
                        >
                            <FiSave />

                            {isSaving
                                ? "Saving..."
                                : "Save Changes"}
                        </Button>
                    </div>
                )}
            </Card.Header>

            <Card.Content className="p-6">
                <Form
                    id="profile-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-danger-50">
                            {form.image ? (
                                <img
                                    src={form.image}
                                    alt={
                                        form.name ||
                                        "Profile avatar"
                                    }
                                    className="size-full object-cover"
                                />
                            ) : (
                                <FiUser className="size-8 text-danger" />
                            )}
                        </div>

                        <div>
                            <p className="font-medium text-foreground">
                                {form.name || "User"}
                            </p>

                            <p className="text-sm text-default-500">
                                {form.email}
                            </p>
                        </div>
                    </div>

                    {/* Name */}
                    <TextField
                        name="name"
                        value={form.name}
                        onChange={(value) =>
                            handleChange(
                                "name",
                                value
                            )
                        }
                        isRequired
                        isDisabled={!isEditing}
                        className="w-full"
                    >
                        <Label>Full Name</Label>

                        <InputGroup
                            variant="secondary"
                            fullWidth
                        >
                            <InputGroup.Prefix>
                                <FiUser className="size-4 text-default-400" />
                            </InputGroup.Prefix>

                            <InputGroup.Input
                                placeholder="Enter your full name"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Email */}
                    <TextField
                        name="email"
                        value={form.email}
                        isDisabled
                        className="w-full"
                    >
                        <Label>Email</Label>

                        <InputGroup
                            variant="secondary"
                            fullWidth
                        >
                            <InputGroup.Prefix>
                                <FiMail className="size-4 text-default-400" />
                            </InputGroup.Prefix>

                            <InputGroup.Input
                                readOnly
                            />
                        </InputGroup>
                    </TextField>

                    {/* Blood Group */}
                    <BloodGroupSelect
                        name="bloodGroup"
                        value={form.bloodGroup}
                        onChange={(value) =>
                            handleChange(
                                "bloodGroup",
                                value
                            )
                        }
                        disabled={!isEditing}
                        required
                    />

                    {/* Location */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <LocationSelect
                            name="district"
                            type="district"
                            value={form.district}
                            onChange={
                                handleDistrictChange
                            }
                            disabled={!isEditing}
                            required
                        />

                        <LocationSelect
                            name="upazila"
                            type="upazila"
                            value={form.upazila}
                            districtId={form.district}
                            onChange={(value) =>
                                handleChange(
                                    "upazila",
                                    value
                                )
                            }
                            disabled={
                                !isEditing ||
                                !form.district
                            }
                            required
                        />
                    </div>
                </Form>
            </Card.Content>
        </Card>
    );
}
