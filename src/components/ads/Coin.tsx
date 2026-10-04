import gram from "@/assets/gram.png";
import calu from "@/assets/calu.png";

const SRC: Record<string, string> = {
  USDT: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  GRAM: gram,
  CALU: calu,
};

export function Coin({ c, size = 28 }: { c: string; size?: number }) {
  return <img src={SRC[c]} alt={c} width={size} height={size} loading="lazy" className="shrink-0 rounded-full object-contain" style={{ width: size, height: size }} />;
}
