import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NTHeaderComponentProps} from './types';
import getStyles from './styles';

export const NTHeaderComponent = ({
  monthName,
  year,
  onControlButtonPressed,
  isNextMonthButtonDisabled,
  isPrevMonthButtonDisabled,
  theme,
}: NTHeaderComponentProps) => {
  const styles = getStyles();
  const {headerTextStyles, buttonViewStyle, iconStyle, wrapperStyles} =
    theme ?? {};
  const renderMonthTitle = () => {
    return <Text style={headerTextStyles}>{`${monthName} ${year}`}</Text>;
  };

  return (
    <View style={[styles.titleRow, wrapperStyles]}>
      <TouchableOpacity
        disabled={isPrevMonthButtonDisabled}
        onPress={() => onControlButtonPressed(-1)}
        style={[styles.button, buttonViewStyle]}>
        <Image
          source={require('../../assets/images/left-chevron.png')}
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {renderMonthTitle()}
      <TouchableOpacity
        disabled={isNextMonthButtonDisabled}
        onPress={() => onControlButtonPressed(1)}
        style={[styles.button, buttonViewStyle]}>
        <Image
          source={require('../../assets/images/right-chevron.png')}
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default NTHeaderComponent;
