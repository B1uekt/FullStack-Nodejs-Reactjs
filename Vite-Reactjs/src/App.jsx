import { useEffect } from 'react'
import axios from "./util/axiosCusomize"

function App() {
  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get(`/v1/api`)
      console.log("check res: ", res)
    }
    fetchHelloWorld()
  }, [])

  return (
    <>
      Hello world
    </>
  )
}

export default App
