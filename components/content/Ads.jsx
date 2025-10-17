export default function Ads() {
  return (
    <section className="min-h-full h-full bg-gradient-to-r from-cs-blue via-gray-950 to-gray-900 py-12 text-white flex justify-between items-center">
      <div className="w-1/2 px-4">
        <h2 className="text-4xl font-bold mb-4">
          БИЗ БИЛАН ХАМКОРЛИК КИЛИШГА ТАЁРМИСИЗ?
        </h2>
        <p className="mb-6 text-2xl uppercase">
          Консультацияга ёзилинг — биз сизга бизнес мақсадларингизга эришишда
          ёрдам берамиз.
        </p>
      </div>
      <div className="w-1/2 px-4 uppercase">
        <form className="bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">
            БИЗ БИЛАН <span className="text-cs-blue"> БОГЛАНИНГ</span>
          </h3>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
            >
              Исмингиз
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
              placeholder="Исмингизни киритинг"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tel"
              className="block text-sm font-medium mb-2"
            >
              Телефон ракамингиз
            </label>
            <input
              type="tel"
              id="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
              placeholder="+998 __ ___ __ __"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-sm font-medium mb-2"
            >
              Мавзу
            </label>
            <select
              id="topic"
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
            >
              <option value="audit">АУДИТ ВА ТАХЛИЛ ХИЗМАТЛАРИ</option>
              <option value="finance">МОЛИЯВИЙ КОНСАЛТИНГ</option>
              <option value="hr">HR ВА КАДРЛАР БИЛАН ИШЛАШ</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2"
            >
              Хабарингиз
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
              placeholder="Хабарингизни ёзинг"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-cs-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-950 transition duration-300"
          >
            Юбориш
          </button>
        </form>
      </div>
    </section>
  );
}
