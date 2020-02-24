import React, { memo } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style/HighSpeed.css'

const HighSpeed = memo(function (props) {
    // console.log("HighSpeed");
    const { highSpeed, toggle } = props;

    return (
        <div className="high-speed">
            <div className="high-speed-label">只看高铁/动车</div>
            <div className="high-speed-switch" onClick={() => { toggle() }}></div>
            <input type="hidden" name="highSpeed" value={highSpeed} />
            <div className={classnames('high-speed-track', { checked: highSpeed })}></div>
            <span className={classnames('high-speed-handle', { checked: highSpeed })}></span>
        </div>
    )
})
HighSpeed.propTypes = {
    highSpeed: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
}
export default HighSpeed;