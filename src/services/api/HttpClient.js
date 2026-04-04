import config from '../../config/config'
import { useRouter } from 'vue-router'

const router = useRouter()

class HttpClient {
  constructor(baseUrl = config.API_BASE)  {
    this.baseUrl = baseUrl
  }

  getToken() {
    return localStorage.getItem('auth_token')
  }

  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders
    }

    const token = this.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`

    const config = {
      headers: this.getHeaders(options.headers),
      ...options
    }

    const response = await fetch(url, config)

    if (response.status === 401) {
      localStorage.removeItem('auth_token')
      router.push({ name: 'signin' })
    }

    const data = await response.json()
    
    if (!response.ok) {
      const error = new Error(data.message || `API error on ${endpoint}: ${response.status}`)
      error.data = data
      error.status = response.status
      throw error
    }

    return data
  }

  get(endpoint, body) {
    return this.request(
      endpoint,
      {
        method: 'GET',
        body: JSON.stringify(body)
      }
    )
  }

  post(endpoint, body) {
    return this.request(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(body)
      }
    )
  }

  put(endpoint, body) {
    return this.request(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(body)
      }
    )
  }

  delete(endpoint) {
    return this.request(
      endpoint,
      {
        method: 'DELETE'
      }
    )
  }
}

export default new HttpClient()