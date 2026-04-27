import config from '../../config/config'

class HttpClient {
  constructor(baseUrl = config.API_BASE) {
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
    const cfg = {
      headers: this.getHeaders(options.headers),
      ...options
    }

    const response = await fetch(url, cfg)

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      if (!response.ok) {
        const error = new Error(`API error on ${endpoint}: ${response.status}`)
        error.status = response.status
        throw error
      }
      return null
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

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) })
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) })
  }

  patch(endpoint, body) {
    return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(body) })
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

export default new HttpClient()