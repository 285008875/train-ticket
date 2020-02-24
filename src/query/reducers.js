import {
    ACTION_SET_from,
    ACTION_SET_to,
    ACTION_SET_departDate,
    ACTION_SET_highSpeed,
    ACTION_SET_trainList,
    ACTION_SET_orderType,
    ACTION_SET_onlyTickets,
    ACTION_SET_ticketTypes,
    ACTION_SET_checkedTicketTypes,
    ACTION_SET_trainTypes,
    ACTION_SET_checkedTrainTypes,
    ACTION_SET_departStations,
    ACTION_SET_checkedDepartStations,
    ACTION_SET_arriveStations,
    ACTION_SET_checkedArriveStations,
    ACTION_SET_departTimeStart,
    ACTION_SET_departTimeEnd,
    ACTION_SET_arriveTimeStart,
    ACTION_SET_arriveTimeEnd,
    ACTION_SET_isFiltersVisible,
    ACTION_SET_serachParsed,
} from './action';
import { ORDER_DEPART } from './constant';
export default {
    from(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_from:
                return payload;
            default:

        }
        return state;
    },
    to(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_to:
                return payload;
            default:

        }
        return state;
    },
    departDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_departDate:
                return payload;
            default:

        }
        return state;
    },
    highSpeed(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_highSpeed:
                return payload;
            case ACTION_SET_checkedTrainTypes:
                const checkedTrainTypes = payload;
                return Boolean(checkedTrainTypes[1] && checkedTrainTypes[5]);
            default:

        }
        return state;
    },
    trainList(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_trainList:
                return payload;
            default:

        }
        return state;
    },
    orderType(state = ORDER_DEPART, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_orderType:
                return payload;
            default:

        }
        return state;
    },
    onlyTickets(state = false, action) {
        const { type, payload } = action;
        // console.log(payload);
        switch (type) {
            case ACTION_SET_onlyTickets:
                return payload;
            default:

        }
        return state;
    },
    ticketTypes(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_ticketTypes:
                return payload;
            default:

        }
        return state;
    },
    checkedTicketTypes(state = {}, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_checkedTicketTypes:
                return payload;

            default:

        }
        return state;
    },
    trainTypes(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_trainTypes:
                return payload;
            default:

        }
        return state;
    },
    checkedTrainTypes(state = {}, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_checkedTrainTypes:
                return payload;
            case ACTION_SET_highSpeed:
                // console.log(state, action);
                const highSpeed = payload;
                const newCheckedTrainTypes = { ...state }
                if (highSpeed) {
                    newCheckedTrainTypes[1] = true
                    newCheckedTrainTypes[5] = true
                } else {
                    delete newCheckedTrainTypes[1]
                    delete newCheckedTrainTypes[5]
                }
                return newCheckedTrainTypes
            default:
        }
        return state;
    },
    departStations(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_departStations:
                return payload;
            default:

        }
        return state;
    },
    checkedDepartStations(state = {}, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_checkedDepartStations:
                return payload;
            default:

        }
        return state;
    },
    arriveStations(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_arriveStations:
                return payload;
            default:

        }
        return state;
    },
    checkedArriveStations(state = {}, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_checkedArriveStations:
                return payload;
            default:

        }
        return state;
    },
    departTimeStart(state = 0, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_departTimeStart:
                return payload;
            default:

        }
        return state;
    },
    departTimeEnd(state = 24, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_departTimeEnd:
                return payload;
            default:

        }
        return state;
    },
    arriveTimeStart(state = 0, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_arriveTimeStart:
                return payload;
            default:

        }
        return state;
    },
    arriveTimeEnd(state = 24, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_arriveTimeEnd:
                return payload;
            default:

        }
        return state;
    },
    isFiltersVisible(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_isFiltersVisible:
                return payload;
            default:

        }
        return state;
    },
    serachParsed(state = false, action) {
        // console.log(action);
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_serachParsed:
                return payload;
            default:

        }
        return state;
    },
}