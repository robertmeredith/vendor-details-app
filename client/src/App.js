import Navbar from './components/Navbar'
import Home from './Pages/Home.js'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SubmissionsListPage from './Pages/SubmissionsListPage'
import SingleSubmissionPage from './Pages/SingleSubmissionPage'
import VendorsListPage from './Pages/VendorsListPage'
import EditVendorPage from './Pages/EditVendorPage'
import ResetPassword from './Pages/ResetPassword'
import SubmissionFormPage from './Pages/SubmissionFormPage'
import ClientSubmissionFormPage from './Pages/ClientSubmissionFormPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddVendorPage from './Pages/AddVendorPage'
import SettingsPage from './Pages/SettingsPage'
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
        <ToastContainer {...toastSettings} />
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
          <Route path="/form" element={<SubmissionFormPage />} />
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
