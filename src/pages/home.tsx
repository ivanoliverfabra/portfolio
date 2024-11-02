import { motion } from "framer-motion";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { useMousePosition } from "~/providers/mouse-position";

export function HomePage() {
  return (
    <div className="h-full w-full bg-background/70 backdrop-blur-lg overflow-y-visible mb-16 z-20">
      <Helmet>
        <title>Ivan Oliver</title>
      </Helmet>

      <TechStackTabs />
      <CertificateSection />
    </div>
  );
}

type TechStackItem = Omit<
  TechStackItemProps,
  "isVisible" | "onMouseEnter" | "onMouseLeave"
>;

const techStacks: {
  languages: TechStackItem[];
  frontend: TechStackItem[];
  backend: TechStackItem[];
  devops: TechStackItem[];
  databases: TechStackItem[];
} = {
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
};

interface TechStackItemProps {
  title: string;
  icon: string;
  learning?: boolean;
  isVisible: boolean;
  url: string;
  backgroundColor: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const TechStackItem = ({
  title,
  icon,
  learning = false,
  isVisible,
  url,
  backgroundColor,
  onMouseEnter,
  onMouseLeave,
}: TechStackItemProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href={url}
        target="_blank"
        className={cn(
          "group",
          isVisible ? "" : "pointer-events-none opacity-0 absolute left-0"
        )}
        rel="noopener noreferrer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <motion.div
          className="bg-card/80 border rounded-lg p-4 flex gap-x-2 group-hover:border-primary/25 group-hover:bg-primary/5 transition-colors duration-200 group-hover:animate-[glow_2s_ease-in-out_infinite]"
          layoutId={title}
          style={{
            opacity: isVisible ? 1 : 0,
            position: isVisible ? "initial" : "absolute",
            y: isVisible ? 0 : -100,
            // @ts-expect-error - TS doesn't like custom properties
            "--background-color": backgroundColor,
          }}
        >
          <Avatar className="w-8 h-8 rounded-md">
            <AvatarImage className="object-contain" src={icon} />
            <AvatarFallback>{title[0]}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold">{title}</h3>
        </motion.div>
      </a>
    </TooltipTrigger>
    <TooltipContent>
      {learning ? "Currently Learning" : "Proficient"}
    </TooltipContent>
  </Tooltip>
);

const tabs: {
  id: number;
  title: Capitalize<keyof typeof techStacks> | "All";
}[] = [
  { id: 1, title: "All" },
  { id: 2, title: "Languages" },
  { id: 3, title: "Frontend" },
  { id: 4, title: "Backend" },
  { id: 5, title: "Devops" },
  { id: 6, title: "Databases" },
];

const TechStackTabs = () => {
  const { setColor } = useMousePosition();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const mouseHandler = (color: string | null) => {
    setColor(color);
  };

  return (
    <div className="h-auto w-full flex flex-col gap-y-4 p-4">
      <div className="items-center flex flex-col sm:flex-row justify-between border-b pt-6 pb-2">
        <h2 className="text-2xl font-semibold hidden sm:block">Tech Stack</h2>

        <div className="flex gap-x-4 max-w-full overflow-hidden md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "hover:border-primary transition-colors duration-200 relative min-w-10 text-md font-semibold"
              )}
            >
              {tab.title}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 -mb-3.5 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="flex-auto h-full w-full p-4 overflow-hidden">
          <div className="w-full h-auto overflow-hidden p-4 relative flex-auto place-content-inherit align-items-inherit break-words text-left subpixel-antialiased flex-row gap-3 flex-wrap flex">
            {Object.values(techStacks).map((value, idx) => {
              const isVisible = activeTab === 1 || activeTab === idx + 2;

              return value.map((item) => (
                <TechStackItem
                  key={item.title}
                  {...item}
                  isVisible={isVisible}
                  onMouseEnter={() => mouseHandler(item.backgroundColor)}
                  onMouseLeave={() => mouseHandler(null)}
                />
              ));
            })}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

interface CertificationItem {
  title: string;
  issuer: string;
  url: string;
  completedAt: Date;
  description: string;
}

const CertificateContent = ({ title, description }: CertificationItem) => (
  <HoverCardContent
    className="w-full max-w-screen-sm pointer-events-none"
    side="top"
    sideOffset={8}
  >
    <div className="flex flex-col gap-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-md">{description}</p>
    </div>
  </HoverCardContent>
);

const certifications: CertificationItem[] = [
  {
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    issuer: "Udemy",
    url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp",
    completedAt: new Date("2023-05"),
    description:
      "Master Node by building a real-world RESTful API and web app (with authentication, Node.js security, payments & more)",
  },
  {
    title: "React - The Complete Guide 2024 (incl. Next.js, Redux)",
    issuer: "Udemy",
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux",
    completedAt: new Date("2023-05"),
    description:
      "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!",
  },
  {
    title: "Become a Certified Web Developer: HTML, CSS and JavaScript",
    issuer: "Udemy",
    url: "https://www.udemy.com/course/become-a-certified-web-developer",
    completedAt: new Date("2023-04"),
    description:
      "Learn: HTML | CSS | JavaScript | Web programming | Web development | Front-end | Responsive | JQuery",
  },
];

const CertificateSection = () => {
  const { setColor } = useMousePosition();
  const colors = ["#FF6384", "#36A2EB", "#FFCE56"];

  return (
    <div className="h-auto w-full flex flex-col gap-y-4 p-4">
      <h2 className="text-2xl font-semibold">Certificates</h2>

      <TooltipProvider delayDuration={0}>
        <div className="w-full h-auto grid xl:grid-cols-2 gap-4">
          {certifications
            .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
            .map((cert, idx) => (
              <CertificateItem
                key={cert.title}
                {...cert}
                onMouseEnter={() => setColor(colors[idx])}
                onMouseLeave={() => setColor(null)}
              />
            ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

interface CertificationItemProps extends CertificationItem {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const CertificateItem = (cert: CertificationItemProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          to={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <motion.div
            className={cn(
              "bg-card/80 border rounded-lg p-4 flex gap-x-2 group-hover:border-primary/25 group-hover:bg-primary/5 transition-colors duration-200",
              cert.className
            )}
            style={cert.style}
            layoutId={cert.title}
            onMouseEnter={cert.onMouseEnter}
            onMouseLeave={cert.onMouseLeave}
          >
            <div>
              <h3 className="text-lg font-semibold line-clamp-1 overflow-hidden">
                {cert.title}
              </h3>
              <p className="text-md text-muted-foreground">
                Issued by {cert.issuer} on{" "}
                {cert.completedAt.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </motion.div>
        </Link>
      </HoverCardTrigger>
      <CertificateContent {...cert} />
    </HoverCard>
  );
};
