import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { getProducts } from '../../api/customer'
import RootStackNav from '../../navigation/RootStackNav'
import AppContext from '../../store/Context'

function AppMenu () {
  const [productLoading, setProductLoading] = useState(false)
  const [user, setUser] = useState([])
  const [products, setProducts] = useState([])

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

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        products,
        _getProducts,
        productLoading
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
