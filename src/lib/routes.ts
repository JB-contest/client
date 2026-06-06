// Central route table — single source of truth for navigation paths.
// Use these instead of string literals so renames are type-safe.

export const ROUTES = {
  login: "/login",
  marketing: {
    root: "/marketing",
    home: "/marketing/home",
    upload: "/marketing/upload",
    feedback: "/marketing/feedback",
    archive: "/marketing/archive",
    cert: (no: string) =>
      `/marketing/archive/${encodeURIComponent(no)}` as const,
  },
  legal: {
    root: "/legal",
    home: "/legal/home",
    review: "/legal/review",
    issue: "/legal/issue",
    history: "/legal/history",
  },
} as const;
