import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Books Manager</title>
        <meta name="robots" content="noindex" />
      </Head>
      <body style={{ padding: "16px" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
