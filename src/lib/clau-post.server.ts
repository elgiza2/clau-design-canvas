const CHANNEL_ID = -1003736245644;
const APP = "https://clau-earn-app.vercel.app";
const POSTS = [
  ["Your time is worth something.", "Watch a short ad and get paid instantly in CALU, USDT or GRAM.", "No deposit. No experience needed. Just open the app and start."],
  ["Free spin waiting for you.", "Every ad you watch gives you a roulette ticket.", "Spin today and see how much USDT or GRAM you can win."],
  ["Bring a friend, earn more.", "Every friend who joins with your link gives you an extra ticket.", "Share your invite link from the Friends page."],
  ["New tasks just dropped.", "Join channels and open apps to collect bonus GRAM.", "Each task takes less than a minute."],
  ["Earn faster with boosters.", "A booster multiplies every reward you get from ads.", "Up to 3x rewards for 30 days."],
  ["Start your day with CLAU.", "Fresh ads, a free ticket and new tasks are ready.", "A few minutes a day adds up."],
  ["Withdraw when you want.", "Send your USDT and GRAM straight to your TON wallet.", "Keep watching, keep growing your balance."],
];

export async function sendDailyPost(token: string, day = Math.floor(Date.now() / 86400000)) {
  const i = day % POSTS.length;
  const [title, a, b] = POSTS[i]!;
  const r = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: CHANNEL_ID,
      photo: `${APP}/posts/d${i}.jpg?v=${day}`,
      parse_mode: "HTML",
      caption: `<b>${title}</b>\n\n<b>${a}</b>\n<b>${b}</b>\n\n<b>Open the app and start earning now</b>`,
      reply_markup: { inline_keyboard: [[{ text: "OPEN CLAU APP", url: "https://t.me/sramaibot?startapp" }]] },
    }),
  });
  return { ok: r.ok, body: await r.text() };
}
