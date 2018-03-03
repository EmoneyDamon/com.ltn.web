import Ajax from './axiosinstance';

const ajax = new Ajax({
  baseURL: '/api',
  headers: {
    responseType: 'json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// 获取手机验证码
export function getMobileCode(machineNo, mobileNo, pictureCode) {
  return ajax.post('/mobile/pcmobilecode/getMobileCode', {
    machineNo,
    mobileNo,
    pictureCode,
    sendType: 1,
  });
}

// 用户注册
export function registerUser(mobileNo, mobileCode, password, dept = '') {
  return ajax.post('/user/register/registerUser', {
    mobileNo,
    mobileCode,
    password,
    readAndAgree: 1,
    dept,
  });
}
// 用户注册
export function getRegisterNum() {
  return ajax.post('/pc/homepage/ptdata/get');
}
