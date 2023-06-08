import Hero from '../components/Hero'
import axios from 'axios'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Alert from '../components/Alert'
import { useSelector } from 'react-redux'

const Home = () => {
  const alert = useSelector((state) => state.alert)

  return (
    <div>
      <h1></h1>
      <Hero />
    </div>
  )
}

export default Home
