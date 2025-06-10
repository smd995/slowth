import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getUTCDate = (date: string) => {
  return dayjs(date, "Asia/Seoul").tz("UTC").format();
};
