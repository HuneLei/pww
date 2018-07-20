/**
 * api 初始化文件
 */
import api from './base.js';

export default api.setOption({
  baseUrl: 'http://api.develop.iyaoling.com', //  接口的基础地址配置
  params: {
    //  基础参数，即每次调用都要传的参
    // appkey: '4bc50f7a1d53fc8dd125e977505d2c4d',
    // access_token: '384e5130-5171-47b5-a006-575a02ec34de',
  },
});