import React, { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData, setSelectedCity, showDateSelector, hideDateSelector, setDepartDate, toggleHighSpeed } from './action.js'
import useOnBack from '../common/useOnBack';
import DepartDate from './DepartDate';
import Journey from './Journey';
import Submit from './Submit';
import HighSpeed from './HightSpeed';
import Header from '../common/Header';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';
import { h0 } from '../common/fp';
import './style/App.css';

function App(props) {
    console.log('App');
    const {
        from,
        to,
        dispatch,
        highSpeed,
        isCitySelectorVisible,
        isDataSelectorVisible,
        cityData,
        isLoadingCityData,
        departDate
    } = props;
    //   onBack 使用自定义hook封装
    const onBack = useOnBack();
    // const onBack = useCallback(() => {
    //     return window.history.back()
    // }, [])

    // const doExchangeFromTo = useCallback(() => {
    //     dispatch(exchangeFromTo())
    // }, [dispatch])
    // const doShowCitySelector = useCallback((m) => {
    //     dispatch(showCitySelector(m))
    // }, [dispatch])

    const cbs = useCallback(bindActionCreators({
        exchangeFromTo,
        showCitySelector
    }, dispatch), [dispatch])
    const CitySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            // setSelectedCity,
            onSelect: setSelectedCity,
        }, dispatch)
    }, [dispatch])
    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClik: showDateSelector
        }, dispatch)
    }, [dispatch])
    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector
        }, dispatch)
    }, [dispatch])
    const onSelectDate = useCallback((day) => {
        if (!day) {
            return;
        }
        if (day < h0()) {
            return;
        }
        dispatch(setDepartDate(day));
        dispatch(hideDateSelector())
    }, [dispatch])
    const highSpeedCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggle: toggleHighSpeed,
            },
            dispatch
        );
    }, [dispatch]);
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票"
                    onBack={onBack}
                />
            </div>
            <form action="query.html" className="form">
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                // exchangeFromTo={doExchangeFromTo}
                // showCitySelector={doShowCitySelector}
                />
                <DepartDate time={departDate}{...departDateCbs} />
                <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
                <Submit />

            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...CitySelectorCbs}
            // onBack={CitySelectorCbs}
            />
            <DateSelector
                show={isDataSelectorVisible}
                {...dateSelectorCbs}
                onSelect={onSelectDate}
            // onBack={onBack}
            />
        </div>
    )
}
function mapStateToProps(state) {
    // console.log(state);
    return state
}
function mapDispatchToProps(dispatch) {
    // console.log(dispatch);
    return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

