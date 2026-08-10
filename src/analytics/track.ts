import type { AnalyticsEvent } from "./event";

export function track(event: AnalyticsEvent) {
  alert(`[Analytics] ${event}`);
}
