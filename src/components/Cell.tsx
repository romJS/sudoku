import React, { useCallback } from "react";
import styled from "styled-components";

interface PropsCell {
  readonly editable: boolean;
  readonly hasConflict: boolean;
}

export const StyledCell = styled.input<PropsCell>`
  border: 1px solid #000;
  color: ${props => (props.editable ? "green" : "#000")}
  background-color: ${props => (props.hasConflict ? "red" : "#fff")}
  font-weight: bold;
  position: relative;
  width: 45px;
  height: 45px;
  margin: 0.1rem;
  text-align: center;
  overflow: hidden;
  &:nth-child(3),
  &:nth-child(6) {
    border-right: 4px solid #000;
  }
`;

type Props = {
  value: string;
  editable: boolean;
  axisX: number;
  axisY: number;
  handleOnChange: (x: number, y: number, value: string) => void;
  hasConflict: boolean;
};

const Cell = React.memo(
  ({ value, editable, axisX, axisY, handleOnChange, hasConflict }: Props) => {
    const onChange = useCallback(
      (e: any) => {
        const value = e.target.value;
        const result = value.match(/^$|^\d{1}$/) || [];
        if (!result.length) return;
        handleOnChange(axisX, axisY, e.target.value);
      },
      [axisX, axisY, handleOnChange]
    );
    return (
      <StyledCell
        hasConflict={hasConflict}
        editable={editable}
        type="text"
        value={value}
        disabled={!editable}
        onChange={onChange}
      />
    );
  }
);

export default Cell;
