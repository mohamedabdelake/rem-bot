const example = async (m, { conn }) => {

await conn.sendCarousel(m.chat, {
  headerText: '🎴 كـروت نـصـيـة',
  globalFooterText: 'اسحب لجانب عشان تشوف الباقي ←',
  cards: [
    {
      bodyText: '*الـكـرت الأول*',
      footerText: '🌸 نص + ازرار بس',
      buttons: [
        { name: 'quick_reply', params: { display_text: '👍 Like', id: 'like1' } },
        { name: 'cta_url', params: { display_text: '🔗 الريبو', url: 'https://github.com/mohamedabdelake/rem-bot' } }
      ]
    },
    {
      bodyText: '*الـكـرت الـتـانـي*',
      footerText: '✨ من غير صور نهائي',
      buttons: [
        { name: 'quick_reply', params: { display_text: '❤️ Love', id: 'love2' } },
        { name: 'cta_copy', params: { display_text: '📋 Copy', copy_code: 'rem bot' } }
      ]
    },
    {
      bodyText: '*الـكـرت الـتـالـت*',
      footerText: '📚 قائمة أقسام',
      buttons: [
        { name: 'quick_reply', params: { display_text: '📚 الأقسام', id: '.الاوامر' } }
      ]
    },
    {
      bodyText: '*الـكـرت الـرابـع*',
      footerText: '🎨 قائمة اختيار',
      buttons: [
        {
          name: 'single_select',
          params: {
            title: '📁 اختار',
            sections: [{
              title: 'Choose action',
              rows: [
                { title: '📂 التحميل', id: '.الاوامر downloads' },
                { title: '🎮 الألعاب', id: '.الاوامر games' },
                { title: '🆕 أخرى', id: '.الاوامر other' }
              ]
            }]
          }
        }
      ]
    }
  ],
  mentions: [m.sender],
}, m)

};
example.usage = ["تست4"]
example.category = "example";
example.command = ["تست4"]
export default example;
