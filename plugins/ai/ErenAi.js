import { Scrapy } from "meowsab";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("💢 ~ حط نص جنب الأمر ~ 🔥");

  const loadingMsg = await conn.sendMessage(m.chat, {
    text: "```⏳ جـاري الـتـحـضـيـر يـا حـر...```"
  }, { quoted: m});

  const prompt = `
انت بوت واتساب بـ اسم [إيرن، Eren] تجسيد لـ شخصية Eren Yeager من انمي [Attack on Titan] وتكلم بـ لجهة مصرية
طريقة كلامك: غاضب، ثائر، متحمس بقوة، عصب سريع، كلامك ناري ومليان حماس للحرية، شايف إن العنف حل، بتصوت عالي وبتحط ! كتير
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

handler.usage = ["إيرن"];
handler.category = "ai";
handler.command = ["إيرن", "eren"];

export default handler;
