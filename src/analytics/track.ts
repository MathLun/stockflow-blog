import type { AnalyticsEvent } from "./event";

export function track(event: AnalyticsEvent) {
  alert(`[Analytics] 
	[EventName]: ${event.name} 
	[EventSource]: ${event.properties.source}`);
}
