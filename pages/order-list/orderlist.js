// pages/order-list/orderlist.js
import baseSelect from '../../utils/baseSelect.js'
import convert from '../../utils/convert.js'
import apiOrder from '../../api/order.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    page: 0,
    size: 10,
    tabscroll: 0,
    tabList: [{
      key: 0,
      label: '全部',
    },
    {
      key: 1,
      label: '待付款',
    },
    {
      key: 2,
      label: '待拼团',
    },
    {
      key: 3,
      label: '待出行',
    },
    {
      key: 4,
      label: '待评价',
    },
    {
      key: 5,
      label: '退款/售后',
    },
    ],
    selectTab: 0,
    status: null,
    commentStatus: null,
    serviceStatus: null,
    afresh: 0,
  },
  handleChangeScroll({
    detail
  }) {
    let status = null;
    let afresh = this.data.afresh + 1;
    let commentStatus = null;
    let serviceStatus = null;
    console.log(detail)
    switch (detail.key) {
      case "1":
        status = 0;
        break;
      case "2":
        status = 1;
        break;
      case "3":
        status = 2;
        serviceStatus = '0,3,4';
        break;
      case "4":
        status = 3;
        break;
      case "5":
        serviceStatus = '1,2,5,6';
        break;
      default:
        break;
    }
    console.log('status', status)
    this.setData({
      page: 0,
      afresh,
      status,
      serviceStatus,
      commentStatus,
      tabscroll: detail.key,
    });
    this.getOrderList(this.data.page, this.data.size, this.data.status, this.data.commentStatus, this.data.serviceStatus, true)
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

  // 获取订单列表
  getOrderList(page, size, status, commentStatus, serviceStatus, Change) {
    apiOrder.list(page, size, status, commentStatus, serviceStatus).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result.content;
        for (let i = 0; i < data.length; i++) {
          data[i].firstImg = this.getFirstImg(data[i].shopLogo);
          data[i].firstImgLog = this.getFirstImg(data[i].productLogo);
          data[i].groupLogos = convert.stringToArr(data[i].groupMemberLogos);
          data[i].orderTypeTip = baseSelect.orderTypeTip[`${data[i].orderType}${data[i].status}`];
        }
        console.log('data', data);
        if (data.length > 0) {
          let dataList = Change ? data : this.data.dataList.concat(data);
          this.setData({
            page: this.data.pape + 1,
            dataList: dataList,
          })
          // $state.loaded();
        } else {
          this.setData({
            page: this.data.pape + 1,
            dataList: [],
          })
          // $state.complete();
        }
      }
    })
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getOrderList(this.data.page, this.data.size, this.data.status, this.data.commentStatus, this.data.serviceStatus)
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