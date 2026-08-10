import type { AnalyticsEvent } from "./event";
import type { AnalyticsProvider } from "./providers/AnalyticsProvider";
import { AlertAnalyticsProvider } from "./providers/AlertAnalyticsProvider";

const provider: AnalyticsProvider = new AlertAnalyticsProvider();

export function track(event: AnalyticsEvent) {
  provider.track(event);
}
