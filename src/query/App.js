import React, { useCallback, useEffect, useMemo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import URI from 'urijs';
import dayjs from 'dayjs';
import {
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
    setSerachParsed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    nextDate,
    prevDate,
    toggleHighSpeed,
    toggleOrderType,
    toggleOnlyTickets,
    toggleIsFiltersVisible,

    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setArriveTimeEnd,
    setArriveTimeStart,
    setDepartTimeEnd,
    setDepartTimeStart
} from './action';
import useNav from '../common/useNav'
import { h0 } from '../common/fp';
import Header from '../common/Header';
import Nav from '../common/Nav';
import List from './List';
import Bottom from './Bottom'
import './style/App.css';
function App(props) {
    // console.log(props);
    const {
        from,
        to,
        highSpeed,
        departDate,
        dispatch,
        serachParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        isFiltersVisible,
        departStations,
        arriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        ticketTypes,
        trainTypes,
        trainList,
    } = props
    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    useEffect(() => {
        const querys = URI.parseQuery(window.location.search)
        // console.log(querys);
        const { from, to, date, highSpeed } = querys;
        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));
        dispatch(setHighSpeed(highSpeed === 'true'))
        dispatch(setSerachParsed(true))
    }, [dispatch])
    useEffect(() => {
        if (!serachParsed) {
            return
        }
        const url = URI('/rest/query')
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('departDate', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('serachParsed', serachParsed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickets)
            .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
            .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
            .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
            .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString()
        fetch(url).then(res => res.json())
            .then(result => {
                // console.log(result);
                const {
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation
                            }
                        }
                    }
                } = result;
                dispatch(setTrainList(trains));
                dispatch(setTicketTypes(ticketType));
                dispatch(setTrainTypes(trainType));
                dispatch(setDepartStations(depStation));
                dispatch(setArriveStations(arrStation));

            })
    }, [
        from,
        to,
        departDate,
        highSpeed,
        serachParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        dispatch,

    ]);


    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(departDate, dispatch, prevDate, nextDate)
    // const isPrevDisabled = h0(departDate) <= h0();
    // const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000;

    // const prev = useCallback(() => {
    //     if (isPrevDisabled) {
    //         return;
    //     }
    //     dispatch(prevDate());
    // }, [isPrevDisabled, dispatch]);

    // const next = useCallback(() => {
    //     if (isNextDisabled) {
    //         return;
    //     }
    //     dispatch(nextDate());
    // }, [isNextDisabled, dispatch]);
    const bottomCbs = useMemo(() => {
        return bindActionCreators({
            toggleOrderType: toggleOrderType,
            toggleHighSpeed: toggleHighSpeed,
            toggleOnlyTickets: toggleOnlyTickets,
            toggleIsFiltersVisible: toggleIsFiltersVisible,
            setCheckedTicketTypes: setCheckedTicketTypes,
            setCheckedTrainTypes: setCheckedTrainTypes,
            setCheckedDepartStations: setCheckedDepartStations,
            setCheckedArriveStations: setCheckedArriveStations,
            setArriveTimeEnd: setArriveTimeEnd,
            setArriveTimeStart: setArriveTimeStart,
            setDepartTimeEnd: setDepartTimeEnd,
            setDepartTimeStart: setDepartTimeStart
        }, dispatch);
    }, [dispatch]);
    if (!serachParsed) {
        return null
    };
    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from}---${to}`} onBack={onBack} />
            </div>
            <Nav
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                prev={prev}
                next={next}
                date={departDate}
            />
            <List list={trainList} />
            <Bottom
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickets={onlyTickets}
                isFiltersVisible={isFiltersVisible}
                {...bottomCbs}
                checkedTicketTypes={checkedTicketTypes}
                checkedTrainTypes={checkedTrainTypes}
                checkedDepartStations={checkedDepartStations}
                checkedArriveStations={checkedArriveStations}
                departStations={departStations}
                arriveStations={arriveStations}
                departTimeStart={departTimeStart}
                departTimeEnd={departTimeEnd}
                arriveTimeStart={arriveTimeStart}
                arriveTimeEnd={arriveTimeEnd}
                ticketTypes={ticketTypes}
                trainTypes={trainTypes}
            />
        </div>
    )
}
function mapStateToProps(state) {
    return state
}
function mapDispatchToProps(dispatch) {
    return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

