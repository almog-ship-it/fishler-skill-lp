import { NextRequest, NextResponse } from "next/server";
import { skills } from "@/config/skills";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_LEADS_TABLE_ID = process.env.AIRTABLE_LEADS_TABLE_ID ?? "Leads";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; slug?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { name, email, slug } = body;

  // Validate inputs
  if (!name || !name.trim()) {
    return NextResponse.json({ error: "יש להזין שם" }, { status: 400 });
  }
  if (!email || !email.trim()) {
    return NextResponse.json({ error: "יש להזין אימייל" }, { status: 400 });
  }
  if (!isValidEmail(email.trim())) {
    return NextResponse.json({ error: "כתובת האימייל לא תקינה" }, { status: 400 });
  }
  if (!slug || !slug.trim()) {
    return NextResponse.json({ error: "מזהה הסוכן חסר" }, { status: 400 });
  }

  // Look up skill
  const skill = skills[slug];
  if (!skill) {
    return NextResponse.json({ error: "הסוכן לא נמצא" }, { status: 404 });
  }

  // Save to Airtable
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error("Missing Airtable env vars");
    // Still return the download URL so the user isn't blocked
    return NextResponse.json({ downloadUrl: skill.fileUrl }, { status: 200 });
  }

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_LEADS_TABLE_ID)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name.trim(),
            Email: email.trim(),
            Source: `skill-download-${slug}`,
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const errBody = await airtableRes.text();
      console.error("Airtable error:", airtableRes.status, errBody);
      // Non-blocking: still give the download link even if Airtable fails
    }
  } catch (err) {
    console.error("Airtable fetch error:", err);
    // Non-blocking
  }

  return NextResponse.json({ downloadUrl: skill.fileUrl }, { status: 200 });
}
