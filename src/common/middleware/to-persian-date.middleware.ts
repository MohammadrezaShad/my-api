import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

import { getPersianDate } from '@/common/utils/to-persian-date.util';
import { toTimeZone } from '@/common/utils/to-time-zone';

export const toPersianDate: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  let value = await next();

  if (typeof value === 'string') {
    value = new Date(value);
  }

  return value
    ? getPersianDate(toTimeZone(value, 3.5), "EEEE d MMMM  yyyy 'ساعت' HH:mm")
    : value;
};
