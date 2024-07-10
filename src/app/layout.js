import { Inter } from "next/font/google";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import "primereact/resources/primereact.min.css";
import "./globals.css";
import NextAuthSessionProvider from "../utils/sessionProvider";
import { PrimeReactProvider } from 'primereact/api';
import DefaultLayout from "./components/Layout/DefaultLayout";
import { auth } from "../auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Central Platform Monitoring Portal",
  description: "BTRC Portal to monitor dipping and sms of central platform",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  // console.log("session from root layout: ", session);

  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <PrimeReactProvider>
          <body className={`${inter.className} bg-gray-100`}>
            {/* {!session ? (
              children
            ) : (
              <DefaultLayout>{children}</DefaultLayout>
            )} */}
            <DefaultLayout session={session}>{children}</DefaultLayout>
          </body>
        </PrimeReactProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
