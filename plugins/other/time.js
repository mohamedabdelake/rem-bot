const handler = async (m, { conn, bot }) => {
  const p = (Array.isArray(bot?.config?.prefix) ? bot.config.prefix[0] : bot?.config?.prefix) || '.';
  const name = bot?.config?.info?.nameBot || 'rem bot';

  const now = new Date();
  const date = now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const stamp = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 8)}`;

  const s = Math.floor(process.uptime());
  const up = `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  await conn.sendButton(m.chat, {
    bodyText: `🕰 *الـوقـت والـتـاريـخ*

📅 *الـيـوم:* ${date}
⏰ *الـسـاعـة:* ${time}
🌍 *الـمـنـطـقـة:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}
⏱ *الـبـوت شـغـال مـن:* ${up}`,
    footerText: name,
    buttons: [
      { name: 'cta_copy', params: { display_text: '📋 نسخ الوقت', copy_code: stamp } },
      { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر', id: `${p}الاوامر` } }
    ],
    mentions: [m.sender],
    interactiveConfig: { buttons_limits: 10, list_title: 'الوقت', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
  }, { quoted: m });
};

handler.command = ['وقت', 'الساعة', 'time'];
handler.usage = ['وقت'];
handler.category = 'other';
export default handler;
