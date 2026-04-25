type GtagCommand = "js" | "config" | "event";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void;
  }
}

export function isAnalyticsEnabled() {
  return import.meta.env.PROD;
}

export function initAnalytics() {
  window.dataLayer = window.dataLayer || [];
}

export function trackPageView(path: string) {
  initAnalytics();

  if (!isAnalyticsEnabled() || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
