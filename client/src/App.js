import Navbar from './Components/Navbar'
import Home from './Pages/Home.js'
import Submissions from './Pages/Submissions'
import Login from './Pages/Login'
import Vendors from './Pages/Vendors'

import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="vendors" element={<Vendors />} />
      </Routes>

    </div>
  )
}

export default App
