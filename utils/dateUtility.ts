import { DateRangeOptions, ISODateRangeOptions } from "@/types/globalTypes";

class DateUtility {


  
  public formatDate = (date: Date | string): string => {

    if (typeof date === "string") {
      date = new Date(date);
    }

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const day = date.getDate();
    const year = date.getFullYear();

    const getOrdinalSuffix = (day: number): string => {

      if (day >= 11 && day <= 13) return 'th';

      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }

    };

    const longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${day}${getOrdinalSuffix(day)} ${longMonths[date.getMonth()]}, ${year}`;
  };



  public calculateDateRange = ({ count, unit, direction }: DateRangeOptions): string => {

    const baseDate = new Date();

    const startDate = new Date(baseDate);
    const endDate = new Date(baseDate);

    switch (unit) {
      case 'days':
        if (direction === 'previous') {
          startDate.setDate(baseDate.getDate() - count);
        } else {
          endDate.setDate(baseDate.getDate() + count);
        }
        break;

      case 'weeks':
        if (direction === 'previous') {
          startDate.setDate(baseDate.getDate() - (count * 7));
        } else {
          endDate.setDate(baseDate.getDate() + (count * 7));
        }
        break;

      case 'months':
        if (direction === 'previous') {
          startDate.setMonth(baseDate.getMonth() - count);
        } else {
          endDate.setMonth(baseDate.getMonth() + count);
        }
        break;

      case 'years':
        if (direction === 'previous') {
          startDate.setFullYear(baseDate.getFullYear() - count);
        } else {
          endDate.setFullYear(baseDate.getFullYear() + count);
        }
        break;
    }

    return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
  };


  public generateISODateRange({
    count,
    unit,
    direction,
  }: ISODateRangeOptions): string {

    const baseDate = new Date();

    const endDate = new Date(baseDate);

    const multiplier = direction === 'previous' ? -1 : 1;

    switch (unit) {
      case 'days':
        endDate.setDate(endDate.getDate() + count * multiplier);
        break;
      case 'weeks':
        endDate.setDate(endDate.getDate() + count * 7 * multiplier);
        break;
      case 'months':
        endDate.setMonth(endDate.getMonth() + count * multiplier);
        break;
      case 'years':
        endDate.setFullYear(endDate.getFullYear() + count * multiplier);
        break;
    }

    const [start, end] = direction === 'previous'
      ? [endDate, baseDate]
      : [baseDate, endDate];

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return `${start.toISOString()}__${end.toISOString()}`;
  }



  // You pass -> 2025-06-13T08:11:39.371Z
  // You will get ->>> 13/6/2025
  public convertToLocal(date: string) { // you will get ->>> 

    // create a Date object
    const dateObj = new Date(date);

    // check is it actually a date ornot
    if (!isNaN(dateObj.getTime())) { // it  check valid date
      return dateObj.toLocaleDateString("en-IN");
    } else {  // on invalid return original data
      return date;
    }
  }

}


const dateUtlity = new DateUtility();

export default dateUtlity;

