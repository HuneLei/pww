import baseSelect from '../../utils/baseSelect.js'
import convert from '../../utils/convert.js'
import apiOrder from '../../api/order.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_scroll: 'tab1',
    dataList: [],
    page: 0,
    size: 10,
    serviceStatusOption: baseSelect.serviceStatus,
    orderTypeTip: baseSelect.orderTypeTip,
    state: null,
    selectTabOption: {
      0: '您还没有相关的订单哦',
      1: '您还没有相关的待支付订单哦',
      2: '您还没有相关的待拼团订单哦',
      3: '您还没有相关的待出行订单哦',
      4: '您还没有相关的待评价订单哦',
      5: '您还没有相关的退款/售后订单哦',
    },
  },

  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
    });
  },

  // 取第一张图
  getFirstImg(str) {
    let imgUrl = null;
    const imgArr = convert.convertImgArr(str);
    if (imgArr[0]) {
      imgUrl = imgArr[0].url;
    }
    return imgUrl;
  },

  stringToArr(str) {
    return convert.stringToArr(str);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    apiOrder.list(this.data.page, this.data.size, this.data.status, this.data.commentStatus, this.data.serviceStatus).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result.content;
        for (let i = 0; i < data.length; i++) {
          data[i].firstImg = this.getFirstImg(data[i].shopLogo);
          data[i].firstImgLog = this.getFirstImg(data[i].productLogo);
          data[i].groupLogos = this.stringToArr(data[i].groupMemberLogos);
        }
        console.log('data', data);
        if (data.length > 0) {
          this.setData({
            page: this.data.pape + 1,
            dataList: this.data.dataList.concat(data),
          })
          // $state.loaded();
        } else {
          // $state.complete();
        }
      }
    })
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