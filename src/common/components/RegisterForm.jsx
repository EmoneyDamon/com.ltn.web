import React from 'react';
import {
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';
import { getMobileCode, registerUser } from '../../api/PassportApi';
import { goOnline } from '../../api/NativeApi';
import './RegisterForm.scss';
import phone from '../imgs/phone.png';
import code from '../imgs/code.png';
import lock from '../imgs/lock.png';
import message from '../imgs/message.png';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      picCode: '',
      mobileCode: '',
      password: '',
      count: 60,
      noteMessageState: false,
      liked: true,
      machineNo: this.machineNoChange(),
      modalOpen: false,
      toastMessage: '',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onPictureCodeChange = this.onPictureCodeChange.bind(this);
    this.onMobileCodeChange = this.onMobileCodeChange.bind(this);
  }

    // 手机号码onchange绑定
  onPhoneChange(event) {
    const value = event.target.value;
    this.setState({
      phone: value,
    });
  }

    // 图片验证码value变化
  onPictureCodeChange(event) {
    const value = event.target.value;
    this.setState({
      picCode: value,
    });
  }

    // 手机验证码value变化
  onMobileCodeChange(event) {
    const value = event.target.value;
    this.setState({
      mobileCode: value,
    });
  }

    // 设置密码
  onChangePassword(event) {
    const value = event.target.value;
    this.setState({
      password: value,
    });
  }

  // 获取手机验证码
  getMobileCode() {
    if (this.checkPhone() && this.checkPicturCode()) {
      if (this.state.liked) {
        getMobileCode(this.state.machineNo, this.state.phone, this.state.picCode)
        .then(() => {
          this.handleClick();
          this.setState({
            toastMessage: '验证码已发送，请注意查收',
          });
          this.handleOpen();
        }, ({ data }) => {
          this.machineNoChange();
          this.setState({
            noteMessageState: true,
            noteMessage: data.resultMessage,
          });
        });
      }
    } else {
      this.setState({
        toastMessage: '请按规则填写信息',
      });
      this.handleOpen();
    }
  }

  // 验证手机号码格式
  checkPhone() {
    const temporaryPhone = this.state.phone;
    if (this.state.phone.length < 11 || !(/^1[34578]\d{9}$/.test(temporaryPhone))) {
      this.setState({
        noteMessageState: true,
        noteMessage: '请输入正确的手机号码',
      });
      return false;
    }
    this.setState({
      noteMessageState: 'none',
    });
    return true;
  }

  // 验证图片验证码格式
  checkPicturCode() {
    if (this.state.picCode.length < 6) {
      this.setState({
        noteMessageState: true,
        noteMessage: '请输入至少6位数字验证码',
      });
      return false;
    }
    this.setState({
      noteMessageState: 'none',
    });
    return true;
  }

  // 验证手机验证码格式
  checkMobileCode() {
    if (this.state.mobileCode.length < 4) {
      this.setState({
        noteMessageState: true,
        noteMessage: '请输入至少4位手机验证码',
      });
      return false;
    }
    this.setState({
      noteMessageState: 'none',
    });
    return true;
  }

  // 验证密码格式
  checkPassword() {
    const temporaryPassword = this.state.password;
    if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(temporaryPassword))) {
      this.setState({
        noteMessageState: true,
        noteMessage: '请设置密码，6-18位数字字母组合',
      });
      return false;
    }
    this.setState({
      noteMessageState: 'none',
    });
    return true;
  }

  // 生成机械码
  machineNoChange() {
    const temporaryMachineNo = Date.now();
    this.setState({
      machineNo: temporaryMachineNo,
    });
    return temporaryMachineNo;
  }

  // 提交表单数据
  submitForm() {
    if (this.checkPhone() && this.checkPicturCode()
      && this.checkMobileCode() && this.checkPassword()) {
      registerUser(this.state.phone, this.state.mobileCode, this.state.password, this.props.dept)
      .then((data) => {
        goOnline(data.sessionKey);
      }, ({ data }) => {
        this.setState({
          noteMessageState: true,
          noteMessage: data.resultMessage,
        });
      });
    } else {
      this.setState({
        toastMessage: '请正确填写信息',
      });
      this.handleOpen();
    }
  }

  // 倒计时
  handleClick() {
    if (this.state.liked) {
      const timer = setInterval(() => {
        let count = this.state.count;
        this.state.liked = false;
        count -= 1;
        if (count < 1) {
          window.clearInterval(timer);
          this.setState({
            liked: true,
          });
          count = 60;
        }
        this.setState({
          count,
        });
      }, 1000);
    }
  }

  // 打开提示
  handleOpen() {
    this.setState({
      modalOpen: true,
    });
  }

  // 关闭提示
  handleClose() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    const text = this.state.liked ? '获取验证码' : `${this.state.count}秒后重发`;
    return (
      <div className="register-wrap">
        <div className="form-content">
          <lable htmlFor="phone" className="long-input">
            <img src={phone} alt="phone" />
            <input
              id="phone"
              type="tel"
              maxLength="11"
              value={this.state.phone}
              onChange={this.onPhoneChange}
              placeholder="请输入您的手机号"
              onBlur={() => this.checkPhone()}
            />
          </lable>
          <div className="short-input-content">
            <lable htmlFor="picCode">
              <img className="pictureIcon" src={code} alt="phone" />
              <input
                id="picCode"
                type="tel"
                maxLength="6"
                value={this.state.picCode}
                onChange={this.onPictureCodeChange}
                onBlur={() => this.checkPicturCode()}
                placeholder="请输入验证码"
              />
            </lable>
            <img
              className="pictureCode"
              onClick={() => this.machineNoChange()}
              src={`https://www.lingtouniao.com/user/register/pictureCode/${this.state.machineNo}`}
              alt="图片验证码"
            />
          </div>
          <div className="short-input-content">
            <lable htmlFor="mobileCode">
              <img className="pictureIcon" src={message} alt="phone" />
              <input
                id="mobileCode"
                type="tel" maxLength="4"
                value={this.state.mobileCode}
                onChange={this.onMobileCodeChange}
                placeholder="短信验证"
                onBlur={() => this.checkMobileCode()}
              />
            </lable>
            <span className="pictureCode" onClick={() => this.getMobileCode()}>{text}</span>
          </div>
          <lable htmlFor="password" className="long-input">
            <img src={lock} alt="password" />
            <input
              id="password"
              type="password"
              maxLength="18"
              min="6"
              onChange={this.onChangePassword}
              value={this.state.password}
              onBlur={() => this.checkPassword()}
              placeholder="请输入6-18位数字与字母组合"
            />
          </lable>
        </div>
        <p className="cite">
          <label htmlFor="cite">
            注册即同意
            <a onClick={() => { window.open('http://www.lingtouniao.com/html/user/line/'); }}>
              《用户服务协议》
            </a>
            <a onClick={() => { window.open('http://www.lingtouniao.com/html/user/private/'); }}>
              《隐私条款》
            </a>
          </label>
        </p>

        <p className="register-submit" onClick={() => this.submitForm()}>立即注册</p>
        <p
          className="prompt"
          style={{ display: this.state.noteMessageState }}
        >
          {this.state.noteMessage}
        </p>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
        >
          <Modal.Content>
            <h3>{this.state.toastMessage}</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" />知道了
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default RegisterForm;
