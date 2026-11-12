import menu from './menu.js';

const handler = (m, ctx) => menu(m, ctx);

handler.command = ['المهام', 'menu2'];
handler.usage = ['المهام'];
export default handler;
