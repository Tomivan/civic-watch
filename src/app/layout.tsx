import type { Metadata } from "next";
import { AuthProvider } from './components/AuthProvider';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "CivicWatch",
  description: "Lagos State Civic Reporting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}