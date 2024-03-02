import {NTWeek} from '../types';

export const addDayToDate = (date: Date = new Date(), amount: number = 1) => {
  const futureDate = new Date(date);
  futureDate.setDate(date.getDate() + amount);
  return futureDate;
};

export const addMonthsToDate = (
  date: Date = new Date(),
  amount: number = 1,
) => {
  const newDate = new Date(date);
  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + amount);
  return newDate;
};

export const splitIntoWeekChunks = (
  daysOfMonth: number[],
  monthNumberOfDays: number,
): NTWeek[] => {
  const weeksOfTheMonth: NTWeek[] = [];
  const wholeMonthDays = [...daysOfMonth];
  while (wholeMonthDays.length < monthNumberOfDays) {
    //account for calendar end limit being less than month length
    //add placeholders...
    wholeMonthDays.push(-1);
  }
  const chunkSize = 7;
  for (let i = 0; i < wholeMonthDays.length; i += chunkSize) {
    const week = wholeMonthDays.slice(i, i + chunkSize);
    if (week.length < 7) {
      for (let i = week.length; i < 7; i++) {
        week.push(-1);
      }
    }
    weeksOfTheMonth.push(week);
  }
  return weeksOfTheMonth;
};

export const daysOfMonthWithPlaceholders = (
  startDayNumber: number,
  weekDay: number,
  monthNumberOfDays: number,
) => {
  const daysOfMonthWithPlaceholders: number[] = [];

  for (let start = 1; start < startDayNumber; start++) {
    //account for calendar start limit being not 1
    //add placeholders...
    daysOfMonthWithPlaceholders.push(-1);
  }
  for (let start = 0; start < weekDay; start++) {
    daysOfMonthWithPlaceholders.push(-1);
  }
  for (let index = startDayNumber; index <= monthNumberOfDays; index++) {
    daysOfMonthWithPlaceholders.push(index);
  }
  return daysOfMonthWithPlaceholders;
};
