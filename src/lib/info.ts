export const techStacks = {
  languages: [
    {
      title: "TypeScript",
      icon: "/icons/ts.svg",
      url: "https://typescriptlang.org",
      backgroundColor: "#007ACC",
    },
    {
      title: "JavaScript",
      icon: "/icons/js.svg",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      backgroundColor: "#F7DF1E",
    },
    {
      title: "HTML",
      backgroundColor: "#E34F26",
      icon: "/icons/html.svg",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      title: "CSS",
      icon: "/icons/css.svg",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      backgroundColor: "#264de4",
    },
    {
      title: "Python",
      icon: "/icons/py.svg",
      learning: true,
      url: "https://python.org",
      backgroundColor: "#ffda4b",
    },
    {
      title: "Rust",
      icon: "/icons/rs.svg",
      learning: true,
      url: "https://www.rust-lang.org/",
      backgroundColor: "#e43717",
    },
  ],
  frontend: [
    {
      title: "React",
      icon: "/icons/react.svg",
      url: "https://reactjs.org",
      backgroundColor: "#61DAFB",
    },
    {
      title: "Next.js",
      icon: "/icons/next.svg",
      url: "https://nextjs.org",
      backgroundColor: "#fafafa",
    },
    {
      title: "Svelte",
      icon: "/icons/svelte.svg",
      learning: true,
      url: "https://svelte.dev",
      backgroundColor: "#ff3e00",
    },
    {
      title: "Tailwind CSS",
      icon: "/icons/tailwind.svg",
      url: "https://tailwindcss.com",
      backgroundColor: "#38B2AC",
    },
  ],
  backend: [
    {
      title: "Node.js",
      icon: "/icons/nodejs.svg",
      url: "https://nodejs.org",
      backgroundColor: "#339933",
    },
    {
      title: "Express",
      icon: "/icons/express.svg",
      url: "https://expressjs.com",
      backgroundColor: "#ffffff",
    },
    {
      title: "Bun",
      icon: "/icons/bun.svg",
      url: "https://bun.sh",
      backgroundColor: "#fbf0df",
    },
    {
      title: "Hono",
      icon: "/icons/hono.png",
      url: "https://hono.dev",
      backgroundColor: "#fd5a11",
    },
  ],
  devops: [
    {
      title: "Vercel",
      icon: "/icons/vercel.svg",
      url: "https://vercel.com",
      backgroundColor: "#242938",
    },
    {
      title: "Git",
      icon: "/icons/git.svg",
      url: "https://git-scm.com",
      backgroundColor: "#f03c2e",
    },
    {
      title: "AWS",
      icon: "/icons/aws.svg",
      learning: true,
      url: "https://aws.amazon.com",
      backgroundColor: "#e08907",
    },
    {
      title: "Azure",
      icon: "/icons/azure.svg",
      learning: true,
      url: "https://azure.microsoft.com",
      backgroundColor: "#31ade9",
    },
    {
      title: "PostHog",
      icon: "/icons/posthog.png",
      learning: true,
      url: "https://posthog.com",
      backgroundColor: "#2d48e0",
    },
  ],
  databases: [
    {
      title: "PostgreSQL",
      icon: "/icons/psql.svg",
      url: "https://postgresql.org",
      backgroundColor: "#336791",
    },
    {
      title: "Redis",
      icon: "/icons/redis.svg",
      url: "https://redis.io",
      backgroundColor: "#ab2013",
    },
  ],
} as const;

export const technologies = Object.values(techStacks).flat();
