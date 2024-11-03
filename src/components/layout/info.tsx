import confetti from "canvas-confetti";
import {
  CakeIcon,
  CakeSliceIcon,
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  LucideProps,
  MailIcon,
  MapPinIcon,
  NotebookIcon,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useMemo } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { env } from "~/env";
import { isBirthday } from "~/lib/helpers";
import { cn } from "~/lib/utils";
import { useMousePosition } from "~/providers/mouse-position";
import { DiscordIcon } from "../icons/discord";

const personalInfo = [
  {
    icon: MapPinIcon,
    label: "Current Location",
    value: "Jupiter, FL, USA",
  },
  {
    icon: NotebookIcon,
    label: "Currently Attending",
    value: "Palm Beach State College",
  },
];

const languageInfo = [
  {
    icon: GlobeIcon,
    label: "Native",
    value: "English",
  },
  {
    icon: GlobeIcon,
    label: "Conversational",
    value: "Spanish",
  },
];

const socialInfo = [
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "ivanoliverfabra",
    href: env.VITE_GITHUB,
    color: "#333",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "ivanoliverfabra",
    href: env.VITE_LINKEDIN,
    color: "#0077B5",
  },
  {
    icon: DiscordIcon,
    label: "Discord",
    value: "@_fabra",
    href: env.VITE_DISCORD,
    color: "#5865F2",
  },
  {
    icon: MailIcon,
    label: "Email",
    value: env.VITE_EMAIL,
    href: `mailto:${env.VITE_EMAIL}`,
    color: "#EA4335",
    className: "w-full",
  },
];

export function MyInfo() {
  const isBirthdayToday = useMemo(() => isBirthday(), []);
  const { setColor } = useMousePosition();

  const handleMouseOver = () => {
    setColor("#F75555");
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        setColor(null);
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        zIndex: 100,
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        zIndex: 100,
      });
    }, 250);
  };
  return (
    <div className="bg-card/80 border rounded-3xl w-full lg:w-[500px] mt-8 h-auto flex flex-col z-[2] relative lg:sticky lg:top-10 inset-y-0 order-first lg:order-2">
      <div className="items-center flex gap-x-4 border-b p-4 w-full">
        <Avatar className="ring ring-muted ring-offset-2 ring-offset-secondary h-14 w-14">
          <AvatarImage src="https://avatars.githubusercontent.com/u/116782642?v=4" />
          <AvatarFallback>IO</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-md font-semibold">Ivan Oliver</h1>
          <p className="text-md text-muted-foreground">@fabra</p>
        </div>
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="w-fit p-4 relative flex-auto place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased flex flex-row gap-3 flex-wrap">
          <InformationBadge
            icon={isBirthdayToday ? CakeSliceIcon : CakeIcon}
            label={isBirthdayToday ? "Happy Birthday!" : "Birthday"}
            value="May 19, 2005"
            onMouseEnter={isBirthdayToday ? handleMouseOver : undefined}
            className={
              isBirthdayToday ? "border-[#F75555] bg-[#F75555]/20" : ""
            }
          />
          {personalInfo.map((info) => (
            <InformationBadge key={info.label} {...info} />
          ))}
          <Separator />
          {languageInfo.map((info) => (
            <InformationBadge key={info.label} {...info} />
          ))}
          <Separator />
          {socialInfo.map((info) => (
            <SocialButton key={info.label} {...info} />
          ))}
          <Separator />
          <div className="flex items-center gap-x-4 w-full">
            <a
              className="whitespace-nowrap text-center rounded-full py-1.5 px-6 border hover:border-primary/25 transition-colors duration-200 hover:bg-primary/5"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
            <Link
              to="/contact"
              className="whitespace-nowrap text-center rounded-full py-1.5 px-6 border hover:bg-primary/90 bg-primary transition-colors duration-200 text-black"
              onMouseEnter={() => setColor("#F75555")}
              onMouseLeave={() => setColor(null)}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}

interface InformationBadgeProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  value: string;
  className?: string;
  onMouseEnter?: () => void;
}

function InformationBadge(props: InformationBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge
          variant="outline"
          className={cn("rounded-full py-1.5 px-3", props.className)}
          onMouseEnter={props.onMouseEnter}
        >
          <props.icon className="w-4 h-4" />
          <span className="ml-2">{props.value}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{props.label}</TooltipContent>
    </Tooltip>
  );
}

interface SocialButtonProps {
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  value: string;
  color: string;
  className?: string;
}

function SocialButton(props: SocialButtonProps) {
  const { setColor } = useMousePosition();

  return (
    <Tooltip>
      <TooltipTrigger className="group">
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          <Badge
            variant="outline"
            className={cn(
              "rounded-full p-1.5 group-hover:bg-primary group-hover:text-background transition-colors duration-200",
              {
                "py-1.5 px-3": props.label === "Email",
              },
              props.className
            )}
            onMouseEnter={() => setColor(props.color)}
            onMouseLeave={() => setColor(null)}
          >
            <props.icon className="w-4 h-4" />
            {props.label === "Email" && (
              <span className="ml-2">{props.value}</span>
            )}
          </Badge>
        </a>
      </TooltipTrigger>
      <TooltipContent>{props.label}</TooltipContent>
    </Tooltip>
  );
}
