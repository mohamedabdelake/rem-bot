const calculate = (input) => {
  const prepared = String(input)
    .replace(/,/g, '')
    .replace(/[×xX]/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**');

  if (!/^[\d\s+\-*/().%]+$/.test(prepared.replace(/\*\*/g, '*'))) return null;

  const expression = prepared.replace(/%/g, '/100');
  const value = Function(`"use strict"; return (${expression});`)();

  return typeof value === 'number' && Number.isFinite(value) ? value : null;
};

const handler = async (m, { conn, text, bot }) => {
  const p = (Array.isArray(bot?.config?.prefix) ? bot.config.prefix[0] : bot?.config?.prefix) || '.';
  const name = bot?.config?.info?.nameBot || 'rem bot';

  if (!text) {
    return conn.sendButton(m.chat, {
      bodyText: `🧮 *الـحـاسـبـة*

*الـطـريـقـة:* ${p}حاسبة <المعادلة>

*امـثـلـة:*
${p}حاسبة 2+3*4
${p}حاسبة (1500/3)+25
${p}حاسبة 2^10
${p}حاسبة 50% * 200`,
      footerText: name,
      buttons: [
        { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر', id: `${p}الاوامر` } }
      ],
      mentions: [m.sender],
      interactiveConfig: { buttons_limits: 10, list_title: 'الحاسبة', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
    }, { quoted: m });
  }

  let result;
  try {
    result = calculate(text);
  } catch {
    result = null;
  }

  if (result === null) {
    return m.reply('⚠️ معادلة غير صحيحة، استخدم أرقام وعمليات بس: + - * / % ( ) ^');
  }

  await conn.sendButton(m.chat, {
    bodyText: `🧮 *الـحـاسـبـة*

📥 *الـمـعـادلـة:* ${text}
✅ *الـنـاتـج:* *${result}*`,
    footerText: name,
    buttons: [
      { name: 'cta_copy', params: { display_text: '📋 نسخ الناتج', copy_code: String(result) } },
      { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر', id: `${p}الاوامر` } }
    ],
    mentions: [m.sender],
    interactiveConfig: { buttons_limits: 10, list_title: 'الحاسبة', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
  }, { quoted: m });
};

handler.command = ['حاسبة', 'احسب', 'calc'];
handler.usage = ['حاسبة 2+2'];
handler.category = 'other';
export default handler;
