import {
  NTMonthDisplayComponentTheme,
  NTWeek,
  NTWeekHeaderComponentTheme,
} from '../../types';

export interface NTWeekComponentProps {
  week: NTWeek;
  currentDate: Date;
  currentDayOfTheMonth?: number;
  onDayPress?: (day: number) => void;
  selectedDaysInMonth?: number[];
  theme?: NTMonthDisplayComponentTheme;
}
