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
