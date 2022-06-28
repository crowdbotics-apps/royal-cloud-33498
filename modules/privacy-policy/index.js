import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import {
  getAdminProducts,
  getBrands,
  getCategories,
  getFeedbacks,
  getNotifications,
  getUsers
} from '../../api/admin'
import { getCart, getProducts } from '../../api/customer'
import RootStackNav from '../../navigation/RootStackNav'
import AppContext from '../../store/Context'

function AppMenu () {
  const [productLoading, setProductLoading] = useState(false)
  const [user, setUser] = useState([])
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [users, setUsers] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [notifications, setNotifications] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [adminProducts, setAdminProducts] = useState([])
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

  const _getUsers = async payload => {
    try {
      const body = payload || ''
      const token = await AsyncStorage.getItem('token')
      const res = await getUsers(body, token)
      setUsers(res?.data)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      alert(`Error: ${errorText[0]}`)
    }
  }

  const _getNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await getNotifications(token)
      setNotifications(res?.data)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      alert(`Error: ${errorText[0]}`)
    }
  }

  const _getFeedbacks = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await getFeedbacks(token)
      setFeedbacks(res?.data)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      alert(`Error: ${errorText[0]}`)
    }
  }

  const _getCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await getCategories(token)
      setCategories(res?.data)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      alert(`Error: ${errorText[0]}`)
    }
  }

  const _getBrands = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await getBrands(token)
      setBrands(res?.data)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      alert(`Error: ${errorText[0]}`)
    }
  }

  const _getAdminProducts = async payload => {
    try {
      const token = await AsyncStorage.getItem('token')
      const body = payload ? payload : ''
      const res = await getAdminProducts(body, token)
      setAdminProducts(res?.data)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
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
        _getCart,
        users,
        _getUsers,
        notifications,
        _getNotifications,
        feedbacks,
        _getFeedbacks,
        categories,
        _getCategories,
        brands,
        _getBrands,
        adminProducts,
        _getAdminProducts
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
