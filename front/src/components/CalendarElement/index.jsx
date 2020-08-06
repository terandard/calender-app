import React from "react";
import dayjs from "dayjs";

import * as styles from "./style.css";
import { Typography } from "@material-ui/core";
import { isSameDay, isSameMonth, isFirstDay, getMonth } from "../../services/calendar";

const CalendarElement = ({ day, month }) => {
  const isCurrentMonth = isSameMonth(day, getMonth(month));
  const textColor = isCurrentMonth ? "textPrimary" : "textSecondary";

  // 月の最初だけ月情報をつける
  const format = isFirstDay(day) ? "M月D日" : "D";
  const today = dayjs();
  const isToday = isSameDay(day, today);

  return (
    <div className={styles.element}>
      <Typography
        className={styles.date}
        color={textColor}
        align="center"
        variant="caption"
        component="div" >
          <span className={isToday ? styles.today : ""}>
            {day.format(format)}
          </span>
      </Typography>
    </div>
  );
};

export default CalendarElement;