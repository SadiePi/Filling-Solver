import { useState } from "react";
import "./App.css";
import { Cell, generate, Puzzle } from "./filling";

// kinda hacky but i like it
type CellBaseStyle = "blank" | "given" | "normal" | "correct" | "incorrect" | "revealed";
type CellBorderStyle = `${"left " | ""}${"right " | ""}${"top " | ""}${"bottom " | ""}`;
type CellStyle = `${CellBorderStyle}${CellBaseStyle}${" impossible" | ""}`;

function App() {
  const [puzzle, setPuzzle] = useState(generate(7, 7));
  const [reveal, setReveal] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  // decide the className with which to display a cell
  function cellStyle(puzzle: Puzzle, cell: Cell, row: number, col: number): CellStyle {
    let base: CellBaseStyle = "normal";
    if (Number.isNaN(cell[1])) base = "given";
    else if (reveal) base = "revealed";
    else if (cell[1] === 0) base = "blank";
    else if (showCorrect) {
      if (cell[1] === cell[0]) base = "correct";
      else base = "incorrect";
    }

    let border: CellBorderStyle = "";
    if (row === 0 || (cell[1] !== 0 && puzzle[row - 1][col][1] !== 0 && cell[1] !== puzzle[row - 1][col][1]))
      border += "top ";
    if (
      row === puzzle.length - 1 ||
      (cell[1] !== 0 && puzzle[row + 1][col][1] !== 0 && cell[1] !== puzzle[row + 1][col][1])
    )
      border += "bottom ";
    if (col === 0 || (cell[1] !== 0 && puzzle[row][col - 1][1] !== 0 && cell[1] !== puzzle[row][col - 1][1]))
      border += "left ";
    if (
      col === puzzle[0].length - 1 ||
      (cell[1] !== 0 && puzzle[row][col + 1][1] !== 0 && cell[1] !== puzzle[row][col + 1][1])
    )
      border += "right ";

    return `${border as CellBorderStyle}${base}`;
  }

  return (
    <table>
      <tbody>
        {puzzle.map((row, rk) => (
          <tr key={rk}>
            {row.map((cell, ck) => (
              <td key={ck} className={cellStyle(puzzle, cell, rk, ck)}>
                {Number.isNaN(cell[1]) ? cell[0] : cell[1] === 0 ? "" : cell[1]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
