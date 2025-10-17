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
  // ...existing code...

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
      <main>
        {components.map((Component, index) => {
          // Исключение для SeoOptimizing: без min-h-screen
          if (Component.type.name === 'SeoOptimizing') {
            return <section key={index}>{Component}</section>;
          }
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
              }}
            >
              <section>{Component}</section>
            </motion.div>
          );
        })}
        <CallBack />
      </main>
    </>
  );
}
