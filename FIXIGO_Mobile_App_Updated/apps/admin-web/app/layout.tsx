import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "FIXIGO | Operations Console", description: "FIXIGO service operations and workforce management" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
