export const PLAYGROUND_SIZE = 9;
export const EMPTY_VALUE = "0";
const E = EMPTY_VALUE;

/// variant of game
let game = [
  E, 1, 6, E, E, 2, 4, E, E,
  3, 2, E, E, E, 9, E, E, E,
  E, 4, E, 1, E, 3, E, E, E,
  E, E, 5, E, E, E, E, 6, 9,
  E, E, 9, E, 5, E, 3, E, E,
  6, 3, E, E, E, E, 8, E, E,
  E, E, E, 3, E, 6, E, 1, E,
  E, E, E, 4, E, E, E, 7, 2,
  E, E, 4, 9, E, E, 6, 8, E
];

type Cell = {
  value: string;
  editable: boolean;
  hasConflict: boolean;
  filled: boolean;
};

/**
 * creates board 9x9
 * @returns array of Cell[]
 */
export const createBoard = () => {
  let board: Array<Cell[]> = [];
  let values: Array<string> = [];
  Array.from(game).forEach((value, index) => {
    values.push(String(value)); // each iteration adds one number to the array
    let newIndex = index + 1;
    let subArrOfBoard: Array<Cell> = [];
    // each ninth iteration crates new array of Cell objects
    if (newIndex % PLAYGROUND_SIZE === 0) {
      subArrOfBoard = values.map(num => ({
        value: num,
        editable: num === "0",
        hasConflict: false,
        filled: num !== "0"
      }));
      values = []; // after the ninth iteration clear the array
      board.push(subArrOfBoard);
    }
  });
  return board;
};
/**
 * Check all conflicts and sets conflict information to cells
 * @param board Board with information about conflicts
 */
export const checkAndSetConflicts = (board: Cell[][]) => {
  clearConflicts(board);
  /// check row conflicts
  board.forEach((row, x) => {
    let rowOfCells: Cell[] = [];
    row.forEach((_, y) => {
      rowOfCells.push(board[x][y]);
    });
    checkSubset(rowOfCells);
  });

  /// check column conflicts
  board.forEach((row, x) => {
    let columnOfCells: Array<Cell> = [];
    row.forEach((cell, y) => {
      columnOfCells.push(board[y][x]);
    });
    checkSubset(columnOfCells);
  });

  /// check conflict in block, each row is one block
  const c = board;
  checkBlock(0, 3, 0, 3, c);
  checkBlock(3, 6, 0, 3, c);
  checkBlock(6, 9, 0, 3, c);

  checkBlock(0, 3, 3, 6, c);
  checkBlock(3, 6, 3, 6, c);
  checkBlock(6, 9, 3, 6, c);

  checkBlock(0, 3, 6, 9, c);
  checkBlock(3, 6, 6, 9, c);
  checkBlock(6, 9, 6, 9, c);

  return board;
};

/**
 * Iterates blocks according to entered coordinates
 * @param fromX  initial axisX
 * @param toX end axisX
 * @param fromY initial axisY
 * @param toY end axisY
 * @param board board 9x9
 */
const checkBlock = (
  fromX: number,
  toX: number,
  fromY: number,
  toY: number,
  board: Cell[][]
) => {
  let block = [];
  for (let i = fromX; i < toX; i++) {
    for (let j = fromY; j < toY; j++) {
      block.push(board[i][j]);
    }
  }
  checkSubset(block);
};

/**
 * Checks for same value in one array
 * when finds two equal values, sets conflict on true (for both cells)
 * @param array
 */
const checkSubset = (array: string | any[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (
        array[i].value === array[j].value && // checks the same value
        array[i].value !== EMPTY_VALUE &&
        array[j].value !== EMPTY_VALUE
      ) {
        array[i].hasConflict = true;
        array[j].hasConflict = true;
      }
    }
  }
};

/**
 * Clear all set conflicts
 * @param board Board array
 */
export const clearConflicts = (board: Cell[][]) => {
  board.forEach((row, x) => {
    row.forEach((_, y) => {
      board[x][y].hasConflict = false;
    });
  });
};

/**
 * checks all cell conflicts
 * @param board Board array
 * @returns true | false
 */
export const checkConflicts = (board: Cell[][]) => {
  for (let x = 0; x < PLAYGROUND_SIZE; x++) {
    for (let y = 0; y < PLAYGROUND_SIZE; y++) {
      if (board[x][y].hasConflict) {
        return true;
      }
    }
  }
  return false;
};

/**
 * checks all cell conflicts
 * @param board Board array
 * @returns true | false
 */
export const countFilledCells = (board: Cell[][]) => {
  let filled = 0;
  board.forEach((row, x) => {
    row.forEach((_, y) => {
      if (board[x][y].filled) {
        filled++;
      }
    });
  });
  return filled;
};
