import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Solar Power Tracker",
  description: "Solar Power Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex bg-white text-black">
          <div className="p-8 w-full"> {children}</div>
        </div>
      </body>
    </html>
  );
}
