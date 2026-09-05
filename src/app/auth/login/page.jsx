'use client'
import { Button, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FiArrowRight, FiHeart } from 'react-icons/fi';

const LoginPage = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        console.log(formData);
        redirect('/')
    }

    return (
        <div>
            <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
                <div className="bg-background px-8 py-10 rounded-2xl w-full max-w-lg">

                    {/* Mobile logo */}
                    <Link
                        href="/"
                        className="mb-8 flex w-fit items-center gap-2 text-foreground mx-auto"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger text-white">
                            <FiHeart
                                className="h-5 w-5"
                                fill="currentColor"
                            />
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            Red<span className="text-danger">Reach</span>
                        </span>
                    </Link>

                    <Form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label>Password</Label>
                            <Input placeholder="Enter your password" />
                            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                            <FieldError />
                        </TextField>

                        {/* Submit */}
                        <Button
                            type="submit"
                            color="danger"
                            radius="lg"
                            size="lg"
                            className="h-12 w-full font-semibold shadow-lg shadow-danger/15"
                            endContent={
                                <FiArrowRight className="h-4 w-4" />
                            }
                        >
                            Log In
                        </Button>

                        {/* Login */}
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