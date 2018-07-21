//app.js
import login from './api/login';
import utils from './utils/util';

App({
  onLaunch: function() {
    // 尝试登录获取code信息
    login.getWxLoginResult((wxLoginError, wxLoginResult) => {
      if (wxLoginError) {
        utils.showModel('请求失败', wxLoginError)
        return;
      };
      wx.setStorageSync('wxLoginResult', wxLoginResult);
    })

    //获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        wx.setStorageSync('SystemInfo', res);
      }
    })
  },
  globalData: {
    userInfo: null
  }
})