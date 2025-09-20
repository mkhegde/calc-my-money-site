export type Post = {
  slug: string;              // e.g. "welcome"
  title: string;
  excerpt: string;
  date: string;              // ISO date, e.g. "2025-09-21"
  status: "live" | "hidden"; // control what shows in the index/sitemap
};

export const posts: Post[] = [
  {
    slug: "welcome",
    title: "Welcome to CalcMyMoney — plan smarter, stress less",
    excerpt:
      "Why we built this, what’s coming next, and how to get the most out of the calculators.",
    date: "2025-09-21",
    status: "live",
  },
];
