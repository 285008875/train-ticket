

export const ACTION_SET_trainNumber = 'ACTION_SET_trainNumber'
export const ACTION_SET_departStation = 'ACTION_SET_departStation'
export const ACTION_SET_arriveStation = 'ACTION_SET_arriveStation'
export const ACTION_SET_seatType = 'ACTION_SET_seatTyp'
export const ACTION_SET_departDate = 'ACTION_SET_departDate'
export const ACTION_SET_arriveDate = 'ACTION_SET_arriveDate'
export const ACTION_SET_departTimeStr = 'ACTION_SET_departTimeStr'
export const ACTION_SET_arriveTimeStr = 'ACTION_SET_arriveTimeStr'
export const ACTION_SET_durationStr = 'ACTION_SET_durationStr'
export const ACTION_SET_price = 'ACTION_SET_price'
export const ACTION_SET_passengers = 'ACTION_SET_passengers'
export const ACTION_SET_menu = 'ACTION_SET_menu'
export const ACTION_SET_isMenuVisible = 'ACTION_SET_isMenuVisible'
export const ACTION_SET_searchParsed = 'ACTION_SET_searchParsed'

export function setTrainNumber(trainNumber) {
    return {
        type: ACTION_SET_trainNumber,
        payload: trainNumber
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
export function setSeatType(seatType) {
    return {
        type: ACTION_SET_seatType,
        payload: seatType
    }
}
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
export function setDurationStr(durationStr) {
    return {
        type: ACTION_SET_durationStr,
        payload: durationStr
    }
}
export function setPrice(price) {
    return {
        type: ACTION_SET_price,
        payload: price
    }
}
export function setPassengers(passengers) {
    return {
        type: ACTION_SET_passengers,
        payload: passengers
    }
}
export function setMenu(menu) {
    // console.log(menu);
    return {
        type: ACTION_SET_menu,
        payload: menu
    }
}
export function setIsMenuVisible(isMenuVisible) {
    return {
        type: ACTION_SET_isMenuVisible,
        payload: isMenuVisible
    }
}
export function setSearchParsed(searchParsed) {
    return {
        type: ACTION_SET_searchParsed,
        payload: searchParsed
    }
}
export function fetchInitial(url) {
    return (dispatch, getState) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const {
                    departTimeStr,
                    arriveTimeStr,
                    arriveDate,
                    durationStr,
                    price,
                } = data;

                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setPrice(price));
            });
    };
}

let passengerIdSeed = 0;

export function createAdult() {
    return (dispatch, getState) => {
        const { passengers } = getState();

        for (let passenger of passengers) {
            const keys = Object.keys(passenger);
            for (let key of keys) {
                if (!passenger[key]) {
                    return;
                }
            }
        }
        dispatch(
            setPassengers([
                ...passengers,
                {
                    id: ++passengerIdSeed,
                    name: '',
                    ticketType: 'adult',
                    licenceNo: '',
                    seat: 'Z',
                },
            ])
        );
    };
}

export function createChild() {
    return (dispatch, getState) => {
        const { passengers } = getState();

        let adultFound = null;

        for (let passenger of passengers) {
            const keys = Object.keys(passenger);
            for (let key of keys) {
                if (!passenger[key]) {
                    return;
                }
            }

            if (passenger.ticketType === 'adult') {
                adultFound = passenger.id;
            }
        }

        if (!adultFound) {
            alert('请至少正确添加一个同行成人');
            return;
        }

        dispatch(
            setPassengers([
                ...passengers,
                {
                    id: ++passengerIdSeed,
                    name: '',
                    gender: 'none',
                    birthday: '',
                    followAdult: adultFound,
                    ticketType: 'child',
                    seat: 'Z',
                },
            ])
        );
    };
}
export function removePassenger(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        const newPassengers = passengers.filter(passenger => {
            return passenger.id !== id && passenger.followAdult !== id;
        });

        dispatch(setPassengers(newPassengers));
    };
}

export function updatePassenger(id, data, keysToBeRemoved = []) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        for (let i = 0; i < passengers.length; ++i) {
            if (passengers[i].id === id) {
                const newPassengers = [...passengers];
                newPassengers[i] = Object.assign({}, passengers[i], data);

                for (let key of keysToBeRemoved) {
                    delete newPassengers[i][key];
                }

                dispatch(setPassengers(newPassengers));

                break;
            }
        }
    };
}


export function showMenu(menu) {
    return dispatch => {
        dispatch(setMenu(menu));
        dispatch(setIsMenuVisible(true));
    };
}

export function showGenderMenu(id) {
    // console.log(1);
    return (dispatch, getState) => {
        const { passengers } = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(gender) {
                    dispatch(updatePassenger(id, { gender }));
                    dispatch(hideMenu());
                },
                options: [
                    {
                        title: '男',
                        value: 'male',
                        active: 'male' === passenger.gender,
                    },
                    {
                        title: '女',
                        value: 'female',
                        active: 'female' === passenger.gender,
                    },
                ],
            })
        );
    };
}

export function showFollowAdultMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(followAdult) {
                    dispatch(updatePassenger(id, { followAdult }));
                    dispatch(hideMenu());
                },
                options: passengers
                    .filter(passenger => passenger.ticketType === 'adult')
                    .map(adult => {
                        return {
                            title: adult.name,
                            value: adult.id,
                            active: adult.id === passenger.followAdult,
                        };
                    }),
            })
        );
    };
}

export function showTicketTypeMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(ticketType) {
                    if ('adult' === ticketType) {
                        dispatch(
                            updatePassenger(
                                id,
                                {
                                    ticketType,
                                    licenceNo: '',
                                },
                                ['gender', 'followAdult', 'birthday']
                            )
                        );
                    } else {
                        const adult = passengers.find(
                            passenger =>
                                passenger.id === id &&
                                passenger.ticketType === 'adult'
                        );

                        if (adult) {
                            dispatch(
                                updatePassenger(
                                    id,
                                    {
                                        ticketType,
                                        gender: '',
                                        followAdult: adult.id,
                                        birthday: '',
                                    },
                                    ['licenceNo']
                                )
                            );
                        } else {
                            alert('没有其他成人乘客');
                        }
                    }

                    dispatch(hideMenu());
                },
                options: [
                    {
                        title: '成人票',
                        value: 'adult',
                        active: 'adult' === passenger.ticketType,
                    },
                    {
                        title: '儿童票',
                        value: 'child',
                        active: 'child' === passenger.ticketType,
                    },
                ],
            })
        );
    };
}

export function hideMenu() {
    return setIsMenuVisible(false);
}
