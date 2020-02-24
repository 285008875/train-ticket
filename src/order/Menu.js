import React, { memo } from "react"
import './style/Menu.css'
import PropTypes from 'prop-types'
import classnames from 'classnames'



const MenuItem = memo(function (props) {
    const { onPress, title, value, active } = props;
    // console.log(active);
    return (
        <li className={classnames({ active })} onClick={() => { onPress(value) }}>
            {title}
        </li>
    )
})
MenuItem.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.number.isRequired,]).isRequired,
    active: PropTypes.bool.isRequired
}



const Menu = memo(function (props) {
    const {
        show,
        options,
        onPress,
        hideMenu,
    } = props

    return (
        <div>
            {show && (<div className="menu-mask" onClick={() => { hideMenu() }}></div>)}
            <div className={classnames('menu', { show })}>
                <div className="menu-title">
                </div>
                <ul>
                    {
                        options && options.map((option, index) => {
                            return (
                                <MenuItem key={index} {...option} onPress={onPress}>

                                </MenuItem>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
})
Menu.propTypes = {
    show: PropTypes.bool.isRequired,
    options: PropTypes.array,
    onPress: PropTypes.func,
    hideMenu: PropTypes.func.isRequired,
}
export default Menu