import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { technologies } from "~/lib/info";

type Project = {
  title: string;
  description: string;
  thumbnailUrl: string;
  technologies: (typeof technologies)[0]["title"][];
  color: string;
  demoUrl?: string;
  sourceUrl?: string;
  releaseDate?: Date;
  status: "planning" | "in-progress" | "completed";
};

const projects: Project[] = [
  {
    title: "Portfolio",
    description: "My personal website, showcasing my projects and blog posts.",
    color: "#121212",
    status: "completed",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vercel", "Redis"],
    thumbnailUrl: "/projects/portfolio/thumbnail.png",
    demoUrl: "https://fabra.tech",
    sourceUrl: "https://github.com/ivanoliverfabra/portfolio",
  },
  {
    title: "amor",
    description:
      "amor lets you find matching profile pictures from user-uploaded content, making it easy to celebrate your connections with complementary designs.",
    thumbnailUrl: "/projects/amor/thumbnail.png",
    technologies: [
      "React",
      "TypeScript",
      "Bun",
      "PostgreSQL",
      "Vercel",
      "Tailwind CSS",
    ],
    color: "#ffe6cc",
    demoUrl: "https://amor.fabra.tech",
    sourceUrl: "https://github.com/ivanoliverfabra/amor",
    releaseDate: new Date("2024-11-02"),
    status: "completed",
  },
];

export function ProjectsPage() {
  return (
    <div className="h-full w-full bg-background/40 backdrop-blur-lg overflow-y-auto overflow-x-hidden mb-16 z-20">
      <Helmet>
        <title>Projects - Ivan Oliver</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto lg:p-8">
          <h1 className="text-4xl font-bold my-4 lg:mb-8 lg:mt-0">
            My Projects
          </h1>
          <div className="grid grid-cols-1 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectCard(project: Project) {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <p className="text-lg">{project.description}</p>
          <p className="text-muted-foreground">
            {project.technologies.join(", ")}
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href={project.demoUrl}
            className="text-primary/80 hover:text-primary/100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Demo
          </a>
          <a
            href={project.sourceUrl}
            className="text-primary/80 hover:text-primary/100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </div>
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="rounded-lg transition-all duration-300 hover:animate-[glow_2s_ease-in-out_infinite]"
          // @ts-expect-error - TS doesn't like custom properties
          style={{ "--background-color": project.color }}
        />
      </div>
      <p className="text-muted-foreground">
        {project.releaseDate?.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
