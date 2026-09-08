import { getGlobalSettings } from "@/sanity/lib/content";
import { metadataFromSeo } from "@/sanity/lib/metadata";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();
  return {
    ...metadataFromSeo(settings.defaultSeo),
    verification: {
      google: "WIhNTCfusD6Da9HoXnTLZaeB_g9PsbOYCLYbDgvcDZg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://embed.tawk.to"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Script id="tawk-to-embed" strategy="beforeInteractive">
          {`
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function() {
              var s1 = document.createElement('script');
              var s0 = document.getElementsByTagName('script')[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/683ee4dd97f068190ff10270/1k0gotkq9';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
