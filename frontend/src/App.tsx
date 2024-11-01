import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
    <Route path="/" element={<Home/>}> </Route>
    <Route path="/register" element={<Register/>}> </Route>
    <Route path="/login" element={<Login/>} > </Route>
      </Routes>
    </div>
  )
}

export default App
