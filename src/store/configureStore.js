// redux 导入 对应api
import { createStore, combineReducers, applyMiddleware } from 'redux';
// 集成  react-router  到 redux中
import { routerReducer, routerMiddleware } from 'react-router-redux';
// 集成 action 管理控件  redux-saga
import createSagaMiddleware from 'redux-saga';
// 导入第三方 history api，扩展了原生的history
import createHistory from 'history/createBrowserHistory';

// reducers 导入
// import demoReducers from '../reducers/demo';

// import loginReducer from '../component/TopStatusBar/reducers';

// import mySaga from './sagas';

const history = createHistory();

// 合并 reducers
const combineReducersCreater = combineReducers({
  router: routerReducer,
});
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    combineReducersCreater,
    initialState,
    applyMiddleware(routeMiddleware, sagaMiddleware));
  // sagaMiddleware.run(mySaga);
  return store;
}
