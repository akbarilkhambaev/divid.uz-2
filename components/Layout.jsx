'use client';

import { motion } from 'framer-motion';
import InfoSection from './content/InfoSection';
import ExampleWorksInfo from './content/ExampleWorksInfo';
import Services from './content/Services';
import Reviews from './content/Reviews';
import Previlegies from './content/Previlegies';
import Ads from './content/Ads';
import CallBack from './content/CallBack';
import SeoOptimizing from './content/SeoOptimizing';
import OurTeam from './content/OurTeam';
import FeedbackForm from './content/FeedbackForm';
import OurPartners from './content/OurPartners';
import NewsPage from './content/NewsPage';

export default function Layout() {
  const components = [
    <InfoSection key="info" />,
    <ExampleWorksInfo key="example" />,
    <OurTeam key="team" />,
    <SeoOptimizing key="seo" />,
    <Services key="services" />,
    <Ads key="ads" />,
    <Reviews key="reviews" />,
    <Previlegies key="previlegies" />,
    <OurPartners key="partners" />,
    <NewsPage key="news" />,
    <FeedbackForm key="form" />,
  ];

  return (
    <>
      <main className="space-y-16 relative">
        {components.map((Component, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: 'blur(10px)' }} // Начальное состояние
            whileInView={{ opacity: 1, filter: 'blur(0px)' }} // Анимация при попадании в область видимости
            viewport={{ once: true, amount: 0.2 }} // Анимация срабатывает один раз, когда 20% компонента видны
            transition={{
              duration: 0.8, // Длительность анимации
              delay: index * 0.1, // Задержка для каждого компонента
            }}
          >
            {Component}
          </motion.div>
        ))}
        <CallBack />
      </main>
    </>
  );
}
