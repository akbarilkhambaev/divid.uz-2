import { NextResponse } from 'next/server';

// Telegram Bot API
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, message, formType, service } = body;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured');
      return NextResponse.json(
        { success: false, error: 'Telegram not configured' },
        { status: 500 },
      );
    }

    // Формируем сообщение
    const formTypeLabels = {
      callback: '📞 Qayta qo‘ng‘iroq',
      contact: '📧 Aloqa shakli',
      academy_contact: '🎓 Akademiya - Aloqa',
      footer: '📋 Footer shakli',
      ads: '📢 Reklama arizasi',
      service: '🛠 Xizmat arizasi',
    };

    const typeLabel = formTypeLabels[formType] || '📝 Yangi ariza';

    let text = `${typeLabel}\n\n`;
    text += `👤 Ism: ${name || 'Ko‘rsatilmagan'}\n`;
    text += `📱 Telefon: ${phone || 'Ko‘rsatilmagan'}\n`;

    if (email) {
      text += `📧 Email: ${email}\n`;
    }

    if (service) {
      text += `🛠 Xizmat: ${service}\n`;
    }

    if (message) {
      text += `💬 Xabar: ${message}\n`;
    }

    text += `\n🕐 ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;

    // Telegramga yuborish
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error('Telegram API error:', result);
      return NextResponse.json(
        { success: false, error: 'Telegram API error' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
