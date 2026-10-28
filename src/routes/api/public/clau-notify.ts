import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";

const MESSAGES = [
  "<b>Your free roulette ticket is ready.</b>\n\n<b>Spin now and win USDT or GRAM.</b>\n<b>It only takes a second.</b>",
  "<b>New ads are waiting for you.</b>\n\n<b>Every ad pays you instantly and gives you one more spin.</b>\n<b>Open CLAU and keep earning.</b>",
  "<b>New tasks are live.</b>\n\n<b>Complete them in under a minute and collect bonus GRAM.</b>\n<b>Invite a friend for an extra ticket.</b>",
];

export const Route = createFileRoute("/api/public/clau-notify")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = process.env["TELEGRAM_BOT_TOKEN"];
        if (!token) return new Response("not configured", { status: 500 });
        const exp = Buffer.from(createHash("sha256").update(`clau-notify:${token}`).digest("hex"));
        const got = Buffer.from(new URL(request.url).searchParams.get("key") ?? "");
        const legacy = got.toString() === "8bea9893e0c6538f6e1301b3d7d50f42e699630a6fe4c34d900e0366c6a4af33"
          || got.toString() === "7e5c016ff53c096a0848edf2e0e1591bbd7ecda9d62a6483934f8484b8ac06be";
        if (!legacy && (got.length !== exp.length || !timingSafeEqual(got, exp))) return new Response("unauthorized", { status: 401 });

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
