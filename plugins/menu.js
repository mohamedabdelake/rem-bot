const PAGE_SIZE = 6;

const CATEGORIES = [
  { key: 'downloads', name: 'التحميل', emoji: '📂' },
  { key: 'group', name: 'المجموعات', emoji: '🐞' },
  { key: 'sticker', name: 'الملصقات', emoji: '🌄' },
  { key: 'owner', name: 'المطورين', emoji: '👑' },
  { key: 'example', name: 'أمثلة', emoji: '✳️' },
  { key: 'tools', name: 'الأدوات', emoji: '🚀' },
  { key: 'search', name: 'البحث', emoji: '🌐' },
  { key: 'admin', name: 'الأدمن', emoji: '🛡️' },
  { key: 'games', name: 'الألعاب', emoji: '🎮' },
  { key: 'gif', name: 'الجيف', emoji: '✴️' },
  { key: 'bank', name: 'البنك', emoji: '💰' },
  { key: 'ai', name: 'الذكاء الاصطناعي', emoji: '🤖' },
  { key: 'sub', name: 'البوتات الفرعية', emoji: '🧩' },
  { key: 'info', name: 'معلومات البوت', emoji: '🗃️' },
  { key: 'nicknames', name: 'الألقاب', emoji: '🏷️' },
  { key: 'logos', name: 'اللوجوهات', emoji: '🎡' },
  { key: 'voices', name: 'الأصوات', emoji: '📢' },
  { key: 'other', name: 'أخرى', emoji: '🌹' }
];

const pref = (bot) => {
  const p = bot?.config?.prefix;
  return (Array.isArray(p) ? p[0] : p) || '.';
};

const botName = (bot) => bot?.config?.info?.nameBot || 'rem bot';

const uptime = () => {
  const s = Math.floor(process.uptime());
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${sec}`;
};

const clock = () => new Date().toLocaleString('ar-EG', { dateStyle: 'full', timeStyle: 'short' });

const findCategory = (input) => {
  if (!input) return null;
  const raw = String(input).trim();
  return CATEGORIES.find(c => c.key === raw.toLowerCase())
    || CATEGORIES.find(c => c.name === raw)
    || null;
};

const interactiveConfig = {
  buttons_limits: 10,
  list_title: 'الأقسام',
  button_title: 'اضغط هنا',
  canonical_url: 'https://github.com/mohamedabdelake/rem-bot'
};

const showCategory = async (m, { conn, bot, cat, cmds }) => {
  const p = pref(bot);
  const list = cmds.filter(c => (c.category || 'other') === cat.key && c.usage?.length);

  const body = list.length
    ? `╭─┈─┈─┈─⟞${cat.emoji}⟝─┈─┈─┈─╮
┃ *قـسـم ${cat.name}*
┃ *الـعـدد:* ${list.length} أمر
╰─┈─┈─┈─⟞${cat.emoji}⟝─┈─┈─┈─╯

${list.map(c => `┃ ${cat.emoji} ${p}${c.usage[0]}`).join('\n')}

╭─┈─┈─┈─⟞${cat.emoji}⟝─┈─┈─┈─╮
┃ *⌯︙ ${botName(bot)}*
╰─┈─┈─┈─⟞${cat.emoji}⟝─┈─┈─┈─╯`
    : `╭─┈─┈─┈─⟞${cat.emoji}⟝─┈─┈─┈─╮
┃ *قـسـم ${cat.name}*
┃ القسم فاضي دلوقتي
╰─┈─┈─┈─⟞${cat.emoji}⟝─┈─┈─┈─╯`;

  await conn.sendButton(m.chat, {
    bodyText: body,
    footerText: botName(bot),
    buttons: [
      { name: 'quick_reply', params: { display_text: '🔙 رجوع للأقسام', id: `${p}الاوامر` } },
      { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر الكاملة', id: `${p}المهام` } }
    ],
    mentions: [m.sender],
    interactiveConfig
  }, { quoted: m });
};

const handler = async (m, { conn, bot, args }) => {
  const p = pref(bot);
  const cmds = await bot.getAllCommands();
  const first = (args || [])[0];

  const cat = findCategory(first);
  if (cat) return await showCategory(m, { conn, bot, cat, cmds });

  const pages = Math.ceil(CATEGORIES.length / PAGE_SIZE);
  const asked = parseInt(first);
  let page = Number.isFinite(asked) && asked > 0 ? asked - 1 : 0;
  if (page >= pages) page = 0;

  const slice = CATEGORIES.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const rows = slice.map(c => ({
    title: `${c.emoji} ${c.name}`,
    description: `أوامر قسم ${c.name}`,
    id: `${p}الاوامر ${c.key}`
  }));
  const next = page + 2 > pages ? 1 : page + 2;

  const body = `╭─┈─┈─┈─⟞🎪⟝─┈─┈─┈─╮
┃ 🤖 *${botName(bot)}*
┃ 👤 @${m.sender.split('@')[0]}
┃ ⏱ *الـتـشـغـيـل:* ${uptime()}
┃ 📅 *الـتـاريـخ:* ${clock()}
╰─┈─┈─┈─⟞🎪⟝─┈─┈─┈─╯

*الأقـسـام كـلـهـا ${CATEGORIES.length}* 👇
${CATEGORIES.map(c => `${c.emoji} ${c.name}`).join('  ·  ')}

> *مفيش أرقام — كل حاجة بالأزرار 🔘*`;

  await conn.sendButton(m.chat, {
    bodyText: body,
    footerText: botName(bot),
    buttons: [
      {
        name: 'single_select',
        params: {
          title: '📚 اختار قسم',
          sections: [{ title: `الأقسام ${page + 1}/${pages}`, rows }]
        }
      },
      { name: 'quick_reply', params: { display_text: '➕ أقسام أخرى', id: `${p}الاوامر ${next}` } },
      { name: 'quick_reply', params: { display_text: '🔎 ابحث عن أمر', id: `${p}ابحث` } }
    ],
    mentions: [m.sender],
    interactiveConfig
  }, { quoted: m });
};

handler.command = ['الاوامر', 'القائمة', 'menu', 'اوامر'];
handler.usage = ['الاوامر'];
export default handler;
