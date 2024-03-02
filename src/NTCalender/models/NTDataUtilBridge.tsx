import {CalenderType, NTDateUtil} from '../types';
import NTGregorianUtil from './NTGregorianUtil';
import NTHijriUtil from './NTHijriUtil';

class NTDataUtilBridge {
  #calendarType: CalenderType = CalenderType.Gregorian;
  #dateUtil: NTDateUtil;
  constructor(calendarType?: CalenderType) {
    if (calendarType) {
      this.#calendarType = calendarType;
    }
    this.#dateUtil = this.#isGregorian()
      ? new NTGregorianUtil()
      : new NTHijriUtil();
  }

  #isGregorian = () => this.#calendarType === CalenderType.Gregorian;

  getDateComponents = (date: Date) => this.#dateUtil.getDateComponents(date);

  getMonthWeeks = (date: Date = new Date()) =>
    this.#dateUtil.getMonthWeeks(date);

  addMonths = (date: Date = new Date(), amount: number = 1): Date =>
    this.#dateUtil.addMonths(date, amount);

  getMonthNumberOfDays = (year: number, month: number) =>
    this.#dateUtil.getMonthNumberOfDays(year, month);
}

export default NTDataUtilBridge;
