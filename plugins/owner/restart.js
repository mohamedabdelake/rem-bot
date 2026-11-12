const test = async (m, { conn, bot }) => {
  m.react("🟢")
  
  conn.sendMessage(m.chat, { text: "♡゙ Bot is restarting..." });
  
  setTimeout(() => {
    bot.restart();
  }, 1000); 
};

test.usage = ["رستارت"]
test.category = "owner";
test.command = ["رستارت", "restart"];
test.owner = true;
export default test;