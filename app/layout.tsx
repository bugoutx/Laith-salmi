import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ليث السالمي - محلل فني معتمد",
  description: "محلل فني في الأسواق المالية ومتاجر متخصص في سوق المعادن",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
