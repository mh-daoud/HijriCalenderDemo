import {StyleSheet} from 'react-native';

export const getStyles = () => {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    wrapperStyle: {
      flex: 1,
    },
    weekDay: {
      padding: 4,
      fontSize: 16,
      textAlign: 'center',
    },
  });
};

export default getStyles;
