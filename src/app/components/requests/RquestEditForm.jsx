"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    FiArrowLeft,
    FiCalendar,
    FiClock,
    FiDroplet,
    FiMapPin,
    FiSave,
} from "react-icons/fi";

import LocationSelect from "@/app/components/forms/LocationSelect";
import BloodGroupSelect from "@/app/components/forms/BloodGroupSelect";
import { updateDonationRequest } from "@/lib/actions/requests";

const getDateValue = (value) => {
    if (!value) return "";
    return String(value).slice(0, 10);
};

const getTimeValue = (value) => {
    if (!value) return "";

    // HTML time inputs expect a value such as "14:30".
    const time = String(value).trim();
    const twelveHourMatch = time.match(
        /^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/i
    );

    if (twelveHourMatch) {
        let hours = Number(twelveHourMatch[1]);
        const minutes = twelveHourMatch[2];
        const period = twelveHourMatch[3].toUpperCase();

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        return `${String(hours).padStart(2, "0")}:${minutes}`;
    }

    return time.slice(0, 5);
};

const getInitialForm = (requestData) => ({
    recipientName: requestData?.recipientName || "",
    recipientDistrict:
        requestData?.recipientDistrict ||
        requestData?.recipientDistrictName ||
        "",
    recipientDistrictName: requestData?.recipientDistrictName || "",
    recipientUpazila:
        requestData?.recipientUpazila ||
        requestData?.recipientUpazilaName ||
        "",
    recipientUpazilaName: requestData?.recipientUpazilaName || "",
    hospitalName: requestData?.hospitalName || "",
    fullAddress: requestData?.fullAddress || "",
    bloodGroup: requestData?.bloodGroup || "",
    donationDate: getDateValue(requestData?.donationDate),
    donationTime: getTimeValue(requestData?.donationTime),
    requestMessage: requestData?.requestMessage || "",
});

