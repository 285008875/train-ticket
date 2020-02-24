import React, { memo, useMemo } from 'react'
import './style/Detail.css'
import PropTypes from 'prop-types';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
const Detail = memo(function Detail(props) {
    // console.log(3);//
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        trainNumber,
        departStation,
        arriveStation,
        durationStr,
        // toggleIsScheduleVisible,
    } = props
    function format(d) {
        const date = dayjs(d);
        return date.format('MM-DD') + ' ' + date.locale('zh-cn').format('ddd');
    }
    const departDateStr = useMemo(() => {
        return format(departDate)
    }, [departDate])
    const arriveDateStr = useMemo(() => {
        return format(arriveDate)
    }, [arriveDate])
    return (
        <div className="detail">
            <div className="content">

                <div className="left">
                    <div className="city">{departStation}</div>
                    <div className="time">{departTimeStr}</div>
                    <div className="date">{departDateStr}</div>
                </div>
                <div className="middle">
                    <div className="middle">
                        <p className="train-name">{trainNumber}</p>
                        <p className="train-mid">{props.children}</p>
                        <p className="train-time">耗时{durationStr}</p>
                    </div>
                </div>
                <div className="right">
                    <div className="city">{arriveStation}</div>
                    <div className="time">{arriveTimeStr}</div>
                    <div className="date">{arriveDateStr}</div>
                </div>
            </div>
        </div>
    )
})
Detail.propTypes = {

    departDate: PropTypes.number.isRequired,
    arriveDate: PropTypes.number.isRequired,
    departTimeStr: PropTypes.string,
    arriveTimeStr: PropTypes.string,
    trainNumber: PropTypes.string.isRequired,
    departStation: PropTypes.string.isRequired,
    arriveStation: PropTypes.string.isRequired,
    durationStr: PropTypes.string,
}
export default Detail;

