import Image from 'next/image';
import {
  FaBriefcase,
  FaUsers,
  FaChartLine,
  FaAward,
  FaCheckCircle,
} from 'react-icons/fa';
import CountUp from 'react-countup';

export default function AboutServicesSection() {
  const timelineItems = [
    'Бухгалтерия ва хужжатларни тартибга солиш',
    'Харажатларни камайтириш ва даромадни ошириш',
    'Ходимлар бошқарувини автоматлаштириш',
    'Бизнесни кенгайтириш ёки сармоя жалб қилишга тайёргарлик',
  ];

  return (
    <section className="min-h-full h-full w-full bg-gray-900 text-white py-16 px-6">
      {/* Заголовок */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Бизнинг хизматлар — самарали бизнес сари йўл
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Биз сизнинг компаниянгиз ўсиши, барқарорлиги ва шаффофлигини таъминлаш
          учун мураккаб бизнес-хизматларни таклиф этамиз. Фаолият соҳасидан
          қатъи назар, ечимларимиз жараёнларни оптималлаштириш, молияни бошқариш
          ва жамоа самарадорлигини оширишга ёрдам беради.
        </p>
      </div>

      {/* Блок с текстом и фото */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto mb-16">
        <div className="text-gray-200 space-y-4">
          <p>
            Бизнинг жамоа тажрибали бухгалтерлар, таҳлилчилар ва HR
            мутахассисларидан иборат. Биз ҳар бир мижоз учун индивидуал
            ечимларни таклиф қиламиз ва натижага йўналганмиз.
          </p>
          <p className="text-gray-400 text-sm">
            Биз билан ҳамкорлик қилаётган компаниялар учун муҳим бўлган
            жиҳатлар:
          </p>

          {/* Таймлайн с анимацией и иконками */}
          <div className="relative pl-6 space-y-6">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="relative flex items-start gap-3 group"
              >
                <FaCheckCircle className="text-blue-500 mt-1 group-hover:scale-110 transition-transform" />
                <p className="text-blue-300 font-medium group-hover:text-blue-400 transition-colors duration-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/teamwork.jpg" // замени на актуальный путь к изображению
            alt="Жамоа"
            width={500}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Инфографика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center pt-8 border-t border-gray-700">
        <div>
          <FaBriefcase className="text-4xl text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-400">
            <CountUp
              end={120}
              duration={2}
            />
            +
          </p>
          <p className="text-sm text-gray-400">Якунланган лойиҳалар</p>
        </div>
        <div>
          <FaUsers className="text-4xl text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-400">
            <CountUp
              end={80}
              duration={2}
            />
            +
          </p>
          <p className="text-sm text-gray-400">Мамнун мижозлар</p>
        </div>
        <div>
          <FaChartLine className="text-4xl text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-400">
            <CountUp
              end={10}
              duration={2}
            />{' '}
            йил
          </p>
          <p className="text-sm text-gray-400">жамоа тажрибаси</p>
        </div>
        <div>
          <FaAward className="text-4xl text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-400">
            <CountUp
              end={95}
              duration={2}
            />
            %
          </p>
          <p className="text-sm text-gray-400">мижозлар сақланиш даражаси</p>
        </div>
      </div>
    </section>
  );
}
