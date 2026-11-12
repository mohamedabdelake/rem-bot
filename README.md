<div align="center">

<img src="https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg" alt="Rem Bot" width="420"/>

# 🤖 Rem Bot

**A fast, button-powered WhatsApp bot built on the [MeowSab](https://github.com/deveni0/ws) framework.**
Downloads, AI personas, games, stickers, moderation and multi-device support — all in one small, easy-to-modify codebase.

[![Owner](https://img.shields.io/badge/WhatsApp-sonic-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/212698078610)
[![Node](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[Features](#-features) • [Install](#-installation) • [First run](#-first-run--pairing) • [Commands](#-commands) • [Config](#-configuration) • [Troubleshooting](#-troubleshooting)

</div>

---

## ✨ Features

| | |
|---|---|
| 🎛️ **Interactive buttons** | Quick-reply, copy, URL, call and single-select list buttons |
| 📥 **Media downloaders** | YouTube (audio/video), TikTok, Instagram, Spotify, Facebook, Mediafire, anime episodes |
| 🤖 **AI personas** | Multiple chat personas plus a general AI chat command |
| 🧩 **Sticker studio** | Image/video → sticker, watermark control, sticker → image/GIF/MP3 |
| 💰 **Economy & levels** | Daily/weekly/monthly rewards, XP levels, gifts, theft |
| 🛡️ **Group moderation** | Add/kick/promote/demote, mute, warnings, anti-link, auto-welcome |
| 🎮 **Games & fun** | XO, guess-the-country, guess-the-eye, marriage/matching, GIF reactions |
| 🔁 **Sub-bots** | Pair extra numbers from inside WhatsApp — each one runs the same plugins |
| ⚙️ **Hot-reloadable plugins** | Drop a file in `plugins/`, it autoloads — no restart needed |
| 🪶 **Light footprint** | Small dependency set, fast boot, runs on a phone |
| 🚫 **Zero media clutter** | No thumbnails, posters or promo videos — replies are text, emoji and buttons |
| 🆕 **Extra utilities** | Reminders, calculator, clock, quotes, group rules, command search |

---

## 📋 Requirements

- **Node.js 20 or newer** (tested on Node 24)
- **npm**
- A WhatsApp account for the bot
- *Optional:* `ffmpeg` — only needed for GIF → MP4 conversion (`.لجيف`)

---

## 🚀 Installation

### 📱 Termux (Android) — recommended

Copy and paste this **line by line**:

```bash
termux-setup-storage
pkg update -y && pkg upgrade -y
pkg install git nodejs -y
git clone https://github.com/mohamedabdelake/rem-bot.git
cd rem-bot
npm install
npm start
```

> 💡 Tip: run `termux-wake-lock` before `npm start` so Android doesn't kill the bot in the background.
> Add `pkg install ffmpeg -y` if you want the GIF → MP4 command to work.

### 💻 Linux / VPS / Windows

```bash
git clone https://github.com/mohamedabdelake/rem-bot.git
cd rem-bot
npm install
npm start
```

> On Windows use **Git Bash** or **PowerShell**; Node 20+ is required either way.

---

## 🔑 First run & pairing

1. Edit the bot number in `index.js` (`phoneNumber`) — country code, **no** `+` or spaces.
2. Start the bot: `npm start`.
3. WhatsApp will show a **pairing code** in the terminal (or scan the QR if enabled).
4. On your phone: **WhatsApp → Settings → Linked devices → Link a device → Link with phone number** and enter the code.
5. Credentials are saved locally; next start re-connects automatically.

---

## 🕹️ Daily usage

The default prefixes are `.`, `/` and `!` — all commands below work with any of them.

```
.الاوامر        → open the button menu, then tap a category to see its commands
.المهام         → the same menu under an alternate name
.ابحث ملصق      → find any command by keyword
.معلومات        → bot + system status
.بومني نص       → talk to the Pomni AI persona
.تنصيب 212xxxxx → pair an extra sub-bot
```

Mix Arabic and English aliases freely — most commands accept both.

---

## ⚙️ Configuration

**`index.js`** — identity, prefix and owners:

```js
const client = new Client({
  phoneNumber: '212698078610',   // bot number, no "+"
  prefix: [".", "/", "!"],
  fromMe: false,
  owners: [
    { name: "sonic", jid: "212698078610@s.whatsapp.net" }   // owners = full bot access
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

config.info = {
  nameBot: "rem bot",            // shown in menus and messages
  urls: { api: "https://emam-api.web.id" },
  copyright: { pack: 'rem bot', author: 'sonic' },  // sticker watermark
  images: [ /* random menu images */ ]
};
```

- **Add an owner:** append `{ name: "...", jid: "<number>@s.whatsapp.net" }` to `owners` (or use `.ضيف_مطور` at runtime).
- **Bot name:** change `nameBot` — every menu, welcome message and info card follows it.
- **Message texts** (welcome, alerts, permission errors): `system/control.js`.

---

## 📚 Commands

Reply to the menu with a number to browse a category, or use any command directly.

<details open>
<summary><b>🏦 Economy & profile</b></summary>

| Command | What it does |
|---|---|
| `.تسجيل اسم\|عمر` | Register your profile |
| `.حذف_تسجيلي` | Delete your registration |
| `.بروفايل` | Your level, XP, cookies, warnings |
| `.يومي` `.اسبوعي` `.شهري` | Claim timed rewards |
| `.سرقة @user` | Try to steal cookies |

</details>

<details>
<summary><b>📥 Downloads & search</b></summary>

| Command | What it does |
|---|---|
| `.اغنيه <name>` / `.فيديو <name>` | YouTube audio / video |
| `.يوت_اغنيه <url>` / `.يوتيوب <url>` | YouTube by link |
| `.تيك <url>` | TikTok (no watermark) |
| `.انستا <url>` | Instagram reels / posts |
| `.سبوتيفاي <name>` | Spotify track |
| `.انمي <name>` | Anime search → episode → quality → download link |
| `.بينترست <query>` | Pinterest image search |
| `.بحث_تيك <query>` | TikTok search |

</details>

<details>
<summary><b>🛡️ Group moderation</b></summary>

| Command | What it does |
|---|---|
| `.ضيف` / `.طرد` | Add / remove a member (reply to them) |
| `.رفع` / `.خفض` | Promote / demote admin |
| `.قفل` / `.فتح` | Close / open the group |
| `.كتم` / `.فك_كتم` | Mute / unmute a member |
| `.منشن` | Mention everyone |
| `.انذار` / `.انذاراتي` / `.حذف_انذار` | Warning system |
| `.جروب_اسم` `.جروب_وصف` `.جروب_صوره` | Edit group metadata |
| `.حذف` | Delete a message |
| `.الريكوستات` / `.اقبل_ريكوستات` | Join requests |
| `.تفعيل ...` | Toggle bot behaviour (see below) |

</details>

<details>
<summary><b>🎮 Games, fun & group extras</b></summary>

| Command | What it does |
|---|---|
| `.اكس` | Tic-tac-toe |
| `.علم` / `.عين` / `.مسابقه` | Guessing games |
| `.زواج` / `.طلاق` / `.ماتشينج` | Marriage & matching |
| `.بيحبني` / `.بيكرهني` / `.بيكراش` | Fun compatibility checks |
| `.باكا` `.ضحك` `.حضن` `.صفع` … | Animated GIF reactions |
| `.توب` | Group leaderboard |
| `.لينك` / `.رابطي` | Group link |
| `.قناة <invite>` | Channel info card |
| `.سكريبت` | Source / video links |

</details>

<details>
<summary><b>🤖 AI personas</b></summary>

`.بوت` (general chat) · `.بومني` · `.لوفي` · `.ميكاسا` · `.إيرن` · `.إيتاتشي` · `.مارين` · `.اوبن`

Each persona has its own tone and prompt — edit them in `plugins/ai/`.

</details>

<details>
<summary><b>🧩 Stickers & tools</b></summary>

| Command | What it does |
|---|---|
| `.ملصق` / `.s` | Image/video → sticker (reply to media) |
| `.حقوق` | Change sticker pack/author |
| `.لصوره` | Sticker → image |
| `.لجيف` | Sticker/GIF → MP4 |
| `.لصوت` | Video → MP3 |
| `.لرابط` / `.لرابط2` | Upload media, get a direct link |
| `.تعديل` | AI image edit |
| `.نسخ` | OCR — text from an image |
| `.كلمات <song>` | Lyrics |

</details>

<details>
<summary><b>👑 Owner & system</b></summary>

| Command | What it does |
|---|---|
| `.owner` / `.المطور` | Send the owner contact card |
| `.اذاعه` | Broadcast to every chat |
| `.حظر` / `.فك_حظر` | Ban / unban a user |
| `.ضع` | Set the bot's profile picture (reply to an image) |
| `.اضافه_ملف` / `.حذف_ملف` | Load / unload a plugin at runtime |
| `.الايرورات` | Show recent runtime errors |
| `.انضم` / `.اخرج` | Join / leave a group by link |
| `.رستارت` / `.ايقاف` | Restart / stop the bot |
| `.معلومات` `.بنج` `.الرام` | Status, latency, memory |

</details>

<details>
<summary><b>🔁 Sub-bots</b></summary>

| Command | What it does |
|---|---|
| `.تنصيب <number>` | Pair a new sub-bot (code appears in chat) |
| `.البوتات` | List paired sub-bots |
| `.حذف_بوت <number>` | Remove a sub-bot |
| `.فولو <channel>` | All sub-bots follow a channel |
| `.رياكت <channel>` | React to a channel post |
| `.احصائيات_البوتات` | Sub-bot stats |
| `.اذاعة_فرعي` | Broadcast through every sub-bot |

</details>

<details open>
<summary><b>🆕 New utilities</b></summary>

| Command | What it does |
|---|---|
| `.تذكير 10د نص` | Reminder after a duration — ثانية / دقيقة / ساعة / يوم or `s` `m` `h` `d` |
| `.الغاء_تذكير` | Cancel all of your pending reminders |
| `.حاسبة 2+3*4` | Safe calculator: `+ - * / % ( ) ^` |
| `.وقت` | Date, time, timezone and bot uptime |
| `.اقتباس` / `.نصيحة` | Random quote or tip, with a “another one” button |
| `.قوانين` | Show group rules · `.قوانين ضع <نص>` (admin) · `.قوانين حذف` |
| `.ابحث <كلمة>` | Search every command by keyword |

</details>

### 🖼️ Media policy

Bot replies are **text + emoji + buttons only**. Menus, info cards, AI replies, pairing messages and profile cards no longer attach thumbnails, ad previews, posters or promo videos.

Only the media you explicitly ask for is sent: downloads (`.اغنيه`, `.يوتيوب`, `.تيك`, `.انستا`…), sticker conversion (`.ملصق`, `.لصوره`, `.لجيف`), GIF reactions, and the image-based games.

---

### ⚙️ Owner/admin toggles

```
.تفعيل ايقاف_الترحيب          .تفعيل تشغيل_الترحيب
.تفعيل تشغيل_الادمن           .تفعيل ايقاف_الادمن
.تفعيل مطور_فقط               .تفعيل مطور_عام
.تفعيل تشغيل_مضاد_الروابط     .تفعيل ايقاف_مضاد_الروابط
.تفعيل ايقاف_خاص              .تفعيل تشغيل_خاص
.تفعيل ايقاف_الفرعي           .تفعيل تشغيل_الفرعي
```

---

## 🗂️ Project structure

```
rem-bot/
├── index.js                 # client, owner list, bot identity (nameBot), boot
├── sub.js                   # sub-bot (extra number) manager
├── system/
│   ├── control.js           # welcome/leave events + permission error messages
│   ├── utils.js             # sticker builder, uploads, GIF→MP4, AI helper
│   └── UltraDB.js           # tiny JSON database (users, groups, settings)
└── plugins/
    ├── menu.js, menu2.js    # the two menu styles
    ├── owner.js, id.js      # owner contact card, JID helper
    ├── admins/ ai/ auto/ bank/ download/ example/ game/ gif/
    ├── group/ guild/ info/ logo/ owner/ search/ sticker/ subs/
    ├── tools/ voices/
```

---

## 🧩 Adding your own command

Create `plugins/other/hello.js`:

```js
const handler = async (m, { conn, text }) => {
  await m.reply(`hello ${m.pushName} 👋`, { quoted: m });
};

handler.command  = ["هلا", "hello"];  // triggers
handler.category = "other";           // menu section
handler.usage    = ["هلا"];           // shown in the menu
handler.owner    = false;             // true = owner only
handler.admin    = false;             // true = group admins only
handler.group    = false;             // true = groups only

export default handler;
```

Save the file — the plugin loader picks it up automatically.

---

## 🔧 Troubleshooting

| Problem | Fix |
|---|---|
| `Cannot find module 'meowsab'` | Run `npm install` inside the project folder |
| `sharp` fails to build on Termux | `pkg install python clang make -y` then `npm install` again |
| GIF → MP4 does nothing | `pkg install ffmpeg -y` |
| Bot disconnects on phone | `termux-wake-lock`; disable battery optimisation for Termux |
| `Connection closed` / logged out | Delete the saved session folder and pair again |
| Commands do nothing | Check the bot is admin (for admin commands) and that `owners` matches your number |

---

## ⚠️ Disclaimer

This project is for **educational and personal use**. Automating a WhatsApp account can violate WhatsApp's Terms of Service — use a dedicated number and at your own risk. The author is not responsible for account bans or misuse.

---

## 🙌 Credits & License

- Built on the **MeowSab** framework by [deveni0](https://github.com/deveni0/ws)
- Originally forked from the **Pomni AI** project — thanks to its authors
- Maintained by **sonic** ([@dev.er](https://wa.me/212698078610))

Released under the **MIT License** — see [LICENSE](LICENSE).

<div align="center">

**Made with ❤️ by sonic — if Rem Bot helps you, leave a ⭐**

</div>
