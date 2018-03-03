import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import { getRegisterNum } from '../../api/PassportApi';
import RegisterForm from './RegisterForm';
import './FloatRegister.scss';
import modelBannerA from '../imgs/modelBannerA.jpg';
import modelBannerB from '../imgs/modelBannerB.jpg';

class FloatRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerNum: '--',
    };
  }
  componentDidMount() {
    getRegisterNum()
    .then((data) => {
      this.setState({
        registerNum: data.userNum,
      });
    }, ({ data }) => {
      console.log(data.resultMessage);
      this.setState({
        registerNum: '--',
      });
    });
  }
  render() {
    return (
      <div>
        <Modal
          open={this.props.registerModalAState}
          onClose={this.props.registerModalAClose}
        >
          <Modal.Content image >
            <img src={modelBannerA} alt="浮层banner" />
            <div className="reg-form-containA">
              <RegisterForm dept={this.props.dept} />
              <p className="vice-title">注册送618元返现卷</p>
              <Icon link name="close" onClick={this.props.registerModalAClose} />
            </div>
          </Modal.Content>
        </Modal>
        <Modal open={this.props.registerModalBState} onClose={this.props.registerModalBClose}>
          <Modal.Content image >
            <img src={modelBannerB} alt="浮层banner" />
            <div className="pity-contain">
              <p className="pity-text">还差一步就可以领取618元返现券了<br />你真的决定现在离开了吗？</p>
              <p className="lure-text">截至今日，共有<span>{this.state.registerNum}</span>人加入了领投鸟</p>
              <p className="btn-contain">
                <span onClick={this.props.registerModalBClose}>遗憾错过</span>
                <span onClick={this.props.goOnRegister}>立即领取</span>
              </p>
              <Icon link name="close" onClick={this.props.registerModalBClose} />
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
export default FloatRegister;
