import constants from '../utils/constants';
import config from '../config.js';

const loginUrl = `${config.oauthHost}/wechat/login`
/***
 * @class
 * 表示登录过程中发生的异常
 */
const LoginError = (function() {
  function LoginError(type, message) {
    Error.call(this, message);
    this.type = type;
    this.message = message;
  }

  LoginError.prototype = new Error();
  LoginError.prototype.constructor = LoginError;

  return LoginError;
})();

/**
 * 微信登录，获取 code 和 encryptData
 */
const getWxLoginResult = (callback) => {
  wx.login({
    success: function(loginResult) {
      console.log('loginResult', loginResult)
      callback(null, loginResult);
    },
    fail: function(loginError) {
      var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态');
      error.detail = loginError;
      callback(error, null);
    },
  });
};

/**
 * 进行服务器登录，以获得登录会话
 *
 */
const login = (options, callback) => {
  let SessionLogin = () => {
    var userInfo = options.userInfo;
    // 构造请求头，包含 code、encryptedData 和 iv
    var code = options.code;
    var encryptedData = options.encryptedData;
    var iv = options.iv;
    var header = {};

    header[constants.WX_HEADER_CODE] = code;
    header[constants.WX_HEADER_ENCRYPTED_DATA] = encryptedData;
    header[constants.WX_HEADER_IV] = iv;
    console.log(header)
    // 请求服务器登录地址，获得会话信息
    wx.request({
      url: loginUrl,
      header: header,
      data: {
        jsCode: code,
        encryptedData: encryptedData
      },
      method: 'GET',
      // data: options.data,
      success: (result) => {
        console.log('result', result);
        var data = result.data;
        // 成功地响应会话信息
        if (data && data.code === 0 && data.data.skey) {
          var res = data.data
          if (res.userinfo) {
            Session.set(res.skey);
            callback(userInfo, null)
          } else {
            var errorMessage = '登录失败(' + data.error + ')：' + (data.message || '未知错误');
            var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
            callback(null, noSessionError)
          }
          // 没有正确响应会话信息
        } else {
          var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, JSON.stringify(data));
          callback(null, noSessionError)
        }
      },
      // 响应错误
      fail: (loginResponseError) => {
        var error = new LoginError(constants.ERR_LOGIN_FAILED, '登录失败，可能是网络错误或者服务器发生异常');
        callback(null, error)
      }
    })
  }
  let session = config.Session.get();
  // if (session) {
  //   // 检测是否是登录状态
  //   wx.checkSession({
  //     success: function () {
  //       callback(session.userInfo, null)
  //     },
  //     fail: function () {
  //       config.Session.clear();
  //       SessionLogin();
  //     },
  //   });
  // } else {
  SessionLogin();
  // }
}

export default {
  login,
  getWxLoginResult,
};