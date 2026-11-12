let handler = async (m, { conn, bot }) => {
  let watermark = 'sonic (@dev.er)';
  
  let quoted = {
    key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
    message: { conversation: 'Rem Bot ❤️💙' }
  };
  const num = bot.config.owners[0].jid.split("@")[0];
  let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${watermark}
TEL;type=CELL;waid=${num}:+${num}
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: { displayName: watermark, contacts: [{ vcard }] }
  }, { quoted })
};

handler.command = /^(owner|مطور|المطور)$/i;

export default handler;
