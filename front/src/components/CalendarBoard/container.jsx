import { connect } from "react-redux";
import { createCalendar } from "../../services/calendar";
import { setSchedules } from "../../services/schedule";
import { asyncSchedulesFetchItem } from "../../redux/schedules/effects";
import {
    addScheduleOpenDialog, addScheduleSetValue
} from "../../redux/addSchedule/actions";
import {
    currentScheduleSetItem,
    currentScheduleOpenDialog
} from "../../redux/currentSchedule/actions";
import CalendarBoard from "./presentation";

const mapStateToProps = state => ({
    calendar: state.calendar,
    schedules: state.schedules
});

const mapDispatchToProps = dispatch => ({
    openAddScheduleDialog: d => {
        dispatch(addScheduleSetValue({ date: d }));
        dispatch(addScheduleOpenDialog());
    },
    openCurrentScheduleDialog: (schedule, e) => {
        // 他のイベントが発火するのをキャンセル
        e.stopPropagation();

        dispatch(currentScheduleSetItem(schedule));
        dispatch(currentScheduleOpenDialog());
    },
    fetchSchedule: month => {
        dispatch(asyncSchedulesFetchItem(month));
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    const {
        calendar: month,
        schedules: { items: schedules }
    } = stateProps;

    const calendar = setSchedules(createCalendar(month), schedules);
    return {
        ...stateProps,
        ...dispatchProps,
        fetchSchedule: () => dispatchProps.fetchSchedule(month),
        calendar,
        month
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CalendarBoard);