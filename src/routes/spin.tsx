import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Ticket } from "lucide-react";
import { Page, Card } from "@/components/ads/Shell";
import { Coin } from "@/components/ads/Coin";
import { useApp, haptic, errMsg } from "@/lib/app-context";
import { spin, buyTickets } from "@/lib/ads.functions";
import { WHEEL, TICKET_PACKS, fmt } from "@/lib/ads.config";

export const Route = createFileRoute("/spin")({
  head: () => ({
    meta: [
      { title: "CLAU — Spin" },
      { name: "description", content: "Spin the wheel with your tickets and win USDT or GRAM rewards." },
      { property: "og:title", content: "CLAU — Spin" },
      { property: "og:description", content: "Spin the wheel with your tickets and win USDT or GRAM rewards." },
    ],
  }),
  component: Spin,
});

const SEG = 360 / WHEEL.length;

function Spin() {
  const { state, setState, initData, t } = useApp();
  const u = state!.user;
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState<{ currency: string; amount: number } | null>(null);
  const [buying, setBuying] = useState<string | null>(null);

  async function go() {
    if (u.tickets < 1) { toast(t("no_tickets")); return; }
    haptic();
    setSpinning(true);
    setWin(null);
    try {
      const r = await spin({ data: { initData } });
      const target = 360 - (r.index * SEG + SEG / 2);
      const next = rot - (rot % 360) + 360 * 6 + target;
      setRot(next);
      setTimeout(() => {
        setState(r.state);
        setWin({ currency: r.currency, amount: r.amount });
        setSpinning(false);
        haptic("success");
      }, 4200);
    } catch (e) {
      setSpinning(false);
      toast(errMsg(e) === "no_tickets" ? t("no_tickets") : t("error"));
    }
  }

  async function buy(pack: string) {
    setBuying(pack);
    try {
      setState(await buyTickets({ data: { initData, pack } }));
      haptic("success");
    } catch (e) {
      toast(errMsg(e) === "insufficient" ? t("insufficient") : t("error"));
    } finally {
      setBuying(null);
    }
  }

  const R = 140;
  const pt = (deg: number, r = R) => {
    const a = (deg * Math.PI) / 180;
    return `${150 + r * Math.sin(a)} ${150 - r * Math.cos(a)}`;
  };

  return (
    <Page title={t("spin_title")} sub={t("spin_sub")}>
      {/* tickets pill */}
      <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm backdrop-blur-md">
        <Ticket size={15} className="text-accent" />
        <span className="tabular-nums font-medium">{u.tickets}</span>
        <span className="text-muted-foreground">{t("tickets")}</span>
      </div>

      {/* wheel */}
      <div className="relative mx-auto aspect-square w-full max-w-[320px]">
        <div className="pointer-events-none absolute inset-8 rounded-full bg-accent/30 blur-3xl" />

        <div className="absolute inset-0 rounded-full border border-border bg-card/50 p-2.5 backdrop-blur-md">
          <div
            className="relative h-full w-full"
            style={{ transform: `rotate(${rot}deg)`, transition: spinning ? "transform 4s cubic-bezier(.15,.75,.1,1)" : "none" }}
          >
            <svg viewBox="0 0 300 300" className="h-full w-full">
              {WHEEL.map((seg, i) => (
                <path
                  key={i}
                  d={`M150 150 L${pt(i * SEG)} A${R} ${R} 0 0 1 ${pt((i + 1) * SEG)} Z`}
                  fill={seg.jackpot ? "var(--foreground)" : i % 2 ? "oklch(0.22 0.02 264)" : "oklch(0.16 0.01 264)"}
                  stroke="oklch(1 0 0 / 0.12)"
                  strokeWidth={1}
                />
              ))}
              <circle cx="150" cy="150" r={R} fill="none" stroke="oklch(1 0 0 / 0.2)" strokeWidth={1.5} />
            </svg>
            {WHEEL.map((seg, i) => (
              <div key={i} className="absolute left-1/2 top-0 h-1/2 origin-bottom" style={{ transform: `translateX(-50%) rotate(${i * SEG + SEG / 2}deg)` }}>
                <div className={`flex flex-col items-center gap-1 pt-4 ${seg.jackpot ? "text-background" : "text-foreground"}`}>
                  <Coin c={seg.c} size={20} />
                  <span className="text-[10px] font-semibold tabular-nums">{fmt(seg.a, seg.c)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* pointer */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1.5">
          <div className="h-0 w-0 border-x-[9px] border-t-[14px] border-x-transparent border-t-foreground drop-shadow" />
        </div>

        {/* center button */}
        <button
          onClick={go}
          disabled={spinning}
          className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-foreground text-background shadow-xl transition active:scale-90 disabled:opacity-90"
        >
          <span className="text-sm font-bold uppercase tracking-widest">{t("spin_btn")}</span>
        </button>
      </div>

      {/* result / action */}
      <div className="mt-6 space-y-3">
        {win && (
          <Card className="flex items-center gap-4 !p-4 animate-in zoom-in-90">
            <Coin c={win.currency} size={40} />
            <div>
              <div className="text-xs text-muted-foreground">{t("you_won")}</div>
              <div className="text-xl font-semibold tabular-nums">+{fmt(win.amount, win.currency)} {win.currency}</div>
            </div>
          </Card>
        )}
        <button className="pill-btn w-full !py-4 text-base" disabled={spinning} onClick={go}>
          {spinning ? "…" : t("tap_to_spin")}
        </button>
      </div>

      {/* buy tickets */}
      <h2 className="mb-3 mt-8 text-lg font-semibold">{t("buy_tickets")}</h2>
      <div className="grid grid-cols-3 gap-3">
        {TICKET_PACKS.map((p) => (
          <button key={p.key} disabled={buying === p.key} onClick={() => buy(p.key)} className="glass rounded-2xl p-4 text-center transition active:scale-95">
            <div className="text-xl font-semibold tabular-nums">{p.tickets}</div>
            <div className="text-[11px] text-muted-foreground">{t("tickets")}</div>
            <div className="mt-2.5 flex items-center justify-center gap-1 text-sm">
              <Coin c="GRAM" size={15} /> {fmt(p.gram)}
            </div>
          </button>
        ))}
      </div>
    </Page>
  );
}
