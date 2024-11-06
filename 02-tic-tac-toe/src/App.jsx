/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
const TURNS = { X: 'X', O: 'O' }
const WINNER_COMBOS = [
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
const SquareReact = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected?'is-selected' : ''}`
  const handleClick = () => {updateBoard(index)}
  return (
    <button
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[b] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <React.Fragment>
      <main className='board'>
        <h1>Tic tac Toe</h1>
        <section className='game'>
          {board.map((square, index) => (
            <SquareReact
              key={index}
              updateBoard={updateBoard}
              index={index}
            >
              {square}
            </SquareReact>
          ))}
        </section>
        <section className='turn'>
          <SquareReact isSelected={turn === TURNS.X}>{TURNS.X}</SquareReact>
          <SquareReact isSelected={turn === TURNS.O}>{TURNS.O}</SquareReact>
        </section>
        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {winner === false ? 'Empate' : 'El ganador: '}
                </h2>
                <header className='win'>
                  {winner && <SquareReact>{winner}</SquareReact>}
                </header>
                <footer>
                  <button onClick={resetGame}>
                    Empezar de nuevo
                  </button>
                </footer>
              </div>
            </section>
          )
        }
      </main>
    </React.Fragment>
  )
}

export default App
