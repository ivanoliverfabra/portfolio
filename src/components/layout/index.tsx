import { MousePositionProvider } from "~/providers/mouse-position";
import { Toaster } from "../ui/sonner";
import ErrorBoundary from "./error-boundary";
import { Footer } from "./footer";
import { GridBackground } from "./grid-background";
import { MyInfo } from "./info";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
      <Providers>
        <Navbar />
        <div className="">
          <GridBackground />
          <main className="w-full mx-auto flex flex-col px-2 lg:flex-row">
            <div className="flex items-start h-full w-full flex-col lg:flex-row gap-x-4 justify-center relative">
              <div className="max-w-4xl w-full lg:h-[calc(100vh-130px)] relative">
                {children}
              </div>
              <MyInfo />
            </div>
            <Toaster />
          </main>
        </div>
        <Footer />
      </Providers>
    </ErrorBoundary>
  );
}

function Providers({ children }: LayoutProps) {
  return <MousePositionProvider>{children}</MousePositionProvider>;
}
