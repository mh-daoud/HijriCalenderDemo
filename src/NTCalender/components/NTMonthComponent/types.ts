import {NTWeek, NTYearMonths} from '../../types';

export interface NTMonthComponentProps {
  currentDate: Date;
  weeksOfMonth: NTWeek[];
  currentDayOfTheMonth?: number;
  onDayPress?: (day: number) => void;
  selectedDaysInMonth?: number[];
}
