import React, { useContext, useState } from 'react'
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
import { AdminProductCard, Header } from '../../components'
import {
  COLORS,
  FONT1LIGHT,
  FONT1REGULAR,
  FONT1SEMIBOLD
} from '../../constants'
import AppContext from '../../store/Context'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-simple-toast'
import { deleteProduct } from '../../api/admin'

export default function ListProduct ({}) {
  // Context
  const context = useContext(AppContext)
  const { adminProductsLoading, adminProducts, _getAdminProducts } = context
  const [state, setState] = useState({
    loading: false,
    active: 0
  })

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const filteredByType = () => {
    const listFilter = adminProducts?.filter(e =>
      !active ? e.type === 'Inventory' : e.type !== 'Inventory'
    )
    return listFilter
  }

  const _deleteProduct = async id => {
    try {
      handleChange('loading', true)
      const token = await AsyncStorage.getItem('token')
      await deleteProduct(id, token)
      Toast.show(`Product has been deleted!`)
      _getAdminProducts()
      handleChange('loading', false)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loading', false)
      Toast.show(`Error: ${errorText[0]}`)
    }
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
      <Header back tabText={'Feedback'} rightEmpty />
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
                Inventory
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
                Orders
              </Text>
            </View>
            <View style={active === 1 ? styles.activeline : styles.line} />
          </TouchableOpacity>
        </View>
        {adminProductsLoading && (
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        )}
        <SwipeListView
          data={filteredByType()}
          key={'_'}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          keyExtractor={item => '_' + item}
          leftOpenValue={75}
          renderHiddenItem={(data, rowMap) => (
            <View
              style={{
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '90%',
                paddingLeft: 10
              }}
            >
              <TouchableOpacity onPress={() => _deleteProduct(data?.item?.id)}>
                <Icon
                  name={'delete'}
                  type={'antdesign'}
                  color={COLORS.alertButon}
                />
              </TouchableOpacity>
            </View>
          )}
          renderItem={({ item, index }) => {
            return (
              <AdminProductCard
                key={index}
                item={item}
                // handleRemoveItem={handleRemoveItem}
              />
            )
          }}
        />
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
  }
})
