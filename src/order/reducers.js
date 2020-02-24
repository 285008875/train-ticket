import {
    ACTION_SET_trainNumber,
    ACTION_SET_departStation,
    ACTION_SET_arriveStation,
    ACTION_SET_seatType,
    ACTION_SET_departDate,
    ACTION_SET_arriveDate,
    ACTION_SET_departTimeStr,
    ACTION_SET_arriveTimeStr,
    ACTION_SET_durationStr,
    ACTION_SET_price,
    ACTION_SET_passengers,
    ACTION_SET_menu,
    ACTION_SET_isMenuVisible,
    ACTION_SET_searchParsed,
} from './action';

export default {
    trainNumber(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_trainNumber:
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
    seatType(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_seatType:
                return payload;

            default:

        }
        return state;
    },
    departDate(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_departDate:
                return payload;

            default:

        }
        return state;
    },
    arriveDate(state = null, action) {
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
    durationStr(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_durationStr:
                return payload;

            default:

        }
        return state;
    },
    price(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_price:
                return payload;

            default:

        }
        return state;
    },
    passengers(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_passengers:
                return payload;

            default:

        }
        return state;
    },
    menu(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_menu:
                return payload;

            default:

        }
        return state;
    },
    isMenuVisible(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_isMenuVisible:
                return payload;

            default:

        }
        return state;
    },
    searchParsed(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_searchParsed:
                return payload;

            default:

        }
        return state;
    },
}

