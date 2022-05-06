import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import logo from '../../assets/svg/Splash.svg'
import { COLORS } from '../../constants'

class Splash extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    setTimeout(() => {
      this.props.navigation.navigate('AuthLoading')
    }, 3000)
  }
  render = () => (
    <View style={styles.View_617_1877}>
      <SvgXml xml={logo} width={'100%'} height={'100%'} />
    </View>
  )
}

const styles = StyleSheet.create({
  View_617_1877: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%'
  }
})

export default Splash
