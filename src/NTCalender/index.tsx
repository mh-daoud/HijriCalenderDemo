import {Text, TouchableOpacity, View} from 'react-native';
import {getStyles} from './styles';
import {daysOfWeek, defaultTemplate} from './defualts';
import {useEffect, useMemo, useState} from 'react';
import {NTCalenderType, NTCalenderProps, NTWeek} from './types';
import NTDataUtilBridge from './models/NTDataUtilBridge';
import NTHeaderComponent from './components/NTHeaderComponent';
import NTWeekHeader from './components/NTWeekHeader';
import NTMonthComponent from './components/NTMonthComponent';
import {getSelectedDatesRecord, sameDay} from './utils';

export const NTCalender = ({
  calendarType: propsCalendarType,
  calendarCurrentDate,
  template = defaultTemplate,
  onDayPress,
  selectedDates,
  calenderEndLimit,
  calenderStartLimit,
}: NTCalenderProps) => {
  const [calendarType, setCalenderType] = useState<NTCalenderType>(
    NTCalenderType.Gregorian,
  );
  const [dateToRepresent, setDateToRepresent] = useState<Date>(new Date());

  useEffect(() => {
    if (propsCalendarType && propsCalendarType !== calendarType) {
      setCalenderType(propsCalendarType);
    }
    if (calendarCurrentDate && !sameDay(calendarCurrentDate, dateToRepresent)) {
      setDateToRepresent(calendarCurrentDate);
    }
  }, [propsCalendarType, calendarCurrentDate]);

  const dateUtil = useMemo(
    () => new NTDataUtilBridge(calendarType),
    [calendarType],
  );

  const dateToRepresentDateComponents = useMemo(
    () => dateUtil.getDateComponents(dateToRepresent),
    [calendarType, dateToRepresent],
  );
  const currentDateDateComponents = useMemo(
    () => dateUtil.getDateComponents(new Date()),
    [calendarType],
  );

  const {
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  } = currentDateDateComponents;
  const {monthName, month, year} = dateToRepresentDateComponents;

  const isMonthInSameYearOfCurrentDate = useMemo(() => {
    return year === currentYear && month === currentMonth;
  }, [currentDateDateComponents, dateToRepresent]);

  const weeksOfMonth: NTWeek[] = useMemo(
    () =>
      dateUtil.getMonthWeeks(
        dateToRepresent,
        calenderStartLimit,
        calenderEndLimit,
      ),
    [
      dateUtil,
      dateToRepresent,
      calendarType,
      calenderStartLimit,
      calenderEndLimit,
    ],
  );

  const selectedYearRecord = useMemo(() => {
    const selectedDatesComponents = selectedDates?.reduce(
      (
        selectedDatesComponents: {year: number; month: number; day: number}[],
        selectedDate,
      ) => {
        const {
          year: selectedDateYear,
          month: selectedDateMonth,
          day: selectedDateDay,
        } = dateUtil.getDateComponents(selectedDate);
        selectedDatesComponents.push({
          year: selectedDateYear,
          month: selectedDateMonth,
          day: selectedDateDay,
        });
        return selectedDatesComponents;
      },
      [],
    );
    const yearRecord = getSelectedDatesRecord(selectedDatesComponents ?? [])?.[
      year
    ];
    return yearRecord;
  }, [selectedDates, calendarType]);

  const isNextMonthButtonDisabled = useMemo(() => {
    if (!calenderEndLimit) {
      return false;
    }
    const {year: calenderEndLimitDateYear, month: calenderEndLimitDateMonth} =
      dateUtil.getDateComponents(calenderEndLimit);

    return (
      year > calenderEndLimitDateYear ||
      (year >= calenderEndLimitDateYear && month >= calenderEndLimitDateMonth)
    );
  }, [dateToRepresent, calendarType, calenderEndLimit]);

  const isPrevMonthButtonDisabled = useMemo(() => {
    if (!calenderStartLimit) {
      return false;
    }
    const {
      year: calenderStartLimitDateYear,
      month: calenderStartLimitDateMonth,
    } = dateUtil.getDateComponents(calenderStartLimit);
    return (
      year < calenderStartLimitDateYear ||
      (year <= calenderStartLimitDateYear &&
        month <= calenderStartLimitDateMonth)
    );
  }, [dateToRepresent, calendarType, calenderStartLimit]);

  const styles = getStyles();

  const changeMonth = (incrementAmount: number) => {
    setDateToRepresent(
      new Date(dateUtil.addMonths(dateToRepresent, incrementAmount)),
    );
  };

  const _onDayPress = (day: number) => {
    const date = dateUtil.getDateFromDay(day, dateToRepresent);
    onDayPress?.(date);
  };

  const renderTemplate = () => {
    const templateOrdered = Object.entries(template?.layout ?? {}).sort(
      (a, b) => a[1] - b[1],
    );

    return templateOrdered.map((component, key) => {
      switch (component[0]) {
        case 'headerWithControlsOrder':
          return (
            <NTHeaderComponent
              key={key}
              monthName={monthName}
              year={year}
              onControlButtonPressed={changeMonth}
              isNextMonthButtonDisabled={isNextMonthButtonDisabled}
              isPrevMonthButtonDisabled={isPrevMonthButtonDisabled}
            />
          );
        case 'weekDaysHeaderOrder':
          return <NTWeekHeader key={key} daysOfWeek={daysOfWeek} />;
        case 'monthDisplayOrder':
        default:
          return (
            <NTMonthComponent
              currentDate={dateToRepresent}
              currentDayOfTheMonth={
                isMonthInSameYearOfCurrentDate ? currentDay : undefined
              }
              selectedDaysInMonth={selectedYearRecord?.[month as never]}
              key={key}
              weeksOfMonth={weeksOfMonth}
              onDayPress={_onDayPress}
            />
          );
      }
    });
  };

  return <View style={styles.container}>{renderTemplate()}</View>;
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

todo:
2- connect theme
4- convert to package 
5- enhance design more 

*/
