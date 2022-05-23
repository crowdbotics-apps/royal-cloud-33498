import React, { useCallback, useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SvgXml } from 'react-native-svg'
import { AppButton, CustomModal, Header, Product } from '../../components'
import { COLORS, FONT1REGULAR, FONT1SEMIBOLD } from '../../constants'
import Square from '../../assets/svg/square.svg'
import Square4 from '../../assets/svg/4square.svg'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import AppContext from '../../store/Context'
import { useFocusEffect } from '@react-navigation/native'

function Inventory ({ navigation }) {
  // Context
  const context = useContext(AppContext)
  const { productLoading, products, _getProducts } = context
  const [state, setState] = useState({
    active: 0,
    filterOpen: false,
    halfPack: false,
    category: false
  })

  const { active, filterOpen, halfPack, category } = state

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  useFocusEffect(
    useCallback(() => {
      const payload = `?half_pack_available=false&type=Inventory`
      _getProducts(payload)
    }, [])
  )

  const handleFilter = () => {
    const payload = `?half_pack_available=${halfPack}&type=${
      category ? 'Catalog' : 'Inventory'
    }`
    _getProducts(payload)
    handleChange('filterOpen', false)
  }

  console.warn('products', products)
  return (
    <View style={styles.container}>
      <Header
        back
        tab
        tabText={'Inventory'}
        menu
        menuClick={() => handleChange('filterOpen', true)}
      />
      <View style={styles.mainBody}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleChange('active', 0)}
          >
            <View style={styles.row}>
              <SvgXml
                xml={Square}
                style={{ marginRight: 8, marginBottom: 5 }}
              />
              <Text
                style={active === 0 ? styles.activeTabText : styles.tabText}
              >
                1 x 1
              </Text>
            </View>
            <View style={active === 0 ? styles.activeline : styles.line} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleChange('active', 1)}
          >
            <View style={styles.row}>
              <SvgXml
                xml={Square4}
                style={{ marginRight: 8, marginBottom: 5 }}
              />
              <Text
                style={active === 1 ? styles.activeTabText : styles.tabText}
              >
                2 x 2
              </Text>
            </View>
            <View style={active === 1 ? styles.activeline : styles.line} />
          </TouchableOpacity>
        </View>
      </View>
      {productLoading && (
        <ActivityIndicator size={'small'} color={COLORS.primary} />
      )}
      <FlatList
        data={products}
        key={active === 0 ? '#' : '_'}
        numColumns={active === 0 ? 1 : 2}
        columnWrapperStyle={
          active === 1 && {
            justifyContent: 'space-between',
            marginVertical: 5
          }
        }
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        keyExtractor={item => '_' + item}
        renderItem={({ item, index }) => {
          return <Product key={index} item={item} active={active} />
        }}
      />
      <CustomModal
        visible={filterOpen}
        onClose={() => handleChange('filterOpen', false)}
      >
        <View style={styles.modalView}>
          <View style={styles.rowAround}>
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.primary}
              unfillColor={COLORS.white}
              isChecked={halfPack}
              text='Half pack'
              iconStyle={{ borderColor: COLORS.black06, borderRadius: 0 }}
              textStyle={{
                fontFamily: FONT1SEMIBOLD,
                fontSize: hp(2.8),
                color: COLORS.primary
              }}
              style={{ marginVertical: 20 }}
              onPress={() => handleChange('halfPack', !halfPack)}
            />
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.primary}
              unfillColor={COLORS.white}
              isChecked={category}
              text='Category'
              iconStyle={{ borderColor: COLORS.black06, borderRadius: 0 }}
              textStyle={{
                fontFamily: FONT1SEMIBOLD,
                fontSize: hp(2.8),
                color: COLORS.primary
              }}
              style={{ marginVertical: 20 }}
              onPress={() => handleChange('category', !category)}
            />
          </View>
          <View style={styles.buttonWidth}>
            <AppButton title={'APPLY'} onPress={handleFilter} />
          </View>
        </View>
      </CustomModal>
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
    width: '80%'
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  modalView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

export default Inventory
