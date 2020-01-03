import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  createBoard,
  checkConflicts,
  checkAndSetConflicts,
  countFilledCells
} from "./sudokuLogic";
import Cell from "./Cell";

const StyledBoard = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 477px;
  height: 477px;
  min-width: 300px;
  min-height: 300px;
  max-width: 100vh;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
  margin: auto;
  z-index: 1;
  align-items: flex-start;
`;

const StyledRow = styled.div`
  &:nth-child(3),
  &:nth-child(6) {
    border-bottom: 3px solid #000;
  }
`;

type Cell = {
  value: string;
  editable: boolean;
  hasConflict: boolean;
  filled: boolean;
};

type Props = {
  finishGame: () => void;
};

const Board = ({ finishGame }: Props) => {
  const [board, setBoard] = useState<Cell[][]>(createBoard());

  useEffect(() => {
    const conflicts = checkConflicts(board);
    const count = countFilledCells(board);
    if (count === 81 && !conflicts) {
      finishGame();
    }
  }, [board, finishGame]);

  const handleOnChange = useCallback(
    (x: number, y: number, value: string) => {
      let newBoard = [...board];
      newBoard[x][y].filled = true;
      if (value === "") {
        value = "0";
        newBoard[x][y].filled = false;
      }
      newBoard[x][y].value = value;
      newBoard = checkAndSetConflicts(newBoard);
      setBoard(newBoard);
    },
    [board]
  );
  return (
    <StyledBoard>
      {board.map((row: Array<Cell>, rowIndex) => (
        <StyledRow key={rowIndex}>
          {row.map((cell: Cell, cellIndex) => (
            <Cell
              key={cellIndex}
              axisX={rowIndex}
              axisY={cellIndex}
              value={cell.value !== "0" ? cell.value : ""}
              editable={cell.editable}
              handleOnChange={handleOnChange}
              hasConflict={cell.hasConflict}
            />
          ))}
        </StyledRow>
      ))}
    </StyledBoard>
  );
};

export default Board;
