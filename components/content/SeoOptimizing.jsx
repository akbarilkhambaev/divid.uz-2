'use client';

import Marquee from 'react-fast-marquee';

export default function SeoOptimizing() {
  const sections = [
    {
      id: 1,
      title: 'Аудит ва таҳлил хизматлари',
    },
    {
      id: 2,
      title: 'Молиявий консалтинг ва бошқарув',
    },
    {
      id: 3,
      title: 'HR ва кадрлар билан ишлаш',
    },
  ];

  return (
    <div className=" h-10 flex px-4 py-2 justify-between bg-gray text-gray-950 items-center border-b border-gray-200">
      <Marquee
        speed={60}
        gradient={true}
      >
        {sections.map((sect) => (
          <div
            className="p-2 m-1 tracking-normal text-6xl font-black rounded bg-gray-200 uppercase flex gap-5"
            key={sect.id}
          >
            #{sect.title}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
