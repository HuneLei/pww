/**
 * api 初始化文件
 */
import api from './base';
import config from '../config'

export default api.setOption({
  baseUrl: config.apiHost, //  接口的基础地址配置
  params: {
    // 基础参数，即每次调用都要传的参
    // appkey: '4bc50f7a1d53fc8dd125e977505d2c4d',
    access_token: 'c3ba1a11-a0b8-4049-9366-64fbaa153e12',
  },
});