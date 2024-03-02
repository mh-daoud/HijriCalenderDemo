import {Text, TouchableOpacity, View} from 'react-native';
import {getStyles} from './styles';
import {daysOfWeek, defaultTemplate} from './defualts';
import {useEffect, useMemo, useState} from 'react';
import {NTCalendarType, NTCalendarProps, NTWeek} from './types';
import NTDataUtilBridge from './models/NTDataUtilBridge';
import NTHeaderComponent from './components/NTHeaderComponent';
import NTWeekHeader from './components/NTWeekHeader';
import NTMonthComponent from './components/NTMonthComponent';
import {getSelectedDatesRecord, sameDay} from './utils';

export const NTCalendar = ({
  calendarType: propsCalendarType,
  calendarCurrentDate,
  template = defaultTemplate,
  onDayPress,
  selectedDates,
  calendarEndLimit: calendarEndLimit,
  calendarStartLimit: calendarStartLimit,
  containerStyles,
}: NTCalendarProps) => {
  const [calendarType, setCalendarType] = useState<NTCalendarType>(
    NTCalendarType.Gregorian,
  );
  const [dateToRepresent, setDateToRepresent] = useState<Date>(new Date());

  useEffect(() => {
    if (propsCalendarType && propsCalendarType !== calendarType) {
      setCalendarType(propsCalendarType);
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
        calendarStartLimit,
        calendarEndLimit,
      ),
    [
      dateUtil,
      dateToRepresent,
      calendarType,
      calendarStartLimit,
      calendarEndLimit,
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
    if (!calendarEndLimit) {
      return false;
    }
    const {year: calendarEndLimitDateYear, month: calendarEndLimitDateMonth} =
      dateUtil.getDateComponents(calendarEndLimit);

    return (
      year > calendarEndLimitDateYear ||
      (year >= calendarEndLimitDateYear && month >= calendarEndLimitDateMonth)
    );
  }, [dateToRepresent, calendarType, calendarEndLimit]);

  const isPrevMonthButtonDisabled = useMemo(() => {
    if (!calendarStartLimit) {
      return false;
    }
    const {
      year: calendarStartLimitDateYear,
      month: calendarStartLimitDateMonth,
    } = dateUtil.getDateComponents(calendarStartLimit);
    return (
      year < calendarStartLimitDateYear ||
      (year <= calendarStartLimitDateYear &&
        month <= calendarStartLimitDateMonth)
    );
  }, [dateToRepresent, calendarType, calendarStartLimit]);

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
              theme={template.theme?.header}
            />
          );
        case 'weekDaysHeaderOrder':
          return (
            <NTWeekHeader
              key={key}
              daysOfWeek={daysOfWeek}
              theme={template.theme?.weekHeader}
            />
          );
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
              theme={template.theme?.monthDisplay}
            />
          );
      }
    });
  };

  return (
    <View style={[styles.container, containerStyles]}>{renderTemplate()}</View>
  );
};

export default NTCalendar;
