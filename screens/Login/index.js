import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { Icon } from 'react-native-elements'
import { COLORS, FONT1BOLD, FONT1REGULAR, FONT1SEMIBOLD } from '../../constants'
import { AppButton, AppInput } from '../../components'
import { loginUser, signupUser } from '../../api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppContext from '../../store/Context'
import Toast from 'react-native-simple-toast'
import { SvgXml } from 'react-native-svg'
import logo from '../../assets/svg/logo.svg'
import PhoneInput from 'react-native-phone-number-input'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function LoginScreen ({ navigation }) {
  // Context
  const context = useContext(AppContext)
  const { setUser } = context

  const [state, setState] = useState({
    email: '',
    name: '',
    last_name: '',
    phone: '',
    password: '',
    confirm_password: '',
    isEmailValid: false,
    invalidPass: false,
    loading: false,
    showPassword: false,
    isChecked: false,
    showConfirmPassword: false,
    active: 0,
    isAdmin: false
  })

  const {
    loading,
    showPassword,
    confirm_password,
    phone,
    password,
    active,
    invalidPass,
    showConfirmPassword,
    last_name,
    name,
    isChecked,
    isAdmin,
    email
  } = state

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const handleLogin = async () => {
    try {
      handleChange('loading', true)
      let payload
      if (isAdmin) {
        payload = {
          email,
          password
        }
      } else {
        payload = {
          phone,
          password
        }
      }
      console.warn('payload',payload);
      const res = await loginUser(payload)
      handleChange('loading', false)
      setUser(res?.data?.user)
      console.warn('loginUser', res?.data)
      await AsyncStorage.setItem('token', res?.data?.token)
      await AsyncStorage.setItem('user', JSON.stringify(res?.data?.user))
      navigation.navigate('AuthLoading')
      Toast.show('Login Successfully!')
    } catch (error) {
      handleChange('loading', false)
      console.warn('err', error)
      const errorText = Object.values(error?.response?.data)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

  const handleSignup = async () => {
    try {
      handleChange('loading', true)
      const payload = {
        name,
        last_name,
        phone,
        password
      }
      const res = await signupUser(payload)
      handleChange('loading', false)
      setUser(res?.data?.user)
      console.warn('signupUser', res?.data)
      await AsyncStorage.setItem('token', res?.data?.token)
      await AsyncStorage.setItem('user', JSON.stringify(res?.data?.user))
      navigation.navigate('AuthLoading')
      Toast.show('Signup Successfully!')
    } catch (error) {
      handleChange('loading', false)
      const errorText = Object.values(error?.response?.data)
      Toast.show(`Error: ${errorText[0]}`)
    }
  }

  const checkPass = () => {
    const regex = /^.{6,}$/
    if (regex.test(password)) {
      if (password != '') {
        handleChange('invalidPass', false)
      } else {
        handleChange('password', '')
      }
    } else {
      handleChange('invalidPass', true)
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View style={styles.top}>
          <SvgXml xml={logo} width={200} style={{ marginBottom: 20 }} />
          <View style={[styles.tabs, { justifyContent: 'center' }]}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => handleChange('active', 0)}
            >
              <Text
                style={active === 0 ? styles.activeTabText : styles.tabText}
              >
                {isAdmin ? 'Admin Sign In' : 'Sign In'}
              </Text>
              <View style={active === 0 ? styles.activeline : styles.line} />
            </TouchableOpacity>
            {!isAdmin && (
              <TouchableOpacity
                style={styles.tab}
                onPress={() => handleChange('active', 1)}
              >
                <Text
                  style={active === 1 ? styles.activeTabText : styles.tabText}
                >
                  Sign Up
                </Text>
                <View style={active === 1 ? styles.activeline : styles.line} />
              </TouchableOpacity>
            )}
          </View>
          {active === 0 && !isAdmin && (
            <Text style={styles.loginText}>Sign in with your phone number</Text>
          )}
          {active === 0 ? (
            <>
              <View style={styles.textInputContainer}>
                <AppInput
                  label={'Your phone number'}
                  placeholder={isAdmin ? 'Your email' : 'Your phone number'}
                  name={isAdmin ? 'email' : 'phone'}
                  keyboardType={isAdmin ? 'email-address' : 'phone-pad'}
                  prefixBGTransparent
                  value={isAdmin ? email : phone}
                  onChange={handleChange}
                />
                {/* <PhoneInput
            placeholder='Enter phone number'
            value={phone}
            onChangeText={text => handleChange('phone', text)}
          /> */}
              </View>
              <View style={styles.textInputContainer}>
                <AppInput
                  label={'Your password'}
                  placeholder={'Your password'}
                  prefixBGTransparent
                  onBlur={checkPass}
                  name={'password'}
                  postfix={
                    <TouchableOpacity
                      onPress={() =>
                        handleChange('showPassword', !showPassword)
                      }
                    >
                      {showPassword ? (
                        <Icon
                          name={'eye-outline'}
                          color={COLORS.black}
                          type={'ionicon'}
                          size={20}
                        />
                      ) : (
                        <Icon
                          name={'eye-off-outline'}
                          color={COLORS.black}
                          type={'ionicon'}
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                  }
                  value={password}
                  onChange={handleChange}
                  secureTextEntry={!showPassword}
                />
              </View>
              {invalidPass && (
                <View style={styles.textFieldContainer}>
                  <Text style={styles.errorText}>
                    Password at least 6 characters
                  </Text>
                </View>
              )}
              <View style={styles.buttonWidth}>
                <AppButton
                  title={'SIGN IN'}
                  loading={loading}
                  disabled={(isAdmin ? !email : !phone) || !password}
                  onPress={handleLogin}
                />
              </View>
              {isAdmin && (
                <View style={styles.buttonWidth}>
                  <AppButton
                    title={'Cancel'}
                    outlined
                    onPress={() => handleChange('isAdmin', false)}
                  />
                </View>
              )}
            </>
          ) : (
            <>
              <View style={styles.textInputContainer}>
                <AppInput
                  label={'Your name'}
                  placeholder={'Your name'}
                  name={'name'}
                  prefixBGTransparent
                  value={name}
                  onChange={handleChange}
                />
              </View>
              <View style={styles.textInputContainer}>
                <AppInput
                  label={'Your last name'}
                  placeholder={'Your last name'}
                  name={'last_name'}
                  prefixBGTransparent
                  value={last_name}
                  onChange={handleChange}
                />
              </View>
              <View style={styles.textInputContainer}>
                <AppInput
                  label={'Your phone number'}
                  placeholder={'Your phone number'}
                  name={'phone'}
                  keyboardType={'phone-pad'}
                  prefixBGTransparent
                  value={phone}
                  onChange={handleChange}
                />
                {/* <PhoneInput
            placeholder='Enter phone number'
            value={phone}
            onChangeText={text => handleChange('phone', text)}
          /> */}
              </View>
              <View style={styles.textInputContainer}>
                <AppInput
                  label={'Create password'}
                  placeholder={'Create password'}
                  prefixBGTransparent
                  name={'password'}
                  onBlur={checkPass}
                  postfix={
                    <TouchableOpacity
                      onPress={() =>
                        handleChange('showPassword', !showPassword)
                      }
                    >
                      {showPassword ? (
                        <Icon
                          name={'eye-outline'}
                          color={COLORS.black}
                          type={'ionicon'}
                          size={20}
                        />
                      ) : (
                        <Icon
                          name={'eye-off-outline'}
                          color={COLORS.black}
                          type={'ionicon'}
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                  }
                  value={password}
                  onChange={handleChange}
                  secureTextEntry={!showPassword}
                />
              </View>
              {invalidPass && (
                <View style={styles.textFieldContainer}>
                  <Text style={styles.errorText}>
                    Password at least 6 characters
                  </Text>
                </View>
              )}
              <View style={styles.textInputContainer}>
                <AppInput
                  label={'Confirm new password'}
                  placeholder={'Confirm new password'}
                  prefixBGTransparent
                  postfix={
                    <TouchableOpacity
                      onPress={() =>
                        handleChange(
                          'showConfirmPassword',
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <Icon name={'eye-outline'} type={'ionicon'} size={20} />
                      ) : (
                        <Icon
                          name={'eye-off-outline'}
                          color={COLORS.black}
                          type={'ionicon'}
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                  }
                  name={'confirm_password'}
                  value={confirm_password}
                  onChange={handleChange}
                  secureTextEntry={!showConfirmPassword}
                />
              </View>
              {confirm_password && password !== confirm_password ? (
                <View style={styles.textFieldContainer}>
                  <Text style={styles.errorText}>Password doesn't match</Text>
                </View>
              ) : null}
              <BouncyCheckbox
                size={25}
                fillColor={COLORS.primary}
                unfillColor={COLORS.white}
                text='Agree to Terms & Conditions, Privacy Policy'
                iconStyle={{ borderColor: COLORS.primary, borderRadius: 0 }}
                textStyle={{
                  fontFamily: FONT1REGULAR,
                  color: COLORS.primary,
                  textDecorationLine: 'underline'
                }}
                style={{ marginVertical: 20 }}
                onPress={() => handleChange('isChecked', !isChecked)}
              />
              <View style={styles.buttonWidth}>
                <AppButton
                  title={'Sign Up'}
                  loading={loading}
                  disabled={
                    !name ||
                    !last_name ||
                    !phone ||
                    !password ||
                    !isChecked ||
                    password !== confirm_password
                  }
                  onPress={handleSignup}
                />
              </View>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
      {active === 0 && !isAdmin && (
        <>
          <View style={[styles.remeberContainer, { marginBottom: 10 }]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.remeberContainer}>
            <TouchableOpacity onPress={() => handleChange('isAdmin', true)}>
              <Text style={styles.forgotText}>Login as Admin?</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    backgroundColor: COLORS.white,
    height: '100%'
  },
  top: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  buttonWidth: { width: '80%', marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center' },
  textInputContainer: { marginBottom: hp('2%'), width: '90%' },
  remeberContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: hp(5)
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: hp(2.5),
    fontFamily: FONT1SEMIBOLD,
    textDecorationLine: 'underline'
  },
  signUpText: {
    marginTop: 20
  },
  loginText: {
    color: COLORS.black,
    fontSize: hp(2.5),
    marginBottom: '5%',
    fontFamily: FONT1REGULAR
  },
  backContainer: { width: '90%', alignItems: 'flex-start', marginBottom: 30 },
  signUp: {
    color: COLORS.secondary,
    fontFamily: FONT1BOLD,
    textDecorationLine: 'underline'
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
  }
})

export default LoginScreen
