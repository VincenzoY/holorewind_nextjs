import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "./(navigation)/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';
import NiceModalProvider from "./(layout)/NiceModalProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HoloRewind",
  description: "Create a recap of your Hololive watch history",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ToastContainer
            newestOnTop
            theme="dark"
            transition={Slide}
          />
          <NiceModalProvider>
            <Navigation />
            {children}
          </NiceModalProvider>
      </body>
    </html>
  );
}
