import {StyleSheet} from 'react-native';

export const getStyles = () => {
  return StyleSheet.create({
    dayHolder: {
      backgroundColor: '#eeffff',
      flex: 1,
      minHeight: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedDay: {
      backgroundColor: 'purple',
    },
    dayView: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginVertical: 4,
    },
    placeHolderDay: {
      backgroundColor: 'grey',
      flex: 1,
      minHeight: 40,
      paddingVertical: 4,
      marginVertical: 0,
    },
    day: {},
    activeDay: {
      marginTop: 2,
      borderRadius: 100,
      backgroundColor: 'gold',
      width: 32,
      height: 32,
    },
  });
};

export default getStyles;
