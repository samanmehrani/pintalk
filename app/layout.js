import * as texts from '@/app/_text/common.js'

// import { vazirmatn } from "./fonts"
import ClientLayout from './layoutClient'

export const metadata = {
  title: texts.websiteTitle,
  description: texts.websiteDescription,
  keywords: texts.keywords.join(", "),
}

export const viewport = {
  width: "device-width",
  viewportFit: "cover",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content",
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-title" content={texts.websiteTitle} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
      // className={vazirmatn.variable}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}