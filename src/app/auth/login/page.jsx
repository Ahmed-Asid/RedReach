"use client";

import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { signIn } from "@/lib/auth-client";

const LoginPage = () => {
    const router = useRouter();

    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoginError("");
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();

        try {
            const { data, error } = await signIn.email({
                email,
                password,
            });

            if (error) {
                console.error("Login error:", error);

                setLoginError(
                    error.message || "Invalid email or password."
                );

                return;
            }

            console.log("Login successful:", data);

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Unexpected login error:", error);

            setLoginError(
                "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
                <div className="w-full max-w-lg rounded-2xl bg-background px-8 py-10">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="mx-auto mb-8 flex w-fit items-center gap-2 text-foreground"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger text-white">
                            <FiHeart
                                className="h-5 w-5"
                                fill="currentColor"
                            />
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            Red
                            <span className="text-danger">
                                Reach
                            </span>
                        </span>
                    </Link>

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome back
                        </h1>

                        <Description className="mt-2">
                            Sign in to manage your RedReach account.
                        </Description>
                    </div>

                    <Form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Email */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            aria-label="Email"
                            validate={(value) => {
                                if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        value
                                    )
                                ) {
                                    return "Please enter a valid email address";
                                }

                                return null;
                            }}
                        >
                            <Label>Email</Label>

                            <Input placeholder="john@example.com" />

                            <FieldError />
                        </TextField>

                        {/* Password */}
                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            aria-label="Password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }

                                return null;
                            }}
                        >
                            <Label>Password</Label>

                            <Input placeholder="Enter your password" />

                            <Description>
                                Must be at least 8 characters
                            </Description>

                            <FieldError />
                        </TextField>

                        {/* Login error */}
                        {loginError && (
                            <div
                                role="alert"
                                className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger"
                            >
                                {loginError}
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            isDisabled={isLoading}
                            className="h-12 w-full font-semibold shadow-lg shadow-danger/15"
                        >
                            {isLoading
                                ? "Signing in..."
                                : "Log In"}

                            {!isLoading && (
                                <FiArrowRight className="h-4 w-4" />
                            )}
                        </Button>

                        {/* Register */}
                        <p className="text-center text-sm text-default-500">
                            Don't have an account?{" "}
                            <Link
                                href="/auth/register"
                                className="font-semibold text-danger transition-colors hover:text-danger-600 hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </Form>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;