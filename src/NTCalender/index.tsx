import {Text, TouchableOpacity, View} from 'react-native';
import {getStyles} from './styles';
import {daysOfWeek} from './constants';
import {useEffect, useMemo, useState} from 'react';
import {CalenderType, NTCalenderProps} from './types';
import NTDataUtilBridge from './models/NTDataUtilBridge';

export const NTCalender = ({
  calendarType: propsCalendarType,
  calendarCurrentDate,
}: NTCalenderProps) => {
  const [calendarType, setCalenderType] = useState<CalenderType>(
    CalenderType.Gregorian,
  );
  const [dateToRepresent, setDateToRepresent] = useState<Date>(new Date());
  const dateUtil = useMemo(
    () => new NTDataUtilBridge(calendarType),
    [calendarType],
  );

  useEffect(() => {
    if (propsCalendarType) {
      setCalenderType(propsCalendarType);
    }
    if (calendarCurrentDate) {
      setDateToRepresent(calendarCurrentDate);
    }
  }, [propsCalendarType, calendarCurrentDate]);

  const styles = getStyles();
  const renderWeekDays = () => {
    return Object.keys(daysOfWeek).map(day => (
      <Text style={styles.weekDay} key={day}>
        {day}
      </Text>
    ));
  };

  const renderDaysOfWeek = (week: number[]) => {
    return week.map((day, key) => (
      <View
        key={key}
        style={[styles.dayHolder, day < 0 && styles.placeHolderDay]}>
        {day > 0 && <Text style={styles.day}>{day}</Text>}
      </View>
    ));
  };

  const renderWeeks = () => {
    const weeksOfMonth: number[][] = dateUtil.getMonthWeeks(dateToRepresent);
    return weeksOfMonth.map((week, key) => (
      <View key={key} style={styles.weekHolder}>
        {renderDaysOfWeek(week)}
      </View>
    ));
  };

  const renderMonthTitle = () => {
    const {monthName, year} = dateUtil.getDateComponents(dateToRepresent);
    return <Text>{`${monthName} ${year}`}</Text>;
  };

  const changeMonth = (incrementAmount: number) =>
    setDateToRepresent(
      new Date(dateUtil.addMonths(dateToRepresent, incrementAmount)),
    );

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.button}>
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
        {renderMonthTitle()}
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.button}>
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>{renderWeekDays()}</View>
      <View>{renderWeeks()}</View>
    </View>
  );
};

export default NTCalender;

/*
switch to hijri
< Month - year >   <- controller
Sun Mon Tue Wen Thu Fri Sat <- WeekDaysNames

[1] 2    3   4   5   6   7

8   9    10  11  12  13  14

15  16   17  18  19  20  21

22  23   24  25  26  27  28

29  30   31



posible props 

1- currentDate
2- calender Type Hijri or ...
3- enablePeriodSelection
4- selectedDates ["2024-03-01","2024-03-02",.....]
5- calender Future Limit 
6- calender past limit
7- disabled dates [""]
8 - renderDayComponent = ({dateText, isSelected, isDisabled})
9- onDayPressed = ({dateText})
10- month view, year view
*/
