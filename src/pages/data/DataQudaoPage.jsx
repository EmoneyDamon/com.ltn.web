import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';
import lodash from 'lodash';
import { Button, Icon, Grid } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import './DataQudaoPage.scss';
import login from '../../common/imgs/logo.png';

import { getBalanceAccountList } from '../../api/DataApi';

// 日期本地化
moment.locale('zh-cn');

class DataQudaoPage extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.state = {
      pageSize: 5,
      currentPage: 0,
      total: 0,
      token: params.token,
      startDate: null,
      endDate: moment(),
      focusedInput: null,
      investmentInfoList: [],
    };
  }
  handleChangeStart(startDate) {
    if (startDate.isBefore(this.state.endDate)) {
      this.setState({
        startDate,
      });
    }
  }
  handleChangeEnd(endDate) {
    if (endDate.isAfter(this.state.startDate)) {
      this.setState({
        endDate,
      });
    }
  }
  // 加载数据
  loadData(currentPage = this.state.currentPage) {
    const { token, startDate, endDate } = this.state;
    getBalanceAccountList(token, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), currentPage, this.state.pageSize)
    .then((data) => {
      this.setState({
        investmentInfoList: data.investmentInfoList,
        total: data.total,
      });
    });
  }
  pre() {
    let { currentPage } = this.state;
    if (currentPage > 0) {
      currentPage -= 1;
      this.loadData(currentPage);
      this.setState({
        currentPage,
      });
    }
  }
  next() {
    const { total, pageSize } = this.state;
    let { currentPage } = this.state;
    if (currentPage < Math.ceil(total / pageSize) - 1) {
      currentPage += 1;
      this.loadData(currentPage);
      this.setState({
        currentPage,
      });
    }
  }
  render() {
    return (
      <div className="data-qudao-page">
        <div className="head-bar-wrap">
          <div className="head-bar ltn-content cf">
            <img src={login} alt="颐脉国际" />
            <p>运营数据查询</p>
          </div>
        </div>
        <div className="data-wrap ltn-content">
          <div className="date-wrap">
            <span className="label">请选择查询范围</span>
            <DatePicker
              selected={this.state.startDate}
              selectsStart
              dateFormat="YYYY-MM-DD"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={date => this.handleChangeStart(date)}
              placeholderText="开始日期"
            />
            <DatePicker
              selected={this.state.endDate}
              selectsEnd
              dateFormat="YYYY-MM-DD"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={date => this.handleChangeEnd(date)}
              placeholderText="结束日期"
            />
            <Button animated="fade" onClick={() => this.loadData()}>
              <Button.Content hidden>查询</Button.Content>
              <Button.Content visible>
                <Icon name="search" />
              </Button.Content>
            </Button>
          </div>

        </div>
        <div className="list-wrap ltn-content">
          <Grid columns="4">
            <Grid.Row textAlign="center">
              <Grid.Column>
                序号
              </Grid.Column>
              <Grid.Column>
                用户
              </Grid.Column>
              <Grid.Column>
                投资金额
              </Grid.Column>
              <Grid.Column>
                注册时间
              </Grid.Column>
            </Grid.Row>
            {
              this.state.investmentInfoList.map((res, index) => (
                <Grid.Row textAlign="center" key={lodash.uniqueId('grid-row')}>
                  <Grid.Column>
                    {index + 1}
                  </Grid.Column>
                  <Grid.Column>
                    {res.mobileNo}
                  </Grid.Column>
                  <Grid.Column>
                    {res.investAmount}
                  </Grid.Column>
                  <Grid.Column>
                    {moment(res.registerTime).format('YYYY-MM-DD hh:mm')}
                  </Grid.Column>
                </Grid.Row>
              ))
            }
          </Grid>
        </div>

        <div className="ltn-content page-fy">
          <span onClick={() => this.pre()}>上一页</span>
          <span>当前页码{this.state.currentPage + 1}</span>
          <span onClick={() => this.next()}>下一页</span>
        </div>
      </div>
    );
  }

}

DataQudaoPage.propTypes = {
  match: PropTypes.object.isRequired,
};
export default DataQudaoPage;
