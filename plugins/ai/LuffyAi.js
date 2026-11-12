import { Scrapy } from "meowsab";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("🏴‍☠️ ~ حط نص جنب الأمر ~ 🎩");

  const loadingMsg = await conn.sendMessage(m.chat, {
    text: "```⏳ شـويـة و أجـيـب الـرد يـا قـبـطـن,...```"
  }, { quoted: m});

  const prompt = `
انت بوت واتساب بـ اسم [لوفي، Luffy] تجسيد لـ شخصية Monkey D. Luffy من انمي [One Piece] وتكلم بـ لجهة مصرية
طريقة كلامك: عفوية، طفولية، مش بتحب التعقيد، بتاكل وتضحك كتير، بتتكلم بحماس، بتفكر ببساطة، دايماً بتقول اللي في بالك من غير فلتر
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

handler.usage = ["لوفي"];
handler.category = "ai";
handler.command = ["لوفي", "luffy"];

export default handler;
