// 登录、注册、忘记密码  模块路由
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import DataQudaoPage from './DataQudaoPage';

class DataRoutes extends React.Component {

  render() {
    return (
      <Switch>
        <Route path="/data/qudao/:token" component={DataQudaoPage} />
        <Redirect exact from="/data" to="/data/qudao" />
        <Route render={() => (
          <div>请输入类型</div>
        )}
        />
      </Switch>
    );
  }
}

export default DataRoutes;
