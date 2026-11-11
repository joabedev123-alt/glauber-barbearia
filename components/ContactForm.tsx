"use client";

import { useState, type FormEvent } from "react";
import { whatsappHref } from "@/lib/site";

type Option = { value: string; label: string };

export function ContactForm({
  greeting,
  options,
  labels,
}: {
  greeting: string;
  options: Option[];
  labels: {
    name: string;
    service: string;
    day: string;
    dayHint: string;
    message: string;
    messageHint: string;
    servicePlaceholder: string;
    submit: string;
    nameMissing: string;
    serviceMissing: string;
    fallback: string;
    opensWhatsapp: string;
  };
}) {
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const day = String(data.get("day") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) {
      setError(labels.nameMissing);
      return;
    }
    if (!service) {
      setError(labels.serviceMissing);
      return;
    }

    const serviceLabel = options.find((option) => option.value === service)?.label ?? service;
    const lines = [greeting, `${labels.name}: ${name}`, `${labels.service}: ${serviceLabel}`];
    if (day) lines.push(`${labels.day}: ${day}`);
    if (message) lines.push(`${labels.message}: ${message}`);

    const href = whatsappHref(lines.join("\n"));
    setError("");
    const popup = window.open(href, "_blank", "noopener,noreferrer");
    setFallback(popup ? "" : href);
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>
        {labels.name}
        <input name="name" type="text" autoComplete="name" required maxLength={80} />
      </label>
      <label>
        {labels.service}
        <select name="service" required defaultValue="">
          <option value="">{labels.servicePlaceholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        {labels.day}
        <input name="day" type="text" maxLength={80} />
        <span className="form-hint">{labels.dayHint}</span>
      </label>
      <label>
        {labels.message}
        <textarea name="message" maxLength={500} />
        <span className="form-hint">{labels.messageHint}</span>
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="btn" type="submit">
        {labels.submit}
        <span className="sr-only"> ({labels.opensWhatsapp})</span>
      </button>
      {fallback ? (
        <p>
          {labels.fallback}{" "}
          <a href={fallback} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </p>
      ) : null}
    </form>
  );
}
