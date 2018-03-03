// 登录、注册、忘记密码、企业注册  模块路由
import React from 'react';
import {
  Route,
} from 'react-router-dom';

import HomePage from './HomePage';

class HomeRoutes extends React.Component {
  render() {
    return (
      <Route path="/" component={HomePage} />
    );
  }
}

export default HomeRoutes;
