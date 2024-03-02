export interface NTCalenderProps {
  calendarType?: CalenderType;
  calendarCurrentDate?: Date;
}

export enum CalenderType {
  Hijri = 'Hijri',
  Gregorian = 'Gregorian',
}

export interface NTDateUtil {
  getDateComponents: (date?: Date) => NTDateComponents;
  getMonthWeeks: (date?: Date) => NTWeek[];
  addMonths: (date?: Date, amount?: number) => Date;
  getMonthNumberOfDays: (year: number, month: number) => number;
}

export interface NTDateComponents {
  month: number;
  day: number;
  year: number;
  weekDay: number;
  monthName: string;
}

export type NTWeek = number[];
