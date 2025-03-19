import { useState } from 'react'

import './App.css'
import Calculate from './Calculate'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Calculate />

    </div>
  )
}

export default App
