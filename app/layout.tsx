import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "./(navigation)/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';
import NiceModalProvider from "./(layout)/NiceModalProvider";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],  // You can select weights
  subsets: ['latin'],       // Specify subsets if needed
});


export const metadata: Metadata = {
  title: "HoloRewind",
  description: "Create a recap of your Hololive watch history",
  metadataBase: new URL(process.env.NODE_ENV === "production" ? 'https://holorewind.com' : 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
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