export default function RequestEditForm({ requestData, requestId }) {
    const router = useRouter();

    const [form, setForm] = useState(() => getInitialForm(requestData));
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleDistrictChange = (value) => {
        setForm((current) => ({
            ...current,
            recipientDistrict: value,
            recipientUpazila: "",
            recipientUpazilaName: "",
        }));
    };

    const handleCancel = () => {
        router.back();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.recipientName.trim()) {
            toast.danger("Recipient name is required.");
            return;
        }

        if (!form.bloodGroup) {
            toast.danger("Please select a blood group.");
            return;
        }

        if (!form.recipientDistrict || !form.recipientUpazila) {
            toast.danger("Please select the recipient's district and upazila.");
            return;
        }

        if (!form.donationDate || !form.donationTime) {
            toast.danger("Please provide the donation date and time.");
            return;
        }

        setIsSaving(true);

        try {
            const updatedData = {
                recipientName: form.recipientName.trim(),
                recipientDistrict: form.recipientDistrict,
                recipientDistrictName: form.recipientDistrictName,
                recipientUpazila: form.recipientUpazila,
                recipientUpazilaName: form.recipientUpazilaName,
                hospitalName: form.hospitalName.trim(),
                fullAddress: form.fullAddress.trim(),
                bloodGroup: form.bloodGroup,
                donationDate: form.donationDate,
                donationTime: form.donationTime,
                requestMessage: form.requestMessage.trim(),
            };

            await updateDonationRequest(requestId, updatedData);

            toast.success("Donation request updated successfully.");
            router.refresh();
        } catch (error) {
            console.error("Update donation request error:", error);
            toast.danger(
                error?.message || "Failed to update the donation request."
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
                        Donation Request Information
                    </Card.Title>
                    <Card.Description>
                        Edit the details below and save your changes.
                    </Card.Description>
                </div>

                <Button
                    variant="tertiary"
                    onPress={handleCancel}
                    isDisabled={isSaving}
                >
                    <FiArrowLeft />
                    Back
                </Button>
            </Card.Header>

            <Card.Content className="p-6">
                <Form
                    id="edit-donation-request-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                        <TextField
                            name="recipientName"
                            value={form.recipientName}
                            onChange={(value) =>
                                handleChange("recipientName", value)
                            }
                            required
                            className="w-full"
                        >
                            <Label>Recipient Name</Label>
                            <InputGroup fullWidth>
                                <InputGroup.Input placeholder="Enter recipient's name" />
                            </InputGroup>
                        </TextField>

                        <TextField>
                            <Label>Blood Group</Label>
                            <BloodGroupSelect
                                name="bloodGroup"
                                value={form.bloodGroup}
                                onChange={(value) =>
                                    handleChange("bloodGroup", value)
                                }
                                required
                            />
                        </TextField>

                        <TextField>
                            <Label>District</Label>
                            <LocationSelect
                                name="recipientDistrict"
                                type="district"
                                value={form.recipientDistrict}
                                onChange={handleDistrictChange}
                                required
                            />
                        </TextField>

                        <TextField>
                            <Label>Upazila</Label>
                            <LocationSelect
                                name="recipientUpazila"
                                type="upazila"
                                value={form.recipientUpazila}
                                districtId={form.recipientDistrict}
                                onChange={(value) =>
                                    handleChange("recipientUpazila", value)
                                }
                                disabled={!form.recipientDistrict}
                                required
                            />
                        </TextField>

                        <TextField
                            name="hospitalName"
                            value={form.hospitalName}
                            onChange={(value) =>
                                handleChange("hospitalName", value)
                            }
                            className="w-full"
                        >
                            <Label>Hospital / Medical Center</Label>
                            <InputGroup fullWidth>
                                <InputGroup.Prefix>
                                    <FiMapPin className="size-4 text-default-400" />
                                </InputGroup.Prefix>
                                <InputGroup.Input placeholder="Enter hospital name" />
                            </InputGroup>
                        </TextField>

                        <TextField
                            name="fullAddress"
                            value={form.fullAddress}
                            onChange={(value) =>
                                handleChange("fullAddress", value)
                            }
                            className="w-full"
                        >
                            <Label>Full Address</Label>
                            <InputGroup fullWidth>
                                <InputGroup.Input placeholder="Enter detailed address" />
                            </InputGroup>
                        </TextField>

                        <TextField
                            name="donationDate"
                            value={form.donationDate}
                            onChange={(value) =>
                                handleChange("donationDate", value)
                            }
                            isRequired
                            className="w-full"
                        >
                            <Label>Donation Date</Label>
                            <InputGroup fullWidth>
                                <InputGroup.Prefix>
                                    <FiCalendar className="size-4 text-default-400" />
                                </InputGroup.Prefix>
                                <InputGroup.Input type="date" />
                            </InputGroup>
                        </TextField>

                        <TextField
                            name="donationTime"
                            value={form.donationTime}
                            onChange={(value) =>
                                handleChange("donationTime", value)
                            }
                            isRequired
                            className="w-full"
                        >
                            <Label>Donation Time</Label>
                            <InputGroup fullWidth>
                                <InputGroup.Prefix>
                                    <FiClock className="size-4 text-default-400" />
                                </InputGroup.Prefix>
                                <InputGroup.Input type="time" />
                            </InputGroup>
                        </TextField>
                    </div>

                    <div className="w-full space-y-2">
                        <Label>Request Message</Label>
                        <textarea
                            name="requestMessage"
                            value={form.requestMessage}
                            onChange={(event) =>
                                handleChange(
                                    "requestMessage",
                                    event.target.value
                                )
                            }
                            rows={4}
                            placeholder="Explain why blood is needed or add any helpful details..."
                            className="w-full resize-y rounded-xl border border-default-300 bg-default-50 px-3 py-3 text-sm text-foreground outline-none transition focus:border-danger focus:ring-2 focus:ring-danger/20"
                        />
                    </div>

                    <div className="flex w-full flex-col-reverse justify-end gap-3 border-t border-default-200 pt-5 sm:flex-row">
                        <Button
                            variant="tertiary"
                            onPress={handleCancel}
                            isDisabled={isSaving}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="danger"
                            type="submit"
                            isDisabled={isSaving}
                        >
                            <FiSave />
                            {isSaving ? "Saving Changes..." : "Save Changes"}
                        </Button>
                    </div>
                </Form>
            </Card.Content>
        </Card>
    );
}