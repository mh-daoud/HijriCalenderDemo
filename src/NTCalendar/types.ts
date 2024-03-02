import {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface NTCalendarProps {
  calendarType?: NTCalendarType;
  calendarCurrentDate?: Date;
  selectedDates?: Date[];
  calendarEndLimit?: Date;
  calendarStartLimit?: Date;
  disabledDates?: Date[];
  disableWeekDaysRecursive?: number[];
  onDayPress?: (date: Date) => void;
  template?: NTCalendarTemplate;
  containerStyles?: StyleProp<ViewStyle>;
}

export enum NTCalendarType {
  Hijri = 'Hijri',
  Gregorian = 'Gregorian',
}

export interface NTDateUtil {
  getDateComponents: (date?: Date) => NTDateComponents;
  getMonthWeeks: (
    date?: Date,
    calendarStartLimit?: Date,
    calendarEndLimit?: Date,
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

export interface NTCalendarTemplate {
  theme?: NTTheme;
  layout?: NTLayout;
  terminology?: Record<NTCalendarType, NTCalendarTerminology>;
}

export interface NTLayout {
  headerWithControlsOrder: number;
  weekDaysHeaderOrder: number;
  monthDisplayOrder: number;
}

export interface NTCalendarTerminology {
  daysOfWeek: NTWeekDays<string>;
  monthsOfTheYear: NTYearMonths<string>;
}

export interface NTTheme {
  header?: NTHeaderComponentTheme;
  weekHeader?: NTWeekHeaderComponentTheme;
  monthDisplay?: NTMonthDisplayComponentTheme;
}

export interface NTHeaderComponentTheme {
  headerTextStyles?: StyleProp<TextStyle>;
  buttonViewStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  wrapperStyles?: StyleProp<ViewStyle>;
}

export interface NTWeekHeaderComponentTheme {
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export interface NTMonthDisplayComponentTheme {
  containerStyles?: StyleProp<ViewStyle>;
  weekContainerStyles?: StyleProp<ViewStyle>;
  placeholderDay?: NTDayStyle;
  disabledDay?: NTDayStyle;
  normalDay?: NTDayStyle;
  currentDay?: NTDayStyle;
  selectedDay?: NTDayStyle;
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
