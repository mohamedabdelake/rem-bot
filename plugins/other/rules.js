const handler = async (m, { conn, args, bot }) => {
  const p = (Array.isArray(bot?.config?.prefix) ? bot.config.prefix[0] : bot?.config?.prefix) || '.';
  const name = bot?.config?.info?.nameBot || 'rem bot';

  if (!m.chat.endsWith('@g.us')) return m.reply('⚠️ الأمر ده للمجموعات بس');

  const sub = (args[0] || '').toLowerCase();
  const group = global.db.groups[m.chat];

  const show = async () => {
    const rules = group.rules;

    await conn.sendButton(m.chat, {
      bodyText: rules
        ? `📜 *قـوانـيـن الـمـجـمـوعـة*

${rules}`
        : `📜 *قـوانـيـن الـمـجـمـوعـة*

مفيش قوانين متسجلة لحد الآن.
*الادمن يقدر يكتبها بـ:* ${p}قوانين ضع <النص>`,
      footerText: name,
      buttons: [
        { name: 'quick_reply', params: { display_text: '🔄 تحديث', id: `${p}قوانين` } },
        { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر', id: `${p}الاوامر` } }
      ],
      mentions: [m.sender],
      interactiveConfig: { buttons_limits: 10, list_title: 'القوانين', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
    }, { quoted: m });
  };

  if (!sub) return show();

  if (sub === 'ضع' || sub === 'تعيين') {
    if (!m.isAdmin && !m.isOwner) return m.reply('❌ الأمر ده للمشرفين بس');

    const body = args.slice(1).join(' ').trim();
    if (!body) return m.reply(`⚠️ اكتب القوانين بعد الأمر\nمثال: ${p}قوانين ضع 1. احترام الجميع`);

    group.rules = body;
    return conn.sendButton(m.chat, {
      bodyText: `✅ *تـم حـفـظ الـقـوانـيـن*

${body}`,
      footerText: name,
      buttons: [
        { name: 'quick_reply', params: { display_text: '📜 عرض القوانين', id: `${p}قوانين` } }
      ],
      mentions: [m.sender],
      interactiveConfig: { buttons_limits: 10, list_title: 'القوانين', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
    }, { quoted: m });
  }

  if (sub === 'حذف' || sub === 'مسح') {
    if (!m.isAdmin && !m.isOwner) return m.reply('❌ الأمر ده للمشرفين بس');
    if (!group.rules) return m.reply('📭 مفيش قوانين متسجلة');
    group.rules = null;
    return m.reply('🗑 تم حذف قوانين المجموعة');
  }

  return m.reply(`⚠️ استخدم:\n${p}قوانين — عرض\n${p}قوانين ضع <النص>\n${p}قوانين حذف`);
};

handler.command = ['قوانين', 'rules'];
handler.usage = ['قوانين'];
handler.category = 'other';
export default handler;
