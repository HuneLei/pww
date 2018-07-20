// pages/follow/follow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateNum: 5,
    sortNum: 0,
    selectList: [{
      id: 0,
      text: '综合排序',
    }, {
      id: 1,
      text: '近期销量最高',
    }, {
      id: 2,
      text: '产品销量最高',
    }, {
      id: 3,
      text: '价格从高到低',
    }, {
      id: 4,
      text: '价格从低到高',
    }],
    sort: {
      sortTitle: '综合排序',
      sortShow: false,
      selectShow: false,
      pack: 'unfold'
    },
    date: {
      dateShow: false,
      selectShow: false,
      pack: 'unfold'
    },
    listDate: [{
      id: 0,
      text: '昆明+大理+丽江+西双版纳+玉龙雪山8日7晚跟团游(4钻)·携程自营【臻享4飞】省内环飞 嗨翻泼水节 非遗扎染+骑马划船+网红Jeep旅拍',
      url: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
    }, {
      id: 1,
      text: '昆明+大理+丽江+西双版纳+玉龙雪山8日7晚跟团游(4钻)·携程自营【臻享4飞】省内环飞 嗨翻泼水节 非遗扎染+骑马划船+网红Jeep旅拍',
      url: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
    }, {
      id: 1,
      text: '昆明+大理+丽江+西双版纳+玉龙雪山8日7晚跟团游(4钻)·携程自营【臻享4飞】省内环飞 嗨翻泼水节 非遗扎染+骑马划船+网红Jeep旅拍',
      url: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
    }, {
      id: 1,
      text: '昆明+大理+丽江+西双版纳+玉龙雪山8日7晚跟团游(4钻)·携程自营【臻享4飞】省内环飞 嗨翻泼水节 非遗扎染+骑马划船+网红Jeep旅拍',
      url: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
    }, {
      id: 1,
      text: '昆明+大理+丽江+西双版纳+玉龙雪山8日7晚跟团游(4钻)·携程自营【臻享4飞】省内环飞 嗨翻泼水节 非遗扎染+骑马划船+网红Jeep旅拍',
      url: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
    }, {
      id: 1,
      text: '昆明+大理+丽江+西双版纳+玉龙雪山8日7晚跟团游(4钻)·携程自营【臻享4飞】省内环飞 嗨翻泼水节 非遗扎染+骑马划船+网红Jeep旅拍',
      url: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
    }, {
      id: 1,
      text: '昆明+大理+丽江+西双版纳+玉龙雪山8日7晚跟团游(4钻)·携程自营【臻享4飞】省内环飞 嗨翻泼水节 非遗扎染+骑马划船+网红Jeep旅拍',
      url: 'http://2017051845.oss-cn-hangzhou.aliyuncs.com/65bc9d5c-5996-4054-8404-2f2d8b0ffbef..jpg',
    }],
  },
  tapCity: function() {
     wx.navigateTo({
       url: '/pages/city/city',
     })
  },
  tapSort: function() {
    this.setData({
      sort: {
        pack: this.data.sort.sortShow ? 'unfold' : 'packup',
        sortShow: !this.data.sort.sortShow,
        selectShow: !this.data.sort.selectShow,
        sortTitle: this.data.sort.sortTitle
      },
      date: {
        pack: 'unfold',
        dateShow: false,
        selectShow: false
      }
    })
  },
  tapDate: function() {
    this.setData({
      date: {
        pack: this.data.date.dateShow ? 'unfold' : 'packup',
        dateShow: !this.data.date.dateShow,
        selectShow: !this.data.date.selectShow
      },
      sort: {
        pack: 'unfold',
        sortShow: false,
        selectShow: false,
        sortTitle: this.data.sort.sortTitle,
      },
    })
  },
  tapSelect: function(event) {
    let str = event.target.id;
    this.setData({
      sortNum: Number(str.substr(str.length - 1, 1)),
      sort: {
        pack: this.data.sort.sortShow ? 'unfold' : 'packup',
        sortShow: !this.data.sort.sortShow,
        selectShow: !this.data.sort.selectShow,
        sortTitle: event.target.dataset.value,
      }
    })
  },
  tapLost: function() {
    this.setData({
      sort: {
        pack: 'unfold',
        sortShow: false,
        selectShow: false,
        sortTitle: this.data.sort.sortTitle
      },
      date: {
        pack: 'unfold',
        dateShow: false,
        selectShow: false
      }
    })
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