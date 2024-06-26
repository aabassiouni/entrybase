// written by @chronark and @unkeydev

import baseX from "base-x";

const prefixes = {
  wt: "wt",
  et: "et",
  su: "su",
  inv: "inv",
  ws: "ws",
} as const;

export function newId(prefix: keyof typeof prefixes): string {
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  return [prefixes[prefix], baseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz").encode(buf)].join("_");
}
