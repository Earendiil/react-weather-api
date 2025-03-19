import { useState } from 'react'

import './App.css'
import Calculate from './Calculate'
import Weather from './Weather'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Weather />

    </div>
  )
}

export default App
