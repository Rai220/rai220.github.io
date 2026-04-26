import { useMemo, useRef, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

const EMAIL = "k.krestnikov@gmail.com";

type FormState = {
  identity: string;
  contact: string;
  companySize: string;
  stage: string;
  request: string;
  budget: string;
  stack: string;
  website: string;
};

const initialState: FormState = {
  identity: "",
  contact: "",
  companySize: "",
  stage: "poc-demo",
  request: "",
  budget: "",
  stack: "",
  website: "",
};

export function IntakeForm() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const startedAt = useRef(Date.now());
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  const companySizes = useMemo(() => [
    { value: "up-to-50", label: t("intake_company_size_1") },
    { value: "50-500", label: t("intake_company_size_2") },
    { value: "500-5000", label: t("intake_company_size_3") },
    { value: "5000+", label: t("intake_company_size_4") },
  ], [t]);

  const stages = useMemo(() => [
    { value: "idea", label: t("intake_stage_idea") },
    { value: "poc-demo", label: t("intake_stage_poc") },
    { value: "pilot-prod", label: t("intake_stage_pilot") },
    { value: "scaling", label: t("intake_stage_scaling") },
  ], [t]);

  const budgets = useMemo(() => [
    { value: "up-to-100k", label: t("intake_budget_1") },
    { value: "100-500K", label: t("intake_budget_2") },
    { value: "500K-2M", label: t("intake_budget_3") },
    { value: "2M+", label: t("intake_budget_4") },
    { value: "unknown", label: t("intake_budget_unknown") },
  ], [t]);

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const buildBody = () => [
    `${t("intake_identity_label")}: ${form.identity}`,
    `${t("intake_contact_label")}: ${form.contact}`,
    `${t("intake_company_size_label")}: ${companySizes.find((size) => size.value === form.companySize)?.label ?? form.companySize}`,
    `${t("intake_stage_label")}: ${stages.find((stage) => stage.value === form.stage)?.label ?? form.stage}`,
    `${t("intake_request_label")}: ${form.request}`,
    `${t("intake_budget_label")}: ${budgets.find((budget) => budget.value === form.budget)?.label ?? (form.budget || "-")}`,
    `${t("intake_stack_label")}: ${form.stack || "-"}`,
  ].join("\n");

  const submitToEndpoint = async () => {
    const endpoint = import.meta.env.VITE_INTAKE_ENDPOINT?.trim();
    if (!endpoint) return false;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Intake endpoint returned ${response.status}`);
    }

    return true;
  };

  const submitViaMailto = () => {
    const subject = `${t("intake_mail_subject")}: ${form.identity}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`;
    window.location.href = mailto;
  };

  const goToThanks = (transport: "endpoint" | "mailto") => {
    sessionStorage.setItem("intake_contact", form.contact);
    const query = new URLSearchParams({ contact: form.contact, transport }).toString();
    navigate(`/intake/thanks?${query}`);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.website || Date.now() - startedAt.current < 3000) {
      return;
    }

    if (!form.identity.trim() || !form.contact.trim() || !form.companySize || !form.stage || !form.request.trim()) {
      setStatus("error");
      setError(t("intake_required"));
      return;
    }

    if (form.request.trim().length < 50) {
      setStatus("error");
      setError(t("intake_error_request_short"));
      return;
    }

    trackEvent("intake_submit", { company_size: form.companySize, stage: form.stage });
    setStatus("submitting");

    try {
      const endpointSent = await submitToEndpoint();
      if (!endpointSent) {
        submitViaMailto();
      }
      const transport = endpointSent ? "endpoint" : "mailto";
      trackEvent("intake_success", { transport });
      goToThanks(transport);
    } catch (err) {
      trackEvent("intake_error", { message: err instanceof Error ? err.message : "unknown" });
      setStatus("error");
      setError(t("intake_error_submit"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="terminal-panel p-6 md:p-8 space-y-6">
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="identity">{t("intake_identity_label")}</Label>
          <Input id="identity" required value={form.identity} onChange={(event) => update("identity", event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">{t("intake_contact_label")}</Label>
          <Input id="contact" required value={form.contact} onChange={(event) => update("contact", event.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>{t("intake_company_size_label")}</Label>
          <Select required value={form.companySize} onValueChange={(value) => update("companySize", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("intake_select_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label>{t("intake_stage_label")}</Label>
          <RadioGroup className="grid grid-cols-1 gap-2" value={form.stage} onValueChange={(value) => update("stage", value)}>
            {stages.map((stage) => (
              <Label key={stage.value} className="flex items-center gap-3 rounded-md border border-border/60 bg-background/60 p-3 text-sm">
                <RadioGroupItem value={stage.value} />
                {stage.label}
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="request">{t("intake_request_label")}</Label>
        <Textarea
          id="request"
          required
          minLength={50}
          maxLength={1000}
          rows={6}
          value={form.request}
          onChange={(event) => update("request", event.target.value)}
        />
        <p className="text-xs font-mono text-muted-foreground/60">{t("intake_request_hint")} · {form.request.length}/1000</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>{t("intake_budget_label")}</Label>
          <Select value={form.budget} onValueChange={(value) => update("budget", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("intake_optional")} />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="stack">{t("intake_stack_label")}</Label>
          <Textarea id="stack" maxLength={300} rows={3} value={form.stack} onChange={(event) => update("stack", event.target.value)} />
          <p className="text-xs font-mono text-muted-foreground/60">{t("intake_stack_hint")}</p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "submitting" ? t("intake_submitting") : t("intake_submit")}
      </button>
    </form>
  );
}
