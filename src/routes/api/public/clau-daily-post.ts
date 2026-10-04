import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";
import { sendDailyPost } from "@/lib/clau-post.server";

export const Route = createFileRoute("/api/public/clau-daily-post")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = process.env["TELEGRAM_BOT_TOKEN"];
        if (!token) return new Response("not configured", { status: 500 });
        const exp = Buffer.from(createHash("sha256").update(`clau-daily:${token}`).digest("hex"));
        const got = Buffer.from(new URL(request.url).searchParams.get("key") ?? "");
        if (got.length !== exp.length || !timingSafeEqual(got, exp)) return new Response("unauthorized", { status: 401 });
        const r = await sendDailyPost(token);
        return new Response(r.body, { status: r.ok ? 200 : 502, headers: { "content-type": "application/json" } });
      },
    },
  },
});
