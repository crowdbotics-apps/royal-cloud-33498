import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { TabBar } from '../components'
import Home from '../screens/Home'
import { COLORS } from '../constants'
import Settings from '../screens/Settings'
import Products from '../screens/Products'
import Inventory from '../screens/Products/Inventory'
import InventoryDetails from '../screens/Products/Details'

const Stack = createStackNavigator()

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
      <Tab.Screen name='Home' component={HomeStack} />
      <Tab.Screen name='Cart' component={Home} />
      <Tab.Screen name='Settings' component={Settings} />
      <Tab.Screen name='Inventory' component={InventoryStack} />
    </Tab.Navigator>
  )
}

export default MainTabNav

function HomeStack () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card'
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Products' component={Products} />
      <Stack.Screen name='InventoryDetails' component={InventoryDetails} />
    </Stack.Navigator>
  )
}

function InventoryStack () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card'
      }}
    >
      <Stack.Screen name='Inventory' component={Inventory} />
      <Stack.Screen name='InventoryDetails' component={InventoryDetails} />
    </Stack.Navigator>
  )
}
