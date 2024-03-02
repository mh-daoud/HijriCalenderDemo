import {View} from 'react-native';
import getStyles from './styles';
import NTDayComponent from '../NTDayComponent';
import {NTWeekComponentProps} from './types';

export const NTWeekComponent = ({
  week,
  onDayPress,
  currentDayOfTheMonth,
  selectedDaysInMonth,
  theme,
}: NTWeekComponentProps) => {
  const styles = getStyles();
  const {weekContainerStyles} = theme ?? {};
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

  return (
    <View style={[styles.weekHolder, weekContainerStyles]}>
      {renderDaysOfWeek(week)}
    </View>
  );
};

export default NTWeekComponent;
