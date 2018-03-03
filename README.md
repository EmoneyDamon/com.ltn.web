## 官网框架说明

#### 第三方资源文件

* * *

1.  这是react封装的[UI框架react.semantic-ui.com](https://react.semantic-ui.com/usage)
2.  这是ui的源[UI框架semantic-ui](https://semantic-ui.com/introduction/getting-started.html)
3.  ajax请求相关的资料[axios](https://github.com/mzabriskie/axios)

#### ajax 请求使用规范

1.  在 _api_ 文件夹下面封装了 ajax工厂函数，处理 请求拦截器、响应拦截器、规范错误信息、过滤响应数据

    1.  ajax 工厂函数使用
        针对每一个模块，创一个 _axios_ 实例, 创建形式如下:

        ```javascript
          // 1. 导入依赖
          import Ajax  from './axiosinstance'
          // 2. 创建实例
          const DemoAjax = new Ajax({
            baseURL:'' //  默认值是空，用于处理请求拦截，开发环境配置在 webpack.dev.js 里面，测试、生产配置在nginx中,
            timeout:5000 // 请求的超时限制， 默认值是5000，无特殊情况，此参数无需设置
            // headers： 这是请求的头部设置，主要用于处理后的接口不规范而设置的，特别是post的请求，后的接口出现头部多种请求
            /**
             * 1. application/json 设置头部如下，默认头部也是application/json
             * headers:{
             *    responseType: 'json',
             *    'Content-Type': 'application/json',
             * }
             * 2. application/x-www-form-urlencoded
             * headers:{
             *    responseType: 'json',
             *    'Content-Type': 'application/x-www-form-urlencoded',
             * }
             * 特殊说明：正常情况不需要设置
             */
            headers:{
              responseType: 'json',
              'Content-Type': 'application/json',
            }
          });
        ```

    2.  请求拦截器

        ```javascript
          // 请求拦截器主要完成以下几件事情
          // 1. 为生产环境设置特殊的 baseURL ,也就是说如果是在生产环境 baseURL被替换为:https://www.lingtouniao.com,其他环境不变
          // 2. 为get请求设置特殊的请求url，
          //     由于后端框架限制，前端发送get请求的时候，这里一律将请求的 [url] 修改为 [url].json
          // 3. 分别为get 和 post 请求设置 通用的 clientType,和sessionKey，
          // 4. 拦截非 get或者post请求，直接组织请求发送，提示 请求不被允许

          axiosinstance.interceptors.request.use((config) => {
            const { method, params = {} } = config;
            let { data = {}, url } = config;

            if (method === 'get') {
              params.clientType = 'PC';
              params.sessionKey = getCookie('sessionKey');
              url += '.json';
            } else if (method === 'post') {
              data.clientType = 'PC';
              data.sessionKey = getCookie('sessionKey');
              data = qs.stringify(data);
            } else {
              return Promise.reject({
                message: `不支持的请求${method}`,
              });
            }
            config.params = params;
            config.data = data;
            config.url = url;
            return config;
          }, error => Promise.reject({
            message: error.message || '请求参数配置异常',
          }));
        ```

    3.  请求响应拦截

        ```javascript
          // 请求响应拦截主要做以下几件事情
          // 1. 拦截 status  不等于  200~300 之间的，
          // 2. 拦截 resultCode 不等于  '0' 的
          // 3. 对错误信息做格式化
          // 4. 对正确的信息做提取
          //
          axiosinstance.interceptors.response.use((response) => {
            const { resultCode, resultMessage, data } = response.data;
            if (resultCode !== '0') {
              return Promise.reject({
                message: resultMessage || '服务器异常',
                data: response.data,
              });
            }
            return data;
          }, error => Promise.reject({
            message: error.message || '请求失败',
          }));

          //  错误信息示例
          //  1. 响应状态错误
          error = {
            message:''
          }
          //  2. resultCode 不对
          error = {
            data:''   //  这个data是 后端全部数据， 包含resultCode
            message:''
          }
          // 正确数据过滤， 由于后端数据结构层次比较深，这里做了提取，直接返回需要用到的data
          // 后端返回
          {
            "resultCode":"0",
            "data":{
              "investmentInfoList":{

              }
            }
          }
          //  对应提取后的结构
          {
            "investmentInfoList":{

            }
          }
        ```
