import {StyleSheet} from 'react-native';

export const getStyles = () => {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    weekDay: {
      padding: 4,
      fontSize: 12,
      flex: 1,
      textAlign: 'center',
    },
  });
};

export default getStyles;
