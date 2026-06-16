"use client";

import { useSyncExternalStore } from "react";

export type ProductKey =
  | "posh"
  | "quartz"
  | "airtouch"
  | "airglass"
  | "airsensor"
  | "airblaster"
  | "airhome"
  | "airlock"
  | "accessories";

let current: ProductKey = "posh";
const subs = new Set<() => void>();

export function selectProduct(id: ProductKey) {
  if (id === current) return;
  current = id;
  subs.forEach((f) => f());
}

function subscribe(cb: () => void) {
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}

export function useSelectedProduct(): ProductKey {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "posh"
  );
}
