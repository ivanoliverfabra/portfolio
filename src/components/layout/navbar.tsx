import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "~/lib/utils";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Navbar() {
  const location = useLocation();
  const activeIndex = useMemo(
    () => navItems.findIndex((item) => item.href === location.pathname),
    [location.pathname]
  );

  return (
    <header className="py-4 flex z-[60] w-full h-auto items-center justify-center sticky top-0 inset-x-0 border-b border-divider backdrop-blur-lg backdrop-saturate-150 bg-background/70">
      <nav className="flex items-center justify-between w-full container px-4">
        <h1 className="text-lg hidden sm:block">Ivan Oliver</h1>
        <h1 className="text-lg sm:hidden">IO</h1>

        <div className="flex items-center gap-x-6">
          {navItems.map((item, idx) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-md text-muted-foreground relative hover:text-primary",
                {
                  "text-primary": idx === activeIndex,
                }
              )}
            >
              {item.label}
              {idx === activeIndex && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference"
                  style={{ borderRadius: 9999, scale: 1.5 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
