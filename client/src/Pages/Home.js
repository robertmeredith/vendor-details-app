import React from 'react'
import Hero from '../components/Hero'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
  const fetchData = async () => {
    const response = await axios.get('/api/v1')
    console.log(response)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1></h1>
      <Hero />
    </div>
  )
}

export default Home
