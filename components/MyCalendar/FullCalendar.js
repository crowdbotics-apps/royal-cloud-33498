import React, { useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {
  Agenda,
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
  WeekCalendar
} from 'react-native-calendars'
import { Icon } from 'react-native-elements'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CalendarIcon from '../../assets/svg/calendar.svg'
import { COLORS, FONT1BOLD, FONT1REGULAR } from '../../constants'
import { SvgXml } from 'react-native-svg'
import moment from 'moment'

const FullCalendar = ({ date, handleChange, openCalendar }) => {
  const refCalendar = useRef()

  const onDateChanged = date => {
    handleChange('date', date.dateString)
  }

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  }

  const onChangeWeek = type => {
    if (type === 'left') {
      console.warn(' refCalendar?.current', refCalendar)
      refCalendar?.current?.contentRef?.onPressArrowLeft()
    } else {
      refCalendar?.current?.contentRef?.onPressArrowRight()
    }
  }

  const handleOpen = () => {
    handleChange('openCalendar', 'closed')
  }

  const marked = useMemo(() => {
    return {
      [date]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: COLORS.primary,
        selectedTextColor: COLORS.white
      }
    }
  }, [date])

  return (
    <View style={styles.container}>
      {/* <View style={styles.row}>
        <View style={styles.rowDate}>
          <TouchableOpacity onPress={() => onChangeWeek('left')}>
            <Icon
              name='left'
              type='antdesign'
              color={COLORS.darkGrey}
              size={18}
            />
          </TouchableOpacity>
          <Text style={styles.date}>
            {moment(date).calendar(null, {
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              nextWeek: 'dddd',
              lastDay: '[Yesterday]',
              lastWeek: '[Last] dddd',
              sameElse: 'DD/MM/YYYY'
            })}
          </Text>
          <TouchableOpacity onPress={() => onChangeWeek('right')}>
            <Icon
              size={18}
              name='right'
              type='antdesign'
              color={COLORS.darkGrey}
            />
          </TouchableOpacity>
        </View>
      </View> */}

      <Calendar
        ref={refCalendar}
        // renderHeader={() => <View style={{ height: 30 }} />}
        onDayPress={onDateChanged}
        current={date}
        // hideArrows
        firstDay={1}
        enableSwipeMonths
        markedDates={marked}
        // theme={{
        //   'stylesheet.calendar.header': {
        //     header: {
        //       height: 0
        //     }
        //   }
        // }}
      />
      {/* <CalendarProvider
        date={date}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        disabledOpacity={0.6}
        // todayBottomMargin={16}
        >
        <ExpandableCalendar
          initialPosition={'open'}
          onCalendarToggled={isOpen => console.warn(isOpen)}
          // hideKnob
          // onDayPress={onDateChanged}
          ref={refCalendar}
          hideArrows
          markedDates={marked}
          renderHeader={() => <View />}
          firstDay={1}
        />
      </CalendarProvider> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10
  },
  date: {
    fontFamily: FONT1BOLD,
    fontSize: hp(2.5),
    marginHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    zIndex: 20,
    alignItems: 'center',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '10%',
    marginTop: 10,
    backgroundColor: COLORS.white,
    marginBottom: 10
  },
  rowDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  }
})

export default FullCalendar
