const example = async (m, { conn }) => {

await conn.sendButton(m.chat, {
  bodyText: `🎛 *مـثـال: ازرار عـده نـوعـيـات*

نفس الرسالة بتقدر تحتوي على اكتر من نوع زر في نفس الوقت.`,
  footerText: 'rem bot',
  buttons: [
    { name: 'quick_reply', params: { display_text: '⚡ رد سريع', id: 'demo_reply' } },
    { name: 'cta_url', params: { display_text: '🔗 الريبو', url: 'https://github.com/mohamedabdelake/rem-bot' } },
    { name: 'cta_copy', params: { display_text: '📋 كود', copy_code: 'rem-bot' } },
    {
      name: 'single_select',
      params: {
        title: '📚 اختار',
        sections: [{
          title: 'الأقسام',
          rows: [
            { title: '📂 التحميل', id: '.الاوامر downloads' },
            { title: '🎮 الألعاب', id: '.الاوامر games' }
          ]
        }]
      }
    }
  ],
  mentions: [m.sender],
  interactiveConfig: {
    buttons_limits: 10,
    list_title: 'rem bot',
    button_title: 'اضغط هنا',
    canonical_url: 'https://github.com/mohamedabdelake/rem-bot'
  }
}, m)

};

example.usage = ["تست7"]
example.category = "example";
example.command = ["تست7"]
export default example;
