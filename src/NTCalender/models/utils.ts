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

export const splitIntoWeekChunks = (daysOfMonth: number[]): NTWeek[] => {
  const weeksOfTheMonth: NTWeek[] = [];
  const chunkSize = 7;
  for (let i = 0; i < daysOfMonth.length; i += chunkSize) {
    const week = daysOfMonth.slice(i, i + chunkSize);
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
  monthStartDate: Date,
  monthNumberOfDays: number,
) => {
  const weekDay = monthStartDate.getDay();
  const daysOfMonthWithPlaceholders: number[] = [];

  for (let start = 0; start < weekDay; start++) {
    daysOfMonthWithPlaceholders.push(-1);
  }
  for (let index = 1; index <= monthNumberOfDays; index++) {
    daysOfMonthWithPlaceholders.push(index);
  }
  return daysOfMonthWithPlaceholders;
};
