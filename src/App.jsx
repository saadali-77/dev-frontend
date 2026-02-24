import { New } from "./new"
import './index.css'
import Navbar from './Navbar'
import Body from "./body"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './login'
import Profile from "./Profile"

function App() {
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<Body />}>
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

      {/* <h1 className="text-4xl font-bold text-blue-500">
        Tailwind is working 🚀
      </h1>

      <New />
      <h2>hello world</h2>
      <p>you are here</p>
      <p>this is mine components</p> */}
    </BrowserRouter>
  )
}

export default App