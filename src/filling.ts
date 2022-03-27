// for guess, NaN is given (hacky but useful), 0 is empty
export type Cell = [actual: number, guess: number];
export type Puzzle = Cell[][];

export function getDisplay(cell: Cell) {
  if (Number.isNaN(cell[1])) return cell[0];
  return cell[1];
}

// generate a random puzzle (currently not random)
export function generate(w: 7, h: 7, seed?: number): Puzzle {
  // temporary hard-coded puzzle
  // i'd like to make this square instead of stupid
  // but prettier won't seem to allow it
  return [
    [
      [3, NaN],
      [3, 0],
      [3, 0],
      [7, 0],
      [7, 0],
      [7, NaN],
      [5, 0],
    ],
    [
      [7, NaN],
      [7, 0],
      [7, 0],
      [7, 0],
      [5, 0],
      [5, 0],
      [5, NaN],
    ],
    [
      [4, 0],
      [4, NaN],
      [4, 0],
      [4, 0],
      [6, NaN],
      [3, NaN],
      [5, 0],
    ],
    [
      [6, NaN],
      [6, 0],
      [6, 0],
      [6, 0],
      [6, 0],
      [3, 0],
      [3, NaN],
    ],
    [
      [2, NaN],
      [2, 0],
      [7, 0],
      [7, 0],
      [7, 0],
      [2, NaN],
      [2, 0],
    ],
    [
      [7, NaN],
      [7, 0],
      [7, 0],
      [5, NaN],
      [5, 0],
      [5, 0],
      [5, NaN],
    ],
    [
      [7, 0],
      [3, NaN],
      [3, 0],
      [3, 0],
      [5, 0],
      [2, 0],
      [2, NaN],
    ],
  ];
}

// solve a puzzle (if possible) without utilizing Puzzle.actual
export function solve(puzzle: Puzzle) {}
