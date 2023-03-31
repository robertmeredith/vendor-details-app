import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SubmissionFormPage = () => {
  const [formOwner, setFormOwner] = useState()
  const { userId } = useParams()

  return (
    <div>
      <h1>Submission Form Page</h1>
    </div>
  )
}

export default SubmissionFormPage
