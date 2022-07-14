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
import {
  AdminOrders,
  AdminProductCard,
  AppButton,
  Header
} from '../../components'
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
import { deleteProduct, sendInvoice } from '../../api/admin'
import ProductImage from '../../assets/images/product.png'

export default function UserOrders ({ navigation, route }) {
  const userID = route?.params?.userID
  const user = route?.params?.user
  // Context
  const context = useContext(AppContext)
  const {
    adminProductsLoading,
    adminOrdersActive,
    adminOrdersHistory,
    adminOrdersConfirm,
    _getAdminProducts,
    _getAdminOrders
  } = context
  const [state, setState] = useState({
    loading: false,
    active: 0
  })

  useEffect(() => {
    _getAdminOrders(`?status=Confirmed&user=${userID}`, false, false, true)
    _getAdminOrders(
      `?status=Completed&user=${userID}`,
      false,
      false,
      false,
      true
    )
  }, [])

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const _confirmOrder = async () => {
    try {
      handleChange('loadingConfirm', true)
      const token = await AsyncStorage.getItem('token')
      const payload = `?id=${id.toString()}`
      await sendInvoice(payload, token)
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

  const totalAmount = () => {
    const list = active === 0 ? adminOrdersActive : adminOrdersHistory
    let total = 0
    list?.forEach(element => {
      if (element?.total) {
        total = total + Number(element?.total)
      }
    })
    return total.toFixed(2)
  }

  const { loading, active } = state
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.primary} size={'large'} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header back titleCap title={user?.name} rightEmpty />
      <View style={styles.mainBody}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleChange('active', 0)}
          >
            <View style={styles.row}>
              <Text
                style={active === 0 ? styles.activeTabText : styles.tabText}
              >
                Active
              </Text>
            </View>
            <View style={active === 0 ? styles.activeline : styles.line} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleChange('active', 1)}
          >
            <View style={styles.row}>
              <Text
                style={active === 1 ? styles.activeTabText : styles.tabText}
              >
                History
              </Text>
            </View>
            <View style={active === 1 ? styles.activeline : styles.line} />
          </TouchableOpacity>
        </View>
        {adminProductsLoading && (
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        )}
        <FlatList
          data={active === 0 ? adminOrdersActive : adminOrdersHistory}
          key={'_'}
          showsVerticalScrollIndicator={false}
          style={{ height: '100%' }}
          ListEmptyComponent={() => {
            return (
              <Text style={{ fontFamily: FONT1REGULAR, color: COLORS.primary }}>
                No List
              </Text>
            )
          }}
          keyExtractor={item => '_' + item?.id}
          renderItem={({ item, index }) => {
            return (
              <View style={[styles.container1]}>
                <Image
                  source={
                    item?.product?.photos?.length > 0
                      ? { uri: item?.product?.photos[0]?.image }
                      : ProductImage
                  }
                  style={[styles.image, { height: 200 }]}
                />
                <View style={styles.rowBetween}>
                  <Text style={styles.price}>Product: {item?.sid}</Text>
                  <Text style={styles.price}>Size: {item?.items}</Text>
                  <View style={styles.styleDiv}>
                    <Text style={styles.price}>Color</Text>
                    {/* {item?.styles?.map((style, index) => ( */}
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
                    {/* ))} */}
                  </View>
                  <Text style={styles.total}>
                    Price: ${item?.product?.per_item_price}
                  </Text>
                  <Text
                    style={[
                      styles.quantity,
                      {
                        fontFamily: FONT1BOLD,
                        color: active === 0 ? COLORS.pending : COLORS.completed
                      }
                    ]}
                  >
                    {active === 0 ? 'Pending' : 'Completed'}
                  </Text>
                  {/* <Text style={styles.quantity}>Packs: {1}</Text> */}
                  <Text style={styles.quantity}>
                    order Qty: {item?.quantity}
                  </Text>
                  <Text style={styles.quantity}>
                    Total Amount: {item?.total} $
                  </Text>
                </View>
              </View>
            )
          }}
        />
        <View style={styles.hline} />
        <Text
          style={[
            styles.total,
            { textAlign: 'right', width: '100%', marginTop: 5 }
          ]}
        >
          Total Amount: {totalAmount()} $
        </Text>
        {active === 0 && (
          <View style={{ width: '90%' }}>
            <AppButton title={'Generate Invoice'} />
          </View>
        )}
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
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  mainBody: {
    width: '90%',
    height: '90%',
    alignItems: 'center'
  },
  hline: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.primary,
    marginTop: 10
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
  container1: {
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
