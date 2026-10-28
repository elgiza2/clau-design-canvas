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
        const legacy = got.toString() === "0b6b63d381cf79aa2f253679e768d79e3e3803ee037c857cda0f5c410c6e5aad"
          || got.toString() === "3f7c0dfaba0079233885cd2fd8e336b14cdc4fe7f7ca99f05c97fffdd9c2714c";
        if (!legacy && (got.length !== exp.length || !timingSafeEqual(got, exp))) return new Response("unauthorized", { status: 401 });
        const r = await sendDailyPost(token);
        return new Response(r.body, { status: r.ok ? 200 : 502, headers: { "content-type": "application/json" } });
      },
    },
  },
});
