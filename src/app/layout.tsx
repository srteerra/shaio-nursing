import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Outfit, Cinzel } from 'next/font/google';
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Modal } from "@/components/Modal";

export const metadata: Metadata = {
  title: "Shaio Nurse",
  description: "Aplicación de prueba para Shaio Nurse",
};

const Outfit_F = Outfit({
  subsets: ['latin'],
  display: 'swap',
  //👇 Add variable to our object
  variable: '--font-Outfit',
})

const Cinzel_F = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-Cinzel',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${Outfit_F.variable} ${Cinzel_F.variable} font-sans`}>
      <body>
        <Navbar/>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <Modal />
      </body>
    </html>
  );
}
