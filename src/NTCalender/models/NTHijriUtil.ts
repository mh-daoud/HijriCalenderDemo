import {hijriMonthOfTheYear} from '../defualts';
import {
  NTDateUtil,
  NTDateComponents,
  NTWeek,
  NTHijriDateComponents,
} from '../types';
import {maxDay} from '../utils';
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
        entry => entry[0] === month.toString(),
      )?.[1] ?? '';
    return {
      month,
      day: hijriDateComponents.day,
      year: hijriDateComponents.year,
      weekDay: hijriDateComponents.weekDay,
      monthName,
    };
  };

  getMonthWeeks = (
    date?: Date,
    calenderStartLimit?: Date,
    calenderEndLimit?: Date,
  ): NTWeek[] => {
    const dateHijriComponents = this.#getHijriDateComponents(date);
    const {monthStartDate, monthDaysCount} = dateHijriComponents;

    const monthStartOnDay = this.#getMonthStartDayCheckingLimit(
      dateHijriComponents,
      calenderStartLimit,
    );

    const monthEndsOnDay = this.#getMonthEndDayCheckingLimit(
      dateHijriComponents,
      calenderEndLimit,
    );

    const startDate = calenderStartLimit
      ? maxDay(monthStartDate, calenderStartLimit)
      : monthStartDate;

    const daysOfMonth = daysOfMonthWithPlaceholders(
      monthStartOnDay,
      startDate.getDay(),
      monthEndsOnDay,
    );

    return splitIntoWeekChunks(daysOfMonth, monthDaysCount);
  };

  addMonths = (date?: Date, amount?: number): Date =>
    addMonthsToDate(date, amount);

  getMonthNumberOfDays = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const {monthDaysCount} = this.#getHijriDateComponents(date);
    return monthDaysCount;
  };

  getDateFromDay = (day: number, dateWithinSameMonth: Date) => {
    const currentDate = new Date(dateWithinSameMonth);
    const {day: currentHijriDay} = this.#getHijriDateComponents(currentDate);
    const dayDiff = day - currentHijriDay;
    const date = addDayToDate(currentDate, dayDiff);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  #getMonthStartDayCheckingLimit = (
    dateHijriComponents: NTHijriDateComponents,
    calenderStartLimit?: Date,
  ) => {
    const {year, month} = dateHijriComponents;
    const calenderStartLimitDateComponents = calenderStartLimit
      ? this.#getIntelFormatParts(calenderStartLimit)
      : null;

    const monthStartOnDay = calenderStartLimitDateComponents
      ? this.#maxDay(
          {year: year, month: month, day: 1},
          {
            year: parseInt(
              this.#getHijriDateValueByType(
                calenderStartLimitDateComponents,
                'year',
              ) ?? '',
            ),
            month:
              parseInt(
                this.#getHijriDateValueByType(
                  calenderStartLimitDateComponents,
                  'month',
                ) ?? '',
              ) - 1,
            day: parseInt(
              this.#getHijriDateValueByType(
                calenderStartLimitDateComponents,
                'day',
              ) ?? '',
            ),
          },
        ).day
      : 1;

    return monthStartOnDay;
  };

  #getMonthEndDayCheckingLimit = (
    dateHijriComponents: NTHijriDateComponents,
    calenderEndLimit?: Date,
  ) => {
    const {year, month, monthDaysCount} = dateHijriComponents;
    const calenderEndLimitDateComponents = calenderEndLimit
      ? this.#getIntelFormatParts(calenderEndLimit)
      : null;

    const monthEndsOnDay = calenderEndLimitDateComponents
      ? this.#minDay(
          {year: year, month: month, day: monthDaysCount},
          {
            year: parseInt(
              this.#getHijriDateValueByType(
                calenderEndLimitDateComponents,
                'year',
              ) ?? '',
            ),
            month:
              parseInt(
                this.#getHijriDateValueByType(
                  calenderEndLimitDateComponents,
                  'month',
                ) ?? '',
              ) - 1,
            day: parseInt(
              this.#getHijriDateValueByType(
                calenderEndLimitDateComponents,
                'day',
              ) ?? '',
            ),
          },
        ).day
      : monthDaysCount;

    return monthEndsOnDay;
  };

  #getHijriDateComponents = (
    date: Date = new Date(),
  ): NTHijriDateComponents => {
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

  #maxDay = (
    d1: {year: number; month: number; day: number},
    d2: {year: number; month: number; day: number},
  ) => {
    if (
      d1.year > d2.year ||
      (d1.year >= d2.year && d1.month > d2.month) ||
      (d1.year >= d2.year && d1.month >= d2.month && d1.day > d2.day)
    ) {
      return d1;
    }
    return d2;
  };

  #minDay = (
    d1: {year: number; month: number; day: number},
    d2: {year: number; month: number; day: number},
  ) => {
    if (
      d1.year < d2.year ||
      (d1.year <= d2.year && d1.month < d2.month) ||
      (d1.year <= d2.year && d1.month <= d2.month && d1.day < d2.day)
    ) {
      return d1;
    }
    return d2;
  };
}

export default NTHijriUtil;
