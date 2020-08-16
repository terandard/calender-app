import { connect } from "react-redux";
import { createCalendar } from "../../services/calendar";
import { setSchedules } from "../../services/schedule";
import { addScheduleOpenDialog, addScheduleSetValue } from "../../redux/addSchedule/actions";
import CalendarBoard from "./presentation";

const mapStateToProps = state => ({
    calendar: state.calendar,
    schedules: state.schedules
});

const mapDispatchToProps = dispatch => ({
    openAddScheduleDialog: d => {
        dispatch(addScheduleSetValue({ date: d }));
        dispatch(addScheduleOpenDialog());
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
        calendar,
        month
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CalendarBoard);