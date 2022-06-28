import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SvgXml } from 'react-native-svg'
import ProductImage from '../../assets/images/product.png'
import DeleteIcon from '../../assets/svg/delete.svg'
import { COLORS, FONT1BOLD, FONT1LIGHT, FONT1REGULAR } from '../../constants'

export default function AdminProductCard ({ item, handleRemoveItem }) {
  console.warn('item', item)
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { item })}
      style={[styles.container]}
    >
      <Image
        source={
          item?.photos?.length > 0
            ? { uri: item?.photos[0]?.image }
            : ProductImage
        }
        style={[styles.image, { height: 200 }]}
      />
      <View style={styles.rowBetween}>
        <Text style={styles.price}>Product: ${item?.per_item_price}</Text>
        <Text style={styles.total}>Price: ${item?.per_item_price}</Text>
        <Text style={styles.price}>Size: ${item?.size_variance}</Text>
        <View style={styles.styleDiv}>
          <Text style={styles.price}>Color</Text>
          {item?.styles?.map((style, index) => (
            <View
              key={index}
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                backgroundColor: style?.toLowerCase(),
                borderWidth: 1,
                borderColor: COLORS.black,
                borderRadius: 20
              }}
            />
          ))}
        </View>
        <Text style={styles.quantity}>Category: {item?.category?.name}</Text>
        <Text style={styles.quantity}>Quantity: {item?.stock}</Text>
        <Text style={styles.styleText}>Description:</Text>
        <Text style={styles.quantity}>{item?.description}</Text>
      </View>
    </TouchableOpacity>
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
