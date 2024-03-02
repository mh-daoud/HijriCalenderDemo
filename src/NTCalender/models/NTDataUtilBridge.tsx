import {NTCalenderType, NTDateUtil} from '../types';
import NTGregorianUtil from './NTGregorianUtil';
import NTHijriUtil from './NTHijriUtil';

class NTDataUtilBridge {
  #calendarType: NTCalenderType = NTCalenderType.Gregorian;
  #dateUtil: NTDateUtil;
  constructor(calendarType?: NTCalenderType) {
    if (calendarType) {
      this.#calendarType = calendarType;
    }
    this.#dateUtil = this.#isGregorian()
      ? new NTGregorianUtil()
      : new NTHijriUtil();
  }

  #isGregorian = () => this.#calendarType === NTCalenderType.Gregorian;

  getDateComponents = (date: Date) => this.#dateUtil.getDateComponents(date);

  getMonthWeeks = (
    date: Date = new Date(),
    calenderStartLimit?: Date,
    calenderEndLimit?: Date,
  ) => this.#dateUtil.getMonthWeeks(date, calenderStartLimit, calenderEndLimit);

  addMonths = (date: Date = new Date(), amount: number = 1): Date =>
    this.#dateUtil.addMonths(date, amount);

  getMonthNumberOfDays = (year: number, month: number) =>
    this.#dateUtil.getMonthNumberOfDays(year, month);

  getDateFromDay = (day: number, dateWithinSameMonth: Date) =>
    this.#dateUtil.getDateFromDay(day, dateWithinSameMonth);
}

export default NTDataUtilBridge;
