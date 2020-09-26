import { connect } from "react-redux";
import CurrentScheduleDialog from "./presentation";

import { currentScheduleCloseDialog } from "../../redux/currentSchedule/actions";
import { asyncSchedulesDeleteItem } from "../../redux/schedules/effects";
import { schedulesDeleteItem } from "../../redux/schedules/actions";
import {
    addScheduleOpenDialog, addScheduleSetValue
} from "../../redux/addSchedule/actions";

const mapStateToProps = state => ({
    schedule: state.currentSchedule,
    schedules: state.schedules
});

const mapDispatchToProps = (dispatch) => ({
    closeDialog: () => {
      dispatch(currentScheduleCloseDialog());
    },
    editItem: currentSchedule => {
        dispatch(currentScheduleCloseDialog());
        dispatch(addScheduleSetValue(currentSchedule));
        dispatch(addScheduleOpenDialog());
    },
    deleteItem: schedules => {
        dispatch(schedulesDeleteItem(schedules));
        dispatch(currentScheduleCloseDialog());
    }
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    editItem: () => {
        const schedule = stateProps.schedule.item;
        dispatchProps.editItem(schedule);
    },
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