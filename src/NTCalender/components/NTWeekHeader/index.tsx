import {Text, TouchableOpacity, View} from 'react-native';
import {NTWeekHeaderProps} from './types';
import getStyles from './styles';

export const NTWeekHeader = ({daysOfWeek}: NTWeekHeaderProps) => {
  const styles = getStyles();
  const renderWeekDays = () => {
    return Object.values(daysOfWeek).map(day => (
      <Text style={styles.weekDay} key={day}>
        {day}
      </Text>
    ));
  };
  return <View style={styles.row}>{renderWeekDays()}</View>;
};

export default NTWeekHeader;
