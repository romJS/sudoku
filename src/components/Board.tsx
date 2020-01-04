import React from "react";
import styled from "styled-components";
import {
  createBoard,
  checkConflicts,
  checkAndSetConflicts,
  countFilledCells,
  PLAYGROUND_SIZE,
  EMPTY_VALUE
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

const NUM_OF_CELLS = PLAYGROUND_SIZE * PLAYGROUND_SIZE;

type Cell = {
  value: string;
  editable: boolean;
  hasConflict: boolean;
  filled: boolean;
};

type Props = {
  finishGame: () => void;
};

class Board extends React.Component<Props> {
  state = {
    board: createBoard()
  };

  componentDidUpdate() {
    const conflicts = checkConflicts(this.state.board);
    const filled = countFilledCells(this.state.board);
    if (filled === NUM_OF_CELLS && !conflicts) {
      this.props.finishGame();
    }
  }

  handleOnChange = (x: number, y: number, value: string) => {
    let newBoard = this.state.board.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === x && colIndex === y
          ? {
              ...cell,
              ...(value === ""
                ? {
                    value: EMPTY_VALUE,
                    filled: false
                  }
                : {
                    filled: true,
                    value: value
                  })
            }
          : cell
      )
    );
    newBoard = checkAndSetConflicts(newBoard);
    this.setState({ board: newBoard });
  };

  render() {
    return (
      <StyledBoard>
        {this.state.board.map((row, rowIndex) => (
          <StyledRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={cellIndex}
                axisX={rowIndex}
                axisY={cellIndex}
                value={cell.value !== EMPTY_VALUE ? cell.value : ""}
                editable={cell.editable}
                handleOnChange={this.handleOnChange}
                hasConflict={cell.hasConflict}
              />
            ))}
          </StyledRow>
        ))}
      </StyledBoard>
    );
  }
}

export default Board;
