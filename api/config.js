// 配置文件
//  (地址配置均以/结尾，后续无需再加)

// 开发环境 (dev)
// let apiHost = `${location.protocol}//${location.host}/api/`;
// let uploadHost = '/api/upload/';
// let authServer = '';
// let authHost = '' || `${location.protocol}//${location.host}/`;

// const setConfig = (base) => {
//   // apiHost = `${location.protocol}//${location.host}/api/`;
//   apiHost = 'http://api.develop.iyaoling.com/';
//   uploadHost = 'http://api.develop.iyaoling.com/manage/aliyun/upload';
//   authServer = base.SSO_SERVER;
//   authHost = base.SSO_SERVER || `${location.protocol}//${location.host}/`;

//   // 开发线上环境 (develop)
//   if (process.env.NODE_ENV && process.env.NODE_ENV === 'develop') {
//     apiHost = 'http://api.develop.iyaoling.com/';
//     uploadHost = 'http://api.develop.iyaoling.com/manage/aliyun/upload';
//   }

//   // 生产环境 （master）
//   if (process.env.NODE_ENV && process.env.NODE_ENV === 'master') {
//     // apiHost = 'https://member_api.qywgpo.com/';
//     apiHost = 'http://api.develop.iyaoling.com/';
//     uploadHost = base.UPLOAD_SERVER ? `${base.UPLOAD_SERVER}/aliyun/upload/` : '/aliyun/upload/';
//   }
// };

// const baseConfig = 'baseConfig';

// let config = window.sessionStorage.getItem(baseConfig);

// if (config) {
//   config = JSON.parse(config);
// } else {
//   config = {};
// }

// setConfig(config);

// const getAuthServer = () => {
//   const sessionConfig = window.sessionStorage.getItem(baseConfig);
//   setConfig(JSON.parse(sessionConfig));
//   return authServer;
// };

// const getUploadHost = () => {
//   const sessionConfig = window.sessionStorage.getItem(baseConfig);
//   setConfig(JSON.parse(sessionConfig));
//   return uploadHost;
// };

// const authorization = () => {
//   const sessionConfig = window.sessionStorage.getItem(baseConfig);
//   const base = JSON.parse(sessionConfig);
//   return base.Authorization;
// };

// const tokenName = 'h5_token';

// //  设置 当前用户的access_token
// const setToken = (token) => {
//   sessionStorage.setItem(tokenName, token);
// };

//  获取 当前用户的access_token
// const getToken = () => sessionStorage.getItem(tokenName);
const getToken = () => {
  return 'fe71a7a1 - 6cb4- 4fb7- a115 - 8bdb9a0402ea'
};

// //  删除 当前用户的access_token
// const removeToken = () => {
//   sessionStorage.removeItem(tokenName);
// };

// console.log(process.env.NODE_ENV);

export default {
  // apiHost,
  // tokenName,
  // refreshToken: 'refresh_token',
  // client_id: config.client_id || '',
  // authorization,
  // uploadHost,
  // resource_id: config.resource_id || null,
  // baseConfig,
  // getAuthServer, // 登录服务器
  // getUploadHost, // 上传服务器
  // setToken, //  设置 当前用户的access_token
  getToken, //  获取 当前用户的access_token
  // removeToken, //  删除 当前用户的access_token
};