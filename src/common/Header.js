import React, { memo } from 'react'
import './style/Header.css'
import propTypes from 'prop-types';

const Header = memo(function Header(props) {
    const {
        onBack,
        title
    } = props;
    console.log("Header");
    return (
        <div className="header">
            <div className="header-back" onClick={onBack}>
                <svg width="42" height="42">
                    <polyline
                        points="25, 13,16,21,25,29"
                        stroke="#fff"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>

            </div>
            <h1 className="header-title">{title}</h1>
        </div>
    )
})
export default Header
Header.propTypes = {
    onBack: propTypes.func.isRequired,
    title: propTypes.string.isRequired
}