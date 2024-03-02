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
    calenderStartLimit?: Date,
    calenderEndLimit?: Date,
  ): NTWeek[] => {
    const startDate = calenderStartLimit
      ? maxDay(this.#getStartOfMonth(date), calenderStartLimit)
      : this.#getStartOfMonth(date);
    const endDate = calenderEndLimit
      ? minDay(this.#getEndOfMonth(date), calenderEndLimit)
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
