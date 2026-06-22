export const metadata = {
  title: "מדיניות פרטיות — Fishler AI",
};

export default function PrivacyPage() {
  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        fontFamily: "var(--font-heebo)",
        color: "var(--ink)",
        padding: "60px 24px",
        maxWidth: 640,
        margin: "0 auto",
        lineHeight: 1.8,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "var(--blue)",
          textTransform: "uppercase",
          borderBottom: "1.5px solid var(--blue)",
          paddingBottom: 2,
          display: "inline-block",
          marginBottom: 32,
        }}
      >
        FISHLER.AI
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 24, color: "var(--ink)" }}>
        מדיניות פרטיות
      </h1>

      <p style={{ opacity: 0.6, fontSize: 13, marginBottom: 40 }}>
        עודכן לאחרונה: יוני 2026
      </p>

      <Section title="מה אנחנו אוספים">
        כאשר אתה מוריד סוכן מהאתר, אנחנו שומרים את שמך ואימייל שלך בלבד.
        המידע משמש אך ורק לצורך שליחת עדכונים על סוכנים חדשים ומדריכים.
      </Section>

      <Section title="שימוש במידע">
        <ul style={{ paddingRight: 20, margin: 0 }}>
          <li>שליחת הקובץ שביקשת</li>
          <li>עדכונים על כלים ומדריכים חדשים מ-Fishler AI</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          אנחנו לא מוכרים, משכירים או משתפים את הפרטים שלך עם צד שלישי כלשהו.
        </p>
      </Section>

      <Section title="אחסון">
        המידע מאוחסן ב-Airtable. ניתן לבקש מחיקה בכל עת.
      </Section>

      <Section title="הסרה מרשימה">
        לבקשת מחיקת הנתונים שלך, שלח אימייל ל-{" "}
        <a
          href="mailto:almogfish@gmail.com"
          style={{ color: "var(--blue)", textDecoration: "underline" }}
        >
          almogfish@gmail.com
        </a>
        {" "}ואסיר אותך תוך 48 שעות.
      </Section>

      <Section title="יצירת קשר">
        אלמוג פישלר · Fishler AI
        <br />
        <a
          href="mailto:almogfish@gmail.com"
          style={{ color: "var(--blue)", textDecoration: "underline" }}
        >
          almogfish@gmail.com
        </a>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "var(--ink)" }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, opacity: 0.75 }}>{children}</div>
    </section>
  );
}
