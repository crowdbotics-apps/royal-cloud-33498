import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { COLORS, FONT1BOLD, FONT1REGULAR, FONT1SEMIBOLD } from '../../constants'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function AppButton ({
  title,
  height,
  onPress,
  prefix,
  postfix,
  backgroundColor,
  disabled,
  loading,
  outlined,
  titleLight,
  color,
  borderColor,
  marginTop
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonContainer,
        {
          borderWidth: outlined ? 1 : 0,
          marginTop: marginTop || hp('2%'),
          justifyContent: postfix ? 'space-between' : 'center',
          borderColor: borderColor || COLORS.primary,
          backgroundColor: outlined
            ? 'transparent'
            : backgroundColor
            ? backgroundColor
            : COLORS.primary,
          opacity: disabled ? 0.5 : 1,
          height: height ? height : hp('7%')
        }
      ]}
      onPress={loading ? console.log('') : onPress}
    >
      {prefix && prefix}
      {loading ? (
        <ActivityIndicator color={color ? color : COLORS.white} />
      ) : (
        <Text
          style={[
            styles.title,
            {
              fontFamily: titleLight ? FONT1REGULAR : FONT1SEMIBOLD,
              color: color ? color : outlined ? COLORS.primary : COLORS.white
            }
          ]}
        >
          {title}
        </Text>
      )}
      {postfix && postfix}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: 0,
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center'
  },
  title: { fontSize: hp(2.3), textTransform: 'uppercase' }
})
