import {gregorianMonthOfTheYear} from '../constants';
import {NTDateComponents, NTDateUtil, NTWeek} from '../types';
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
        entry => entry[1] === month,
      )?.[0] ?? '';

    return {
      month,
      day: date.getDate(),
      year: date.getFullYear(),
      weekDay: date.getDay(),
      monthName,
    };
  };

  getMonthWeeks = (date?: Date | undefined): NTWeek[] => {
    const startDate = this.#getStartOfMonth(date);
    const endDate = this.#getEndOfMonth(date);
    const daysOfMonth = daysOfMonthWithPlaceholders(
      startDate,
      endDate.getDate(),
    );

    return splitIntoWeekChunks(daysOfMonth);
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
}

export default NTGregorianUtil;
