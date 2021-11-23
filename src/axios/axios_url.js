import axios from 'axios'

export default axios.create({
  baseURL: 'localhost:3004', // 'https://react-quiz-3e9b0.firebaseio.com/'
})
