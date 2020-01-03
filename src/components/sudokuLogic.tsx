/// variant of game
let easy =
  "016002400320009000040103000005000069009050300630000800000306010000400072004900680";

const SIZE = 9;

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
  Array.from(easy).forEach((value, index) => {
    values.push(value); // each iteration adds one number to the array
    let newIndex = index + 1;
    let subArrOfBoard: Array<Cell> = [];
    // each ninth iteration crates new array of Cell objects
    if (newIndex % 9 === 0) {
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
    let rowOfCells: Array<Cell> = [];
    row.forEach((cell, y) => {
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
  var c = board;
  checkSubset([c[0][0], c[0][1], c[0][2], c[1][0], c[1][1], c[1][2], c[2][0], c[2][1], c[2][2]]);
  checkSubset([c[3][0], c[3][1], c[3][2], c[4][0], c[4][1], c[4][2], c[5][0], c[5][1], c[5][2]]);
  checkSubset([c[6][0], c[6][1], c[6][2], c[7][0], c[7][1], c[7][2], c[8][0], c[8][1], c[8][2]]);

  checkSubset([c[0][3], c[0][4], c[0][5], c[1][3], c[1][4], c[1][5], c[2][3], c[2][4], c[2][5]]);
  checkSubset([c[3][3], c[3][4], c[3][5], c[4][3], c[4][4], c[4][5], c[5][3], c[5][4], c[5][5]]);
  checkSubset([c[6][3], c[6][4], c[6][5], c[7][3], c[7][4], c[7][5], c[8][3], c[8][4], c[8][5]]);

  checkSubset([c[0][6], c[0][7], c[0][8], c[1][6], c[1][7], c[1][8], c[2][6], c[2][7], c[2][8]]);
  checkSubset([c[3][6], c[3][7], c[3][8], c[4][6], c[4][7], c[4][8], c[5][6], c[5][7], c[5][8]]);
  checkSubset([c[6][6], c[6][7], c[6][8], c[7][6], c[7][7], c[7][8], c[8][6], c[8][7], c[8][8]]);
  return board;
};
/**
 * Checks for same value in one array
 * when finds two equal values, sets conflict on true (for both cells)
 * @param array
 */
const checkSubset = (array: any[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (
        array[i].value === array[j].value && // checks the same value
        array[i].value !== "0" &&
        array[j].value !== "0"
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
    row.forEach((cell, y) => {
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
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
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
    row.forEach((cell, y) => {
      if (board[x][y].filled) {
        filled++;
      }
    });
  });
  return filled;
};
