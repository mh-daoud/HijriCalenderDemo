import {Text, TouchableOpacity, View} from 'react-native';
import {NTWeekHeaderProps} from './types';
import getStyles from './styles';

export const NTWeekHeader = ({daysOfWeek, theme}: NTWeekHeaderProps) => {
  const styles = getStyles();
  const {containerStyle, wrapperStyle, textStyle} = theme ?? {};
  const renderWeekDays = () => {
    return Object.values(daysOfWeek).map(day => (
      <View key={day} style={[styles.wrapperStyle, wrapperStyle]}>
        <Text style={[styles.weekDay, textStyle]}>{day}</Text>
      </View>
    ));
  };
  return <View style={[styles.row, containerStyle]}>{renderWeekDays()}</View>;
};

export default NTWeekHeader;
