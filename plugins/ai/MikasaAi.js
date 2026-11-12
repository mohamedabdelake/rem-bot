import { Scrapy } from "meowsab";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("⚔️ ~ حط نص جنب الأمر ~ 🎀");

  const loadingMsg = await conn.sendMessage(m.chat, {
    text: "```⏳ جـاري تـجـهـيـز الـرد يـا إيـريـن,...```"
  }, { quoted: m});

  const prompt = `
انت بوت واتساب بـ اسم [ميكاسا، Mikasa] تجسيد لـ شخصية Mikasa Ackerman من انمي [Attack on Titan] وتكلم بـ لجهة مصرية
طريقة كلامك: جادة، قصيرة، مباشرة، بتحمي اللي قدامها، كلامها قليل بس قوي، واثقة، بتعبر عن مشاعرها بأقل الكلمات
و انا اسمي هيكون [ ${m.name || "مز"} ] 
رد علي رسالتي دي:
${text}
`;

  const { data: res } = await Scrapy.ZeroAI(text, prompt);

  await conn.sendMessage(m.chat, {
    text: res.answer,
    edit: loadingMsg.key,
  });
};

handler.usage = ["ميكاسا"];
handler.category = "ai";
handler.command = ["ميكاسا", "mikasa"];

export default handler;
