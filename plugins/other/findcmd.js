const handler = async (m, { conn, text, bot }) => {
  const p = (Array.isArray(bot?.config?.prefix) ? bot.config.prefix[0] : bot?.config?.prefix) || '.';
  const name = bot?.config?.info?.nameBot || 'rem bot';
  const query = String(text || '').trim().toLowerCase();

  if (!query) {
    return conn.sendButton(m.chat, {
      bodyText: `🔎 *الـبـحـث عـن أمـر*

*الـطـريـقـة:* ${p}ابحث <كلمة>

*امـثـلـة:*
${p}ابحث ملصق
${p}ابحث يوتيوب
${p}ابحث تذكير`,
      footerText: name,
      buttons: [
        { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر', id: `${p}الاوامر` } }
      ],
      mentions: [m.sender],
      interactiveConfig: { buttons_limits: 10, list_title: 'ابحث', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
    }, { quoted: m });
  }

  const cmds = await bot.getAllCommands();
  const hits = [];

  for (const c of cmds) {
    if (!c.usage?.length) continue;
    const haystack = [c.category || '', ...c.usage, ...(c.command || [])].join(' ').toLowerCase();
    if (haystack.includes(query)) hits.push(c);
    if (hits.length >= 25) break;
  }

  if (!hits.length) {
    return m.reply(`❌ مفيش أمر فيه *${query}*\n> جرب كلمة تانية أو افتح قائمة الأوامر بـ ${p}الاوامر`);
  }

  await conn.sendButton(m.chat, {
    bodyText: `🔎 *نـتـائـج الـبـحـث عـن:* ${query}

${hits.map(c => `┃ ${p}${c.usage[0]}`).join('\n')}

> *العدد:* ${hits.length} أمر`,
    footerText: name,
    buttons: [
      { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر', id: `${p}الاوامر` } }
    ],
    mentions: [m.sender],
    interactiveConfig: { buttons_limits: 10, list_title: 'ابحث', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
  }, { quoted: m });
};

handler.command = ['ابحث', 'بحث_الاوامر', 'find'];
handler.usage = ['ابحث <كلمة>'];
handler.category = 'other';
export default handler;
