import { AuthProvider } from "./_context/AuthContext";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import Script from "next/script";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | InternHub",
    default: "Welcome | InternHub",
  },
  description: "InternHub project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen relative bg-gray-900 text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Script id="chatbase-embed" strategy="afterInteractive">
          {`
            window.embeddedChatbotConfig = {
              chatbotId: "X4GJ0auDjuNqRNvgc0vaj",
            };
            (function() {
              var s = document.createElement("script");
              s.src = "https://www.chatbase.co/embed.min.js";
              s.async = true;
              s.onload = function() {
                // Chatbot script loaded
              };
              document.body.appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
