/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getRandomColor, isBirthday } from "~/lib/helpers";
import { useMousePosition } from "~/providers/mouse-position";

const grays = ["#696969", "#4B4B4B", "#333333", "#1C1C1C"];
const GRID_SIZE = 40;
const LOADING_POSITIONS = [
  [-1, 0], // Left
  [-1, -1], // Top-left
  [0, -1], // Top
  [1, -1], // Top-right
  [1, 0], // Right
  [1, 1], // Bottom-right
  [0, 1], // Bottom
  [-1, 1], // Bottom-left
];

interface GridCellProps {
  backgroundColor: string;
  opacity: number;
  isLoading: boolean;
  isLoadingCell: boolean;
}

const GridCell = memo<GridCellProps>(
  ({ isLoadingCell, backgroundColor, isLoading, opacity }) => (
    <div
      className="w-full h-full border border-[#0f0f0f] transition-colors duration-300"
      style={{
        backgroundColor,
        opacity: isLoading ? (isLoadingCell ? 1 : 0) : opacity,
      }}
    />
  )
);

const MAX_DISTANCE = 125;

export function GridBackground() {
  const { position: mousePosition, color, isLoading } = useMousePosition();
  const isTodayBirthday = useMemo(() => isBirthday(), []);
  const [loadingStep, setLoadingStep] = useState(0);

  const windowSizeRef = useRef({ width: 0, height: 0 });
  const [, forceRender] = useState({});

  // Loading animation
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % LOADING_POSITIONS.length);
    }, 150);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const updateSize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      if (
        newWidth !== windowSizeRef.current.width ||
        newHeight !== windowSizeRef.current.height
      ) {
        windowSizeRef.current = { width: newWidth, height: newHeight };
        forceRender({});
      }
    };

    let timeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateSize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    updateSize();

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeout);
    };
  }, []);

  const { cols, rows, totalCells } = useMemo(() => {
    const { width, height } = windowSizeRef.current;
    const calculatedCols = Math.ceil(width / GRID_SIZE);
    const calculatedRows = Math.ceil(height / GRID_SIZE);
    return {
      cols: calculatedCols,
      rows: calculatedRows,
      totalCells: calculatedCols * calculatedRows,
    };
  }, [windowSizeRef.current]);

  const cells = useMemo(() => {
    return Array(totalCells).fill(null);
  }, [totalCells]);

  const getDistance = useCallback(
    (index: number) => {
      if (mousePosition.x === undefined || mousePosition.y === undefined) {
        return MAX_DISTANCE + 1;
      }

      const cell = {
        x: (index % cols) * GRID_SIZE + GRID_SIZE / 2,
        y: Math.floor(index / cols) * GRID_SIZE + GRID_SIZE / 2,
      };

      const dx = cell.x - mousePosition.x;
      const dy = cell.y - mousePosition.y;

      return Math.hypot(dx, dy);
    },
    [cols, mousePosition.x, mousePosition.y]
  );

  if (windowSizeRef.current.width <= 0 || windowSizeRef.current.height <= 0) {
    return null;
  }

  const isLoadingCell = (index: number) => {
    if (
      !isLoading ||
      mousePosition.x === undefined ||
      mousePosition.y === undefined
    )
      return false;

    const col = index % cols;
    const row = Math.floor(index / cols);

    // Calculate which grid cell the mouse is in
    const mouseCol = Math.floor(mousePosition.x / GRID_SIZE);
    const mouseRow = Math.floor(mousePosition.y / GRID_SIZE);

    // Show three cells at a time
    for (let i = 0; i < 3; i++) {
      const position =
        LOADING_POSITIONS[(loadingStep + i) % LOADING_POSITIONS.length];
      if (col === mouseCol + position[0] && row === mouseRow + position[1]) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-75">
      <div
        className="grid relative overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${GRID_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${GRID_SIZE}px)`,
        }}
      >
        {cells.map((_, index) => {
          const distance = getDistance(index);
          const backgroundColor =
            MAX_DISTANCE > distance
              ? color
                ? color
                : isTodayBirthday
                ? getRandomColor()
                : grays[Math.floor((distance / MAX_DISTANCE) * grays.length)]
              : "transparent";

          const opacity = Math.max(0, 1 - distance / MAX_DISTANCE);

          return (
            <GridCell
              key={index}
              backgroundColor={backgroundColor}
              opacity={opacity}
              isLoading={isLoading}
              isLoadingCell={isLoadingCell(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
