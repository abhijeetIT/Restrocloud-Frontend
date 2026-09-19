import axios from 'axios'

const BASE_URL = 'http://localhost:8081'
const client = axios.create({ baseURL: BASE_URL })

client.interceptors.request.use(cfg => {
  const token = localStorage.getItem('rc_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

client.interceptors.response.use(
  res  => res.data,
  err  => {
    const msg = err?.response?.data?.message || err.message || 'Something went wrong'
    return Promise.reject(new Error(msg))
  }
)

export const authApi = {
  login:    data => client.post('/auth/login', data),
  register: data => client.post('/auth/signUp', data),
}
export const restaurantApi = {
  get:    ()   => client.get('/api/restaurant'),
  update: data => client.put('/api/restaurant', data),
  delete: ()   => client.delete('/api/restaurant'),
}
export const menuApi = {
  getAll:        ()         => client.get('/api/menu'),
  getById:       id         => client.get(`/api/menu/${id}`),
  getByCategory: cat        => client.get(`/api/menu/category/${cat}`),
  create:        data       => client.post('/api/menu', data),
  update:        (id, data) => client.put(`/api/menu/${id}`, data),
  deleteById:    id         => client.delete(`/api/menu/${id}`),
}
export const tableApi = {
  getAll:      ()         => client.get('/api/table'),
  getByNumber: num        => client.get(`/api/table/${num}`),
  create:      data       => client.post('/api/table', data),
  update:      (id, data) => client.put(`/api/table/${id}`, data),
  delete:      id         => client.delete(`/api/table/${id}`),
}
export const orderApi = {
  // GET all orders - paginated with filters
  getAll: (page=0, size=10, status=null, startDate=null, endDate=null) => {
    const params = { currentPage: page, size }
    if (status)    params.status    = status
    if (startDate) params.startDate = startDate
    if (endDate)   params.endDate   = endDate
    return client.get('/api/orders', { params })
  },
  getById:        id                      => client.get(`/api/orders/${id}`),
  create:         data                    => client.post('/api/orders', data),
  // Items
  addItem:        (orderId, data)         => client.post(`/api/orders/${orderId}/items`, data),
  updateItem:     (orderId, itemId, data) => client.put(`/api/orders/${orderId}/items/${itemId}`, data),
  removeItem:     (orderId, itemId)       => client.delete(`/api/orders/${orderId}/items/${itemId}`),
  // Status
  complete:       id                      => client.put(`/api/orders/${id}/complete`),
  cancel:         id                      => client.put(`/api/orders/${id}/cancel`),
  // Payment
  processPayment: (orderId, data)         => client.post(`/api/orders/${orderId}/payments`, data),
  getPayment:     orderId                 => client.get(`/api/orders/${orderId}/payments`),
}
export const paymentApi = {
  getAll: (page=0, size=10, status=null, startDate=null, endDate=null) => {
    const params = { currentPage: page, size }
    if (status)    params.status    = status
    if (startDate) params.startDate = startDate
    if (endDate)   params.endDate   = endDate
    return client.get('/api/payments', { params })
  },
  getById:      id         => client.get(`/api/payments/${id}`),
  updateStatus: (id, data) => client.patch(`/api/payments/${id}/status`, data),
  updateMethod: (id, data) => client.patch(`/api/payments/${id}/method`, data),
}
export const analyticsApi = {
  summary: () => client.get('/api/analytics/summary'),
}
export default client

//OTP handled
export const otpApi = {
  send:   data => client.post('/auth/send-otp', data),   // { email, purpose }
  verify: data => client.post('/auth/verify-otp', data), // { email, otp }
  changePassword: data => client.post('/auth/changePassword', data), // { email, password }
}
