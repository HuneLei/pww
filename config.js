// 配置文件
import constants from './utils/constants';

// SESSION和TOKEN的KEY
let SESSION_KEY = 'pww_session_' + constants.WX_SESSION_MAGIC_ID;
let tokenName = 'pww_token_' + constants.WX_TOKEN_NAME_ID;

// 接口环境
let apiHost = 'http://api.develop.iyaoling.com'; // 接口的基础地址


// 设置 当前用户的access_token
const setToken = (token) => {
  sessionStorage.setItem(tokenName, token);
};

// 获取 当前用户的access_token
const getToken = () => sessionStorage.getItem(tokenName);

const Session = {
  get: function () {
    return wx.getStorageSync(SESSION_KEY) || null;
  },

  set: function (session) {
    wx.setStorageSync(SESSION_KEY, session);
  },

  clear: function () {
    wx.removeStorageSync(SESSION_KEY);
  },
};



export default {
  apiHost,
  Session,  //  设置获取清除SESSION_KEY
  setToken, //  设置 当前用户的access_token
  getToken, //  获取 当前用户的access_token
};