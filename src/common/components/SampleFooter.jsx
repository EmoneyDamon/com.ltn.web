import React from 'react';
import FootIcon1 from '../imgs/footer_icon1.png';
import codeApp from '../imgs/code-app.png';
import codeWeixin from '../imgs/code-weixin.png';
import people from '../imgs/footer_icon2.png';
import xinlang from '../imgs/footer_icon3.png';
import pic from '../imgs/pic.gif';
import './SampleFooter.scss';

class SampleFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
    };
  }

  openEmailContain() {
    if (this.state.display === 'block') {
      this.setState({
        display: 'none',
      });
    } else {
      this.setState({
        display: 'block',
      });
    }
  }

  render() {
    return (
      <div className="sample-footer">
        <div className="foot-navigation">
          <div className="contain">
            <img src={FootIcon1} alt="FootIcon1" />
            <p className="first">（工作日9:30-18:30）</p>
            <p className="second">400-999-9980</p>
            <p className="third">领投鸟投资用户交流群：247441580</p>
          </div>
          <div className="contain">
            <div className="content">
              <img className="icode" src={codeApp} alt="FootIcon1" />
              <p>APP下载</p>
              <div className="tip-contain" style={{ display: this.state.display }}>
                <p className="tips">
                客服邮箱：service@lingtouniao.com
                </p>
              </div>
              <p onClick={() => this.openEmailContain()} className="white-icon">
                <img src={people} alt="FootIcon1" />
                <span>客服邮箱</span>
              </p>
            </div>
            <div className="content">
              <img className="icode" src={codeWeixin} alt="FootIcon1" />
              <p>微信公众号</p>
              <a href="http://weibo.com/u/5935757405" className="white-icon">
                <img src={xinlang} alt="FootIcon1" />
                <span>新浪微博</span>
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="icons">
            <a href="https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf/splash.fdf&amp;dn=www.lingtouniao.com&amp;lang=zh_cn" className="icons1" />
            <a href="http://credit.szfw.org/CX20160524015311350170.html" className="icons2" />
            <a href="http://www.sgs.gov.cn/lz/etpsInfo.do?method=index" className="icons3" />
            <a href="http://www.miibeian.gov.cn/publish/query/indexFirst.action" className="icons4" />
            <a href="http://sfia.org.cn/lsdw/index.jhtml" className="icons5" />
            <a href="http://v.pinpaibao.com.cn/authenticate/cert/?site=www.lingtouniao.com&amp;at=business" className="icons6" />
            <a href="http://si.trustutn.org/info?sn=881160520000436261733" className="icons7" />
            <a href="https://ss.knet.cn/verifyseal.dll?sn=e160523310104635708sr5000000&amp;pa=500267" className="icons8" />
            <a href="http://www.cnzz.com/stat/website.php?web_id=1258037212">
              <img src={pic} alt="pic" />
            </a>
          </div>
          <div className="friend">
            <div className="friend_top">友情链接：
            <a href="http://www.wdzj.com/dangan/ltnlc/">网贷之家&nbsp;</a>|
              <a href="http://lingtouniao.p2peye.com/">网贷天眼&nbsp;</a>|
              <a href="http://baike.baidu.com/item/领投鸟理财">百度百科&nbsp;</a>|
              <a href="http://tieba.baidu.com/f?kw=%E9%A2%86%E6%8A%95%E9%B8%9F&amp;ie=utf-8">百度贴吧&nbsp;</a>|
              <a href="http://mp.sohu.com/profile?xpt=cHBhZzI1NjRjY2RmOThmZkBzb2h1LmNvbQ==">搜狐媒体&nbsp;</a>|
              <a href="http://weibo.com/u/5935757405?topnav=1&amp;wvr=6&amp;topsug=1">新浪微博&nbsp;</a>|
              <a href="http://toutiao.com/m5784948163/">今日头条&nbsp;</a>|
              <a href="http://www.lagou.com/gongsi/103258.html?m=1">拉勾&nbsp;</a>|
              <a href="http://www.itjuzi.com/company/32856">IT桔子</a></div>
            <div className="friend_bottom">
              公司地址：上海市金沙江路2145号普罗娜商务广场A栋7楼©2016 LINGTOUNIAO.COM 上海吾悠互联网科技服务有限公司版权所有
              <a className="except" href="http://www.miitbeian.gov.cn/">沪ICP备15056137号</a>市场有风险 投资需谨慎
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SampleFooter;
