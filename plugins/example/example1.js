/* 
by: sonic (@dev.er)
*/

const example = async (m, { conn }) => {

await conn.sendButton(m.chat, {
  bodyText: `🔥 *مـثـال بـدون صـور*

كل رسالة في البوت بقت *نص + ايموجي + ازرار* بس.
مفيش صور ولا فيديوهات ولا ثامبنيل.

> جرب تضغط الأزرار تحت 👇`,
  footerText: 'rem bot',
  buttons: [
    { name: 'quick_reply', params: { display_text: '📋 نسخ الكود', id: 'quick_copy' } },
    { name: 'cta_copy', params: { display_text: '📎 نسخ نص', copy_code: 'rem bot' } },
    { name: 'quick_reply', params: { display_text: '📚 قائمة الأوامر', id: '.الاوامر' } }
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

example.usage = ["تست1"]


/* ↓ قسم الأمر ↓ */
example.category = "example"


/* ↓ استخدم الأوامر ↓ */
example.command = ["تست1"] 


/* ↓ بتعمل ايقاف ل الأمر ↓ */
example.disabled = false // لو عملتها true بيشتغل ب بدايه لو خليتها false بيشتغل بدون بدايه 

/* ↓ استخدام الأمر بعد ثانيه من الاستخدام لمنع الاسبام ↓ */
example.cooldown = 1000; // تقدر تزود الثواني 


/* ↓ استخدام الأمر ب بدايه أو لا ↓ */
example.usePrefix = false; // لو عملتها true الأمر هيبقي من غير بدايه 

export default example;
