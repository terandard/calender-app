import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

export const createCalendar = month => {
  // 今月の最初の日を追加
  const firstDay = getMonth(month);
  const firstDayIndex = firstDay.day();

  return Array(35)
    .fill(0)
    .map((_, i) => {
      const day = firstDay.add(i - firstDayIndex, "day");

      return day;
    });
};

export const getMonth = ({ year, month }) => {
  return dayjs(`${year}-${month}`);
}

export const isSameDay = (d1, d2) => {
    const format = "YYYYMMDD";
    return d1.format(format) === d2.format(format);
};

export const isSameMonth = (m1, m2) => {
    const format = "YYYYMM";
    return m1.format(format) === m2.format(format);
};

export const isFirstDay = day => day.date() === 1;