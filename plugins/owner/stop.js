const test = async (m, { conn, bot }) => {
  m.react("🟢")
  
  conn.sendMessage(m.chat, { text: "♡゙ Stop the bot..." });
  
  setTimeout(() => {
    bot.stop();
  }, 1000); 
};

test.category = "owner";
test.command = ["ايقاف", "stop"];
test.owner = true;
export default test;