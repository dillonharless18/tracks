import axios from 'axios'
import { AsyncStorage } from 'react-native'


const instance = axios.create({
  baseURL: 'http://c6205a8ac26f.ngrok.io'
})

instance.interceptors.request.use(
  // Called automatically every time you make a request
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },

  // Called automatically every time there is an error making a request
  (err) => {
    console.log(`There was an error ${err}`)
    return Promise.reject(err)
  }
)

export default instance