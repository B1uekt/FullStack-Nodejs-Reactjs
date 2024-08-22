import { useEffect } from 'react'
import axios from "./util/axiosCusomize"
import Header from './components/layout/header'
import { Outlet } from "react-router-dom";
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
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
