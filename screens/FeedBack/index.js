import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { COLORS, FONT1BOLD, FONT1REGULAR, FONT1SEMIBOLD } from '../../constants'
import { AppButton, AppInput, Header } from '../../components'
import Toast from 'react-native-simple-toast'
import { sendFeedback } from '../../api/customer'
import AsyncStorage from '@react-native-async-storage/async-storage'

function FeedBack ({ navigation }) {
  const [state, setState] = useState({
    email: '',
    message: '',
    loading: false
  })

  const { loading, email, message } = state

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      handleChange('loading', true)
      const payload = {
        content: message
      }
      await sendFeedback(payload, token)
      handleChange('loading', false)
      navigation.navigate('Settings')
      Toast.show('Feedback successfully sent!')
    } catch (error) {
      handleChange('loading', false)
      const errorText = Object.values(error?.response?.data)
      if (errorText?.length > 0) {
        Toast.show(`Error: ${errorText[0]}`)
      } else {
        Toast.show(`Error: ${error}`)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header tab tabText={'Send Feedback'} back rightEmpty />
      <View style={styles.textInputContainer}>
        <AppInput
          label={'Email'}
          placeholder={'Email'}
          name={'email'}
          prefixBGTransparent
          value={email}
          onChange={handleChange}
        />
      </View>
      <View style={styles.textInputContainer}>
        <AppInput
          label={'Message...'}
          placeholder={'Message...'}
          name={'message'}
          multiline
          height={150}
          prefixBGTransparent
          value={message}
          onChange={handleChange}
        />
      </View>
      <View style={styles.buttonWidth}>
        <AppButton
          title={'SUBMIT'}
          loading={loading}
          disabled={!email || !message}
          onPress={handleSubmit}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
    paddingTop: 10,
    alignItems: 'center'
  },
  header: {
    width: '90%'
  },
  buttonWidth: {
    width: '80%',
    marginTop: 20
  }
})

export default FeedBack
