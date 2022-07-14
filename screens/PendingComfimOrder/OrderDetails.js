import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
  AdminOrders,
  AdminProductCard,
  AppButton,
  AppInput,
  CustomModal,
  Header
} from '../../components'
import {
  COLORS,
  FONT1BOLD,
  FONT1LIGHT,
  FONT1REGULAR,
  FONT1SEMIBOLD,
  PRODUCT_SIZES
} from '../../constants'
import AppContext from '../../store/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-simple-toast'
import {
  deleteProduct,
  getOrderDetails,
  getOrderDetailsList,
  markAsConfirmOrder,
  updateOrder
} from '../../api/admin'
import ProductImage from '../../assets/images/product.png'
import editIcon from '../../assets/svg/editIcon.svg'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { SvgXml } from 'react-native-svg'
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { Icon } from 'react-native-elements'

export default function OrderDetails ({ navigation, route }) {
  const item = route?.params?.item
  // Context
  const context = useContext(AppContext)
  const {} = context
  const [state, setState] = useState({
    loading: false,
    orderData: null,
    ids: [],
    updateOpen: false,
    size: '',
    quantity: 0,
    total: 0,
    orderID: '',
    loadingOrder: false,
    loadingConfirm: false
  })

  const {
    loading,
    orderData,
    ids,
    updateOpen,
    size,
    total,
    quantity,
    orderID,
    loadingOrder,
    loadingConfirm
  } = state

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
      const payload = `?id=${item?.product?.id}`
      const res = await getOrderDetailsList(payload, token)
      handleChange('orderData', res?.data)
      handleChange('loading', false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loading', false)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

  const _updateOrder = async () => {
    try {
      handleChange('loadingOrder', true)
      const token = await AsyncStorage.getItem('token')
      const payload = {
        items: size,
        quantity
      }
      await updateOrder(orderID, payload, token)
      _getOrderDetails()
      handleChange('orderID', '')
      handleChange('updateOpen', false)
      handleChange('size', '')
      handleChange('quantity', 0)
      handleChange('total', 0)
      handleChange('loadingOrder', false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loadingOrder', false)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

  const _confirmOrder = async () => {
    try {
      handleChange('loadingConfirm', true)
      const token = await AsyncStorage.getItem('token')
      const payload = `?ids=${ids.toString()}`
      await markAsConfirmOrder(payload, token)
      navigation.navigate('PendingComfimOrder')
      handleChange('ids', [])
      handleChange('loadingConfirm', false)
      Toast.show(`Order has been confirmed!`)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loadingConfirm', false)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

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
      <ScrollView
        style={styles.mainBody}
        nestedScrollEnabled={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <View style={[styles.productContainer]}>
          <Image
            source={
              orderData?.product_info?.photos?.length > 0
                ? { uri: orderData?.product_info?.photos[0]?.image }
                : ProductImage
            }
            style={[styles.image, { height: 200 }]}
          />
          <View style={[styles.rowBetween]}>
            <Text style={styles.price}>
              Product: {orderData?.product_info?.sid}
            </Text>
            <Text style={styles.price}>
              Size: {orderData?.product_info?.size_variance}
            </Text>
            <View style={styles.styleDiv}>
              <Text style={styles.price}>Color</Text>
              {orderData?.product_info?.styles?.map((style, index) => (
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
            <Text style={styles.total}>
              Price: ${orderData?.product_info?.per_item_price}
            </Text>
            <Text style={[styles.quantity, { marginTop: 10 }]}>
              Customers: {orderData?.product_info?.totals?.customer_count}
            </Text>
            <Text style={styles.quantity}>
              Total Packs: {orderData?.product_info?.totals?.pack_count}
            </Text>
            <Text style={styles.quantity}>
              Total order Qty: {orderData?.product_info?.totals?.quantity_count}
            </Text>
            <Text style={styles.quantity}>
              Total Amount: {orderData?.product_info?.totals?.amount_count} $
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
        <FlatList
          data={orderData?.order_list}
          scrollEnabled={false}
          style={{ width: '100%', marginTop: 10 }}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UserOrders', {
                      userID: item?.user?.id || item?.user
                    })
                  }
                >
                  <Text
                    style={[styles.quantity, { fontFamily: FONT1SEMIBOLD }]}
                  >
                    User:User {index + 1}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>Total amount $:</Text>
                <Text style={styles.quantity}>Size:</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={[styles.quantity, { fontFamily: FONT1SEMIBOLD }]}
                  >
                    {item?.quantity}
                  </Text>
                  <Text style={styles.quantity}>{item?.total}</Text>
                  <Text style={styles.quantity}>{item?.items}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    handleChange('updateOpen', true)
                    handleChange('total', item?.total)
                    handleChange('size', item?.items)
                    handleChange('quantity', item?.quantity)
                    handleChange('orderID', item?.id)
                  }}
                >
                  <SvgXml xml={editIcon} />
                </TouchableOpacity>
              </View>
              <BouncyCheckbox
                size={25}
                fillColor={COLORS.primary}
                unfillColor={COLORS.white}
                isChecked={ids.includes(item?.id)}
                text=''
                iconStyle={{ borderColor: COLORS.primary, borderRadius: 0 }}
                textStyle={{
                  fontFamily: FONT1REGULAR,
                  color: COLORS.primary,
                  textDecorationLine: 'underline'
                }}
                style={{ marginVertical: 20 }}
                onPress={() => {
                  if (ids.includes(item?.id)) {
                    ids.filter(e => e !== item?.id)
                    handleChange('ids', ids)
                  } else {
                    handleChange('ids', [...ids, item?.id])
                  }
                }}
              />
            </View>
          )}
        />
        <View style={{ width: '80%' }}>
          <AppButton
            title={'CONFIRM ORDERS'}
            loading={loadingConfirm}
            onPress={_confirmOrder}
            disabled={ids.length === 0}
          />
        </View>
      </ScrollView>
      <CustomModal
        visible={updateOpen}
        height={'50%'}
        onClose={() => handleChange('updateOpen', false)}
      >
        <MenuProvider>
          <View style={styles.modalView}>
            <View style={{ width: '90%', alignItems: 'center' }}>
              <Text style={styles.activeTabText}>Update Order</Text>
              <AppInput
                placeholder={'Quantity'}
                value={quantity?.toString()}
                name={'quantity'}
                onChange={handleChange}
              />
              <AppInput
                placeholder={'Total Amount'}
                value={total}
                name={'total'}
                onChange={handleChange}
              />
              <View style={[styles.billingType]}>
                <Menu
                  style={{ width: '100%' }}
                  rendererProps={{
                    placement: 'bottom'
                  }}
                >
                  <MenuTrigger>
                    <View style={styles.menuTrigger}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Text style={styles.menuTriggerText}>
                          {size || 'Size'}
                        </Text>
                      </View>
                      <Icon
                        name='down'
                        type='antdesign'
                        color={COLORS.grey}
                        size={10}
                      />
                    </View>
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={{
                      width: '90%'
                    }}
                  >
                    {PRODUCT_SIZES.map(el => (
                      <MenuOption
                        key={el}
                        onSelect={() => handleChange(`size`, el)}
                      >
                        <Text style={{ fontFamily: FONT1LIGHT }}>{el}</Text>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
              </View>
              <View
                style={[
                  styles.rowBetween,
                  { width: '90%', flexDirection: 'row' }
                ]}
              >
                <View style={styles.buttonWidth}>
                  <AppButton
                    title={'Cancel'}
                    outlined
                    onPress={() => handleChange('updateOpen', false)}
                  />
                </View>
                <View style={styles.buttonWidth}>
                  <AppButton
                    title={'Update'}
                    loading={loadingOrder}
                    onPress={_updateOrder}
                    disabled={!orderID}
                  />
                </View>
              </View>
            </View>
          </View>
        </MenuProvider>
      </CustomModal>
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
    height: '85%'
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
  },
  modalView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonWidth: {
    width: '48%'
  },
  menuTriggerText: {
    color: COLORS.darkGrey,
    fontSize: hp(2.2),
    fontFamily: FONT1LIGHT
  },
  menuTrigger: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  billingType: {
    width: '100%',
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.white,
    height: hp(7),
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  }
})
