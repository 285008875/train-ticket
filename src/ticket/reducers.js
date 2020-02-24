import {
    ACTION_SET_departDate,
    ACTION_SET_arriveDate,
    ACTION_SET_departTimeStr,
    ACTION_SET_arriveTimeStr,
    ACTION_SET_departStation,
    ACTION_SET_arriveStation,
    ACTION_SET_trainNumber,
    ACTION_SET_durationStation,
    ACTION_SET_ticket,
    ACTION_SET_isScheduleVisible,
    ACTION_SET_serachParsed,
} from './action'

export default {

    departDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_departDate:
                return payload;
            default:

        }
        return state;
    },
    arriveDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_arriveDate:
                return payload;
            default:

        }
        return state;
    },
    departTimeStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_departTimeStr:
                return payload;
            default:

        }
        return state;
    },
    arriveTimeStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_arriveTimeStr:
                return payload;
            default:

        }
        return state;
    },
    departStation(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_departStation:
                return payload;
            default:

        }
        return state;
    },
    arriveStation(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_arriveStation:
                return payload;
            default:

        }
        return state;
    },
    trainNumber(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_trainNumber:
                return payload;
            default:

        }
        return state;
    },
    durationStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_durationStation:
                return payload;
            default:

        }
        return state;
    },
    tickets(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_ticket:
                return payload;
            default:

        }
        return state;
    },
    isScheduleVisible(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_isScheduleVisible:
                return payload;
            default:

        }
        return state;
    },
    searchParsed(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_serachParsed:
                return payload;
            default:

        }
        return state;
    },
}