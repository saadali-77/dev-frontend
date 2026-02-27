import './index.css'

import Body from "./components/body"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from './components/login'
import Profile from "./components/Profile"
import { Feed } from "./components/Feed"
import { Signup } from './components/Signup'
import { Connections } from './components/Connections'
import { Requests } from './components/Requests'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="feed" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App