import { API } from './'

export const getUsers = (payload, token) => {
  return API.get(`api/v1/users/${payload}`, token)
}

export const getNotifications = token => {
  return API.get(`api/v1/notifications/`, token)
}

export const createNotifications = (payload, token) => {
  return API.post(`api/v1/notifications/broadcast/`, payload, token)
}

export const updateUser = (id, payload, token) => {
  return API.patch(`api/v1/users/${id}/`, payload, token)
}

export const getFeedbacks = token => {
  return API.get(`api/v1/feedback/`, token)
}

export const getCategories = token => {
  return API.get(`api/v1/categories/`, token)
}

export const getBrands = token => {
  return API.get(`api/v1/brands/`, token)
}

export const getAdminProducts = (payload, token) => {
  return API.get(`api/v1/products/${payload}`, token)
}

export const getAdminProduct = (id, token) => {
  return API.get(`api/v1/products/${id}/`, token)
}

export const sendFeedbackResponse = (payload, token) => {
  return API.post(`api/v1/feedback/respond/`, payload, token)
}

export const createProduct = (payload, token) => {
  return API.post(`api/v1/products/`, payload, token)
}

export const updateProduct = (id, payload, token) => {
  return API.patch(`api/v1/products/${id}/`, payload, token)
}

export const deleteProduct = (id, token) => {
  return API.delete(`api/v1/products/${id}/`, {}, token)
}

export const getAdminOrders = (payload, token) => {
  return API.get(`api/v1/orders/${payload}`, token)
}

export const getOrderDetails = (id, token) => {
  return API.get(`api/v1/orders/${id}/`, token)
}

export const getOrderDetailsList = (payload, token) => {
  return API.get(`api/v1/admin/orders/invoice_list/${payload}`, token)
}

export const updateOrder = (id, payload, token) => {
  return API.patch(`api/v1/orders/${id}/`, payload, token)
}

export const markAsConfirmOrder = (payload, token) => {
  return API.get(`api/v1/admin/orders/confirm/${payload}`, token)
}

export const sendInvoice = (payload, token) => {
  return API.get(`api/v1/admin/orders/submit_invoice/${payload}`, token)
}
