import React, { useState, useCallback } from "react";
import Board from "./Board";
import styled from "styled-components";
import PopUpWindow from "./PopUpWindow";
import Time from "./Time";

const StyledGame = styled.div`
  text-align: center;
  width: 500px;
  margin: auto;
  position: relative;
`;

const Game: React.FC = () => {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<string>("");

  const finishGame = useCallback(() => {
    setGameOver(true);
  }, []);

  const gameOverComp = <PopUpWindow time={endTime} />;
  return (
    <StyledGame>
      <h1>SUDOKU</h1>
      <Time
        getTime={time => {
          if (gameOver) {
            setEndTime(time);
          }
        }}
      />
      <Board finishGame={finishGame} />
      {gameOver ? gameOverComp : null}
    </StyledGame>
  );
};

export default Game;
