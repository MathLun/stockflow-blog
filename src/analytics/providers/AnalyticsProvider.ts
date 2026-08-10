import type { AnalyticsEvent } from "../event";

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void;
}
