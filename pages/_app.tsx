import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fikrah</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">Add Product</Link>
        </div>

        <img
          id="title"
          src="../public/logo.jpg"
          alt="Fikrah logo"
        ></img>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
