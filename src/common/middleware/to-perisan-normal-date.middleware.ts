import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

import { getPersianDate } from '@/common/utils/to-persian-date.util';
import { toTimeZone } from '@/common/utils/to-time-zone';

export const toPersianNormalDate: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  let value = await next();
  if (typeof value === 'string') {
    value = new Date(value);
  }
  const isDate = value instanceof Date;

  return value && isDate
    ? getPersianDate(toTimeZone(value, 3.5), 'EEEE d MMMM yyyy')
    : value;
};
