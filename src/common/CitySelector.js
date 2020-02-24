import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import classnames from 'classnames';
import PropTypes from "prop-types";
import './style/CitySelector.css';

/**
 * 具体城市条目组件
 * @onSelect 上层组件传递为setSelectedCity 用于将选择的城市回填到输入框
 */

const CityItem = memo(function CityItem(props) {
    const { name, onSelect } = props;
    return (
        <li className="city-li" onClick={() => { onSelect(name) }}>
            {name}
        </li>
    )
})
CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}
const CitySelection = memo(function CitySelection(props) {

    const {
        title,
        cities = [],
        onSelect,
    } = props;

    return (
        <ul className="city-ul">
            <li className="city-li" key="title" data-cate={title}>
                {title}
            </li>
            {
                cities.map(city => {
                    return <CityItem key={city.name} name={city.name} onSelect={onSelect} />
                })
            }
        </ul>
    )
})
CitySelection.propTypes = {
    title: PropTypes.string.isRequired,
    cities: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
}
const AlphaIndex = memo(function AlphaIndex(props) {
    const { alpha, onClick } = props;
    return (
        <i className="city-index-item" onClick={() => { onClick(alpha) }}>
            {alpha}
        </i>
    )
})
AlphaIndex.propTypes = {
    alpha: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
const alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index)
})
/**
 *
 *
 * @export 
 * @param {*} props
 * @returns
 */
const CityList = memo(function CityList(props) {

    const { selections, onSelect, toAlpha } = props;
    return (
        <div className="city-list">
            <div className="city-cate">
                {
                    selections.map(selection => {
                        return (
                            <CitySelection
                                key={selection.title}
                                title={selection.title}
                                cities={selection.citys}
                                onSelect={onSelect}

                            />
                        )
                    })
                }
            </div>
            <div className="city-index">
                {
                    alphabet.map(alpha => {
                        return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />
                    })
                }
            </div>
        </div>
    )
})
CityList.propTypes = {
    selections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    toAlpha: PropTypes.func.isRequired,
}
// 搜索列表的单个条目
const SuggestItem = memo(function SuggestItem(props) {

    const { name, onClick } = props
    // console.log(document.getElementsByClassName("city-list").style.display = "none")
    return (
        <div className="city-suggest-li" onClick={() => { onClick(name) }}>
            {name}
        </div>
    )
})

SuggestItem.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
const Suggest = memo(function Suggest(props) {
    const { searchKey, onSelect } = props;
    const [result, setResult] = useState([]);
    useEffect(() => {
        fetch('/rest/search?key=' + encodeURIComponent(searchKey))
            .then(data => {
                console.log(data);
                const {
                    result,
                    searchKey: sKey
                } = data;
                console.log(sKey, searchKey, result);

                if (sKey === searchKey) {
                    setResult(result)
                }

            })

    }, [searchKey]);
    const fallBackResult = useMemo(() => {
        // console.log(111);
        if (!result.length) {
            return [{
                display: searchKey,
            }]
        }
        return result;

    }, [result, searchKey])

    return (
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {
                    fallBackResult.map(item => {
                        return (
                            <SuggestItem
                                key={item.display}
                                name={item.display}
                                onClick={onSelect}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
})
Suggest.propTypes = {
    searchKey: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}



/**
 *
 * @export 城市列表组件
 * @param {*} props
 * @returns 
 */
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
const CitySelector = memo(function CitySelector(props) {

    const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props;
    const [searchKey, setSearchKey] = useState('');
    // 记忆值用useMemo
    const key = useMemo(() => {
        return searchKey.trim();
    }, [searchKey])
    useEffect(() => {
        //获取高铁城市
        //判断是否已经获取或正在显示或正在加载
        if (!show || cityData || isLoading) {
            return;
        }
        fetchCityData()
    }, [show, cityData, isLoading, fetchCityData]);


    /**
     * @funname  toAlpha  获取字母滚动至该位置
     * @param {*} alpha 字母
     */
    // 优化
    const toAlpha = useCallback((alpha) => {
        // console.log(111);
        document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
    }, []);
    // const toAlpha = (alpha) => {
    //     console.log(111);
    //     document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
    // };
    const outputCitySections = () => {
        if (isLoading) {
            return <div>loading</div>
        }
        if (cityData) {
            return (
                <CityList selections={cityData.cityList} onSelect={onSelect} toAlpha={toAlpha} />
            )
        }
        return <div>error</div>
    }
    return (
        <div className={classnames("city-selector", { hidden: !show })}>
            <div className="city-search">
                <div className="search-back" onClick={() => onBack()}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13,16,21,25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    {/*函数节流 onChange  */}
                    <input
                        type="text"
                        value={searchKey}
                        className="search-input"
                        placeholder="城市,车站"
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <i
                    className={classnames('search-clean', { hidden: key.length === 0 })}
                    onClick={() => setSearchKey('')}
                >
                    &#xf063;
                </i>
                {Boolean(key) && (<Suggest searchKey={key} onSelect={key => onSelect(key)} />)}
                {outputCitySections()}
            </div>
        </div>
    )
}, areEqual)
CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchCityData: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default CitySelector;