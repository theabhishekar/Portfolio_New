'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './PixelGrid.module.scss';

interface GridCell {
  id: number;
  color: string;
  displayColor: string;
}

const COLORS = ['#FF0000', '#FF7700', '#FFFF00', '#00FF00', '#0000FF', '#7700FF', '#000000', '#FFFFFF'];
const DEFAULT_COLOR = '#1a1a2e';

export default function PixelGrid() {
  const [grid, setGrid] = useState<GridCell[]>([]);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [showPalette, setShowPalette] = useState(false);
  const [palettePosition, setPalettePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const GRID_COLS = 40;
  const GRID_ROWS = 10;

  useEffect(() => {
    // Initialize grid
    const cellCount = GRID_COLS * GRID_ROWS;
    
    // Try to load saved colors from localStorage
    const savedColors = localStorage.getItem('pixelGridColors');
    let initialGrid: GridCell[];
    
    if (savedColors) {
      try {
        const savedColorMap = JSON.parse(savedColors);
        initialGrid = Array.from({ length: cellCount }, (_, i) => {
          const color = savedColorMap[i] || DEFAULT_COLOR;
          return {
            id: i,
            color: color,
            displayColor: color,
          };
        });
      } catch (e) {
        // Fallback if JSON parsing fails
        initialGrid = Array.from({ length: cellCount }, (_, i) => ({
          id: i,
          color: DEFAULT_COLOR,
          displayColor: DEFAULT_COLOR,
        }));
      }
    } else {
      initialGrid = Array.from({ length: cellCount }, (_, i) => ({
        id: i,
        color: DEFAULT_COLOR,
        displayColor: DEFAULT_COLOR,
      }));
    }
    
    setGrid(initialGrid);
  }, []);

  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Position palette right below cursor
    setPalettePosition({
      x: e.clientX,
      y: e.clientY + 15,
    });
  };

  const handleCellHover = (cellId: number) => {
    setHoveredCell(cellId);
    setShowPalette(true);
    setGrid((prevGrid) =>
      prevGrid.map((cell) =>
        cell.id === cellId ? { ...cell, displayColor: currentColor } : cell
      )
    );
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
    setGrid((prevGrid) =>
      prevGrid.map((cell) => ({
        ...cell,
        displayColor: cell.color,
      }))
    );
  };

  const handleGridLeave = () => {
    // Clear any existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    
    // Set a delay before hiding the palette
    hideTimeoutRef.current = setTimeout(() => {
      setShowPalette(false);
      handleCellLeave();
    }, 500); // 500ms delay
  };

  const handleCellClick = (cellId: number) => {
    setGrid((prevGrid) => {
      const updatedGrid = prevGrid.map((cell) =>
        cell.id === cellId
          ? { ...cell, color: currentColor, displayColor: currentColor }
          : cell
      );
      
      // Save to localStorage
      const colorMap: { [key: number]: string } = {};
      updatedGrid.forEach((cell) => {
        if (cell.color !== DEFAULT_COLOR) {
          colorMap[cell.id] = cell.color;
        }
      });
      localStorage.setItem('pixelGridColors', JSON.stringify(colorMap));
      
      return updatedGrid;
    });
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };

  const handlePaletteMouseEnter = () => {
    // Cancel hide timeout if palette is hovered
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setShowPalette(true);
  };

  const handlePaletteMouseLeave = () => {
    // Set delay when leaving palette
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setShowPalette(false);
      handleCellLeave();
    }, 300);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.grid}
          ref={gridRef}
          onMouseMove={handleGridMouseMove}
          onMouseEnter={() => setShowPalette(true)}
          onMouseLeave={handleGridLeave}
        >
          {grid.map((cell) => (
            <div
              key={cell.id}
              className={`${styles.cell} ${
                hoveredCell === cell.id ? styles.hovering : ''
              } ${cell.color !== DEFAULT_COLOR ? styles.painted : ''}`}
              style={{
                backgroundColor: cell.displayColor,
              }}
              onMouseEnter={() => handleCellHover(cell.id)}
              onMouseLeave={handleCellLeave}
              onClick={() => handleCellClick(cell.id)}
            />
          ))}
        </div>

        {showPalette && (
          <div
            className={styles.colorPaletteFloat}
            ref={paletteRef}
            style={{
              left: `${palettePosition.x}px`,
              top: `${palettePosition.y}px`,
            }}
            onMouseEnter={handlePaletteMouseEnter}
            onMouseLeave={handlePaletteMouseLeave}
          >
            <div className={styles.colorGrid}>
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`${styles.colorGridButton} ${
                    currentColor === color ? styles.active : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
