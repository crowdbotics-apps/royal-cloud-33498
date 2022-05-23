import { API } from './'

export const getProducts = (payload, token) => {
  return API.get(`api/v1/products/${payload}`, token)
}
