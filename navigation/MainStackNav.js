import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import ForgotPassword from '../screens/ForgotPassword'
import AuthLoading from '../screens/AuthLoading'
import MainTabNav from './MainTabNav'
import Verification from '../screens/ForgotPassword/Verification'
import SetPasswrod from '../screens/ForgotPassword/SetPasswrod'
import Profile from '../screens/Profile'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import TermsCondition from '../screens/TermsCondition'
import AdminPanel from '../screens/AdminPanel'
import ListAllUsers from '../screens/ListAllUsers'
import Notifications from '../screens/Notifications'
import CreateNotification from '../screens/Notifications/CreateNotification'
import AdminFeedback from '../screens/FeedBack/AdminFeedback'
import UploadContent from '../screens/UploadContent'
import ListProduct from '../screens/UploadContent/ListProduct'
import ProductDetails from '../screens/UploadContent/ProductDetails'
import PendingComfimOrder from '../screens/PendingComfimOrder'
import OrderDetails from '../screens/PendingComfimOrder/OrderDetails'

const Stack = createStackNavigator()
function MainStackNav () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card'
      }}
    >
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='AuthLoading' component={AuthLoading} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Verification' component={Verification} />
      <Stack.Screen name='SetPasswrod' component={SetPasswrod} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
      <Stack.Screen name='TermsCondition' component={TermsCondition} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='MainTabNav' component={MainTabNav} />
      <Stack.Screen name='AdminPanel' component={AdminPanel} />
      <Stack.Screen name='ListAllUsers' component={ListAllUsers} />
      <Stack.Screen name='Notifications' component={Notifications} />
      <Stack.Screen name='UploadContent' component={UploadContent} />
      <Stack.Screen name='ProductDetails' component={ProductDetails} />
      <Stack.Screen name='AdminFeedback' component={AdminFeedback} />
      <Stack.Screen name='CreateNotification' component={CreateNotification} />
      <Stack.Screen name='ListProduct' component={ListProduct} />
      <Stack.Screen name='PendingComfimOrder' component={PendingComfimOrder} />
      <Stack.Screen name='OrderDetails' component={OrderDetails} />
    </Stack.Navigator>
  )
}

export default MainStackNav
