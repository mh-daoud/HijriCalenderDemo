import {NTSelectedDatesRecord} from './types';

export const getSelectedDatesRecord = (
  selectedDates: {year: number; month: number; day: number}[],
): NTSelectedDatesRecord | undefined => {
  const record = selectedDates.reduce(
    (obj: NTSelectedDatesRecord, selectedDate) => {
      const {day, month, year} = selectedDate;
      if (!Object.keys(obj).includes(year?.toString?.())) {
        obj[year] = {
          '0': [],
          '1': [],
          '2': [],
          '3': [],
          '4': [],
          '5': [],
          '6': [],
          '7': [],
          '8': [],
          '9': [],
          '10': [],
          '11': [],
        };
      }
      const yearObj = obj[year];
      const monthObj = yearObj[month?.toString?.() as never] as number[];
      monthObj.push(day);
      return obj;
    },
    {},
  );
  return record;
};

export const sameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const minDay = (d1: Date, d2: Date): Date => {
  if (
    d1.getFullYear() < d2.getFullYear() ||
    (d1.getFullYear() <= d2.getFullYear() && d1.getMonth() < d2.getMonth()) ||
    (d1.getFullYear() <= d2.getFullYear() &&
      d1.getMonth() <= d2.getMonth() &&
      d1.getDate() < d2.getDate())
  ) {
    return d1;
  }
  return d2;
};

export const maxDay = (d1: Date, d2: Date): Date => {
  if (
    d1.getFullYear() > d2.getFullYear() ||
    (d1.getFullYear() >= d2.getFullYear() && d1.getMonth() > d2.getMonth()) ||
    (d1.getFullYear() >= d2.getFullYear() &&
      d1.getMonth() >= d2.getMonth() &&
      d1.getDate() > d2.getDate())
  ) {
    return d1;
  }
  return d2;
};
