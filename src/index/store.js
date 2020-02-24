import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers(reducers),
    {
        from: '北京',
        to: '上海',
        isCitySelectorVisible: false, // 是否显示城市选择列表
        currentSelectingLeftCity: false, //判断点击选择左输入框还是右输入框
        cityData: null, //城市列表数据
        isLoadingCityData: false,
        isDataSelectorVisible: false,
        highSpeed: false,
        // departDate: null,
    },
    composeEnhancers(applyMiddleware(thunk))
)
