'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient, type RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import styles from './PixelGrid.module.scss';

interface GridCell {
  id: number;
  color: string;
  displayColor: string;
}

const COLORS = ['#FF0000', '#FF7700', '#FFFF00', '#00FF00', '#0000FF', '#7700FF', '#000000', '#FFFFFF'];
const DEFAULT_COLOR = '#1a1a2e';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PixelRow {
  pixel_id: number;
  color: string;
}

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

  const createGridFromMap = (colorMap: Record<number, string> = {}) => {
    const cellCount = GRID_COLS * GRID_ROWS;
    return Array.from({ length: cellCount }, (_, i) => {
      const color = colorMap[i] || DEFAULT_COLOR;
      return {
        id: i,
        color,
        displayColor: color,
      };
    });
  };

  const fetchPixels = async () => {
    try {
      const response = await fetch('/api/pixels', { cache: 'no-store' });
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const serverPixels = data?.pixels || {};

      setGrid((prevGrid) => {
        if (prevGrid.length === 0) {
          return createGridFromMap(serverPixels);
        }

        return prevGrid.map((cell) => {
          const nextColor = serverPixels[cell.id] || DEFAULT_COLOR;
          return {
            ...cell,
            color: nextColor,
            displayColor: nextColor,
          };
        });
      });
    } catch (error) {
      console.error('Failed to fetch pixel grid:', error);
    }
  };

  useEffect(() => {
    // Load initial state, then receive live updates from Supabase Realtime.
    fetchPixels();

    const channel = supabase
      .channel('pixel-grid-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pixel_grid' },
        (payload: RealtimePostgresChangesPayload<PixelRow>) => {
          const next = payload.new as PixelRow | null;
          if (!next || typeof next.pixel_id !== 'number' || !next.color) {
            return;
          }

          setGrid((prevGrid) => {
            if (prevGrid.length === 0) {
              return prevGrid;
            }

            return prevGrid.map((cell) =>
              cell.id === next.pixel_id
                ? { ...cell, color: next.color, displayColor: next.color }
                : cell
            );
          });
        }
      )
      .subscribe();

    // Low-frequency backup sync to handle dropped events/reconnects.
    const interval = setInterval(fetchPixels, 30000);

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
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

  const handleCellClick = async (cellId: number) => {
    // Optimistic UI update for fast painting feedback.
    const previousGrid = grid;
    setGrid((prevGrid) =>
      prevGrid.map((cell) =>
        cell.id === cellId
          ? { ...cell, color: currentColor, displayColor: currentColor }
          : cell
      )
    );

    try {
      const response = await fetch('/api/pixels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pixel_id: cellId, color: currentColor }),
      });

      if (!response.ok) {
        setGrid(previousGrid);
      }
    } catch (error) {
      console.error('Failed to update pixel:', error);
      setGrid(previousGrid);
    }
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
