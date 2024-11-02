import { createContext, useContext, useEffect, useState } from "react";

type MousePositionContextType = {
  position: { x: number; y: number };
  isMoving: boolean;
  color: string | null;
  setColor: (color: string | null) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const MousePositionContext = createContext<
  MousePositionContextType | undefined
>(undefined);

export function MousePositionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isMoving, setIsMoving] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsMoving(true);
      setPosition({ x: e.clientX, y: e.clientY });

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setTimeoutId(
        window.setTimeout(() => {
          setIsMoving(false);
        }, 300)
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [timeoutId]);

  return (
    <MousePositionContext.Provider
      value={{ position, isMoving, color, setColor, isLoading, setLoading }}
    >
      {children}
    </MousePositionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMousePosition() {
  const context = useContext(MousePositionContext);

  if (context === undefined) {
    throw new Error(
      "useMousePosition must be used within a MousePositionProvider"
    );
  }

  return context;
}
