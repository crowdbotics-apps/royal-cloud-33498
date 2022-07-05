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
import { AppButton, AppInput, CustomModal, Header } from '../../components'
import {
  COLORS,
  FONT1LIGHT,
  FONT1REGULAR,
  FONT1SEMIBOLD,
  PRODUCT_SIZES
} from '../../constants'
import AppContext from '../../store/Context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import uploadphoto from '../../assets/svg/uploadphoto.svg'
import momenttimezone from 'moment-timezone'
import {
  createProduct,
  deleteProduct,
  getAdminProduct,
  sendFeedbackResponse,
  updateProduct
} from '../../api/admin'
import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SvgXml } from 'react-native-svg'
import ImagePicker from 'react-native-image-crop-picker'
import { ColorPicker } from 'react-native-color-picker'
import { Icon } from 'react-native-elements'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

function ProductDetails ({ navigation, route }) {
  const item = route?.params?.item
  // Context
  const context = useContext(AppContext)
  const { users, _getAdminProducts, categories, brands } = context
  const [state, setState] = useState({
    loading: false,
    active: 0,
    type: '',
    brand: '',
    brandText: '',
    category: '',
    categoryText: '',
    per_item_price: '',
    per_pack_price: '',
    size_variance: '',
    stock: '',
    colorstyles: [],
    avatarSourceURL: '',
    photos: null,
    colorOpen: false,
    colorIndex: null
  })

  useEffect(() => {
    if (item) {
    }
    _getAdminProduct()
  }, [item])
  const _getAdminProduct = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await getAdminProduct(item?.id, token)
      console.warn('res?.data', res?.data)
      handleChange('type', res?.data?.type)
      handleChange('brand', res?.data?.brand?.id)
      handleChange('brandText', res?.data?.brand?.name)
      handleChange('category', res?.data?.category?.id)
      handleChange('categoryText', res?.data?.category?.name)
      handleChange(
        'avatarSourceURL',
        res?.data?.photos?.length > 0 ? res?.data?.photos[0]?.image : ''
      )
      handleChange('per_item_price', res?.data?.per_item_price)
      handleChange('per_pack_price', res?.data?.per_pack_price)
      handleChange('description', res?.data?.description)
      handleChange('colorstyles', res?.data?.styles)
      handleChange('stock', res?.data?.stock)
      handleChange('half_pack_available', res?.data?.half_pack_available)
      handleChange('half_pack_orders', res?.data?.half_pack_orders)
      handleChange('half_pack_styles', res?.data?.half_pack_styles)
      handleChange('size_variance', res?.data?.size_variance)
      handleChange('type', res?.data?.type)
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      alert(`Error: ${errorText[0]}`)
    }
  }

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const {
    loading,
    colorOpen,
    colorIndex,
    avatarSourceURL,
    photos,
    active,
    type,
    brand,
    brandText,
    category,
    categoryText,
    per_item_price,
    per_pack_price,
    description,
    size_variance,
    colorstyles,
    stock
  } = state

  const _uploadImage = async type => {
    handleChange('uploading', true)
    let OpenImagePicker =
      type == 'camera'
        ? ImagePicker.openCamera
        : type == ''
        ? ImagePicker.openPicker
        : ImagePicker.openPicker

    OpenImagePicker({
      cropping: true
    })
      .then(async response => {
        const uri = response.path
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const photo = {
          uri: uploadUri,
          name: `image${1}.png`,
          type: response.mime
        }
        handleChange('avatarSourceURL', uploadUri)
        handleChange('photos', photo)
        handleChange('uploading', false)

        Toast.show('Photos Change Successfully')
      })
      .catch(err => {
        handleChange('uploading', false)
      })
  }

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      handleChange('loading', true)
      const fornData = new FormData()
      fornData.append('stock', stock)
      fornData.append('per_pack_price', per_pack_price)
      fornData.append('per_item_price', per_item_price)
      if (type === 'Inventory') {
        fornData.append('size_variance', size_variance)
        fornData.append('brand', brand)
        fornData.append('category', category)
      }
      fornData.append('description', description)
      colorstyles?.length > 0 &&
        colorstyles?.map((color, index) =>
          fornData.append(`styles[${index}]`, color)
        )
      photos && fornData.append(`photos[0]image`, photos)

      await updateProduct(item?.id, fornData, token)
      _getAdminProducts()
      handleChange('photos', [])
      handleChange('avatarSourceURL', '')
      handleChange('loading', false)
      handleChange(`size_variance`, '')
      handleChange(`per_item_price`, '')
      handleChange(`per_pack_price`, '')
      handleChange(`stock`, '')
      handleChange(`brand`, '')
      handleChange(`category`, '')
      handleChange(`description`, '')
      handleChange(`colorstyles`, [])
      navigation.navigate('ListProduct')
      Toast.show('Product update successfully!')
    } catch (error) {
      handleChange('loading', false)
      const errorText = Object.values(error?.response?.data)
      if (errorText?.length > 0) {
        Toast.show(`Error: ${JSON.stringify(error?.response?.data)}`)
      } else {
        Toast.show(`Error: ${error}`)
      }
    }
  }

  const _deleteProduct = async () => {
    try {
      handleChange('loading', true)
      const token = await AsyncStorage.getItem('token')
      await deleteProduct(item?.id, token)
      Toast.show(`Product has been deleted!`)
      _getAdminProducts()
      handleChange('loading', false)
      navigation.navigate('ListProduct')
    } catch (error) {
      const errorText = Object.values(error?.response?.data)
      handleChange('loading', false)
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

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Header back tabText={'Feedback'} rightEmpty />
      <View style={styles.mainBody}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => handleChange('active', 0)}
          >
            <View style={styles.row}>
              <Text style={styles.activeTabText}>Edit {type}</Text>
            </View>
            <View style={styles.activeline} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
            borderBottomWidth: 5,
            borderBottomColor: COLORS.primary
          }}
        >
          <TouchableOpacity onPress={_uploadImage}>
            <Image
              source={{
                uri: avatarSourceURL
              }}
              style={{ width: 100, height: 100, resizeMode: 'cover' }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 5,
              fontFamily: FONT1REGULAR,
              fontSize: hp(2.2)
            }}
          >
            {/* {photos[index]?.name} */}
          </Text>
          <AppInput
            placeholder={'Description'}
            value={description}
            name={`description`}
            onChange={handleChange}
          />

          {/* <View style={{ width: '48%' }}> */}
          <AppInput
            placeholder={'Price Per Item'}
            keyboardType={'number-pad'}
            value={per_item_price}
            name={`per_item_price`}
            onChange={handleChange}
          />
          {/* </View> */}
          <View style={styles.rowBetween}>
            <View style={{ width: '48%' }}>
              <AppInput
                placeholder={'Price Per Pack'}
                keyboardType={'number-pad'}
                value={per_pack_price}
                name={`per_pack_price`}
                onChange={handleChange}
              />
            </View>
            <TouchableOpacity
              style={{
                width: '48%',
                borderBottomColor: COLORS.borderColor,
                borderBottomWidth: 1,
                height: hp('7%'),
                marginTop: hp('1%'),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onPress={() => {
                handleChange('colorOpen', true)
              }}
            >
              {!colorstyles?.length && (
                <Text style={styles.menuTriggerText}>Color</Text>
              )}
              {colorstyles?.map((color, inde) => (
                <View
                  key={inde}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: color
                  }}
                />
              ))}
              <Icon
                name='down'
                type='antdesign'
                color={COLORS.grey}
                size={10}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rowBetween}>
            <View style={[styles.billingType, { width: '48%' }]}>
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
                        {size_variance || 'Size'}
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
                    width: '45%'
                  }}
                >
                  {PRODUCT_SIZES.map(el => (
                    <MenuOption
                      key={el}
                      onSelect={() => handleChange(`size_variance`, el)}
                    >
                      <Text style={{ fontFamily: FONT1LIGHT }}>{el}</Text>
                    </MenuOption>
                  ))}
                </MenuOptions>
              </Menu>
            </View>
            {type !== 'Catalog' && (
              <View style={[styles.billingType, { width: '48%' }]}>
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
                          {categoryText || 'Category'}
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
                      width: '45%'
                    }}
                  >
                    {categories?.map(el => (
                      <MenuOption
                        key={el}
                        onSelect={() => {
                          handleChange(`category`, el?.id)
                          handleChange(`categoryText`, el?.name)
                        }}
                      >
                        <Text style={{ fontFamily: FONT1LIGHT }}>
                          {el?.name}
                        </Text>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
              </View>
            )}
          </View>
          {!active && (
            <View style={styles.rowBetween}>
              <View style={[styles.billingType, { width: '48%' }]}>
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
                          {brandText || 'Brand'}
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
                      width: '45%'
                    }}
                  >
                    {brands?.map(el => (
                      <MenuOption
                        key={el?.id}
                        onSelect={() => {
                          handleChange(`brand`, el?.id)
                          handleChange(`brandText`, el?.name)
                        }}
                      >
                        <Text style={{ fontFamily: FONT1LIGHT }}>
                          {el?.name}
                        </Text>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
              </View>
              <View style={{ width: '48%' }}>
                <AppInput
                  placeholder={'Quantity'}
                  value={stock?.toString()}
                  keyboardType={'number-pad'}
                  name={`stock`}
                  onChange={handleChange}
                />
              </View>
            </View>
          )}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.primary}
              unfillColor={COLORS.white}
              disabled={
                (!active && (!stock || !brand || !category)) ||
                !size_variance ||
                !colorstyles ||
                !per_pack_price
              }
              isChecked={false}
              text='Delete'
              iconStyle={{ borderColor: COLORS.black06, borderRadius: 0 }}
              textStyle={{
                fontFamily: FONT1SEMIBOLD,
                fontSize: hp(2.8),
                color: COLORS.primary
              }}
              style={{ marginVertical: 20 }}
              onPress={_deleteProduct}
            />
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.primary}
              unfillColor={COLORS.white}
              disabled={
                (!active && (!stock || !brand || !category)) ||
                !size_variance ||
                !colorstyles ||
                !per_pack_price
              }
              isChecked={false}
              text='Save'
              iconStyle={{ borderColor: COLORS.black06, borderRadius: 0 }}
              textStyle={{
                fontFamily: FONT1SEMIBOLD,
                fontSize: hp(2.8),
                color: COLORS.primary
              }}
              style={{ marginVertical: 20 }}
              onPress={handleUpdate}
            />
          </View>
        </View>
        <CustomModal
          visible={colorOpen}
          height={'80%'}
          onClose={() => handleChange('colorOpen', false)}
        >
          <View style={styles.modalView}>
            <ColorPicker
              onColorSelected={color => {
                if (colorstyles?.some(e => e === color)) {
                  alert(
                    'You already picked this color please pick different color!'
                  )
                } else {
                  handleChange(
                    `colorstyles`,
                    colorstyles.length > 0 ? [...colorstyles, color] : [color]
                  )
                  handleChange('colorOpen', false)
                }
              }}
              style={{ flex: 1, width: '100%' }}
            />
          </View>
        </CustomModal>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
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
  title: {
    color: COLORS.darkBlack,
    fontSize: hp(2.8),
    fontFamily: FONT1SEMIBOLD
  },
  time: {
    color: COLORS.darkBlack,
    fontSize: hp(2),
    fontFamily: FONT1REGULAR
  },
  content: {
    color: COLORS.darkBlack,
    width: '100%',
    fontSize: hp(2.2),
    fontFamily: FONT1REGULAR
  },
  sendFeedback: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: COLORS.primary
  },
  buttonWidth: {
    width: '80%'
  },
  activeTabText: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    color: COLORS.darkBlack,
    fontSize: hp(3),
    fontFamily: FONT1SEMIBOLD
  },
  listContainer: {
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  listImage: {
    width: 50,
    borderRadius: 50,
    height: 50,
    marginRight: 10
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    marginLeft: 10
  },
  rowBetween: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  tabs: {
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  modalView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
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

export default ProductDetails
