import React, { memo } from 'react'
import './style/Journey.css'
import switchImg from './imgs/switch.svg'
function areEqual(prevProps, nextProps) {
    //优化
    //CitySelector组件选择完城市之后之后Journey不更新

    // console.log(prevProps, nextProps);
    if (prevProps.from !== nextProps.from) {
        return false;

    }
    if (prevProps.to !== nextProps.to) {
        return false;

    }
    //当点开选择城市列表没有选择退回，设置不刷新
    return true;
}
const Journey = memo(function Journey(props) {
    // console.log("Journey");
    const { from, to, exchangeFromTo, showCitySelector } = props;

    return (
        <div className="journey">
            <div
                className="journey-station"
                onClick={() => showCitySelector(true)}
            >
                <input
                    type="text"
                    readOnly
                    name="from"
                    value={from}
                    className="journey-input journey-from"
                />
            </div>
            <div className="journey-switch" onClick={() => exchangeFromTo()}>
                <img src={switchImg} height="70" width="70" alt="switch" />
            </div>
            <div
                className="journey-station"
                onClick={() => showCitySelector(false)}
            >
                <input
                    type="text"
                    readOnly
                    name="to"
                    value={to}
                    className="journey-input journey-to"
                />
            </div>
        </div>
    )
},
    areEqual
)

export default Journey;