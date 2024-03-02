import {StyleSheet} from 'react-native';

export const getStyles = () => {
  return StyleSheet.create({
    titleRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    button: {
      width: 32,
      height: 32,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eee',
      padding: 4,
    },
    buttonText: {
      fontSize: 16,
    },
    icon: {
      flex: 1,
    },
  });
};

export default getStyles;
