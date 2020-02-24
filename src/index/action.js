export const ACTION_SET_from = 'set_from'
export const ACTION_SET_to = 'set_to'
export const ACTION_SET_isCitySelectorVisible = 'set_isCitySelectorVisible'
export const ACTION_SET_currentSelectingLeftCity = 'set_currentSelectingLeftCity'
export const ACTION_SET_cityData = 'set_cityData'
export const ACTION_SET_isLoadingCityData = 'set_isLoadingCityData'
export const ACTION_SET_isDataSelectorVisible = 'set_isDataSelectorVisible'
export const ACTION_SET_highSpeed = 'set_highSpeed'
export const ACTION_SET_departDate = 'set_departDate'

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
export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: ACTION_SET_isLoadingCityData,
        payload: isLoadingCityData
    }
}
export function setCityData(cityData) {
    // console.log(cityData);
    return {
        type: ACTION_SET_cityData,
        payload: cityData
    }
}
export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch({
            type: ACTION_SET_highSpeed,
            payload: !highSpeed
        })
    }
}
export function showCitySelector(currentSelectingLeftCity) {
    // console.log(currentSelectingLeftCity);
    //设置显示列表的同时 设置点击哪个输入框
    return (dispatch, getState) => {
        dispatch({
            type: ACTION_SET_isCitySelectorVisible,
            payload: true
        })
        dispatch({
            type: ACTION_SET_currentSelectingLeftCity,
            payload: currentSelectingLeftCity
        })
    }
}
export function hideCitySelector(currentSelectingLeftCity) {
    return {
        type: ACTION_SET_isCitySelectorVisible,
        payload: false
    }
}
export function setSelectedCity(city) {
    return (dispatch, getState) => {

        const { currentSelectingLeftCity } = getState();
        // 根据currentSelectingLeftCity选择设置from还是to
        // console.log(currentSelectingLeftCity)
        if (currentSelectingLeftCity) {
            dispatch(setFrom(city))
        } else {
            dispatch(setTo(city))
        }
        dispatch(hideCitySelector())
    }
}
export function showDateSelector() {
    return {
        type: ACTION_SET_isDataSelectorVisible,
        payload: true
    }
}
export function hideDateSelector() {
    return {
        type: ACTION_SET_isDataSelectorVisible,
        payload: false
    }
}
export function exchangeFromTo() {
    return (dispatch, getState) => {
        // console.log(dispatch, getState());
        const { from, to } = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from));
    }
}
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_departDate,
        payload: departDate
    }
}
export function fetchCityData() {
    return (dispatch, getState) => {
        const { isLoadingCityData } = getState()
        // 判断是否正在获取数据，正在获取则返回 ，减少网络请求
        if (isLoadingCityData === true) {
            return;
        }
        //判断localStorage是否有缓存， 有缓存直接在缓存获取前提是没有过期
        const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}')

        //
        if (Date.now() < cache.expires) {
            dispatch(setCityData(cache.data))
            return;
        }
        // 正在获取数据  避免重复加载
        dispatch(setIsLoadingCityData(true));
        fetch('/rest/cities?_' + Date.now())
            .then(res => res.json())
            .then(cityData => {

                dispatch(setCityData(cityData))
                localStorage.setItem('city_data_cache', JSON.stringify({
                    expires: Date.now() + 60 * 1000,
                    data: cityData
                }))
                dispatch(setIsLoadingCityData(false))
            })
            .catch(err => {
                dispatch(setIsLoadingCityData(false))
            })
    }
}
