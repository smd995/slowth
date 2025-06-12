export const getFormattedDate = (date: Date | null) => {
  if (!date) return undefined;
  const utcDate = new Date(date.getTime() - 9 * 60 * 60 * 1000);
  return utcDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
};
