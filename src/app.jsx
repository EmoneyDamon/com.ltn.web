/* eslint-disable no-underscore-dangle */
// 兼容性设置
import 'babel-polyfill';
// 导入ajax fetch api
import 'isomorphic-fetch';
// react 核心
import React from 'react';
import { render } from 'react-dom';
// 集成 react 到  redux中
import { Provider } from 'react-redux';
// 路由核心 V4版本
import {
  Route } from 'react-router-dom';
// 集成 react-router 到 redux中
import {
  ConnectedRouter,
} from 'react-router-redux';
// 使用第三方history 库 扩展 原生history
import createHistory from 'history/createHashHistory';

// 全局样式导入
// 1. 基础样式库 https://semantic-ui.com/
import './common/style/semantic-ui-css/semantic.css';
// 2. 自定义 全局样式，包含工具样式
import './common/style/common.scss';
// redux store 导入
import configureStore from './store/configureStore';

import {
  // 导入页面 开始
  HomeRoutesLoader,
  // 渠道数据
  DataRoutesLoader,
  // 导入活动页面
  DemoRoutesLoader,
  //test路由导入
  TestRoutesLoader,
  // 导入页面 结束
} from './pages/PageLoader';

// redux  dev tool
const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = configureStore(devTool);
const history = createHistory();
// 主容器
const root = document.getElementById('root');


// 主路由
const MainRoutes = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={HomeRoutesLoader} />
        <Route path="/data" component={DataRoutesLoader} />
        <Route path="/demo" component={DemoRoutesLoader} />
        <Route path="/test" component={TestRoutesLoader} />
      </div>
    </ConnectedRouter>
  </Provider>
);

render(
  <MainRoutes />
  , root);
