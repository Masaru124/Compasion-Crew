import type { Metadata } from "next";
import { IBM_Plex_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-code",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://compassioncrew.in"),
  title: {
    default: "COMPASSION CREW | Learn, Connect, Contribute",
    template: "%s | COMPASSION CREW"
  },
  description: "COMPASSION CREW is a community-driven social impact organization. We empower students, professionals, and changemakers to learn, connect, and contribute through expert talks, networking, and volunteer initiatives.",
  keywords: [
    "social impact community",
    "community organization India",
    "volunteer opportunities Bangalore",
    "expert talks Bangalore",
    "networking for changemakers",
    "COMPASSION CREW",
    "Compassion Crew NGO",
    "learn connect contribute",
    "tax deductible donations 80G"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://compassioncrew.in",
    siteName: "COMPASSION CREW",
    title: "COMPASSION CREW | Learn, Connect, Contribute",
    description: "A community that empowers people to learn, connect, and contribute through expert talks, networking events, volunteering, and social campaigns.",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "COMPASSION CREW Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "COMPASSION CREW | Learn, Connect, Contribute",
    description: "A community that empowers people to learn, connect, and contribute.",
    images: ["/images/logo.png"],
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
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "COMPASSION CREW",
  "alternateName": ["Compassion Crew NGO", "COMPASSION CREW NGO"],
  "url": "https://compassioncrew.in",
  "logo": "https://compassioncrew.in/images/logo.png",
  "description": "A community-driven social impact organization empowering students, professionals, and changemakers to learn, connect, and contribute through expert talks, networking, and volunteer initiatives.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91 8884156247",
    "contactType": "customer service",
    "email": "contact@compassioncrew.in"
  },
  "sameAs": [
    "https://www.linkedin.com/company/compassion-crew",
    "https://twitter.com/compassioncrew"
  ]
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
      className={`${ibmPlexSans.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
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
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
