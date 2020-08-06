import React from "react";
import dayjs from "dayjs";

import * as styles from "./style.css";
import { Typography } from "@material-ui/core";
import { isSameDay, isSameMonth, isFirstDay } from "../../services/calendar";

const CalendarElement = ({ day }) => {
  // 月の最初だけ月情報をつける
  const format = isFirstDay(day) ? "M月D日" : "D";
  const today = dayjs();
  const isToday = isSameDay(day, today);
  const textColor = isSameMonth(day, today) ? "textPrimary" : "textSecondary";

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