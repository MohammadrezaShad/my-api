export const getISODateString = function (date: string): string {
  const newDate = new Date(date);
  if (newDate.getHours() === 0 && newDate.getMinutes() === 0) {
    const currentDate = new Date();
    newDate.setHours(
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
    );
  }
  return newDate.toISOString();
};
