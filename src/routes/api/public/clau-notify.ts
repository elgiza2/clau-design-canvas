import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";

const MESSAGES = [
  "<b>Your free roulette ticket is ready.</b>\n<b>Open CLAU and spin now.</b>",
  "<b>New ads are waiting for you.</b>\n<b>Watch and earn CLAU, USDT and GRAM.</b>",
  "<b>New tasks are live.</b>\n<b>Complete them and collect your rewards.</b>",
];

export const Route = createFileRoute("/api/public/clau-notify")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = process.env["TELEGRAM_BOT_TOKEN"];
        if (!token) return new Response("not configured", { status: 500 });
        const exp = Buffer.from(createHash("sha256").update(`clau-notify:${token}`).digest("hex"));
        const got = Buffer.from(new URL(request.url).searchParams.get("key") ?? "");
        if (got.length !== exp.length || !timingSafeEqual(got, exp)) return new Response("unauthorized", { status: 401 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: users } = await supabaseAdmin.from("clau_users").select("telegram_id").limit(3000);
        const text = MESSAGES[Math.floor(Date.now() / (8 * 3600000)) % MESSAGES.length];
        const appUrl = process.env["CLAU_APP_URL"] || "https://clau-earn-app.vercel.app";
        let sent = 0;
        for (const u of users ?? []) {
          const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              chat_id: u.telegram_id,
              text,
              parse_mode: "HTML",
              reply_markup: { inline_keyboard: [[{ text: "Open CLAU", web_app: { url: appUrl } }]] },
            }),
          });
          if (r.ok) sent++;
          await new Promise((res) => setTimeout(res, 40));
        }
        return Response.json({ ok: true, sent, total: users?.length ?? 0 });
      },
    },
  },
});
