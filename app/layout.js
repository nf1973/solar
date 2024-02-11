import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Solar Power Tracker",
  description: "Solar Power Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex">
            <div className="w-full"> {children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
