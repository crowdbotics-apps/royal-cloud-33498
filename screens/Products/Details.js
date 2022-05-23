import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SvgXml } from 'react-native-svg'
import { AppButton, Header, Product } from '../../components'
import { COLORS, FONT1BOLD, FONT1REGULAR, FONT1SEMIBOLD } from '../../constants'
import Square from '../../assets/svg/square.svg'
import Square4 from '../../assets/svg/4square.svg'
import ProductImage from '../../assets/images/product.png'

function InventoryDetails ({ navigation, route }) {
  const product = route?.params?.product
  const [state, setState] = useState({
    active: 0
  })

  const { active } = state

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  return (
    <View style={styles.container}>
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
        <Text style={styles.styleText}>Style</Text>
        <View style={styles.row}>
          {product?.styles?.map((color, index) => (
            <View
              key={index}
              style={{
                width: 20,
                height: 20,
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
      <View style={styles.buttonWidth}>
        <AppButton title={'Order'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center'
  },
  buttonWidth: {
    width: '80%'
  },
  image: {
    width: '90%'
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
  }
})

export default InventoryDetails
