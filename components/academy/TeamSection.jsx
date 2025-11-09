'use client';

import { motion } from 'framer-motion';

export default function TeamSection() {
  const teamMembers = [
    {
      name: 'Муҳаммад Бобур Абдураҳимов',
      role: 'Lecturer',
      hasPhoto: true,
      photoPath: '/academy/team/bobur.avif',
      bio: 'Муҳаммад Бобур Абдураҳимов — 8 йиллик тажрибага эга корпоратив молия експерти. Big 4 консултанти ва йирик компанияларда CFO лавозимларида ишлаган, 30+ бизнесда самарали молиявий бошқарув тизимларини шакллантирган.',
    },
    {
      name: 'Акмал Тураев',
      role: 'Ментор асистенти',
      hasPhoto: false,
      photoPath: '/academy/team/akmal.avif',
    },
    {
      name: 'Мирали Толибов',
      role: 'Ментор',
      hasPhoto: false,
      photoPath: '/academy/team/mirali.avif',
    },
    {
      name: 'Азиз Толибов',
      role: 'Ментор асистенти',
      hasPhoto: false,
      photoPath: '/academy/team/aziz.avif',
    },
  ];

  return (
    <section
      id="team"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-white/10 text-6xl md:text-8xl font-bold">
        10
      </div>
      <div className="max-w-7xl w-full text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 text-center uppercase"
        >
          Курснинг менторлари ва экспертлари
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-white/10 backdrop-blur-lg p-6 rounded-2xl border-2 border-white/20 hover:border-cs-blue hover:bg-white/15 transition-all duration-500 cursor-pointer"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-4 overflow-hidden">
                {member.hasPhoto && member.photoPath ? (
                  <img
                    src={member.photoPath}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-white/30 grayscale group-hover:grayscale-0 transition-all duration-500">
                    👤
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase text-white grayscale group-hover:grayscale-0 transition-all duration-500">
                {member.name}
              </h3>
              <div className="inline-block bg-cs-blue/80 px-4 py-2 rounded-lg mb-3 grayscale group-hover:grayscale-0 transition-all duration-500">
                <p className="font-bold text-white text-sm uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
              {member.bio && (
                <p className="text-sm text-white/80 leading-relaxed grayscale group-hover:grayscale-0 transition-all duration-500">
                  {member.bio}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
