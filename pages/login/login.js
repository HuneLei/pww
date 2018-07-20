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
  toOrderList(e) {},

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
    wx.showLoading({
      title: '加载中',
    })
    console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      wx.hideLoading()
      this.setData({
        userInfo: e.detail.userInfo,
        isLogin: true
      })
    }
  },

  // 登录方法
  toLogin() {
    // this.setData({
    //   isLogin: true
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})