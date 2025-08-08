import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Fonts are loaded via next/font in _app.js to reduce CLS and blocking CSS */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 