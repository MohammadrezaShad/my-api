import { format, newDate } from 'date-fns-jalali';

export const getPersianDate = function (
  date: Date | number,
  dateFormat: string | undefined = 'yyyy-MM-dd HH:mm:ss zzz',
): string {
  return format(date, dateFormat);
};
