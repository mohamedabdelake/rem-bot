const QUOTES = [
  'النَجاح مش إنك متغلطش، النجاح إنك تقوم بعد كل غلطة.',
  'اللي بيبدأ صح، بيكمّل مهما الطريق طال.',
  'مفيش حاجة اسمها مستحيل، فيه حاجة اسمها لسه مش جربت.',
  'الوقت اللي بتحسبه فات، هو الوقت اللي كان ممكن تبدأ فيه.',
  'الهدوء مش ضعف، الهدوء إنك تختار معركتك.',
  'كل خبير كان يوم من الأيام مبتدئ.',
  'مش كل تأخيرة خسارة، أحياناً ربنا بيأخر عشان يجيب الأصح.',
  'اعمل اللي عليك وسيب النتيجة على ربك.',
  'اللي بيقرأ، مابيضيعش وقته.',
  'النجاح اليومي الصغير أقوى من الحماس اللي بيخلص.',
  'خليك محترم مع نفسك الأول، الناس هتتعلم منك.',
  'ماتقارنش بدايتك بنهاية حد تاني.',
  'اللي بيتعلم من غلطه مرة، مابيكررهاش مرتين.',
  'الفرق بينك وبين الناجح إنه كمل بعد ما زهق.',
  'الصبر مش انتظار، الصبر شغل وانت مستني.'
];

const TIPS = [
  'اشرب كوباية ماية قبل ما تكمل شغلك ☕',
  'خد بريك 5 دقايق كل ساعة عشان تركيزك يفضل عالي 🧠',
  'نام 7 ساعات، دماغك بتظبط نفسها وانت نايم 😴',
  'اكتب أهم 3 حاجات ليك وشيل الباقي، هتوصل أسرع ✍️',
  'امشي 10 دقايق في اليوم، الفرق هيبان في اسبوع 🚶',
  'قلل السكر بعد العصر، هتنام أحسن 🌙',
  'قفل الإشعارات وانت شغال، ساعة تركيز أحسن من أربع ساعات مشتتة 🔕',
  'اتعلم حاجة صغيرة جديدة كل يوم، بعد سنة هتبقى شخص تاني 📚'
];

const handler = async (m, { conn, bot, command }) => {
  const p = (Array.isArray(bot?.config?.prefix) ? bot.config.prefix[0] : bot?.config?.prefix) || '.';
  const name = bot?.config?.info?.nameBot || 'rem bot';
  const isTip = command === 'نصيحة' || command === 'نصائح';

  const bag = isTip ? TIPS : QUOTES;
  const pick = bag[Math.floor(Math.random() * bag.length)];

  await conn.sendButton(m.chat, {
    bodyText: `${isTip ? '💡 *نـصـيـحـة*' : '🌹 *اقـتـبـاس*'}

${pick}`,
    footerText: name,
    buttons: [
      { name: 'quick_reply', params: { display_text: isTip ? '🔁 نصيحة تانية' : '🔁 اقتباس تاني', id: `${p}${isTip ? 'نصيحة' : 'اقتباس'}` } },
      { name: 'quick_reply', params: { display_text: '📋 قائمة الأوامر', id: `${p}الاوامر` } }
    ],
    mentions: [m.sender],
    interactiveConfig: { buttons_limits: 10, list_title: 'اقتباس', button_title: 'اضغط هنا', canonical_url: 'https://github.com/mohamedabdelake/rem-bot' }
  }, { quoted: m });
};

handler.command = ['اقتباس', 'نصيحة', 'quote'];
handler.usage = ['اقتباس'];
handler.category = 'other';
export default handler;
