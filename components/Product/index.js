import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ProductImage from '../../assets/images/product.png'
import { COLORS, FONT1BOLD, FONT1REGULAR } from '../../constants'

export default function Product ({ active, item }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('InventoryDetails', { product: item })}
      style={[styles.container, { width: !active ? '100%' : '48%' }]}
    >
      <Image
        source={
          item?.photos?.length > 0
            ? { uri: item?.photos[0]?.image }
            : ProductImage
        }
        style={[styles.image, { height: active ? 200 : 400 }]}
      />
      <View style={styles.rowBetween}>
        <Text style={styles.styleText}>Style</Text>
        <Text style={styles.price}>${item?.per_pack_price}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 20
  },
  image: {
    width: '100%'
  },
  rowBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  styleText: {
    color: COLORS.black,
    fontSize: hp(3),
    fontFamily: FONT1BOLD
  },
  price: {
    fontSize: hp(2.5),
    fontFamily: FONT1REGULAR
  }
})
