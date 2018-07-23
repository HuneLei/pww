import util from '../../utils/util.js';
import apiLogin from '../../api/login';

Page({
  data: {
    back: null,
    isBind: true,
    form: {},
    // sex: window.baseSelect.sex,
    img: null,
    num: 2,
    timeClass: 'color: #ff7300',
    isLogin: false,
    userInfo: {}
  },

  // 跳转到相应的订单列表
  toOrderList(e) { },

  // 跳到设置
  toSet() {
    this.$router.push('/set');
  },
  // 跳转到我的评价
  toEvaluateList() {
    this.$router.push('/EvaluateList');
  },
  // 跳转到历史浏览
  toHistoryList() {
    this.$router.push('/HistoryList');
  },
  // 获取用户信息
  bindgetuserinfo(e) {
    return;
    if (this.data.isLogin) return;
    // util.showBusy('正在登录');
    var that = this;
    let userResult = e.detail;
    if (e.detail.userInfo) {
      let wxLoginResult = wx.getStorageSync('wxLoginResult');

      apiLogin.getWxLoginResult((wxLoginError, wxLoginResult) => {
        if (wxLoginError) {
          utils.showModel('请求失败', wxLoginError)
          return;
        };
        apiLogin.login({
          iv: userResult.iv,
          code: wxLoginResult.code,
          userInfo: userResult.userInfo,
          encryptedData: userResult.encryptedData,
        }, (userInfo, errorInfo) => {
          if (errorInfo) {
            util.showModel('请求失败', errorInfo)
            return;
          }
          // wx.hideLoading()
          // that.setData({
          //   userInfo: userInfo,
          //   isLogin: true
          // })
        })
      })
    } else {
      wx.hideLoading()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})