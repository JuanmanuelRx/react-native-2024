export const TURNS = { X: 'X', O: 'O' }
export const WINNER_COMBOS = [
  //HORIZONTAL
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //VERTICAL
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //DIAGONAL
  [0, 4, 8],
  [2, 4, 6],
]

// useEffect(codeToExecute, listOfDependencies)