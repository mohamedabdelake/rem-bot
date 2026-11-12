const handler = async (m, { conn }) => {
  const start = process.hrtime.bigint();
  await conn.sendMessage(m.chat, { text: "🏓 msg test" });
  const end = process.hrtime.bigint();
  const ping = Number(end - start) / 1e6;
  
  await conn.sendMessage(m.chat, { text: `⚡ *سـرعـة الـبـوت:* ${ping.toFixed(2)}ms` }, { quoted: m });
};

handler.command = ["بنج", "ping"];
handler.category = "info";
handler.usage = ["بنج"];
export default handler;