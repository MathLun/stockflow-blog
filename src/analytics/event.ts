import type { AnalyticsSource } from "./sources";

export type AnalyticsEvent =
  | {
      name: "stockflow_cta_clicked";
      properties: {
        source: AnalyticsSource;
      };
    }
  | {
      name: "stockflow_github_clicked";
      properties: {
        source: AnalyticsSource;
      };
    };
