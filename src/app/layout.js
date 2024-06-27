import { Inter } from "next/font/google";
import "./globals.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import "primereact/resources/primereact.min.css";
import NextAuthSessionProvider from "@/utils/sessionProvider";
import { PrimeReactProvider } from 'primereact/api';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <PrimeReactProvider>
          <body className={inter.className}>{children}</body>
        </PrimeReactProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
