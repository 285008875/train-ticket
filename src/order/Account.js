import React, { memo, useState } from "react"
import PropTypes from 'prop-types'
import classnames from 'classnames';
import './style/Account.css'
const Account = memo((props) => {
    const { price = 0, length } = props;
    const [expanded, setExpaned] = useState(false)


    return (
        <div className="account">
            <div className={classnames('price', { expanded })} onClick={() => setExpaned(!expanded)} >
                <div className="money">{length * price}</div>
                <div className="amount">支付金额</div>
            </div>
            <div className="button">提交按钮</div>
            <div className={classnames('layer', { hidden: !expanded })} onClick={() => setExpaned(false)}></div>
            <div className={classnames('detail', { hidden: !expanded })} onClick={() => setExpaned(false)}>
                <div className="title">金额详情</div>
                <ul>
                    <li>火车票</li>
                    <li>￥{price}</li>
                    <li>&#xD7;{length}</li>
                </ul>
            </div>
        </div>
    )
})
Account.propTypes = {
    price: PropTypes.number,
    lengthh: PropTypes.number,
}
export default Account;