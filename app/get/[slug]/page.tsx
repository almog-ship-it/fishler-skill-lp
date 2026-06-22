"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { skills } from "@/config/skills";

export default function SkillDownloadPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const skill = skills[slug];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!skill) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--cream)" }}>
        <div className="text-center" style={{ color: "var(--ink)" }}>
          <p className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heebo)" }}>הסוכן לא נמצא</p>
          <p className="text-base opacity-60">בדוק את הקישור ונסה שוב.</p>
        </div>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !privacy) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "שגיאה בשליחה");
      }

      setStatus("success");

      // Trigger file download
      if (data.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = `${slug}.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "אירעה שגיאה. נסה שוב.");
    }
  }

  if (status === "success") {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-4 relative"
        style={{ background: "var(--cream)" }}
      >
        <div
          className="animate-scale-in text-center max-w-sm w-full"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Big checkmark */}
          <div
            className="mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{
              width: 72,
              height: 72,
              background: "var(--blue)",
              color: "#fff",
              fontSize: 32,
            }}
          >
            ✓
          </div>

          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--ink)", fontFamily: "var(--font-heebo)" }}
          >
            הקובץ בדרך אליך
          </h2>

          <p className="text-base mb-2" style={{ color: "var(--ink)", opacity: 0.7 }}>
            ההורדה התחילה אוטומטית.
          </p>
          <p className="text-sm" style={{ color: "var(--ink)", opacity: 0.5 }}>
            אם ההורדה לא התחילה,{" "}
            <a
              href={skill.fileUrl}
              download
              style={{ color: "var(--blue)", textDecoration: "underline" }}
            >
              לחץ כאן
            </a>
            .
          </p>

          {/* Divider */}
          <div
            className="my-8 w-12 mx-auto"
            style={{ height: 1, background: "var(--border)" }}
          />

          <p className="text-sm" style={{ color: "var(--ink)", opacity: 0.55 }}>
            יש שאלות? כתוב לי{" "}
            <a
              href="https://www.linkedin.com/in/almogfishler"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--blue)" }}
            >
              ב-LinkedIn
            </a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
      style={{ background: "var(--cream)" }}
    >
      {/* Decorative background blob */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "-10%",
          left: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(30,58,138,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "-10%",
          right: "-5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(30,58,138,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="w-full max-w-md relative"
        style={{ zIndex: 1 }}
      >
        {/* Brand mark */}
        <div
          className="opacity-0-start animate-fade-up mb-8 flex items-center gap-2"
          style={{ animationDelay: "0s" }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--blue)",
              textTransform: "uppercase",
              borderBottom: "1.5px solid var(--blue)",
              paddingBottom: 2,
            }}
          >
            FISHLER.AI
          </span>
        </div>

        {/* Skill badge */}
        {skill.badge && (
          <div
            className="opacity-0-start animate-fade-up delay-1 mb-4 inline-flex items-center"
            style={{
              background: "var(--blue-faint)",
              color: "var(--blue)",
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 100,
              border: "1px solid rgba(30,58,138,0.15)",
              letterSpacing: "0.02em",
            }}
          >
            {skill.badge}
          </div>
        )}

        {/* Title */}
        <h1
          className="opacity-0-start animate-fade-up delay-2 text-3xl font-bold mb-3 leading-tight"
          style={{
            color: "var(--ink)",
            fontFamily: "var(--font-heebo)",
            fontSize: "clamp(24px, 6vw, 34px)",
            lineHeight: 1.25,
          }}
        >
          {skill.title}
        </h1>

        {/* Description */}
        <p
          className="opacity-0-start animate-fade-up delay-3 mb-8 leading-relaxed"
          style={{
            color: "var(--ink)",
            opacity: 0.65,
            fontSize: 16,
            lineHeight: 1.7,
          }}
        >
          {skill.description}
        </p>

        {/* Form card */}
        <div
          className="opacity-0-start animate-fade-up delay-4"
          style={{
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "28px 24px",
            boxShadow: "0 4px 24px rgba(30,58,138,0.06), 0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <p
            className="text-sm font-semibold mb-5"
            style={{ color: "var(--ink)", opacity: 0.55, letterSpacing: "0.03em" }}
          >
            מלא פרטים — הקובץ יורד מיד
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--ink)", opacity: 0.75 }}
              >
                שם מלא
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ישראל ישראלי"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 15,
                  fontFamily: "var(--font-heebo)",
                  color: "var(--ink)",
                  background: "var(--cream)",
                  outline: "none",
                  transition: "border-color 0.15s",
                  direction: "rtl",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--blue)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                }}
              />
            </div>

            {/* Email field */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--ink)", opacity: 0.75 }}
              >
                כתובת אימייל
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="israel@example.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 15,
                  fontFamily: "var(--font-heebo)",
                  color: "var(--ink)",
                  background: "var(--cream)",
                  outline: "none",
                  transition: "border-color 0.15s",
                  direction: "ltr",
                  textAlign: "right",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--blue)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                }}
              />
            </div>

            {/* Privacy checkbox */}
            <label
              className="flex items-start gap-3 mb-6 cursor-pointer"
              style={{ color: "var(--ink)", fontSize: 13, lineHeight: 1.5, opacity: 0.7 }}
            >
              <input
                type="checkbox"
                name="privacy"
                required
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                style={{
                  marginTop: 2,
                  accentColor: "var(--blue)",
                  width: 16,
                  height: 16,
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              />
              <span>
                קראתי את מדיניות הפרטיות ומסכים/ה.{" "}
                <span style={{ opacity: 0.7 }}>
                  אנחנו שומרים את הפרטים שלך בצינעה ולא משתפים אותם עם צד שלישי.
                </span>
              </span>
            </label>

            {/* Error message */}
            {status === "error" && (
              <div
                className="mb-4 px-3 py-2 rounded-lg text-sm"
                style={{
                  background: "#FEF2F2",
                  color: "#991B1B",
                  border: "1px solid #FECACA",
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "loading" || !name || !email || !privacy}
              style={{
                width: "100%",
                padding: "13px 20px",
                background:
                  status === "loading" || !name || !email || !privacy
                    ? "rgba(30,58,138,0.45)"
                    : "var(--blue)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "var(--font-heebo)",
                cursor:
                  status === "loading" || !name || !email || !privacy
                    ? "not-allowed"
                    : "pointer",
                transition: "background 0.15s, transform 0.1s",
                letterSpacing: "0.01em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                if (status !== "loading" && name && email && privacy) {
                  (e.target as HTMLButtonElement).style.background = "var(--blue-light)";
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  status === "loading" || !name || !email || !privacy
                    ? "rgba(30,58,138,0.45)"
                    : "var(--blue)";
              }}
            >
              {status === "loading" ? (
                <>
                  <SpinnerIcon />
                  שולח...
                </>
              ) : (
                <>
                  הורד את הסוכן
                  <DownloadIcon />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="opacity-0-start animate-fade-up delay-5 text-center mt-6 text-xs"
          style={{ color: "var(--ink)", opacity: 0.35 }}
        >
          © {new Date().getFullYear()} Fishler AI · almogfish@gmail.com
        </p>
      </div>
    </main>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 1v9M5 7l3 3 3-3M2 12h12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
