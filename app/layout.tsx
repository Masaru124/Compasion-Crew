import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.compassioncrew.in"),
  title: {
    default: "COMPASSION CREW | Bangalore's Social Impact Community",
    template: "%s | COMPASSION CREW",
  },
  description: "COMPASSION CREW is Bangalore's leading social impact community. Join expert talks, volunteer drives, and networking events to learn, connect, and make a lasting difference.",
  keywords: [
    "social impact community Bangalore",
    "social impact Bangalore",
    "volunteer opportunities Bangalore",
    "expert talks Bangalore",
    "networking for changemakers India",
    "COMPASSION CREW",
    "Compassion Crew Community",
    "learn connect contribute",
    "community platform Bangalore",
    "community events Bangalore",
    "social awareness campaigns India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.compassioncrew.in",
    siteName: "COMPASSION CREW",
    title: "COMPASSION CREW | Bangalore's Social Impact Community",
    description: "Bangalore's social impact community. Join expert talks, volunteer drives, and networking events. Make a real difference.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "COMPASSION CREW — Bangalore's Social Impact Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "COMPASSION CREW | Bangalore's Social Impact Community",
    description:
      "Join expert talks, volunteer drives, and networking events. Make a real difference.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "iYQMnpxhs_xgJRd7PdomyRKrge7lw8LUp_1UjDPPmUs",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://www.compassioncrew.in",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "COMPASSION CREW",
  alternateName: ["Compassion Crew", "COMPASSION CREW"],
  url: "https://www.compassioncrew.in",
  logo: "https://www.compassioncrew.in/images/logo.png",
  description:
    "A community-driven social impact organization empowering students, professionals, and changemakers to learn, connect, and contribute through expert talks, networking, and volunteer initiatives.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 8884156247",
    contactType: "customer service",
    email: "compasioncrew@gmail.com",
  },
  sameAs: [
    "https://www.linkedin.com/company/compassion-crew",
    "https://twitter.com/compassioncrew",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FV5SE9TWGP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FV5SE9TWGP');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="px-4">
            <Navbar />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
