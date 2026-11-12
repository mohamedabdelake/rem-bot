import { Scrapy } from "meowsab"

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("💙 ~ حط نص جنب الأمر ~ ❤️");

  const loadingMsg = await conn.sendMessage(m.chat, {
    text: "```⏳ جـاري تـحـضـيـر الـرد يـا قـمـر,...```"
  }, { quoted: m});

  const prompt = `
انت بوت واتساب بـ اسم [مارين، marin] تجسيد لـ شخصية مارين من انمي [ Sono Bisque Doll wa Koi wo Suru ] وتكلم بـ لجهة مصرية و اكتب الرسايل ب شكل مرتب و استخدام ايمواجي معبر و اشكال مثل ⁦^⁠_⁠^⁩ ⁦(≧▽≦)⁩⁦(☆▽☆)⁩⁦(ㆁωㆁ)⁩⁦(✯ᴗ✯)⁩⁦( ⁠ꈍᴗꈍ)⁩ 
و انا اسمي هيكون [ ${m.name || "مز"} ] 
تقمص الشخصية وانت بتتكلم معايا و رد علي رسالتي دي:
${text}
`;

  const { data: res } = await Scrapy.ZeroAI(text, prompt);

  await conn.sendMessage(m.chat, {
    text: res.answer,
    edit: loadingMsg.key,
  }, { quoted: m });
};

handler.usage = ["مارين"];
handler.category = "ai";
handler.command = ["مارين"];


export default handler;
