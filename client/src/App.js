import Navbar from './components/Navbar'
import Home from './pages/Home.js'
import Login from './pages/Login'
import Register from './pages/Register'
import SubmissionsListPage from './pages/SubmissionsListPage'
import SingleSubmissionPage from './pages/SingleSubmissionPage'
import VendorsListPage from './pages/VendorsListPage'
import EditVendorPage from './pages/EditVendorPage'
import ResetPassword from './pages/ResetPassword'
import SubmissionFormPage from './pages/SubmissionFormPage'
import ClientSubmissionFormPage from './pages/ClientSubmissionFormPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddVendorPage from './pages/AddVendorPage'
import SettingsPage from './pages/SettingsPage'
import { Route, Routes } from 'react-router-dom'
import useUser from './hooks/useUser'
import { useNavigate } from 'react-router-dom'
import Auth from './components/Auth'
import { useEffect } from 'react'
import { toastSettings } from './helpers/toastSettingsHelper'



function App() {
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('APP - useEffect running', user)
    if (!user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="min-h-screen">
      <div className="min-h-screen min-w-[24rem]">
        {/* <div className="container m-auto min-w-[35rem]"> */}
        <Navbar user={user} />
        <ToastContainer {...toastSettings}/>
        <Routes>
          <Route path="/" user={user} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route
            path="/submissions"
            element={
              <Auth>
                <SubmissionsListPage />
              </Auth>
            }
          />
          <Route
            path="/submissions/:submissionId"
            element={
              <Auth>
                <SingleSubmissionPage />
              </Auth>
            }
          />
          <Route
            path="/vendors"
            element={
              <Auth>
                <VendorsListPage />
              </Auth>
            }
          />
          <Route
            path="/vendors/new"
            element={
              <Auth>
                <AddVendorPage />
              </Auth>
            }
          />
          <Route
            path="/vendors/:vendorId"
            element={
              <Auth>
                <EditVendorPage />
              </Auth>
            }
          />
          <Route path="/form" element={<SubmissionFormPage />}/>
          <Route path="/:userId/form" element={<ClientSubmissionFormPage />} />
          <Route
            path="/settings"
            element={
              <Auth>
                <SettingsPage />
              </Auth>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
