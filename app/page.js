import Layout from '../components/Layout';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Divid.uz — Консалтинг, Молия, Бухгалтерия, HR хизматлари</title>
        <meta
          name="description"
          content="Divid.uz — Консалтинг, молия, бухгалтерия ва HR хизматлари. Бизнесингиз учун профессионал маслаҳат, молиявий таҳлил, кадрлар бошқаруви ва бухгалтерия хизматлари."
        />
        <meta
          property="og:title"
          content="Divid.uz — Консалтинг, Молия, Бухгалтерия, HR хизматлари"
        />
        <meta
          property="og:description"
          content="Консалтинг, молия, бухгалтерия ва HR хизматлари. Бизнес учун профессионал ечимлар ва маслаҳатлар."
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
