import { motion } from "framer-motion";
import { BookOpen, Globe2, Terminal, Webhook } from "lucide-react";
import { Helmet } from "react-helmet";
import { env } from "~/env";

export function AboutPage() {
  return (
    <div className="h-full w-full bg-background/70 backdrop-blur-lg overflow-y-auto overflow-x-hidden mb-16 z-20">
      <Helmet>
        <title>About - Ivan Oliver</title>
      </Helmet>

      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">About Me</h1>

          {/* Card Replacement */}
          <div className="mb-8 p-6 bg-accent/25 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">My Journey</h2>
            </div>
            <p className="text-muted-foreground">
              My journey into technology began at a young age when I first
              explored coding through online tutorials and experimenting with
              plugins in games like Garry&apos;s Mod. Since then, I have pursued
              formal education in Computer Science at Palm Beach State College,
              where I&apos;ve gained a solid foundation in programming languages
              like JavaScript. Along the way, I&apos;ve honed my skills in web
              development, mastering HTML, CSS, and frameworks like React. My
              experience in tech support has enhanced my problem-solving
              abilities and taught me the importance of clear communication. I
              am passionate about creating impactful applications and eager to
              continue learning and growing in the field of full-stack
              development.
            </p>
          </div>

          <div className="mb-8 p-6 bg-accent/25 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Terminal className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">My Skills</h2>
            </div>
            <p className="text-muted-foreground">
              I have a strong foundation in programming languages including{" "}
              <span className="font-semibold">JavaScript</span>,{" "}
              <span className="font-semibold">TypeScript</span>, and{" "}
              <span className="font-semibold">Python</span>. My expertise in web
              development encompasses{" "}
              <span className="font-semibold">HTML</span>,{" "}
              <span className="font-semibold">CSS</span>,{" "}
              <span className="font-semibold">React</span>, and{" "}
              <span className="font-semibold">Express</span>. I am also
              proficient in using{" "}
              <span className="font-semibold">CRM tools</span>, particularly{" "}
              <span className="font-semibold">Salesforce</span>, and have solid
              software proficiency with the{" "}
              <span className="font-semibold">Microsoft Office Suite</span>,{" "}
              <span className="font-semibold">Windows</span>, and{" "}
              <span className="font-semibold">Linux</span>. Additionally, I am
              experienced with version control systems such as{" "}
              <span className="font-semibold">Git</span> and{" "}
              <span className="font-semibold">GitHub</span>.
              <br />
              <br />
              Beyond my technical skills, I possess strong{" "}
              <span className="underline">problem-solving</span> abilities and{" "}
              <span className="underline">attention to detail</span>, which
              enhance my ability to write efficient code. I also excel in{" "}
              <span className="underline">communication</span> and{" "}
              <span className="underline">collaboration</span>, ensuring
              effective teamwork and customer engagement. My experience in tech
              support has further developed my skills in{" "}
              <span className="underline">troubleshooting</span> and{" "}
              <span className="underline">customer satisfaction</span>.
            </p>
          </div>

          <div className="mb-8 p-6 bg-accent/25 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Webhook className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Projects</h2>
            </div>
            <p className="text-muted-foreground">
              Currently, I&apos;m working on developing new projects to showcase
              my skills. Stay tuned for updates!
            </p>
          </div>

          <div className="p-6 bg-accent/25 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Globe2 className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Contact</h2>
            </div>
            <p className="text-muted-foreground">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p>
                If you’d like to get in touch, feel free to reach out via the
                following methods:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Phone</span>:{" "}
                  {env.VITE_NUMBER}
                </li>
                <li>
                  <span className="font-semibold">Email</span>:{" "}
                  <a
                    href={`mailto:${env.VITE_EMAIL}`}
                    className="text-blue-500 hover:underline"
                  >
                    {env.VITE_EMAIL}
                  </a>
                </li>
              </ul>
              <p>
                You can also connect with me on{" "}
                <a
                  href={env.VITE_LINKEDIN}
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>{" "}
                or follow me on{" "}
                <a
                  href={env.VITE_GITHUB}
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>{" "}
                to see my latest work!
              </p>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
