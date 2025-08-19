import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://micaavigliano.com"),
  applicationName: "Mica Avigliano",
  creator: "Mica Avigliano",
  authors: [{ name: "Mica Avigliano", url: "https://micaavigliano.com" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true, follow: true,
  },
  openGraph: {
    siteName: "Mica Avigliano",
    type: "website",
  }
}
