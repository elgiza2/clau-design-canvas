import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play, Ticket, Eye } from "lucide-react";
import { toast } from "sonner";
import { Page, Card, BalanceStrip } from "@/components/ads/Shell";
import { Coin } from "@/components/ads/Coin";
import { useApp, haptic, errMsg } from "@/lib/app-context";
import { claimAd } from "@/lib/ads.functions";
import { AD_COOLDOWN_SEC, MONETAG_ZONE, fmt } from "@/lib/ads.config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CLAU — Watch & earn" },
      { name: "description", content: "Watch ads and earn USDT, GRAM or CALU plus spin tickets." },
      { property: "og:title", content: "CLAU — Watch & earn" },
      { property: "og:description", content: "Watch ads and earn USDT, GRAM or CALU plus spin tickets." },
    ],
  }),
  component: Earn,
});

function Earn() {
  const { state, setState, initData, t } = useApp();
  const u = state!.user;
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);
  const [last, setLast] = useState<{ currency: string; amount: number } | null>(null);

  useEffect(() => {
    if (!u.last_ad_at) return;
    const left = Math.ceil(AD_COOLDOWN_SEC - (Date.now() - new Date(u.last_ad_at).getTime()) / 1000);
    if (left > 0) setWait(left);
  }, [u.last_ad_at]);

  useEffect(() => {
    if (wait <= 0) return;
    const id = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(id);
  }, [wait]);

  async function watch() {
    haptic();
    setBusy(true);
    try {
      const show = window[`show_${MONETAG_ZONE}`];
      if (typeof show !== "function") throw new Error("ad");
      await show();
      const r = await claimAd({ data: { initData } });
      setState(r.state);
      setLast({ currency: r.currency, amount: r.amount });
      setWait(AD_COOLDOWN_SEC);
      haptic("success");
    } catch (e) {
      haptic("error");
      const m = errMsg(e);
      toast(m === "cooldown" ? t("cooldown") : t("ad_failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page title={`${t("hello")}, ${u.first_name ?? ""}`} sub={t("watch_sub")}>
      <BalanceStrip />

      {/* main earn card */}
      <Card className="text-center">
        <div className="label-caps">{t("watch_title")}</div>

        <div className="my-5 flex h-20 items-center justify-center">
          {last ? (
            <div className="flex items-center gap-3 animate-in zoom-in-50 duration-300">
              <Coin c={last.currency} size={40} />
              <div className="text-left">
                <div className="text-xl font-semibold tabular-nums">+{fmt(last.amount, last.currency)} {last.currency}</div>
                <div className="flex items-center gap-1 text-xs text-success"><Ticket size={12} /> {t("plus_ticket")}</div>
              </div>
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <Play size={22} strokeWidth={2.5} />
            </div>
          )}
        </div>

        <button className="pill-btn w-full !py-4 text-base" disabled={busy || wait > 0} onClick={watch}>
          {busy ? t("loading_ad") : wait > 0 ? t("wait_btn", wait) : t("watch_btn")}
        </button>
        {u.mult > 1 && <p className="mt-3 text-sm text-accent">{t("booster_active", u.mult)}</p>}
      </Card>

      {/* stats */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Card className="flex items-center gap-3 !p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent"><Eye size={18} /></span>
          <div>
            <div className="text-lg font-semibold tabular-nums leading-tight">{u.ads_watched.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground">{t("ads_watched")}</div>
          </div>
        </Card>
        <Card className="flex items-center gap-3 !p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent"><Ticket size={18} /></span>
          <div>
            <div className="text-lg font-semibold tabular-nums leading-tight">{u.tickets}</div>
            <div className="text-[11px] text-muted-foreground">{t("tickets")}</div>
          </div>
        </Card>
      </div>

      <Card className="mt-3 !p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{t("tip")}</p>
      </Card>
    </Page>
  );
}
