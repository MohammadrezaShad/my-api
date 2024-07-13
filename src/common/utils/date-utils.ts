export function getCurrentWeek(date: Date) {
  date.setHours(0, 0, 0);
  return Array(7)
    .fill(new Date(date))
    .map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)));
}

export function getTodayName(date: Date) {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return days[date.getDay()];
}

export const isFirstDateComesAfterTheSecond = (input: {
  first: string;
  second: string;
}): boolean => {
  return input.first >= input.second;
};
