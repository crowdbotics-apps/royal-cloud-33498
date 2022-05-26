import { API } from './'

export const getProducts = (payload, token) => {
  return API.get(`api/v1/products/${payload}`, token)
}

export const addToCart = (payload, token) => {
  return API.post(`api/v1/cart/`, payload, token)
}

export const removeItemFromCart = (payload, token) => {
  return API.delete(`api/v1/cart/remove_item/`, payload, token)
}

export const getCart = token => {
  return API.get(`api/v1/cart/`, token)
}

export const submitToCart = token => {
  return API.get(`api/v1/cart/submit/`, token)
}
