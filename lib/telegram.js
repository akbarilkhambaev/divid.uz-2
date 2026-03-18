/**
 * Отправляет заявку в Telegram бот
 * @param {Object} data - Данные заявки
 * @param {string} data.name - Имя
 * @param {string} data.phone - Телефон
 * @param {string} [data.email] - Email
 * @param {string} [data.message] - Сообщение
 * @param {string} [data.formType] - Тип формы (callback, contact, academy_contact, footer, ads, service)
 * @param {string} [data.service] - Название услуги
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendToTelegram(data) {
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return { success: false, error: error.message };
  }
}
