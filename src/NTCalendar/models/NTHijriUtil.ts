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
    calendarStartLimit?: Date,
    calendarEndLimit?: Date,
  ): NTWeek[] => {
    const dateHijriComponents = this.#getHijriDateComponents(date);
    const {monthStartDate, monthDaysCount} = dateHijriComponents;

    const monthStartOnDay = this.#getMonthStartDayCheckingLimit(
      dateHijriComponents,
      calendarStartLimit,
    );

    const monthEndsOnDay = this.#getMonthEndDayCheckingLimit(
      dateHijriComponents,
      calendarEndLimit,
    );

    const startDate = calendarStartLimit
      ? maxDay(monthStartDate, calendarStartLimit)
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
    calendarStartLimit?: Date,
  ) => {
    const {year, month} = dateHijriComponents;
    const calendarStartLimitDateComponents = calendarStartLimit
      ? this.#getIntelFormatParts(calendarStartLimit)
      : null;

    const monthStartOnDay = calendarStartLimitDateComponents
      ? this.#maxDay(
          {year: year, month: month, day: 1},
          {
            year: parseInt(
              this.#getHijriDateValueByType(
                calendarStartLimitDateComponents,
                'year',
              ) ?? '',
            ),
            month:
              parseInt(
                this.#getHijriDateValueByType(
                  calendarStartLimitDateComponents,
                  'month',
                ) ?? '',
              ) - 1,
            day: parseInt(
              this.#getHijriDateValueByType(
                calendarStartLimitDateComponents,
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
    calendarEndLimit?: Date,
  ) => {
    const {year, month, monthDaysCount} = dateHijriComponents;
    const calendarEndLimitDateComponents = calendarEndLimit
      ? this.#getIntelFormatParts(calendarEndLimit)
      : null;

    const monthEndsOnDay = calendarEndLimitDateComponents
      ? this.#minDay(
          {year: year, month: month, day: monthDaysCount},
          {
            year: parseInt(
              this.#getHijriDateValueByType(
                calendarEndLimitDateComponents,
                'year',
              ) ?? '',
            ),
            month:
              parseInt(
                this.#getHijriDateValueByType(
                  calendarEndLimitDateComponents,
                  'month',
                ) ?? '',
              ) - 1,
            day: parseInt(
              this.#getHijriDateValueByType(
                calendarEndLimitDateComponents,
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
