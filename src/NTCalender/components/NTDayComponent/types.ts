import {NTMonthDisplayComponentTheme} from '../../types';

export interface NTDayComponentProps {
  day: number;
  onDayPress?: (day: number) => void;
  isDayCurrentDate?: boolean;
  isDaySelected?: boolean;
  theme?: NTMonthDisplayComponentTheme;
}
