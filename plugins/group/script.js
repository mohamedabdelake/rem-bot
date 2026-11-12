let handler = async (m, {
    conn,
    bot
}) => {
await conn.sendButton(m.chat, {
  bodyText: `
🎬 *الـسـكـربـت*
Video: _*https://youtu.be/hA5aCpvesJE?si=pHAEsbDFTVXe2_sq*_

> *لا تنسي وضع نجمة لـ الريبو 🌟*`,
  footerText: bot?.config?.info?.nameBot || 'rem bot',
  buttons: [
    { name: "cta_url", params: { display_text: "🎬 ╎ الـفـيـديـو", url: "https://youtu.be/hA5aCpvesJE?si=pHAEsbDFTVXe2_sq" } },
    { name: "quick_reply", params: { display_text: "📋 قـائـمـة الاوامـر", id: ".الاوامر" } }
  ],
  mentions: [m.sender],
  interactiveConfig: { buttons_limits: 10, list_title: "script", button_title: "اضغط هنا", canonical_url: "https://github.com/mohamedabdelake/rem-bot" }
}, { quoted: m });
}
handler.usage = ["سكريبت"];
handler.category = "group";
handler.command = ["سكريبت", "سورس", "sc"];

export default handler;