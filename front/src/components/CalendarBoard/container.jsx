import { connect } from "react-redux";
import { createCalendar } from "../../services/calendar";
import { addScheduleOpenDialog, addScheduleSetValue } from "../../redux/addSchedule/actions";
import CalendarBoard from "./presentation";

const mapStateToProps = state => ({ calendar: state.calendar });

const mapDispatchToProps = dispatch => ({
    openAddScheduleDialog: d => {
        dispatch(addScheduleSetValue({ date: d }));
        dispatch(addScheduleOpenDialog());
    }
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    month: stateProps.calendar,
    calendar: createCalendar(stateProps.calendar)
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CalendarBoard);