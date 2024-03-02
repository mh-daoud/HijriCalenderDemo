import {gregorianMonthOfTheYear} from '../defualts';
import {NTDateComponents, NTDateUtil, NTWeek} from '../types';
import {maxDay, minDay} from '../utils';
import {
  addMonthsToDate,
  daysOfMonthWithPlaceholders,
  splitIntoWeekChunks,
} from './utils';

class NTGregorianUtil implements NTDateUtil {
  getDateComponents = (date: Date = new Date()): NTDateComponents => {
    const month = date.getMonth();
    const monthName =
      Object.entries(gregorianMonthOfTheYear).find(
        entry => entry[0] === month.toString(),
      )?.[1] ?? '';

    return {
      month,
      day: date.getDate(),
      year: date.getFullYear(),
      weekDay: date.getDay(),
      monthName,
    };
  };

  getMonthWeeks = (
    date?: Date,
    calendarStartLimit?: Date,
    calendarEndLimit?: Date,
  ): NTWeek[] => {
    const startDate = calendarStartLimit
      ? maxDay(this.#getStartOfMonth(date), calendarStartLimit)
      : this.#getStartOfMonth(date);
    const endDate = calendarEndLimit
      ? minDay(this.#getEndOfMonth(date), calendarEndLimit)
      : this.#getEndOfMonth(date);
    const daysOfMonth = daysOfMonthWithPlaceholders(
      startDate.getDate(),
      startDate.getDay(),
      endDate.getDate(),
    );

    return splitIntoWeekChunks(
      daysOfMonth,
      this.#getEndOfMonth(date).getDate(),
    );
  };

  addMonths = (date?: Date, amount?: number): Date =>
    addMonthsToDate(date, amount);

  getMonthNumberOfDays = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const endDate = this.#getEndOfMonth(date);
    return endDate.getDate();
  };

  #getStartOfMonth = (date: Date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth(), 1);

  #getEndOfMonth = (date: Date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0);

  getDateFromDay = (day: number, dateWithinSameMonth: Date) =>
    new Date(
      dateWithinSameMonth.getFullYear(),
      dateWithinSameMonth.getMonth(),
      day,
    );
}

export default NTGregorianUtil;
