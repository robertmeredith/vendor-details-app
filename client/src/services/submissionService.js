import axios from 'axios'
const API_URL_SUBMISSIONS = '/api/v1/submissions'


// FETCH ALL SUBMISSIONS - no auth validation - returns all submissions in system
const fetchAllUserSubmissions = async (user) => {
  const { data } = await axios.get('/api/v1/submissions', {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  })
  return data
}



// CREATE SUBMISSION
const createSubmission = async (formData) => {
  console.log('CREATE SUBMISSIONS - SERVICE', formData);
  const { data } = await axios.post(API_URL_SUBMISSIONS, formData)
  return data
}

// GET SINGLE SUBMISSION
const getSubmission = async ({ submissionId, user }) => {
  const { data } = await axios.get(`${API_URL_SUBMISSIONS}/${submissionId}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return data.submission
}

// GET ALL CURRENT USER SUBMISSIONS
const getCurrentUserSubmissions = async (user) => {
  const { data } = await axios.get('/api/v1/submissions/showAllMySubmissions', {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return data
}


export default {
  fetchAllUserSubmissions,
  createSubmission,
  getSubmission,
  getCurrentUserSubmissions,
}
