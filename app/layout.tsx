import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./(navigation)/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';
import NiceModalProvider from "./(layout)/NiceModalProvider";
import { Roboto } from 'next/font/google';
import QueryClientContextProvider from "./(layout)/QueryClientProvider";
import Head from "next/head";
import Script from "next/script";

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
      <head>
        <Script defer src="https://umami.vyee.ca/script.js" data-website-id="190dafaa-709c-44d7-b496-34058bd061b5" />
      </head>
      <body
        className={`${roboto.className} antialiased`}
      >
        <QueryClientContextProvider>
          <ToastContainer
            newestOnTop
            theme="dark"
            transition={Slide}
          />
          <NiceModalProvider>
            <Navigation />
            {children}
          </NiceModalProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
