import {Text, TouchableOpacity, View} from 'react-native';
import {NTDayComponentProps} from './types';
import getStyles from './styles';
import {useCallback, useMemo} from 'react';

export const NTDayComponent = ({
  day,
  onDayPress,
  isDayCurrentDate,
  isDaySelected,
}: NTDayComponentProps) => {
  const styles = getStyles();
  const onPress = useCallback(() => onDayPress?.(day), [onDayPress, day]);

  const isPlaceholder = useMemo(() => day < 0, [day]);

  if (isPlaceholder) {
    return <View style={styles.placeHolderDay} />;
  }
  return (
    <TouchableOpacity
      style={[styles.dayHolder, isDaySelected && styles.selectedDay]}
      onPress={onPress}>
      <View style={[styles.dayView, isDayCurrentDate && styles.activeDay]}>
        {day > 0 && <Text style={[styles.day]}>{day}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default NTDayComponent;
