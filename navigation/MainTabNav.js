import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabBar } from '../components'
import Home from '../screens/Home'
import { COLORS } from '../constants'
import Settings from '../screens/Settings'

function MainTabNav () {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: COLORS.white }
      }}
      initialRouteName={'Home'}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Cart' component={Home} />
      <Tab.Screen name='Settings' component={Settings} />
      <Tab.Screen name='Inventory' component={Home} />
    </Tab.Navigator>
  )
}

export default MainTabNav
