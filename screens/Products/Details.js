import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SvgXml } from 'react-native-svg'
import { AppButton, Header, Product } from '../../components'
import {
  COLORS,
  FONT1BOLD,
  FONT1LIGHT,
  FONT1REGULAR,
  FONT1SEMIBOLD,
  FONT2BOLD,
  FONT2ITALIC,
  FONT2REGULAR
} from '../../constants'
import Square from '../../assets/svg/square.svg'
import Square4 from '../../assets/svg/4square.svg'
import ProductImage from '../../assets/images/product.png'
import { Icon } from 'react-native-elements'
import { addToCart } from '../../api/customer'
import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppContext from '../../store/Context'

function InventoryDetails ({ navigation, route }) {
  const product = route?.params?.product
  const inventory = route?.params?.inventory
  // Context
  const context = useContext(AppContext)
  const { _getCart } = context
  const [state, setState] = useState({
    active: 0,
    quantity: 0,
    selectedStyle: '',
    loading: false
  })

  const { active, quantity, selectedStyle, loading } = state

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const handleQuantity = type => {
    if (type === 'add') {
      handleChange('quantity', quantity + 3)
    } else {
      handleChange('quantity', quantity > 0 ? quantity - 3 : 0)
    }
  }

  const _addToCart = async () => {
    try {
      handleChange('loading', true)
      const payload = {
        product: product?.id,
        quantity,
        style: selectedStyle
      }
      const token = await AsyncStorage.getItem('token')
      await addToCart(payload, token)
      Toast.show(`Your item has moved to the cart!`)
      _getCart()
      navigation.goBack()
      handleChange('loading', false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loading', false)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

  console.warn('product', product)
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Header back />
      <Image
        source={
          product?.photos?.length > 0
            ? { uri: product?.photos[0]?.image }
            : ProductImage
        }
        style={[styles.image, { height: active ? 200 : 400 }]}
      />
      <View style={styles.rowBetween}>
        <Text style={styles.styleText}>{product?.sid}</Text>
        <View style={styles.row}>
          {product?.styles?.map((color, index) => (
            <TouchableOpacity
              onPress={() =>
                handleChange(
                  'selectedStyle',
                  selectedStyle?.toLowerCase() === color?.toLowerCase()
                    ? ''
                    : color
                )
              }
              key={index}
              style={{
                width:
                  selectedStyle?.toLowerCase() === color?.toLowerCase()
                    ? 30
                    : 20,
                height:
                  selectedStyle?.toLowerCase() === color?.toLowerCase()
                    ? 30
                    : 20,
                marginRight: 5,
                backgroundColor: color?.toLowerCase(),
                borderWidth: 1,
                borderColor: COLORS.black,
                borderRadius: 20
              }}
            />
          ))}
        </View>
        <Text style={styles.price}>${product?.per_pack_price}</Text>
      </View>
      <View style={styles.fullWidth}>
        <Text style={styles.productType}>{product?.type} order</Text>
        <Text style={styles.quantity}>Quantity</Text>
        <View style={styles.rowCount}>
          <TouchableOpacity onPress={handleQuantity}>
            <Icon
              name='minus'
              type='antdesign'
              color={COLORS.primary}
              size={18}
            />
          </TouchableOpacity>
          <Text style={styles.quantityCount}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantity('add')}>
            <Icon
              name='plus'
              type='antdesign'
              color={COLORS.primary}
              size={18}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          order half a pack (1S, 1M, 1L) or a full pack (2S,2M,2L), or combine{' '}
        </Text>
        <View style={styles.hline} />
        <Text style={styles.totalprice}>{/* total price */}</Text>
      </View>
      <View style={styles.buttonWidth}>
        <AppButton
          title={inventory ? 'Order' : 'MOVE ITEMS TO CART'}
          loading={loading}
          onPress={_addToCart}
          disabled={!quantity || !selectedStyle}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
    backgroundColor: COLORS.white
  },
  buttonWidth: {
    width: '80%',
    marginBottom: 40
  },
  image: {
    width: '90%'
  },
  fullWidth: {
    width: '90%',
    marginTop: 20
  },
  rowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    marginTop: 10
  },
  styleText: {
    color: COLORS.black,
    fontSize: hp(3),
    fontFamily: FONT1BOLD
  },
  price: {
    fontSize: hp(2.5),
    fontFamily: FONT1REGULAR
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  productType: {
    color: COLORS.black,
    fontFamily: FONT2ITALIC
  },
  quantity: {
    color: COLORS.black,
    fontFamily: FONT2BOLD,
    marginTop: 10
  },
  quantityCount: {
    color: COLORS.black,
    fontFamily: FONT2BOLD,
    marginHorizontal: 8,
    marginBottom: 5
  },
  description: {
    color: COLORS.black,
    fontFamily: FONT2REGULAR,
    fontSize: hp(1.8)
  },
  totalprice: {
    color: COLORS.totalprice,
    fontFamily: FONT2REGULAR,
    fontSize: hp(2),
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'right'
  },
  hline: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.primary,
    marginTop: 20
  }
})

export default InventoryDetails
