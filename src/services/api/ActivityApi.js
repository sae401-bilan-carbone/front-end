import HttpClient from './HttpClient'

class ActivityApi {
  create(type, data) {
    return HttpClient.post('/activities', { type, data })
  }

  getAll() {
    return HttpClient.get('/activities')
  }

  getStats() {
    return HttpClient.get('/activities/stats')
  }

  delete(id) {
    return HttpClient.delete(`/activities/${id}`)
  }
}

export default new ActivityApi()