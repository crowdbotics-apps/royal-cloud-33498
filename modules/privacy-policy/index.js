import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { getCart, getProducts } from '../../api/customer'
import RootStackNav from '../../navigation/RootStackNav'
import AppContext from '../../store/Context'

function AppMenu () {
  const [productLoading, setProductLoading] = useState(false)
  const [user, setUser] = useState([])
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [cartLoading, setCartLoading] = useState(false)

  const _getProducts = async payload => {
    try {
      setProductLoading(true)
      const queryParams = payload ? payload : ''
      const token = await AsyncStorage.getItem('token')
      const res = await getProducts(queryParams, token)
      setProducts(res?.data)
      setProductLoading(false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      setProductLoading(false)
      alert(`Error: ${errorText[0]}`)
    }
  }

  const _getCart = async () => {
    try {
      setCartLoading(true)
      const token = await AsyncStorage.getItem('token')
      const res = await getCart(token)
      setCart(res?.data)
      setCartLoading(false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      setCartLoading(false)
      alert(`Error: ${errorText[0]}`)
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        products,
        _getProducts,
        productLoading,
        cartLoading,
        cart,
        _getCart
      }}
    >
      <RootStackNav />
    </AppContext.Provider>
  )
}

export default {
  title: 'AppMenu',
  navigator: AppMenu
}
