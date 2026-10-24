// src/app/Providers.jsx
"use client";

import { Toast } from "@heroui/react";

export function Providers({ children }) {
    return (
        <>
            {children}
            <Toast.Provider placement="top-end" />
        </>
    );
}