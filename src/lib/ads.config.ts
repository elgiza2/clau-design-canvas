export const MONETAG_ZONE = "11950813";
export const CHANNEL = "Clautei";
export const GRAM_WALLET = "UQAp1QxnLJ2z44IooUovvtVShw7hJBEdxCRV3RlbCYC3D8qj";
export const MIN_WITHDRAW = 0.5;
export const AD_COOLDOWN_SEC = 2;
export const APP_URL = "https://clau-earn-app.vercel.app";
export const BOT_USERNAME = "Clautsbot";

export type Currency = "USDT" | "GRAM" | "CALU";

export const BOOSTERS = [
  { key: "boost_15", mult: 1.5, days: 7, price: 0.5 },
  { key: "boost_2", mult: 2, days: 7, price: 1 },
  { key: "boost_3", mult: 3, days: 30, price: 3 },
] as const;

export const TICKET_PACKS = [
  { key: "t1", tickets: 1, gram: 0.001 },
  { key: "t10", tickets: 10, gram: 0.008 },
  { key: "t50", tickets: 50, gram: 0.035 },
] as const;

// Roulette segments. "jackpot" segments are display-only and never win.
export const WHEEL = [
  { c: "USDT", a: 0.0005 },
  { c: "GRAM", a: 0.001 },
  { c: "USDT", a: 0.001 },
  { c: "GRAM", a: 10, jackpot: true },
  { c: "USDT", a: 0.0005 },
  { c: "GRAM", a: 0.0005 },
  { c: "USDT", a: 5, jackpot: true },
  { c: "GRAM", a: 0.001 },
  { c: "USDT", a: 0.001 },
  { c: "GRAM", a: 0.0005 },
] as { c: Currency; a: number; jackpot?: boolean }[];

export function fmt(n: number, c?: string) {
  if (c === "CALU") return Math.floor(n).toLocaleString("en-US");
  if (n === 0) return "0";
  return Number(n).toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}
