import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface NTCalenderProps {
  calendarType?: NTCalenderType;
  calendarCurrentDate?: Date;
  selectedDates?: Date[];
  calenderEndLimit?: Date;
  calenderStartLimit?: Date;
  disabledDates?: Date[];
  disableWeekDaysRecursive?: number[];
  onDayPress?: (date: Date) => void;
  template?: NTCalenderTemplate;
  // 8 - renderDayComponent = ({dateText, isSelected, isDisabled})
  // 10- month view, year view
}

export enum NTCalenderType {
  Hijri = 'Hijri',
  Gregorian = 'Gregorian',
}

export interface NTDateUtil {
  getDateComponents: (date?: Date) => NTDateComponents;
  getMonthWeeks: (
    date?: Date,
    calenderStartLimit?: Date,
    calenderEndLimit?: Date,
  ) => NTWeek[];
  addMonths: (date?: Date, amount?: number) => Date;
  getMonthNumberOfDays: (year: number, month: number) => number;
  getDateFromDay: (day: number, dateWithinSameMonth: Date) => Date;
}

export interface NTDateComponents {
  month: number;
  day: number;
  year: number;
  weekDay: number;
  monthName: string;
}

export type NTWeek = number[];

export interface NTCalenderTemplate {
  theme?: NTTheme;
  layout?: NTLayout;
  terminology?: Record<NTCalenderType, NTCalenderTerminology>;
}

export interface NTLayout {
  headerWithControlsOrder: number;
  weekDaysHeaderOrder: number;
  monthDisplayOrder: number;
}

export interface NTCalenderTerminology {
  daysOfWeek: NTWeekDays<string>;
  monthsOfTheYear: NTYearMonths<string>;
}

export interface NTTheme {
  header?: {
    monthTextStyle?: StyleProp<TextStyle>;
    yearTextStyle?: StyleProp<TextStyle>;
    buttonViewStyle?: StyleProp<ViewStyle>;
    buttonText?: StyleProp<TextStyle>;
  };
  weekHeader?: {
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
  };
  monthDisplay?: {
    placeholderDay?: NTDayStyle;
    disabledDay?: NTDayStyle;
    normalDay?: NTDayStyle;
    selectedDay?: NTDayStyle;
  };
}

export interface NTDayStyle {
  buttonViewStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonWrapperStyle?: StyleProp<ViewStyle>;
}

export type NTSelectedDatesRecord = Record<string, NTYearMonths<number[]>>;

export interface NTYearMonths<T> {
  '0': T;
  '1': T;
  '2': T;
  '3': T;
  '4': T;
  '5': T;
  '6': T;
  '7': T;
  '8': T;
  '9': T;
  '10': T;
  '11': T;
}

export interface NTWeekDays<T> {
  '0': T;
  '1': T;
  '2': T;
  '3': T;
  '4': T;
  '5': T;
  '6': T;
}

export interface NTHijriDateComponents {
  month: number;
  year: number;
  weekDay: number;
  day: number;
  monthStartDate: Date;
  monthEndDate: Date;
  monthDaysCount: number;
}
