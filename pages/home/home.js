// pages/Home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
      'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
      'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    dataList: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' }
    ],
    urlList: [
      { id: 0, test: '跟团游', imgsrc: '../../image/zhoubianyou.png', modecolor: '#0ae' },
      { id: 1, test: '自由行', imgsrc: '../../image/guonei.png', modecolor: '#28cd5f' },
      { id: 2, test: '周边游', imgsrc: '../../image/zhoubian.png', modecolor: '#ff7300' },
      { id: 3, test: '一日游', imgsrc: '../../image/lvyou.png', modecolor: '#fd5351' },
    ]
  },
  tapName: function () {
    wx.navigateTo({
      url: '/pages/follow/follow',
    })
  },
  // 滚动数据加载
  scrolltolower: function () {
    console.log(this.data.dataList)
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