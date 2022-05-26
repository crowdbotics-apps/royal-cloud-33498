import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SvgXml } from 'react-native-svg'
import ProductImage from '../../assets/images/product.png'
import DeleteIcon from '../../assets/svg/delete.svg'
import { COLORS, FONT1BOLD, FONT1LIGHT, FONT1REGULAR } from '../../constants'

export default function CartCard ({ item, handleRemoveItem }) {
  return (
    <View style={[styles.container]}>
      <Image
        source={
          item?.photos?.length > 0
            ? { uri: item?.photos[0]?.image }
            : ProductImage
        }
        style={[styles.image, { height: 200 }]}
      />
      <View style={styles.rowBetween}>
        <View style={styles.styleDiv}>
          <Text style={styles.styleText}>Style</Text>
          <View
            style={{
              width: 20,
              height: 20,
              marginLeft: 10,
              backgroundColor: item?.style?.toLowerCase(),
              borderWidth: 1,
              borderColor: COLORS.black,
              borderRadius: 20
            }}
          />
        </View>
        <Text style={styles.price}>
          Price per piece: ${item?.product?.per_pack_price}
        </Text>
        <Text style={styles.quantity}>Quantity: {item?.quantity}</Text>
        <Text style={styles.total}>Total: ${item?.total}</Text>
        <TouchableOpacity
          style={styles.removeDiv}
          onPress={() => handleRemoveItem(item?.id)}
        >
          <Text style={styles.quantity}>Remove</Text>
          <SvgXml xml={DeleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20
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
    fontFamily: FONT1BOLD,
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
    fontFamily: FONT1LIGHT
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
