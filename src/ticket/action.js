import { h0 } from '../common/fp'
export const ACTION_SET_departDate = 'action_set_departDate';
export const ACTION_SET_arriveDate = 'action_set_arriveDate';
export const ACTION_SET_departTimeStr = 'action_set_departTimeStr';
export const ACTION_SET_arriveTimeStr = 'action_set_arriveTimeStr';
export const ACTION_SET_departStation = 'action_set_departStation';
export const ACTION_SET_arriveStation = 'action_set_arriveStation';
export const ACTION_SET_trainNumber = 'action_set_trainNumber';
export const ACTION_SET_durationStation = 'action_set_durationStation';
export const ACTION_SET_ticket = 'action_set_ticket';
export const ACTION_SET_isScheduleVisible = 'action_set_isScheduleVisible';
export const ACTION_SET_serachParsed = 'action_set_serachParsed';
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_departDate,
        payload: departDate
    }
}
export function setArriveDate(arriveDate) {
    return {
        type: ACTION_SET_arriveDate,
        payload: arriveDate
    }
}
export function setDepartTimeStr(departTimeStr) {
    return {
        type: ACTION_SET_departTimeStr,
        payload: departTimeStr
    }
}
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: ACTION_SET_arriveTimeStr,
        payload: arriveTimeStr
    }
}
export function setDepartStation(departStation) {
    return {
        type: ACTION_SET_departStation,
        payload: departStation
    }
}
export function setArriveStation(arriveStation) {
    return {
        type: ACTION_SET_arriveStation,
        payload: arriveStation
    }
}
export function setTrainNumber(trainNumber) {
    return {
        type: ACTION_SET_trainNumber,
        payload: trainNumber
    }
}
export function setDurationStr(durationStation) {
    return {
        type: ACTION_SET_durationStation,
        payload: durationStation
    }
}
export function setTickets(ticket) {
    return {
        type: ACTION_SET_ticket,
        payload: ticket
    }
}
export function setIsScheduleVisible(isScheduleVisible) {
    return {
        type: ACTION_SET_isScheduleVisible,
        payload: isScheduleVisible,
    };
}
export function toggleIsScheduleVisible() {
    return (dispatch, getState) => {
        const { isScheduleVisible } = getState();

        dispatch(setIsScheduleVisible(!isScheduleVisible));
    };
}
export function setSearchParsed(serachParsed) {
    return {
        type: ACTION_SET_serachParsed,
        payload: serachParsed
    }
}
export function nextDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
    };
}
export function prevDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
    };
}