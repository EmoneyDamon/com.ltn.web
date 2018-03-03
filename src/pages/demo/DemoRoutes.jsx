// 这是一个使用框架的示例
import React from 'react';
import {
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
// 导入UI组件
import { List, Icon } from 'semantic-ui-react';

const DemoTwo = () => (
  <div>这是第二个demo</div>
);

const DemoNotFound = () => (<div>
  没有找到对应的demo
</div>);

class DemoList extends React.Component {
  render() {
    return (
      <div className="ltn-content">
        <List>
          <List.Item>
            <Link to="/demo/one">第一个demo<Icon disabled name="code" /></Link>
          </List.Item>
          <List.Item>
            <Link to="/demo/two">第二个demo<Icon disabled name="alarm" /></Link>
          </List.Item>
          <List.Item>
            <Link to="/demo/hhh">测试找不到<Icon disabled name="trademark" /></Link>
          </List.Item>
          <List.Item>
            <Link to="/demo/ajax">ajax 请求demo<Icon disabled name="trademark" /></Link>
          </List.Item>
        </List>
      </div>

    );
  }
}

import Ajax from '../../api/axiosinstance';

import axios from 'axios';

const demoAjax = new Ajax({
  baseURL: '/api',
  headers: {
    responseType: 'json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'platform': 'andriod',//平台名（andriod手机端用andriod_phone，苹果手机端用apple_phone）
    'token': '',//登陆之后返回的token，在本地保存（有就传，没有就不设这个字段或者空字符串）
    'appname': 'com.immortal.jeeqin',
    'v': 1.0,
    'lang': 'zh-CN',
    'country': 'CN',
  }
});

class DemoAjax extends React.Component {

  constructor(props) {
    super(props);

    const ajax1 = () => (
      demoAjax.post('/base/online/banner/list', {
        // params: {
        //   location: 1,
        // },
      })
    );

    const ajax2 = () => (
      demoAjax.post('/base/online/cat/list')
    );

    axios.all([ajax1(), ajax2()])
    .then(axios.spread((banner, ptdata) => {
      console.log(banner);
      console.log(ptdata);
    }), (error) => {
      console.log(error);
    });

    // demoAjax.get('/page/banner', {
    //   params: {
    //     location: 1,
    //   },
    // })
    // .then((data) => {
    //   console.log(data);
    // }, (error) => {
    //   console.error(error.message);
    // });
  }

  render() {
    return (
      <div className="demo-ajax-wrap">
        ajax demo
      </div>
    );
  }
}

const DemoRoutes = () => (
  <Switch>
    <Route path="/demo/list" component={DemoList} />
    <Route path="/demo/one" render={() => (<div>这是第一个demo</div>)} />
    <Route path="/demo/two" component={DemoTwo} />
    <Route path="/demo/ajax" component={DemoAjax} />
    <Redirect exact from="/demo" to="/demo/list" />
    <Route component={DemoNotFound} />
  </Switch>
);


export default DemoRoutes;
