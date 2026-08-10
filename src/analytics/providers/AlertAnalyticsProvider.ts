import type { AnalyticsProvider } from "./AnalyticsProvider";

import type { AnalyticsEvent } from "../event";

export class AlertAnalyticsProvider
implements AnalyticsProvider {
	track(event: AnalyticsEvent): void {
		alert(`***** Analytics *****\n
		      [EventName]: ${event.name}\n
		      [EventSource]: ${event.properties.source}\n
		`)
	}
}

