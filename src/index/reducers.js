import {
    ACTION_SET_from,
    ACTION_SET_to,
    ACTION_SET_isCitySelectorVisible,
    ACTION_SET_currentSelectingLeftCity,
    ACTION_SET_cityData,
    ACTION_SET_isLoadingCityData,
    ACTION_SET_isDataSelectorVisible,
    ACTION_SET_highSpeed,
    ACTION_SET_departDate
} from './action';

export default {
    from(state = '北京', action) {
        const { type, payload } = action;
        // console.log(state, action);
        switch (type) {
            case ACTION_SET_from:

                return payload;

            default:
                return state;
        }
    },
    to(state = '上海', action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_to:

                return payload;

            default:
                return state;
        }
    },
    isCitySelectorVisible(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_isCitySelectorVisible:

                return payload;

            default:
                return state;
        }
    },
    currentSelectingLeftCity(state = false, action) {
        // console.log(state, action);
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_currentSelectingLeftCity:

                return payload;

            default:
                return state;
        }
    },
    cityData(state = null, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_cityData:

                return payload;

            default:
                return state;
        }
    },
    isLoadingCityData(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_isLoadingCityData:

                return payload;

            default:
                return state;
        }
    },
    isDataSelectorVisible(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_isDataSelectorVisible:

                return payload;

            default:
                return state;
        }
    },
    highSpeed(state = false, action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_highSpeed:

                return payload;

            default:
                return state;
        }
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
}