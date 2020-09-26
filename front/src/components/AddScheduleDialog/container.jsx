import AddScheduleDialog from "./presentation";
import { connect } from "react-redux";
import { addScheduleCloseDialog, addScheduleSetValue, addScheduleStartEdit } from "../../redux/addSchedule/actions";
import { schedulesAddItem } from "../../redux/schedules/actions";
import { isCloseDialog } from "../../services/schedule";

const mapStateToProps = state => ({ schedule: state.addSchedule });

const mapDispatchToProps = dispatch => ({
    closeDialog: () => {
        dispatch(addScheduleCloseDialog());
    },
    setSchedule: value => {
        dispatch(addScheduleSetValue(value));
    },
    saveSchedule: schedule => {
        if (schedule.title) {
            dispatch(schedulesAddItem(schedule));
            dispatch(addScheduleCloseDialog());
        }
    },
    setIsEditStart: () => {
        dispatch(addScheduleStartEdit());
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    const {
        schedule: { form: schedule }
    } = stateProps;

    return {
        ...stateProps,
        ...dispatchProps,
        saveSchedule: () => {
            dispatchProps.saveSchedule(schedule);
        },
        closeDialog: () => {
            if (isCloseDialog(schedule)) {
                dispatchProps.closeDialog();
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(AddScheduleDialog);
