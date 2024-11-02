import { Routes,Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAuthContext } from "./context/AuthContext"
import { Toaster } from "react-hot-toast"

function App() {
  const  {authUser,isLoading} =useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
    <Route path="/" element={authUser? <Home/>: <Navigate to={"/login"}/>}> </Route>
    <Route path="/register" element={!authUser ? <Register/>: <Navigate to={"/"}/>}> </Route>
    <Route path="/login" element={!authUser ? <Login/>: <Navigate to={"/"}/>} > </Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
