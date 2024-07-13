interface FilterDate {
  fromDate?: Date;
  toDate?: Date;
}

export const getFilterDateState = function ({ fromDate, toDate }: FilterDate): {
  from?: Date;
  to?: Date;
} {
  const from = fromDate ? new Date(fromDate) : undefined;
  const to = toDate ? new Date(toDate) : undefined;
  from && from.setHours(0, 0, 0);
  to && to.setHours(23, 59, 59);
  return { from, to };
};
