export const secondFromNow = (date: Date): number => {
  const now = new Date().getTime();

  const diff = date.getTime() - now;
  return Math.floor(diff / 1000);
};
