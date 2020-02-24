import { ORDER_DEPART, ORDER_DURATION } from "./constant";
import { h0 } from "h:/train-ticket-master/train-ticket/src/common/fp";

export const ACTION_SET_from = 'action_set_from';
export const ACTION_SET_to = 'action_set_to';
export const ACTION_SET_departDate = 'action_set_departDate';
export const ACTION_SET_highSpeed = 'action_set_highSpeed';
export const ACTION_SET_trainList = 'action_set_trainList';
export const ACTION_SET_orderType = 'action_set_orderType';
export const ACTION_SET_onlyTickets = 'action_set_onlyTickets';
export const ACTION_SET_ticketTypes = 'action_set_ticketTypes';
export const ACTION_SET_checkedTicketTypes = 'action_set_checkedTicketTypes';
export const ACTION_SET_trainTypes = 'action_set_trainTypes';
export const ACTION_SET_checkedTrainTypes = 'action_set_checkedTrainTypes';
export const ACTION_SET_departStations = 'action_set_departStations';
export const ACTION_SET_checkedDepartStations = 'action_set_checkedDepartStations';
export const ACTION_SET_arriveStations = 'action_set_arriveStations';
export const ACTION_SET_checkedArriveStations = 'action_set_checkedArriveStations';
export const ACTION_SET_departTimeStart = 'action_set_departTimeStart';
export const ACTION_SET_departTimeEnd = 'action_set_departTimeEnd';
export const ACTION_SET_arriveTimeStart = 'action_set_arriveTimeStart';
export const ACTION_SET_arriveTimeEnd = 'action_set_arriveTimeEnd';
export const ACTION_SET_isFiltersVisible = 'action_set_isFiltersVisible';
export const ACTION_SET_serachParsed = 'action_set_serachParsed';

export function setFrom(from) {
    return {
        type: ACTION_SET_from,
        payload: from
    }
}
export function setTo(to) {
    return {
        type: ACTION_SET_to,
        payload: to
    }
}
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_departDate,
        payload: departDate
    }
}
export function setHighSpeed(highSpeed) {
    return {
        type: ACTION_SET_highSpeed,
        payload: highSpeed
    }
}
export function toggleHighSpeed(highSpeed) {
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch(setHighSpeed(!highSpeed))
    }
}
export function setTrainList(trainList) {
    return {
        type: ACTION_SET_trainList,
        payload: trainList
    }
}
export function toggleOrderType() {
    return (dispatch, getState) => {
        const { orderType } = getState();
        if (orderType === ORDER_DEPART) {
            dispatch({
                type: ACTION_SET_orderType,
                payload: ORDER_DURATION,
            })
        } else {
            dispatch({
                type: ACTION_SET_orderType,
                payload: ORDER_DEPART
            })
        }
    }

}
export function toggleOnlyTickets() {
    return (dispatch, getState) => {
        console.log("---------------------");
        const { onlyTickets } = getState();
        console.log(onlyTickets);
        dispatch({
            type: ACTION_SET_onlyTickets,
            payload: !onlyTickets
        })
    }
}
export function setTicketTypes(ticketTypes) {
    return {
        type: ACTION_SET_ticketTypes,
        payload: ticketTypes
    }
}
export function setCheckedTicketTypes(checkedTicketTypes) {
    return {
        type: ACTION_SET_checkedTicketTypes,
        payload: checkedTicketTypes
    }
}
export function setTrainTypes(trainTypes) {
    return {
        type: ACTION_SET_trainTypes,
        payload: trainTypes
    }
}
export function setCheckedTrainTypes(checkedTrainTypes) {
    return {
        type: ACTION_SET_checkedTrainTypes,
        payload: checkedTrainTypes
    }
}
export function setDepartStations(departStations) {
    return {
        type: ACTION_SET_departStations,
        payload: departStations
    }
}
export function setCheckedDepartStations(checkedDepartStations) {
    return {
        type: ACTION_SET_checkedDepartStations,
        payload: checkedDepartStations
    }
}
export function setArriveStations(arriveStations) {
    return {
        type: ACTION_SET_arriveStations,
        payload: arriveStations
    }
}
export function setCheckedArriveStations(checkedArriveStations) {
    return {
        type: ACTION_SET_checkedArriveStations,
        payload: checkedArriveStations
    }
}
export function setDepartTimeStart(departTimeStart) {
    return {
        type: ACTION_SET_departTimeStart,
        payload: departTimeStart
    }
}
export function setDepartTimeEnd(departTimeEnd) {
    return {
        type: ACTION_SET_departTimeEnd,
        payload: departTimeEnd
    }
}
export function setArriveTimeStart(arriveTimeStart) {
    return {
        type: ACTION_SET_arriveTimeStart,
        payload: arriveTimeStart
    }
}
export function setArriveTimeEnd(arriveTimeEnd) {
    return {
        type: ACTION_SET_arriveTimeEnd,
        payload: arriveTimeEnd
    }
}
export function toggleIsFiltersVisible() {
    return (dispatch, getState) => {

        const { isFiltersVisible } = getState();
        console.log(isFiltersVisible);
        dispatch({
            type: ACTION_SET_isFiltersVisible,
            payload: !isFiltersVisible
        })
    }
}
export function setSerachParsed(serachParsed) {

    return {
        type: ACTION_SET_serachParsed,
        payload: serachParsed
    }
}

export function nextDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();
        dispatch(setDepartDate(h0(departDate) + 86400 * 1000))
    }
}
export function prevDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();
        dispatch(setDepartDate(h0(departDate) - 86400 * 1000))
    }
}
