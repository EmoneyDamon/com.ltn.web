// 数据服务
import Ajax from './axiosinstance';

const ajax = new Ajax({
  baseURL: '/api',
});

export function getBalanceAccountList(token, startTime, endTime, currentPage, pageSize) {
  return ajax.get('/channelBalance/getBalanceAccountList', {
    params: {
      token,
      startTime,
      endTime,
      currentPage,
      pageSize,
    },
  });
}


export function test() {

}
