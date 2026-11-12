const h =  async (m, { text, bot, conn }) => {
    
    try {
        const customText = text || "ﷺ";
        
        if (!m.quoted) {
            return await conn.sendMessage(m.chat, { text: customText });
        }
        
        
        const groupMetadata = await conn.groupMetadata(m.chat);
        const participants = groupMetadata.participants.map(v => v.id);
        
        await conn.sendMessage(m.chat, { 
            forward: m.quoted.fakeObj(), 
            mentions: participants
        });
    } catch (err) {
        await m.reply(err.message);
    }
}

h.usage = ["مخفي"]
h.category = "admin";
h.command = ['مخفي', 'h']
h.group = true;
h.admin = true;
h.usePrefix = false

export default h;