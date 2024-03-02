import {NTWeekHeaderComponentTheme} from '../../types';

export interface NTWeekHeaderProps {
  daysOfWeek: Record<string, string>;
  theme?: NTWeekHeaderComponentTheme;
}
