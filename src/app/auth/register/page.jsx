
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import {
    FiArrowRight,
    FiCheck,
    FiDroplet,
    FiHeart,
    FiLock,
    FiMail,
    FiUser,
} from "react-icons/fi";
import AvatarUpload from "@/app/components/forms/AvatarUpload";
import BloodGroupSelect from "@/app/components/forms/BloodGroupSelect";
import LocationSelect from "@/app/components/forms/LocationSelect";



const BENEFITS = [
    "Connect with people who need your blood type",
    "Help your local community during emergencies",
    "Manage your donor information in one place",
];

export default function RegisterPage() {
    const [avatar, setAvatar] = useState(null);
    const [district, setDistrict] = useState(null);
    const [upazila, setUpazila] = useState(null);
    const [bloodGroup, setBloodGroup] = useState("");

    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const password = formData.get("password");
        const confirmPassword = formData.get("confirm_password");

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        setPasswordError("");

        /*
         * These values should also be enforced
         * by your backend.
         */
        formData.set("role", "donor");
        formData.set("status", "active");

        /*
         * confirm_password is only used for
         * frontend validation.
         */
        formData.delete("confirm_password");

        if (avatar) {
            formData.set("avatar", avatar);
        }

        console.log(
            Object.fromEntries(formData.entries())
        );

        /*
         * TODO:
         *
         * 1. Upload avatar to ImageBB.
         * 2. Get ImageBB URL.
         * 3. Send registration data to backend.
         */
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* ========================================================= */}
                {/* Branding                                                   */}
                {/* ========================================================= */}

                <aside className="relative hidden overflow-hidden bg-danger lg:flex">
                    <div className="absolute -left-32 -top-32 size-96 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute -bottom-40 -right-20 size-[30rem] rounded-full bg-white/10 blur-3xl" />

                    <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">

                        {/* Logo */}
                        <Logo light />

                        {/* Content */}
                        <div className="max-w-lg">
                            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/15">
                                <FiDroplet className="size-7 text-white" />
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                                Become someone's{" "}
                                <span className="text-white/70">
                                    reason to hope.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-base leading-7 text-white/75">
                                Join RedReach and make yourself available
                                to people who may need your blood when it
                                matters most.
                            </p>

                            <div className="mt-8 space-y-4">
                                {BENEFITS.map((benefit) => (
                                    <div
                                        key={benefit}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                                            <FiCheck className="size-3.5 text-white" />
                                        </div>

                                        <span className="text-sm text-white/80">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-white/50">
                            Every drop can make a difference.
                        </p>
                    </div>
                </aside>

                {/* ========================================================= */}
                {/* Form                                                       */}
                {/* ========================================================= */}

                <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
                    <div className="w-full max-w-2xl">

                        {/* Mobile logo */}
                        <div className="mb-8 lg:hidden">
                            <Logo />
                        </div>

                        {/* Heading */}
                        <div className="mb-8">
                            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-danger">
                                <span className="size-1.5 rounded-full bg-danger" />
                                Join the community
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Create your donor account
                            </h2>

                            <Description className="mt-3 max-w-lg text-sm leading-6 sm:text-base">
                                Register as a donor and help connect
                                life-saving blood to people who need it.
                            </Description>
                        </div>

                        {/* ================================================= */}
                        {/* HeroUI v3 Form                                    */}
                        {/* ================================================= */}

                        <Form
                            className="w-full"
                            onSubmit={handleSubmit}
                        >
                            <Fieldset className="w-full">
                                <FieldGroup className="w-full gap-6">

                                    {/* Avatar */}
                                    <div className="rounded-2xl border border-separator bg-content1 p-4">
                                        <AvatarUpload
                                            value={avatar}
                                            onChange={setAvatar}
                                        />
                                    </div>

                                    {/* Full name */}
                                    <HorizontalField label="Full name">
                                        <TextField
                                            name="name"
                                            type="text"
                                            aria-label="Full name"
                                            isRequired
                                            validate={(value) => {
                                                if (
                                                    value.length < 3
                                                ) {
                                                    return "Name must be at least 3 characters.";
                                                }

                                                return null;
                                            }}
                                        >
                                            <Input
                                                placeholder="Your full name" className="text-black"
                                            />

                                            <FieldError />
                                        </TextField>
                                    </HorizontalField>

                                    {/* Email */}
                                    <HorizontalField label="Email address">
                                        <TextField
                                            name="email"
                                            type="email"
                                            aria-label="Email address"
                                            isRequired
                                        >
                                            <Input
                                                placeholder="you@example.com"
                                            />

                                            <FieldError />
                                        </TextField>
                                    </HorizontalField>

                                    {/* Blood group */}
                                    <HorizontalField label="Blood group">
                                        <BloodGroupSelect
                                            name="bloodGroup"
                                            value={bloodGroup}
                                            onChange={setBloodGroup}
                                            required
                                        />
                                    </HorizontalField>

                                    {/* District */}
                                    <HorizontalField label="District">
                                        <LocationSelect
                                            name="district"
                                            type="district"
                                            value={district}
                                            onChange={(value) => {
                                                setDistrict(value);

                                                // Reset upazila whenever
                                                // district changes.
                                                setUpazila(null);
                                            }}
                                            required
                                        />
                                    </HorizontalField>

                                    {/* Upazila */}
                                    <HorizontalField label="Upazila">
                                        <LocationSelect
                                            name="upazila"
                                            type="upazila"
                                            districtId={district}
                                            value={upazila}
                                            onChange={setUpazila}
                                            disabled={!district}
                                            required
                                        />
                                    </HorizontalField>

                                    {/* Password */}
                                    <HorizontalField label="Password">
                                        <TextField
                                            name="password"
                                            type="password"
                                            aria-label="Password"
                                            isRequired
                                            validate={(value) => {
                                                if (
                                                    value.length < 8
                                                ) {
                                                    return "Password must be at least 8 characters.";
                                                }

                                                return null;
                                            }}
                                        >
                                            <Input
                                                placeholder="Create a strong password"
                                            />

                                            <FieldError />
                                        </TextField>
                                    </HorizontalField>

                                    {/* Confirm password */}
                                    <HorizontalField label="Confirm password">
                                        <TextField
                                            name="confirm_password"
                                            type="password"
                                            aria-label="Confirm password"
                                            isRequired
                                        >
                                            <Input
                                                placeholder="Re-enter your password"
                                            />

                                            <FieldError />

                                            {passwordError && (
                                                <p className="text-sm text-danger">
                                                    {passwordError}
                                                </p>
                                            )}
                                        </TextField>
                                    </HorizontalField>

                                    {/* Hidden application values */}
                                    <input
                                        type="hidden"
                                        name="role"
                                        value="donor"
                                    />

                                    <input
                                        type="hidden"
                                        name="status"
                                        value="active"
                                    />

                                </FieldGroup>

                                {/* Submit */}
                                <Fieldset.Actions className="mt-8 w-full">
                                    <Button
                                        type="submit"
                                        className="h-12 w-full font-semibold shadow-lg shadow-danger/15"
                                    >
                                        Create donor account
                                        <FiArrowRight className="size-4" />
                                    </Button>
                                </Fieldset.Actions>

                                {/* Login */}
                                <p className="mt-4 text-center text-sm text-default-500">
                                    Already have an account?{" "}
                                    <Link
                                        href="/auth/login"
                                        className="font-semibold text-danger transition-colors hover:text-danger-600 hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </Fieldset>
                        </Form>
                    </div>
                </section>
            </div>
        </main>
    );
}

/* ========================================================================== */
/* Components                                                                 */
/* ========================================================================== */

function HorizontalField({ label, children }) {
    return (
        <div className="grid w-full grid-cols-1 items-start gap-2 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6">
            <Label className="pt-3 text-sm font-semibold text-foreground">
                {label}
            </Label>

            <div className="min-w-0">
                {children}
            </div>
        </div>
    );
}

function Logo({ light = false }) {
    return (
        <Link
            href="/"
            className={`flex w-fit items-center gap-2 ${light
                ? "text-white"
                : "text-foreground"
                }`}
        >
            <div
                className={`flex size-10 items-center justify-center rounded-xl ${light
                    ? "bg-white/15"
                    : "bg-danger text-white"
                    }`}
            >
                <FiHeart
                    className="size-5"
                    fill="currentColor"
                />
            </div>

            <span className="text-xl font-bold tracking-tight">
                Red
                <span
                    className={
                        light
                            ? "text-white/70"
                            : "text-danger"
                    }
                >
                    Reach
                </span>
            </span>
        </Link>
    );
}