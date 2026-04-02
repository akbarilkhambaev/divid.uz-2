import Layout from '../components/Layout';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          Divid.uz — Konsalting, Moliya, Buxgalteriya, HR xizmatlari
        </title>
        <meta
          name="description"
          content="Divid.uz — Konsalting, moliya, buxgalteriya va HR xizmatlari. Biznesingiz uchun professional maslahat, moliyaviy tahlil, kadrlar boshqaruvi va buxgalteriya xizmatlari."
        />
        <meta
          property="og:title"
          content="Divid.uz — Konsalting, Moliya, Buxgalteriya, HR xizmatlari"
        />
        <meta
          property="og:description"
          content="Konsalting, moliya, buxgalteriya va HR xizmatlari. Biznes uchun professional yechimlar va maslahatlar."
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:url"
          content="https://divid.uz/"
        />
        <meta
          property="og:image"
          content="/logo.png"
        />
        <meta
          name="robots"
          content="index, follow"
        />
      </Head>
      <Layout />
    </>
  );
}
