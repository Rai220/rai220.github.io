import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor } from "@/components/CustomCursor";
import { LanguageProvider } from "@/lib/i18n";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import Home from "@/pages/Home";
import Intake from "@/pages/Intake";
import IntakeThanks from "@/pages/IntakeThanks";
import NotFound from "@/pages/not-found";

initAnalytics();

function AnalyticsPageViews() {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView(location);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/intake" component={Intake} />
      <Route path="/intake/thanks" component={IntakeThanks} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <AnalyticsPageViews />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
