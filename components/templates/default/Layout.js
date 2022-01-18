import Head from "next/head";
import CookieBanner from "./CookieBanner";
import Footer from "./Footer";
import Header from "./Header";
import Notice from "./Notice";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container">{children}</main>

      <Notice />

      <CookieBanner />

      <Footer />
    </>
  );
}
