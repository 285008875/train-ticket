import React, { useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import URI from 'urijs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import dayjs from 'dayjs';
import { h0 } from '../common/fp';
import { TrainContext } from './context';
import {
    setDepartStation,
    setArriveStation,
    setTrainNumber,
    setDepartDate,
    setSearchParsed,
    nextDate,
    prevDate,
    setDepartTimeStr,
    setArriveTimeStr,
    setTickets,
    setDurationStr,
    setArriveDate,
    toggleIsScheduleVisible,
} from './action';
import Header from '../common/Header';
import Nav from '../common/Nav'
import useNav from '../common/useNav';
import Detail from '../common/Detail';
import Candidate from './Candidate';
// import Schedule from './Schedule';
import './style/App.css';
const Schedule = lazy(() => import('./Schedule.js'))

function App(props) {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,
        dispatch,
    } = props
    // console.log(props);
    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    useMemo(() => {
        const queries = URI.parseQuery(window.location.search);
        const { aStation, dStation, date, trainNumber } = queries;
        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));
        dispatch(setSearchParsed(true));
        //console.log(555); //已优化 本来用useEffect //useMemo
    }, [dispatch]);

    useEffect(() => {
        document.title = trainNumber;
    }, [trainNumber]);
    const fetchDateOfTicket = useCallback(async function fetchDateOfTicket(url) {
        const result = await fetch(url).then(response => response.json());

        const { detail, candidates } = result;
        const {
            departTimeStr,
            arriveTimeStr,
            arriveDate,
            durationStr,
        } = detail;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));

    }, [dispatch])

    useEffect(() => {
        if (!searchParsed) {
            return;
        }

        const url = new URI('/rest/ticket')
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('trainNumber', trainNumber)
            .toString();

        fetchDateOfTicket(url)
    }, [searchParsed, departDate, trainNumber, fetchDateOfTicket]);

    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(departDate, dispatch, prevDate, nextDate);

    const detailCbs = useMemo(() => {
        // console.log(111);
        return bindActionCreators({
            toggleIsScheduleVisible,
        }, dispatch)
    }, [dispatch])
    if (!searchParsed) {
        return null;
    }
    return (
        <div className="app">
            <div className="header-wrapper">
                <Header title={trainNumber} onBack={onBack} />
            </div>
            <div className="nav-wrapper">
                <Nav
                    date={departDate}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                    prev={prev}
                    next={next}
                />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}
                    {...detailCbs}
                >
                    <span className="left"></span>
                    <span
                        className="schedule"
                        onClick={() => detailCbs.toggleIsScheduleVisible()}
                    >
                        时刻表
                    </span>
                    <span className="right"></span>
                </Detail>
                <TrainContext.Provider
                    value={{
                        trainNumber,
                        departStation,
                        arriveStation,
                        departDate,
                    }}
                >
                    <Candidate tickets={tickets} />
                </TrainContext.Provider>
                {isScheduleVisible && (
                    <div
                        className="mask"
                        onClick={() => dispatch(toggleIsScheduleVisible())}
                    >
                        <Suspense fallback={<div>loading</div>}>
                            <Schedule
                                date={departDate}
                                trainNumber={trainNumber}
                                departStation={departStation}
                                arriveStation={arriveStation}
                            />
                        </Suspense>
                    </div>
                )}
            </div>
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

