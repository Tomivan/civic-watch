import type { Metadata } from "next";
import { AuthProvider } from './components/AuthProvider';
import OfflineBanner from './components/offlineBanner/offlineBanner.component';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#065f46" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}var l=localStorage.getItem('locale');if(l){document.documentElement.lang=l;}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <OfflineBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}