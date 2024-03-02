import {hijriMonthOfTheYear} from '../constants';
import {NTDateUtil, NTDateComponents, NTWeek} from '../types';
import {
  addDayToDate,
  addMonthsToDate,
  daysOfMonthWithPlaceholders,
  splitIntoWeekChunks,
} from './utils';

class NTHijriUtil implements NTDateUtil {
  #localeFormat = 'en-SA-islamic-umalqura';

  getDateComponents = (date?: Date): NTDateComponents => {
    const hijriDateComponents = this.#getHijriDateComponents(date);
    const month = hijriDateComponents.month;
    const monthName =
      Object.entries(hijriMonthOfTheYear).find(
        entry => entry[1] === month,
      )?.[0] ?? '';
    return {
      month,
      day: hijriDateComponents.day,
      year: hijriDateComponents.year,
      weekDay: hijriDateComponents.weekDay,
      monthName,
    };
  };

  getMonthWeeks = (date?: Date): NTWeek[] => {
    const {monthStartDate, monthDaysCount, ...rest} =
      this.#getHijriDateComponents(date);
    const daysOfMonth = daysOfMonthWithPlaceholders(
      monthStartDate,
      monthDaysCount,
    );

    return splitIntoWeekChunks(daysOfMonth);
  };

  addMonths = (date?: Date, amount?: number): Date =>
    addMonthsToDate(date, amount);

  getMonthNumberOfDays = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const {monthDaysCount} = this.#getHijriDateComponents(date);
    return monthDaysCount;
  };

  #getHijriDateComponents = (date: Date = new Date()) => {
    const dateComponents = this.#getIntelFormatParts(date);
    const day = parseInt(
      this.#getHijriDateValueByType(dateComponents, 'day') ?? '',
    );
    const monthEndDate = this.#getHijriMonthEndDate(date);
    return {
      month:
        parseInt(this.#getHijriDateValueByType(dateComponents, 'month') ?? '') -
        1,
      year: parseInt(
        this.#getHijriDateValueByType(dateComponents, 'year') ?? '',
      ),
      weekDay: date.getDay(),
      day: day,
      monthStartDate: addDayToDate(date, -1 * (day - 1)),
      monthEndDate,
      monthDaysCount: parseInt(
        this.#getHijriDateValueByType(
          this.#getIntelFormatParts(monthEndDate),
          'day',
        ) ?? '',
      ),
    };
  };

  #getIntelFormatParts = (date: Date) =>
    Intl.DateTimeFormat(this.#localeFormat).formatToParts(date);

  #getHijriDateValueByType = (
    components: Intl.DateTimeFormatPart[],
    type: 'day' | 'month' | 'year',
  ) => components.find(component => component.type === type)?.value;

  #getHijriMonthEndDate = (date: Date) => {
    const dateComponents = this.#getIntelFormatParts(date);
    const day = parseInt(
      this.#getHijriDateValueByType(dateComponents, 'day') ?? '',
    );
    const currentHijriMonth = parseInt(
      this.#getHijriDateValueByType(dateComponents, 'month') ?? '',
    );
    const reminderToLastDayOrPreLastDay = 29 - day; //Hijri months only has 29 or 30 days
    let futureDate = addDayToDate(
      new Date(date),
      reminderToLastDayOrPreLastDay,
    );

    let futureDateHijriMonth = parseInt(
      this.#getHijriDateValueByType(
        this.#getIntelFormatParts(futureDate),
        'month',
      ) ?? '',
    );

    while (currentHijriMonth === futureDateHijriMonth) {
      futureDate = addDayToDate(new Date(futureDate), 1);

      futureDateHijriMonth = parseInt(
        this.#getHijriDateValueByType(
          this.#getIntelFormatParts(futureDate),
          'month',
        ) ?? '',
      );
    }
    futureDate = addDayToDate(new Date(futureDate), -1);
    return futureDate;
  };
}

export default NTHijriUtil;
