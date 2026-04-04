import HttpClient from '../api/HttpClient'

class AuthApi {
  async signup(email, password, name) {
    const data = await HttpClient.post('/register', { email, password, name })

    if (data.token) {
      localStorage.setItem('auth_token', data.token)
    }

    return data
  }

  async signin(email, password) {
    const data = await HttpClient.post('/login', { email, password })

    if (data.token) {
      localStorage.setItem('auth_token', data.token)
    }

    return data
  }

  async getMe() {
    return await HttpClient.get('/me')
  }

  async patchMe(name) {
    return await HttpClient.patch('/me', { name })
  }

  logout() {
    localStorage.removeItem('auth_token')
  }
}

export default new AuthApi()