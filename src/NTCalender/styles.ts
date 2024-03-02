import {StyleSheet} from 'react-native';

export const getStyles = () => {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      width: '100%',
    },
    titleRow: {
      borderWidth: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
      width: 24,
      height: 24,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eee',
    },
    buttonText: {
      fontSize: 16,
    },
    row: {
      flexDirection: 'row',
    },
    weekDay: {
      padding: 4,
      fontSize: 12,
      flex: 1,
      textAlign: 'center',
    },
    dayHolder: {
      backgroundColor: '#eeffff',
      padding: 4,
      borderWidth: 1,
      flex: 1,
      alignItems: 'center',
    },
    placeHolderDay: {
      backgroundColor: 'grey',
    },
    day: {},
    weekHolder: {
      flexDirection: 'row',
    },
  });
};

export default StyleSheet;
