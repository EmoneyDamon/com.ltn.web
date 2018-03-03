
// 获取SessionKey
export function getSessionKey() {
  return sessionStorage.getItem('ym_sessionKey');
}
// 登录 url: 成功回调
export function login(url) {
  window.location.href = `http://192.168.18.194:1950/html/user/login?url=${url}`;
}

// 登录 url: 成功回调
export function goOnline(sessionKey) {
  //window.location.href = `http://192.168.18.194:1950/html?token=${sessionKey}`;
  // window.location.href = `http://192.168.18.194:1950/html/account/viewall/?token=${sessionKey}`;
}
