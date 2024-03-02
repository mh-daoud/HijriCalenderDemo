import {View} from 'react-native';
import getStyles from './styles';
import NTDayComponent from '../NTDayComponent';
import {NTWeekComponentProps} from './types';

export const NTWeekComponent = ({
  week,
  onDayPress,
  currentDayOfTheMonth,
  selectedDaysInMonth,
}: NTWeekComponentProps) => {
  const styles = getStyles();
  const renderDaysOfWeek = (week: number[]) => {
    return week.map((day, key) => (
      <NTDayComponent
        key={key}
        isDayCurrentDate={day === currentDayOfTheMonth}
        isDaySelected={selectedDaysInMonth?.includes(day)}
        day={day}
        onDayPress={onDayPress}
      />
    ));
  };

  return <View style={styles.weekHolder}>{renderDaysOfWeek(week)}</View>;
};

export default NTWeekComponent;
