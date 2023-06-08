import Navbar from './components/Navbar'
import Home from './pages/Home.js'
import Login from './pages/Login'
import Register from './pages/Register'
import Submissions from './pages/Submissions'
import Submission from './pages/Submission'
import Vendors from './pages/Vendors'
import SubmissionFormPage from './pages/SubmissionFormPage'
import { ToastContainer } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { getUserFromLocalStorage } from './helpers/localStorageHelper'

import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <div className="container m-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/submissions/:submissionId" element={<Submission />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/:userId/form" element={<SubmissionFormPage />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
