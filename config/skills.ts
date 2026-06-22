export interface SkillConfig {
  title: string
  description: string
  fileUrl: string
  badge?: string
}

export const skills: Record<string, SkillConfig> = {
  "roaster": {
    title: "Roaster — עורך הדין של השטן",
    description: "סוכן Claude Code שמבקר את הטיוטות שלך בלי רחמים ומחזיר תיקון אחד קונקרטי.",
    fileUrl: "https://raw.githubusercontent.com/almog-ship-it/fishler-agents/main/agents/roaster.md",
    badge: "סוכן AI"
  }
}
