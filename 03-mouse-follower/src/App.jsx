import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () => {
  const [enabled, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handlemove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if(enabled) {
      window.addEventListener('pointermove', handlemove)
    }
    return () => {
      window.removeEventListener('pointermove', handlemove)
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  return (
    <>
      <div style={{
      position: 'absolute',
      backgroundColor: '#09f',
      borderRadius: '50%',
      opacity: 0.8,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
      transform: `translate(${position.x}px, ${position.y}px)`,
      display: enabled? 'block' : 'none',
      cursor: 'pointer',
      }}/>
      <button onClick={() => {setEnable(!enabled)}}>
        {enabled ? 'Activar' : 'Desactivar'} el puntero
      </button>
    </>
    
  )
}

function App() {
  const [mounted, setMounted] = useState(true)
  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>Desmontar</button>
    </main>
    
  )
}

export default App
