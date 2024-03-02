/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NTCalender from './src/NTCalender';
import {NTCalenderType} from './src/NTCalender/types';
import {calenderTemplate} from './constants';
import {sameDay} from './src/NTCalender/utils';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [calendarType, setCalenderType] = useState<NTCalenderType>(
    NTCalenderType.Gregorian,
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const appendToSelectedDates = (date: Date) => {
    if (selectedDates.some(selectedDate => sameDay(selectedDate, date))) {
      setSelectedDates(
        selectedDates.filter(selectedDate => !sameDay(selectedDate, date)),
      );
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          paddingHorizontal: 16,
          height: 400,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <TouchableOpacity
            style={{
              marginBottom: 20,
              backgroundColor: 'gold',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 50,
            }}
            onPress={() => {
              setCalenderType(
                calendarType === NTCalenderType.Gregorian
                  ? NTCalenderType.Hijri
                  : NTCalenderType.Gregorian,
              );
            }}>
            <Text style={{}}>
              Switch To{' '}
              {calendarType === NTCalenderType.Gregorian
                ? 'Hijri'
                : 'Gregorian'}
            </Text>
          </TouchableOpacity>
        </View>
        <NTCalender
          template={calenderTemplate}
          calendarType={calendarType}
          onDayPress={appendToSelectedDates}
          selectedDates={selectedDates}
          // calenderEndLimit={new Date(2024, 2, 30)}
          // calenderStartLimit={new Date(2024, 0, 2)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
