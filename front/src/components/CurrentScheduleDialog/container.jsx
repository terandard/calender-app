import { connect } from "react-redux";
import CurrentScheduleDialog from "./presentation";

import { currentScheduleCloseDialog } from "../../redux/currentSchedule/actions";
import { asyncSchedulesDeleteItem } from "../../redux/schedules/effects";
import { schedulesDeleteItem } from "../../redux/schedules/actions";

const mapStateToProps = state => ({
    schedule: state.currentSchedule,
    schedules: state.schedules
});

const mapDispatchToProps = (dispatch, getState) => ({
    closeDialog: () => {
      dispatch(currentScheduleCloseDialog());
    },
    deleteItem: schedule => {
        dispatch(schedulesDeleteItem(schedule));
        dispatch(currentScheduleCloseDialog());
    }
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    deleteItem: () => {
        const { id } = stateProps.schedule.item;
        const currentSchedules = stateProps.schedules.items;
        const newSchedules = currentSchedules.filter(s => s.id !== id);
        dispatchProps.deleteItem(newSchedules);
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(CurrentScheduleDialog);