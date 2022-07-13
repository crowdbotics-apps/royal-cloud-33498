import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AdminOrders, AdminProductCard, Header } from '../../components'
import {
  COLORS,
  FONT1BOLD,
  FONT1LIGHT,
  FONT1REGULAR,
  FONT1SEMIBOLD
} from '../../constants'
import AppContext from '../../store/Context'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-simple-toast'
import { deleteProduct, getOrderDetails } from '../../api/admin'
import ProductImage from '../../assets/images/product.png'

export default function OrderDetails ({ route }) {
  const item = route?.params?.item
  // Context
  const context = useContext(AppContext)
  const {
    adminProductsLoading,
    adminOrders,
    adminOrdersHalf,
    adminOrdersConfirm,
    _getAdminProducts
  } = context
  const [state, setState] = useState({
    loading: false,
    orderData: null
  })

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  useEffect(() => {
    if (route) {
      _getOrderDetails()
    }
  }, [route])

  const _getOrderDetails = async () => {
    try {
      handleChange('loading', true)
      const token = await AsyncStorage.getItem('token')
      const res = await getOrderDetails(item?.id, token)
      handleChange('orderData', res?.data)
      handleChange('loading', false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loading', false)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

  const { loading, orderData } = state
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.primary} size={'large'} />
      </View>
    )
  }

  console.warn('orderData', orderData)

  return (
    <View style={styles.container}>
      <Header back tabText={'Complete Order'} tab rightEmpty />
      <View style={styles.mainBody}>
        <View style={[styles.productContainer]}>
          <Image
            source={
              orderData?.product?.photos?.length > 0
                ? { uri: orderData?.product?.photos[0]?.image }
                : ProductImage
            }
            style={[styles.image, { height: 200 }]}
          />
          <View style={styles.rowBetween}>
            <Text style={styles.price}>Product: {orderData?.sid}</Text>
            <Text style={styles.price}>Size: {orderData?.items}</Text>
            <View style={styles.styleDiv}>
              <Text style={styles.price}>Color</Text>
              {/* {orderData?.styles?.map((style, index) => ( */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  backgroundColor: orderData?.style?.toLowerCase(),
                  borderWidth: 1,
                  borderColor: COLORS.black,
                  borderRadius: 20
                }}
              />
              {/* ))} */}
            </View>
            <Text style={styles.total}>
              Price: ${orderData?.product?.per_item_price}
            </Text>
            <Text style={[styles.quantity, { marginTop: 10 }]}>
              Customers: {1}
            </Text>
            <Text style={styles.quantity}>Total Packs: {1}</Text>
            <Text style={styles.quantity}>
              Total order Qty: {orderData?.quantity}
            </Text>
            <Text style={styles.quantity}>
              Total Amount: {orderData?.total} $
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: FONT1SEMIBOLD,
            color: COLORS.primary,
            fontSize: hp(2.5)
          }}
        >
          Generate Invoice
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  productContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  mainBody: {
    width: '90%',
    height: '85%',
    alignItems: 'center'
  },

  activeTabText: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    color: COLORS.darkBlack,
    fontSize: hp(3),
    fontFamily: FONT1SEMIBOLD
  },

  tabs: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tab: {
    width: '33.3%',
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
  image: {
    width: '40%',
    marginRight: 10
  },
  rowBetween: {
    width: '50%',
    justifyContent: 'space-between'
  },
  styleText: {
    color: COLORS.black,
    fontSize: hp(3),
    fontFamily: FONT1BOLD
  },
  price: {
    fontSize: hp(2.5),
    fontFamily: FONT1REGULAR,
    color: COLORS.black
  },
  quantity: {
    color: COLORS.black,
    fontSize: hp(2.5),
    fontFamily: FONT1REGULAR
  },
  total: {
    color: COLORS.totalprice,
    fontSize: hp(2.5),
    fontFamily: FONT1BOLD
  },
  removeDiv: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  styleDiv: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
