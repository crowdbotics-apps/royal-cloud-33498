import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList
} from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppButton, Header } from '../../components'
import { COLORS, FONT1REGULAR, FONT1SEMIBOLD } from '../../constants'
import AppContext from '../../store/Context'
import moment from 'moment'

function Notifications ({ navigation }) {
  // Context
  const context = useContext(AppContext)
  const { users, notifications } = context
  const [state, setState] = useState({
    loading: false,
    filteredList: users || [],
    saerchText: ''
  })

  useEffect(() => {
    if (users) {
      handleChange('filteredList', users)
    }
  }, [users])

  const handleChange = (name, value) => {
    setState(pre => ({ ...pre, [name]: value }))
  }

  const { loading } = state

  console.warn('notifications', notifications)

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.primary} size={'large'} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header back tab tabText={'Push Notifications'} rightEmpty />
      <View style={styles.mainBody}>
        <View style={styles.buttonWidth}>
          <AppButton
            title={'CREATE NEW NOTIFICATION'}
            onPress={() => navigation.navigate('CreateNotification')}
          />
        </View>
        <Text style={styles.activeTabText}>All Notifications</Text>
        <FlatList
          data={notifications}
          style={{ width: '100%', height: '80%' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.listContainer}>
                <View style={styles.rowBetween}>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text style={styles.time}>
                    {moment(item?.created_at).fromNow()}
                  </Text>
                </View>
                <Text style={styles.content}>{item?.content}</Text>
              </View>
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
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.primary
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
  }
})

export default Notifications
