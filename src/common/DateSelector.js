import React, { memo } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { h0 } from '../common/fp.js';
import Header from '../common/Header'
import './style/DateSelector.css';


//天组件
const Day = memo((props) => {
    const { day, onSelect } = props;
    if (!day) {
        return <td className="null"></td>
    }
    const classes = [];
    const now = h0();
    if (day < now) {
        classes.push('disabled')
    }
    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push('weekend')
    }
    const dateString = now === day ? '今天' : new Date(day).getDate()
    return (
        <td className={classnames(classes)} onClick={() => { onSelect(day) }}>
            {dateString}
        </td>
    )
})
Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired
}

//周组件
const Week = memo((props) => {
    const { days, onSelect } = props;
    return (
        <tr className="date-table-days">
            {
                days.map((day, index) => {
                    return <Day key={index} day={day} onSelect={onSelect} />
                })
            }
        </tr>
    )
})
Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}
const Month = memo((props) => {
    const { startingTimeInMonth, onSelect } = props;
    // console.log(startingTimeInMonth);
    const startDay = new Date(startingTimeInMonth);
    const currentDay = new Date(startingTimeInMonth);
    let days = [];
    while (startDay.getMonth() === currentDay.getMonth()) {
        days.push(currentDay.getTime())
        currentDay.setDate(currentDay.getDate() + 1)
    }
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days);
    const lastDay = new Date(days[days.length - 1]);
    days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null))
    const weeks = [];
    for (let row = 0; row < days.length; row++) {
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week)

    }
    return (
        <div className="date-table">
            <table>
                <thead>
                    <tr >
                        <th colSpan="7"> {startDay.getFullYear()}年{startDay.getMonth() + 1}月</th>
                    </tr >
                </thead>
                <tbody>
                    <tr className="date-table-weeks">
                        <th>周一</th>
                        <th>周二</th>
                        <th>周三</th>
                        <th>周四</th>
                        <th>周五</th>
                        <th className="weekend">周六</th>
                        <th className="weekend">周日</th>
                    </tr>
                    {
                        weeks.map((week, index) => {
                            return (
                                <Week
                                    key={index}
                                    days={week}
                                    onSelect={onSelect}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
})
Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
}
function areEqual(prevProps, nextProps) {
    //优化
    // console.log(prevProps, nextProps);
    // if (prevProps.from !== nextProps.from) {
    //     return false;

    // }
    // if (prevProps.to !== nextProps.to) {
    //     return false;

    // }
}
const DateSelector = memo((props) => {
    console.log('DateSelector', props);
    const { show, onSelect, onBack } = props;
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);
    //获取未来三个月
    const monthSequence = [now.getTime()];

    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    return (
        <div className={classnames('date-selector', { hidden: !show })}>
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {
                    monthSequence.map((month) => {
                        return (<Month
                            key={month}
                            onSelect={onSelect}
                            startingTimeInMonth={month}
                        />)
                    })
                }
            </div>
        </div>
    )

})
DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
}
export default DateSelector