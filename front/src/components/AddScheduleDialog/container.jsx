import AddScheduleDialog from "./presentation";
import { connect } from "react-redux";
import { addScheduleCloseDialog, addScheduleSetValue, addScheduleStartEdit } from "../../redux/addSchedule/actions";
import { schedulesAddItem, schedulesEditItem } from "../../redux/schedules/actions";
import { isCloseDialog } from "../../services/schedule";

const mapStateToProps = state => ({
    schedule: state.addSchedule, all_schedules: state.schedules
});

const mapDispatchToProps = dispatch => ({
    closeDialog: () => {
        dispatch(addScheduleCloseDialog());
    },
    setSchedule: value => {
        dispatch(addScheduleSetValue(value));
    },
    saveSchedule: (schedule, currentSchedules) => {
        if (schedule.title) {
            if (schedule.id) {
                // スケジュールを編集
                currentSchedules[schedule.id -1] = schedule;
                dispatch(schedulesEditItem(currentSchedules));
                dispatch(addScheduleCloseDialog());
            } else {
                // スケジュールを新規追加
                dispatch(schedulesAddItem(schedule));
                dispatch(addScheduleCloseDialog());
            }
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
    const currentSchedules = stateProps.all_schedules.items;

    return {
        ...stateProps,
        ...dispatchProps,
        saveSchedule: () => {
            dispatchProps.saveSchedule(schedule, currentSchedules);
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
