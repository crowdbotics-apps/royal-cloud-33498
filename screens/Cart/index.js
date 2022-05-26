import React, { useCallback, useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppButton, Header, CartCard } from '../../components'
import { COLORS, FONT1SEMIBOLD, FONT2REGULAR } from '../../constants'
import AppContext from '../../store/Context'
import { useFocusEffect } from '@react-navigation/native'
import { removeItemFromCart, submitToCart } from '../../api/customer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-simple-toast'

function Cart ({ navigation }) {
  // Context
  const context = useContext(AppContext)
  const { cartLoading, cart, _getCart } = context
  const [state, setState] = useState({
    date: Date.now(),
    loading: false
  })

  const { loading } = state

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  useFocusEffect(
    useCallback(() => {
      _getCart()
    }, [])
  )

  const handleRemoveItem = async id => {
    try {
      handleChange('loading', true)
      const payload = {
        item: id
      }
      const token = await AsyncStorage.getItem('token')
      await removeItemFromCart(payload, token)
      Toast.show(`Product removed from the cart!`)
      _getCart()
      handleChange('loading', false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loading', false)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

  const _submitToCart = async () => {
    try {
      handleChange('loading', true)
      const token = await AsyncStorage.getItem('token')
      await submitToCart(token)
      Toast.show(`Your order has been submitted!`)
      _getCart()
      handleChange('loading', false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loading', false)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

  console.warn('total_price', cart)

  return (
    <View style={styles.container}>
      <Header back tab tabText={'Cart'} rightEmpty />
      {cartLoading && (
        <ActivityIndicator size={'small'} color={COLORS.primary} />
      )}
      <FlatList
        data={cart?.length > 0 && cart[0]?.orders}
        key={'_'}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        keyExtractor={item => '_' + item}
        renderItem={({ item, index }) => {
          return (
            <CartCard
              key={index}
              item={item}
              handleRemoveItem={handleRemoveItem}
            />
          )
        }}
      />
      <View style={styles.hline} />
      <Text style={styles.totalprice}>
        total price: ${cart?.length > 0 && cart[0]?.total}
      </Text>
      <View style={styles.buttonWidth}>
        <AppButton title={'BUY'} loading={loading} onPress={_submitToCart} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center'
  },
  mainBody: {
    width: '100%',
    alignItems: 'center'
  },
  buttonWidth: {
    width: '80%',
    marginBottom: 20
  },
  line: {
    width: '100%',
    backgroundColor: COLORS.grey,
    height: 5
  },
  activeline: {
    width: '100%',
    backgroundColor: COLORS.darkBlack,
    height: 5
  },
  tabs: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tab: {
    width: '50%',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tabText: {
    color: COLORS.grey,
    fontSize: hp(3),
    marginBottom: 10,
    fontFamily: FONT1SEMIBOLD
  },
  activeTabText: {
    marginBottom: 10,
    color: COLORS.darkBlack,
    fontSize: hp(3),
    fontFamily: FONT1SEMIBOLD
  },
  flatList: {
    width: '90%'
  },
  rowAround: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center'
  },
  totalprice: {
    color: COLORS.totalprice,
    fontFamily: FONT2REGULAR,
    fontSize: hp(2),
    marginBottom: 30,
    marginTop: 10,
    width: '90%',
    textAlign: 'right'
  },
  hline: {
    width: '90%',
    height: 1,
    backgroundColor: COLORS.primary,
    marginTop: 20
  }
})

export default Cart
