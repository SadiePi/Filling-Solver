import { useEffect, useState } from "react";
import "./App.css";
import { Cell, generate, getDisplay, Puzzle } from "./filling";

// kinda hacky but i like it
type Tag<S extends string> = ` ${S}` | "";
type CellBaseStyle = "blank" | "given" | "normal" | "correct" | "incorrect" | "revealed";
type CellBorderStyle = `${Tag<"left">}${Tag<"right">}${Tag<"top">}${Tag<"bottom">}`;
type CellStyle = `${CellBaseStyle}${CellBorderStyle}${Tag<"impossible">}${Tag<"selected">}`;

function App() {
  const [puzzle, setPuzzle] = useState(generate(7, 7));
  const [reveal, setReveal] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [selected, setSelected] = useState<Cell[]>([]);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    const keypress = (ev: KeyboardEvent) => {
      try {
        console.log("key");

        const i = parseInt(ev.key);
        selected.forEach(c => (c[1] = i));
      } catch {}
      setPuzzle(p => [...p]);
    };
    document.addEventListener("keypress", keypress);

    const mouseup = () => setSelecting(false);
    document.addEventListener("mouseup", mouseup);

    const mousemove = (ev: MouseEvent) => ev.preventDefault();
    document.addEventListener("mousemove", mousemove);
    return () => {
      document.removeEventListener("keypress", keypress);
      document.removeEventListener("mouseup", mouseup);
      document.removeEventListener("mousemove", mousemove);
    };
  }, [puzzle, selected]);

  // decide the className with which to display a cell
  function cellStyle(puzzle: Puzzle, cell: Cell, row: number, col: number): CellStyle {
    // this is nice
    let base: CellBaseStyle = "normal";
    if (Number.isNaN(cell[1])) base = "given";
    else if (reveal) base = "revealed";
    else if (cell[1] === 0) base = "blank";
    else if (showCorrect) {
      if (cell[1] === cell[0]) base = "correct";
      else base = "incorrect";
    }

    // this is gross
    let border: CellBorderStyle = "";
    const display = getDisplay(cell);
    if (
      row === 0 ||
      (display !== 0 && getDisplay(puzzle[row - 1][col]) !== 0 && display !== getDisplay(puzzle[row - 1][col]))
    )
      border += " top";
    if (
      row === puzzle.length - 1 ||
      (display !== 0 && getDisplay(puzzle[row + 1][col]) !== 0 && display !== getDisplay(puzzle[row + 1][col]))
    )
      border += " bottom";
    if (
      col === 0 ||
      (display !== 0 && getDisplay(puzzle[row][col - 1]) !== 0 && display !== getDisplay(puzzle[row][col - 1]))
    )
      border += " left";
    if (
      col === puzzle[0].length - 1 ||
      (display !== 0 && getDisplay(puzzle[row][col + 1]) !== 0 && display !== getDisplay(puzzle[row][col + 1]))
    )
      border += " right";

    // TODO check impossible

    return `${base}${border as CellBorderStyle}${selected.includes(cell) ? " selected" : ""}`;
  }

  return (
    <table>
      <tbody>
        {puzzle.map((row, rk) => (
          <tr key={rk}>
            {row.map((cell, ck) => (
              <td
                onMouseDown={() => {
                  if (Number.isNaN(cell[1])) return;
                  setSelected([cell]);
                  setSelecting(true);
                }}
                onMouseEnter={() => {
                  if (Number.isNaN(cell[1])) return;
                  if (selecting && !selected.includes(cell)) {
                    setSelected([cell, ...selected]);
                  }
                }}
                key={ck}
                className={cellStyle(puzzle, cell, rk, ck)}>
                {Number.isNaN(cell[1]) ? cell[0] : cell[1] === 0 ? "" : cell[1]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {/* <caption>{selected.map(getDisplay)}</caption> */}
    </table>
  );
}

export default App;
