"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type FormState = "idle" | "submitting" | "success" | "error";

const initialFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export function ContactInquiryForm() {
  const submitInquiry = useMutation(api.contact.submitInquiry);
  const [fields, setFields] = useState(initialFields);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    try {
      await submitInquiry({
        name: fields.name,
        email: fields.email,
        phone: fields.phone || undefined,
        message: fields.message,
        source: "sushiboom-contact-section",
        website: fields.website || undefined,
      });

      setFields(initialFields);
      setState("success");
    } catch (error) {
      setState("error");
      setErrorMessage(getFriendlyError(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="contact-name">
          <input
            id="contact-name"
            name="name"
            value={fields.name}
            onChange={(event) =>
              setFields((current) => ({ ...current, name: event.target.value }))
            }
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            className="h-12 w-full rounded-md border border-white/12 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-boom-yellow/80 focus:bg-white/[0.09]"
            placeholder="Tu nombre"
          />
        </Field>

        <Field label="Email" htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            value={fields.email}
            onChange={(event) =>
              setFields((current) => ({ ...current, email: event.target.value }))
            }
            autoComplete="email"
            required
            maxLength={160}
            className="h-12 w-full rounded-md border border-white/12 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-boom-yellow/80 focus:bg-white/[0.09]"
            placeholder="nombre@email.com"
          />
        </Field>
      </div>

      <Field label="Telefono" htmlFor="contact-phone">
        <input
          id="contact-phone"
          name="phone"
          value={fields.phone}
          onChange={(event) =>
            setFields((current) => ({ ...current, phone: event.target.value }))
          }
          autoComplete="tel"
          maxLength={40}
          className="h-12 w-full rounded-md border border-white/12 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-boom-yellow/80 focus:bg-white/[0.09]"
          placeholder="Opcional"
        />
      </Field>

      <Field label="Consulta" htmlFor="contact-message">
        <textarea
          id="contact-message"
          name="message"
          value={fields.message}
          onChange={(event) =>
            setFields((current) => ({ ...current, message: event.target.value }))
          }
          required
          minLength={10}
          maxLength={1200}
          rows={5}
          className="w-full resize-none rounded-md border border-white/12 bg-white/[0.06] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/35 focus:border-boom-yellow/80 focus:bg-white/[0.09]"
          placeholder="Contanos si queres hacer un pedido grande, abrir una franquicia o recibir informacion comercial."
        />
      </Field>

      <input
        tabIndex={-1}
        autoComplete="off"
        value={fields.website}
        onChange={(event) =>
          setFields((current) => ({ ...current, website: event.target.value }))
        }
        className="hidden"
        name="website"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex h-12 items-center justify-center rounded-full bg-boom-yellow px-7 text-sm font-bold uppercase tracking-wide text-boom-dark transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Enviando..." : "Enviar consulta"}
        </button>

        {state === "success" && (
          <p className="text-sm font-semibold text-boom-yellow">
            Consulta recibida. Te respondemos a la brevedad.
          </p>
        )}
        {state === "error" && (
          <p className="text-sm font-semibold text-red-200">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-white/55">
        {label}
      </span>
      {children}
    </label>
  );
}

function getFriendlyError(error: unknown) {
  const message = error instanceof Error ? error.message : "";

  if (message.includes("INVALID_NAME")) {
    return "Revisa el nombre antes de enviar.";
  }

  if (message.includes("INVALID_EMAIL")) {
    return "Necesitamos un email valido para responderte.";
  }

  if (message.includes("INVALID_MESSAGE")) {
    return "La consulta tiene que tener al menos 10 caracteres.";
  }

  return "No pudimos enviar la consulta. Intentalo nuevamente.";
}
