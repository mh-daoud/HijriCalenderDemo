import {Text, TouchableOpacity, View} from 'react-native';
import {NTHeaderComponentProps} from './types';
import getStyles from './styles';

export const NTHeaderComponent = ({
  monthName,
  year,
  onControlButtonPressed,
  isNextMonthButtonDisabled,
  isPrevMonthButtonDisabled,
}: NTHeaderComponentProps) => {
  const styles = getStyles();
  const renderMonthTitle = () => {
    return <Text>{`${monthName} ${year}`}</Text>;
  };

  return (
    <View style={styles.titleRow}>
      <TouchableOpacity
        disabled={isPrevMonthButtonDisabled}
        onPress={() => onControlButtonPressed(-1)}
        style={styles.button}>
        <Text style={styles.buttonText}>{'<'}</Text>
      </TouchableOpacity>
      {renderMonthTitle()}
      <TouchableOpacity
        disabled={isNextMonthButtonDisabled}
        onPress={() => onControlButtonPressed(1)}
        style={styles.button}>
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NTHeaderComponent;
