export function toTimeZone(date: Date, offset: number) {
  const utc = date.getTime();
  const newDate = new Date(utc + 3600000 * offset);
  return newDate;
}
