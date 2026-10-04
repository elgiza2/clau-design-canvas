const CHANNEL_ID = -1003736245644;
const APP = "https://clau-earn-app.vercel.app";
const POSTS = [
  ["Watch. Earn. CLAU.", "Every ad you watch pays you instantly in CLAU, USDT or GRAM.", "Spin the wheel, finish tasks and invite friends for bigger rewards."],
  ["Spin today.", "Your free roulette ticket is waiting.", "Every ad gives you one more spin."],
  ["Invite. Earn. Repeat.", "Every friend you bring gives you an extra roulette ticket.", "Share your link and grow your rewards."],
  ["Tasks are live.", "Complete today's tasks and collect bonus GRAM.", "It only takes a minute."],
  ["Boost your earnings.", "Activate a booster and multiply every reward.", "More ads, more CLAU."],
  ["Daily gift unlocked.", "Open the app and claim today's rewards.", "New day, new chances to win."],
  ["Your wallet is growing.", "Withdraw USDT and GRAM straight to your wallet.", "Keep watching, keep earning."],
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
      reply_markup: { inline_keyboard: [[{ text: "OPEN CLAU APP", url: "https://t.me/Clautsbot?startapp" }]] },
    }),
  });
  return { ok: r.ok, body: await r.text() };
}
