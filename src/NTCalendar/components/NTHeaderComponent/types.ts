import {NTHeaderComponentTheme} from '../../types';

export interface NTHeaderComponentProps {
  monthName: string;
  year: number;
  onControlButtonPressed: (incrementAmount: number) => void;
  isNextMonthButtonDisabled?: boolean;
  isPrevMonthButtonDisabled?: boolean;
  theme?: NTHeaderComponentTheme;
}
