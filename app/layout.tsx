import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--next-font-mono",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={cn(jetbrainsMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
