import React, { memo } from "react"
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './style/Choose.css'

const Choose = memo((props) => {
    const {
        passengers,
        updatePassenger,
    } = props
    function createSeat(seateType) {
        return (
            <div>
                {
                    passengers.map((passenger) => {
                        return (
                            <p
                                key={passenger.id}
                                className={classnames('seat', { 'active': passenger.seat === seateType })}
                                date-type={seateType}
                                onClick={() => updatePassenger(passenger.id, {
                                    seat: seateType
                                })}
                            >
                                &#xe02d;
                            </p>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div className="choose">
            <p className="tip">在线选座</p>
            <div className="container">
                <div className="seats">
                    <div>窗</div>
                    {createSeat('A')}
                    {createSeat('B')}
                    {createSeat('C')}

                    <div>过道</div>
                    {createSeat('D')}
                    {createSeat('E')}
                    <div>窗</div>
                </div>
            </div>
        </div>
    )
})
Choose.propTypes = {
    passengers: PropTypes.array.isRequired,
    updatePassenger: PropTypes.func.isRequired,
}
export default Choose;