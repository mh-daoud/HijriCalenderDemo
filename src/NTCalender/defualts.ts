import {NTCalenderTemplate, NTCalenderType} from './types';

export const daysOfWeek = {
  '0': 'Sun',
  '1': 'Mon',
  '2': 'Tue',
  '3': 'Wed',
  '4': 'Thu',
  '5': 'Fri',
  '6': 'Sat',
};

export const gregorianMonthOfTheYear = {
  '0': 'Jan',
  '1': 'Feb',
  '2': 'Mar',
  '3': 'Apr',
  '4': 'May',
  '5': 'Jun',
  '6': 'Jul',
  '7': 'Aug',
  '8': 'Sep',
  '9': 'Oct',
  '10': 'Nov',
  '11': 'Dec',
};

export const hijriMonthOfTheYear = {
  '0': 'Muharram',
  '1': 'Safar',
  '2': "Rabi'ul Awwal",
  '3': "Rabi'ul Akhir",
  '4': 'Jumadal Ula',
  '5': 'Jumadal Akhira',
  '6': 'Rajab',
  '7': "Sha'ban",
  '8': 'Ramadan',
  '9': 'Shawwal',
  '10': "Dhul Qa'ada",
  '11': 'Dhul Hijja',
};

export const defaultTemplate: NTCalenderTemplate = {
  layout: {
    headerWithControlsOrder: 10,
    weekDaysHeaderOrder: 20,
    monthDisplayOrder: 30,
  },
  terminology: {
    [NTCalenderType.Gregorian]: {
      daysOfWeek: daysOfWeek,
      monthsOfTheYear: gregorianMonthOfTheYear,
    },
    [NTCalenderType.Hijri]: {
      daysOfWeek: daysOfWeek,
      monthsOfTheYear: hijriMonthOfTheYear,
    },
  },
};
