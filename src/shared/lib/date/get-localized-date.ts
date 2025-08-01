import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";

dayjs.extend(localizedFormat);

export const getLocalizedDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DDTHH:mm");
};
