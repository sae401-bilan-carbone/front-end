import HttpClient from '../api/HttpClient'

class AuthApi {
  async signup(email, password) {
    const data = await HttpClient.post('/register', { email, password })

    if (data.token) {
      localStorage.setItem('auth_token', data.token)
    }

    return data
  }

  async signin(email, password) {
    const data = await HttpClient.post('/signin', { email, password })

    if (data.token) {
      localStorage.setItem('auth_token', data.token)
    }

    return data
  }

  async getMe() {
    return await HttpClient.get('/me')
  }

  logout() {
    localStorage.removeItem('auth_token')
  }
}

export default new AuthApi()