import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [enabled, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(()=>{
    console.log('Efecto', {enabled})
    const handlemove = (event) => {
      const { clientX, clientY } = event
      setPosition({x: clientX, y: clientY})
    }
    if(enabled) {
      window.addEventListener('pointermove', handlemove)
    }
    return () => {
      window.removeEventListener('pointermove', handlemove)
    }
  }, [enabled])
  return (
    <main>
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
      }}
        />
      <button onClick={() => {setEnable(!enabled)}}>
        {enabled ? 'Activar' : 'Desactivar'} el puntero
      </button>
    </main>
    
  )
}

export default App
