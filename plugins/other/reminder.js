const UNITS = {
  'ث': 1, 'ثانية': 1, 'ثواني': 1, 's': 1, 'sec': 1, 'secs': 1,
  'د': 60, 'دقيقة': 60, 'دقايق': 60, 'm': 60, 'min': 60, 'mins': 60,
  'س': 3600, 'ساعة': 3600, 'ساعات': 3600, 'h': 3600, 'hr': 3600,
  'ي': 86400, 'يوم': 86400, 'ايام': 86400, 'd': 86400, 'day': 86400
};

const human = (s) => {
  if (s >= 86400) return `${Math.round(s / 86400)} يوم`;
  if (s >= 3600) return `${Math.round(s / 3600)} ساعة`;
  if (s >= 60) return `${Math.round(s / 60)} دقيقة`;
  return `${s} ثانية`;
};

if (!global.reminders) global.reminders = new Map();

const handler = async (m, { conn, text, command, bot }) => {
  const p = (Array.isArray(bot?.config?.prefix) ? bot.config.prefix[0] : bot?.config?.prefix) || '.';
  const name = bot?.config?.info?.nameBot || 'rem bot';

  if (command === 'الغاء_تذكير') {
    const mine = [...global.reminders.entries()].filter(([, r]) => r.chat === m.chat && r.user === m.sender);
    if (!mine.length) return m.reply('❌ مفيش تذكيرات شغالة عندك');
    mine.forEach(([id, r]) => {
      clearTimeout(r.timer);
      global.reminders.delete(id);
    });
    return m.reply(`✅ تم إلغاء *${mine.length}* تذكير`);
  }

  const match = String(text || '').match(/^(\d+)\s*([^\s\d]*)\s*([\s\S]*)$/);

  if (!match) {
    return conn.sendButton(m.chat, {
      bodyText: `⏰ *نـظـام الـتـذكـيـر*

*الـطـريـقـة:* ${p}تذكير <مدة> <النص>
*الـمـدة:* ثانية / دقيقة / ساعة / يوم أو s / m / h / d

*امـثـلـة:*
${p}تذكير 10د اشرب ماية
${p}تذكير 2h اجتماع
${p}تذكير 1d تجديد الاشتراك`,
      footerText: name,
      buttons: [
        { name: 'quick_reply', params: { display_text: '❌ إلغاء تذكيراتي', id: `${p}الغاء_تذكير` } },
        { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر', id: `${p}الاوامر` } }
      ],
      mentions: [m.sender],
      interactiveConfig: { buttons_limits: 10, list_title: 'التذكير', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
    }, { quoted: m });
  }

  const amount = parseInt(match[1]);
  const unitKey = (match[2] || '').toLowerCase();
  const seconds = amount * (UNITS[unitKey] || (unitKey ? 0 : 60));
  const note = (match[3] || '').trim() || 'بدون نص';

  if (!Number.isFinite(seconds) || seconds < 5) {
    return m.reply('⚠️ اقل مدة هي 5 ثواني، واكتب وحدة صحيحة (ثانية / دقيقة / ساعة / يوم)');
  }
  if (seconds > 86400) return m.reply('⚠️ اقصى مدة هي 24 ساعة');

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const timer = setTimeout(async () => {
    global.reminders.delete(id);
    await conn.sendMessage(m.chat, {
      text: `⏰ *تـذكـيـر — ${name}*

📝 ${note}

> @${m.sender.split('@')[0]} حان الوقت`,
      mentions: [m.sender]
    });
  }, seconds * 1000);

  global.reminders.set(id, { chat: m.chat, user: m.sender, timer });

  await conn.sendButton(m.chat, {
    bodyText: `✅ *تـم ضـبـط الـتـذكـيـر*

⏳ *بـعـد:* ${human(seconds)}
📝 *الـنـص:* ${note}`,
    footerText: name,
    buttons: [
      { name: 'quick_reply', params: { display_text: '❌ إلغاء التذكير', id: `${p}الغاء_تذكير` } }
    ],
    mentions: [m.sender],
    interactiveConfig: { buttons_limits: 10, list_title: 'التذكير', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
  }, { quoted: m });
};

handler.command = ['تذكير', 'ذكرني', 'remind', 'الغاء_تذكير'];
handler.usage = ['تذكير 10د نص'];
handler.category = 'other';
export default handler;
