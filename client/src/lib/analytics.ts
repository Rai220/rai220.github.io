const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

type GtagCommand = "js" | "config" | "event";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void;
  }
}

export function isAnalyticsEnabled() {
  return import.meta.env.PROD && Boolean(GA_MEASUREMENT_ID);
}

export function initAnalytics() {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || window.gtag) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID!, { send_page_view: false });
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
