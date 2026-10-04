import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";

const CHANNEL_ID = -1003736245644;
const POST_PHOTO = "AgACAgQAAyEGAATespWMAAMHasG9sxRFGPghwtsveSTWSs-UYrUAAnMSaxuzdghSejVRwtY619QBAAMCAAN5AAM9BA";
const POSTS = [
  ["Watch. Earn. CLAU.", "Every ad you watch pays you instantly — CLAU, USDT or GRAM.", "Spin the wheel, finish tasks and invite friends for bigger rewards."],
  ["New day, new rewards.", "Your free roulette ticket is waiting.", "Watch a few ads and stack your CLAU balance today."],
  ["Invite. Earn. Repeat.", "Every friend you bring gives you an extra roulette ticket.", "Share your link and grow your rewards."],
  ["Tasks are live.", "Complete today's tasks and collect bonus GRAM.", "It only takes a minute."],
  ["Boost your earnings.", "Activate a booster and multiply every reward.", "More ads, more CLAU."],
];

export const Route = createFileRoute("/api/public/clau-daily-post")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = process.env["TELEGRAM_BOT_TOKEN"];
        if (!token) return new Response("not configured", { status: 500 });
        const exp = Buffer.from(createHash("sha256").update(`clau-daily:${token}`).digest("hex"));
        const got = Buffer.from(new URL(request.url).searchParams.get("key") ?? "");
        if (got.length !== exp.length || !timingSafeEqual(got, exp)) return new Response("unauthorized", { status: 401 });
        const day = Math.floor(Date.now() / 86400000);
        const [title, a, b] = POSTS[day % POSTS.length]!;
        const r = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: CHANNEL_ID,
            photo: POST_PHOTO,
            parse_mode: "HTML",
            caption: `<b>${title}</b>\n\n<b>${a}</b>\n<b>${b}</b>\n\n<b>Open the app and start earning now</b>`,
            reply_markup: { inline_keyboard: [[{ text: "OPEN CLAU APP", url: "https://t.me/Clautsbot?startapp" }]] },
          }),
        });
        const body = await r.text();
        return new Response(body, { status: r.ok ? 200 : 502, headers: { "content-type": "application/json" } });
      },
    },
  },
});
