import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs'

import './style/DepartDate.css';
import { h0 } from '../common/fp';

const DepartDate = memo(function DepartDate(props) {
    // console.log("DepartDate", props);
    const { time, onClik } = props
    const h0OfDapart = h0(time);
    const DepartDate = new Date(h0OfDapart);
    const isToday = h0OfDapart === h0();
    const departDateString = useMemo(() => {
        return dayjs(h0OfDapart).format('YYYY-MM-DD')
    }, [h0OfDapart])
    const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][DepartDate.getDay()] + (isToday ? '(今天)' : '');
    return (
        <div className="depart-date" onClick={onClik}>
            <input type="hidden" name="date" value={departDateString} />
            {departDateString}
            <span className="depart-week">{weekString}</span>
        </div>
    )
})
DepartDate.propsType = {
    time: PropTypes.number.isRequired,
    onClik: PropTypes.func.isRequired
}
export default DepartDate