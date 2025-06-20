import dayjs from "dayjs";

/**
 * 주어진 날짜가 오늘을 지났는지 확인하는 함수 (시간 포함)
 * @param (date : string) - 비교할 날짜
 * @returns boolean - 날짜가 현재 시간을 지났으면 true, 아니면 false
 */
export const isPastNow = (date: string) => {
  if (!date) return false;

  const targetDate = dayjs(date);
  const now = dayjs();

  return targetDate.isBefore(now);
};
