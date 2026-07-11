import type { Metadata } from "next";
import { Nunito, DM_Sans } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmergencyBanner from "@/components/EmergencyBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import ThemeProvider from "@/components/ThemeProvider";
import SettingsProvider from "@/components/SettingsProvider";
import { getSettings } from "@/lib/db";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Osmani Dental Clinic Aid — Your Healthiest Smile Starts Here",
  description:
    "Professional dental clinic offering general dentistry, teeth whitening, orthodontics, dental implants, root canal, and pediatric dentistry.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme');
  const themeClass = themeCookie?.value === 'dark' ? 'dark' : '';

  let settings;
  try {
    settings = await getSettings();
  } catch {
    const { defaultSettings } = await import("@/lib/settings");
    settings = defaultSettings;
  }

  return (
    <html
      lang="en"
      className={`${nunito.variable} ${dmSans.variable} h-full antialiased ${themeClass}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SettingsProvider initial={settings}>
            <EmergencyBanner />
            <Navbar />
            <main className="flex-1 pt-0">{children}</main>
            <Footer />
            <WhatsAppButton />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
