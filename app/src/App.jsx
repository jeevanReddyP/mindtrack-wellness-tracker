import { useState } from 'react'
import './App.css'
import Signup from './Components/Signup'
import Login from './Components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
    </>
  )
}

export default App
