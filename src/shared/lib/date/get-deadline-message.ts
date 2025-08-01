import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getDeadlineMessage = (
  registrationEnd: string,
): {
  deadlinePassed: boolean;
  isDeadlineSoon: boolean;
  message: string;
} => {
  const KST = "Asia/Seoul";

  const end = dayjs.utc(registrationEnd).tz(KST);
  const now = dayjs().tz(KST);

  if (end.isBefore(now)) {
    return {
      deadlinePassed: true,
      isDeadlineSoon: false,
      message: "모집 마감",
    };
  }

  const endDate = end.format("YYYY-MM-DD");
  const nowDate = now.format("YYYY-MM-DD");
  const tomorrowDate = now.add(1, "day").format("YYYY-MM-DD");

  const hour = end.format("H");
  let message = "";
  let isDeadlineSoon = false;
  const deadlinePassed = false;
  if (endDate === nowDate) {
    message = `오늘 ${hour}시 마감`;
    isDeadlineSoon = end.isAfter(now); // 현재 시간 이후일 때만 true
  } else if (endDate === tomorrowDate) {
    message = `내일 ${hour}시 마감`;
    isDeadlineSoon = true;
  } else {
    message = "";
  }

  return { deadlinePassed, isDeadlineSoon, message };
};
