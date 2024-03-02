import {StyleSheet} from 'react-native';

export const getStyles = () => {
  return StyleSheet.create({
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
  });
};

export default getStyles;
