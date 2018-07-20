import apiHome from '../../api/home';
import convert from '../../utils/convert';

// pages/homes/homes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    size: 10,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    requestLoading: false, //"上拉加载"的变量，默认false，隐藏
    requestLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    dataList: [],
    baseList: [{
        url: '',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
      },
      {
        url: '',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
      },
      {
        url: '',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
      },
    ],
    tabList: [{
        icon: 'icon iconfont icon-zhoubianyou',
        iconbg: 'a-bg',
        title: '跟团游',
        type: 1,
      },
      {
        icon: 'icon iconfont icon-guonei',
        iconbg: 'g-bg',
        title: '自由行',
        type: 2,
      },
      {
        icon: 'icon iconfont icon-chanpinfenleizhoubianyou',
        iconbg: 'l-bg',
        title: '周边游',
        type: 3,
      },
      {
        icon: 'icon iconfont icon-lvyou7',
        iconbg: 'h-bg',
        title: '一日游',
        type: 4,
      },
    ],
  },
  // tap链接
  goProductList(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/follows/follows?type=' + type
    })
  },
  // 为你推荐产品列表
  infiniteHandler() {
    apiHome.homelist(this.data.page, this.data.size).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result.content;
        if (data.length > 0) {
          let length = Object.keys(data).length;
          for (let i = 0; i < length; i++) {
            data[i].logoUrl = this.toArr(data[i].logo)
          }
          this.setData({
            page: this.data.page + 1,
            dataList: this.data.dataList.concat(data),
            requestLoading: false,
            requestLoadingComplete: false
          })
        } else {
          this.setData({
            requestLoading: false,
            requestLoadingComplete: true
          });
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      requestLoading: true,
      requestLoadingComplete: false
    });
    this.infiniteHandler();
  },

  // 取出图片地址
  toArr(arr) {
    let url = null;
    if (convert.convertImgArr(arr)[0]) {
      url = convert.convertImgArr(arr)[0].url;
    }
    return url;
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
    this.infiniteHandler();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})