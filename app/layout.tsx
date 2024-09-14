import type { Metadata } from "next";
import { inter } from "./ui/font";
import "./globals.css";

export const metadata: Metadata = {
    title: "To Do List",
    description: "To Do List Project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>{children}</body>
        </html>
    );
}
