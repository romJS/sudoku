import React from "react";
import styled from "styled-components";

const StyledPopUp = styled.div`
  background: #ccc;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  z-index: 2;
  opacity: 0.9;
  position: absolute;
  top: 135px;
  left: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type Props = {
  time: string;
};

const PopUpWindow = ({ time }: Props) => {
  return (
    <StyledPopUp>
      Game Over!!
      <p>You finished this game in: {time}</p>
    </StyledPopUp>
  );
};

export default PopUpWindow;
