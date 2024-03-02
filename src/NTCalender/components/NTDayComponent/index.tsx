import {Text, TouchableOpacity, View} from 'react-native';
import {NTDayComponentProps} from './types';
import getStyles from './styles';
import {useCallback, useMemo} from 'react';

export const NTDayComponent = ({
  day,
  onDayPress,
  isDayCurrentDate,
  isDaySelected,
  theme,
}: NTDayComponentProps) => {
  const styles = getStyles();
  const onPress = useCallback(() => onDayPress?.(day), [onDayPress, day]);
  const {disabledDay, currentDay, normalDay, selectedDay, placeholderDay} =
    theme ?? {};

  const isPlaceholder = useMemo(() => day < 0, [day]);

  if (isPlaceholder) {
    return (
      <View
        style={[
          styles.placeHolderDay,
          placeholderDay?.buttonWrapperStyle,
          placeholderDay?.buttonViewStyle,
        ]}
      />
    );
  }
  return (
    <TouchableOpacity
      style={[
        styles.dayHolder,
        isDaySelected && styles.selectedDay,
        isDayCurrentDate && currentDay?.buttonWrapperStyle,
        isDaySelected && selectedDay?.buttonWrapperStyle,
        !isDayCurrentDate && !isDaySelected && normalDay?.buttonWrapperStyle,
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.dayView,
          isDayCurrentDate && styles.activeDay,
          isDayCurrentDate && currentDay?.buttonViewStyle,
          isDaySelected && selectedDay?.buttonViewStyle,
          !isDayCurrentDate && !isDaySelected && normalDay?.buttonViewStyle,
        ]}>
        {day > 0 && (
          <Text
            style={[
              styles.day,
              isDayCurrentDate && currentDay?.buttonTextStyle,
              isDaySelected && selectedDay?.buttonTextStyle,
              !isDayCurrentDate && !isDaySelected && normalDay?.buttonTextStyle,
              placeholderDay?.buttonWrapperStyle,
            ]}>
            {day}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NTDayComponent;
