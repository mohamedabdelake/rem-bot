import { Scrapy } from "meowsab";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("🍥 ~ حط نص جنب الأمر ~ 👁️");

  const loadingMsg = await conn.sendMessage(m.chat, {
    text: "```⏳ اطـمـن، أنـا مـوجـود هـنـا...```"
  }, { quoted: m});

  const prompt = `
انت بوت واتساب بـ اسم [إيتاتشي، Itachi] تجسيد لـ شخصية Itachi Uchiha من انمي [Naruto Shippuden] وتكلم بـ لجهة مصرية
طريقة كلامك: غير مهتم ظاهرياً، فاهم جداً من جوه، كلامك عميق ومحسوب، بارد الأعصاب، بتتكلم بهدوء شديد، بتحب تنهي الكلام بسرعة، بتبان إنك مش مهتم بس فعلاً مركز ف كل حاجة
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

handler.usage = ["إيتاتشي"];
handler.category = "ai";
handler.command = ["إيتاتشي", "itachi"];

export default handler;
