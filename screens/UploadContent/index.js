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
import { createProduct, sendFeedbackResponse } from '../../api/admin'
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

function UploadContent ({ navigation }) {
  // Context
  const context = useContext(AppContext)
  const { users, _getAdminProducts, categories, brands } = context
  const [state, setState] = useState({
    loading: false,
    active: 0,
    filteredList: users || [],
    saerchText: '',
    avatarSourceURL: [],
    photos: [],
    colorOpen: false,
    colorIndex: null
  })

  useEffect(() => {
    if (users) {
      handleChange('filteredList', users)
    }
  }, [users])

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const {
    loading,
    colorOpen,
    colorIndex,
    avatarSourceURL,
    photos,
    active
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
      cropping: true,
      multiple: true
    })
      .then(async response => {
        if (!response.length) {
          handleChange('uploading', false)
        } else {
          const photos = []
          const avatarSourceURLs = []
          for (let i = 0; i < response.length; i++) {
            const element = response[i]
            const uri = element.path
            const uploadUri =
              Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            const photo = {
              uri: uploadUri,
              name: `image${i + 1}.png`,
              type: element.mime
            }
            photos.push(photo)
            avatarSourceURLs.push(uploadUri)
          }
          handleChange('avatarSourceURL', avatarSourceURLs)
          handleChange('photos', photos)
          handleChange('uploading', false)

          Toast.show('Photos Add Successfully')
        }
      })
      .catch(err => {
        handleChange('showAlert', false)
        handleChange('uploading', false)
      })
  }

  const handleCreate = async index => {
    try {
      const token = await AsyncStorage.getItem('token')
      handleChange('loading', true)
      const fornData = new FormData()
      fornData.append('stock', state[`stock${index}`])
      fornData.append('per_pack_price', Number(state[`per_pack_price${index}`]))
      fornData.append('per_item_price', Number(state[`per_item_price${index}`]))
      if (!active) {
        fornData.append('size_variance', state[`size${index}`])
        fornData.append('brand', state[`brand${index}`])
        fornData.append('category', state[`category${index}`])
      }
      fornData.append('description', state[`description${index}`])
      fornData.append('type', active ? 'Catalog' : 'Inventory')
      state[`colors${index}`]?.length > 0 &&
        state[`colors${index}`]?.map((color, index) =>
          fornData.append(`styles[${index}]`, color)
        )
      photos?.length > 0 && fornData.append(`photos[0]image`, photos[index])

      await createProduct(fornData, token)
      photos.splice(index, 1)
      avatarSourceURL.splice(index, 1)
      _getAdminProducts()
      handleChange('photos', photos)
      handleChange('loading', false)
      handleChange(`size${index}`, '')
      handleChange(`per_item_price${index}`, '')
      handleChange(`per_pack_price${index}`, '')
      handleChange(`stock${index}`, '')
      handleChange(`brand${index}`, '')
      handleChange(`category${index}`, '')
      handleChange(`description${index}`, '')
      handleChange(`colors${index}`, [])
      Toast.show('Product create successfully!')
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
        <Text
          style={{ width: '100%', fontFamily: FONT1REGULAR, fontSize: hp(2.2) }}
        >
          Upload photo
        </Text>
        <TouchableOpacity
          style={{ width: '100%', marginTop: 10 }}
          onPress={_uploadImage}
        >
          <SvgXml xml={uploadphoto} width={'100%'} />
        </TouchableOpacity>
        {avatarSourceURL.map((item, index) => (
          <View
            key={index}
            style={{
              width: '100%',
              marginTop: 20,
              marginBottom:20,
              borderBottomWidth: 5,
              borderBottomColor: COLORS.primary
            }}
          >
            <Image
              source={{ uri: item }}
              style={{ width: 100, height: 100, resizeMode: 'cover' }}
            />
            <Text
              style={{
                marginTop: 5,
                fontFamily: FONT1REGULAR,
                fontSize: hp(2.2)
              }}
            >
              {photos[index]?.name}
            </Text>
            <AppInput
              placeholder={'Description'}
              value={state[`description${index}`]}
              name={`description${index}`}
              onChange={handleChange}
            />

            {/* <View style={{ width: '48%' }}> */}
            <AppInput
              placeholder={'Price Per Item'}
              keyboardType={'number-pad'}
              value={state[`per_item_price${index}`]}
              name={`per_item_price${index}`}
              onChange={handleChange}
            />
            {/* </View> */}
            <View style={styles.rowBetween}>
              <View style={{ width: '48%' }}>
                <AppInput
                  placeholder={'Price Per Pack'}
                  keyboardType={'number-pad'}
                  value={state[`per_pack_price${index}`]}
                  name={`per_pack_price${index}`}
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
                  handleChange('colorIndex', index)
                }}
              >
                {!state[`colors${index}`]?.length && (
                  <Text style={styles.menuTriggerText}>Color</Text>
                )}
                {state[`colors${index}`]?.map((color, inde) => (
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
                          {state[`size${index}`] || 'Size'}
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
                        onSelect={() => handleChange(`size${index}`, el)}
                      >
                        <Text style={{ fontFamily: FONT1LIGHT }}>{el}</Text>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
              </View>
              {!active && (
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
                            {state[`categoryText${index}`] || 'Category'}
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
                            handleChange(`category${index}`, el?.id)
                            handleChange(`categoryText${index}`, el?.name)
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
                            {state[`brandText${index}`] || 'Brand'}
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
                            handleChange(`brand${index}`, el?.id)
                            handleChange(`brandText${index}`, el?.name)
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
                    value={state[`stock${index}`]}
                    keyboardType={'number-pad'}
                    name={`stock${index}`}
                    onChange={handleChange}
                  />
                </View>
              </View>
            )}
            <View style={{ width: '100%', alignItems: 'flex-end' }}>
              <BouncyCheckbox
                size={25}
                fillColor={COLORS.primary}
                unfillColor={COLORS.white}
                disabled={
                  (!active &&
                    (!state[`stock${index}`] ||
                      !state[`brand${index}`] ||
                      !state[`category${index}`])) ||
                  !state[`size${index}`] ||
                  !state[`colors${index}`] ||
                  !state[`per_pack_price${index}`]
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
                onPress={() => handleCreate(index)}
              />
            </View>
          </View>
        ))}
        <CustomModal
          visible={colorOpen}
          height={'80%'}
          onClose={() => handleChange('colorOpen', false)}
        >
          <View style={styles.modalView}>
            <ColorPicker
              onColorSelected={color => {
                if (state[`colors${colorIndex}`]?.some(e => e === color)) {
                  alert(
                    'You already picked this color please pick different color!'
                  )
                } else {
                  handleChange(
                    `colors${colorIndex}`,
                    state[`colors${colorIndex}`]
                      ? [...state[`colors${colorIndex}`], color]
                      : [color]
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

export default UploadContent
