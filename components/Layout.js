import Head from "next/head";

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.title} | E-Pok</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
      {/* props.children = komponen yang terbungkus */}
    </div>
  );
}
