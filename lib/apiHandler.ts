import axios, { isAxiosError } from 'axios'

const apiHandler = axios.create({
 baseURL: process.env.NEXT_BACKEND_API_HOST,
 headers: {
  'Content-Type': 'application/json',
 },
})

export { isAxiosError }
export default apiHandler