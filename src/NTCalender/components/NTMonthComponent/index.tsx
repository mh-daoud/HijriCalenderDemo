import {View} from 'react-native';
import {NTMonthComponentProps} from './types';
import getStyles from './styles';
import NTWeekComponent from '../NTWeekComponent';
import {useCallback} from 'react';

export const NTMonthComponent = ({
  weeksOfMonth,
  onDayPress,
  currentDate,
  currentDayOfTheMonth,
  selectedDaysInMonth,
}: NTMonthComponentProps) => {
  const styles = getStyles();
  const onPress = useCallback(
    (day: number) => onDayPress?.(day),
    [onDayPress, currentDate],
  );
  const renderWeeks = () => {
    return weeksOfMonth.map((week, key) => (
      <NTWeekComponent
        currentDate={currentDate}
        currentDayOfTheMonth={currentDayOfTheMonth}
        selectedDaysInMonth={selectedDaysInMonth}
        key={key}
        week={week}
        onDayPress={onPress}
      />
    ));
  };
  return <View style={styles.container}>{renderWeeks()}</View>;
};

export default NTMonthComponent;
