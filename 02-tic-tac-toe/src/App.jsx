import React, { useEffect } from 'react'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { SquareReact } from './components/Square.jsx'

import { TURNS } from './constants.js'
import { checkEndGame, checkWinnerFrom } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { resetGameStorage, saveGameToStorage } from './logic/storage/index.js'

function App() {
  const [board, setBoard] = useState(() => { 
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null) 
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //GUARDAR PARTIDA
    saveGameToStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  useEffect(()=> {
    console.log('useEffect')
  }, [winner])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
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
        <WinnerModal winner={winner} resetGame={resetGame}/>
      </main>
    </React.Fragment>
  )
}

export default App
