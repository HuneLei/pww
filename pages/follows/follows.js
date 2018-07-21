// pages/follows/follows.js
import baseSelect from '../../utils/baseSelect';
import apiHome from '../../api/home';
import convert from '../../utils/convert';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectStyle: `background: url(../../assets/img/active.png) no-repeat right bottom;
                  border-color: #ff4a00;`,
    allGoodsFilte: [{
        name: '专人配送',
        value: '0',
        checked: true
      },
      {
        name: '精品品牌',
        value: '1',
        checked: false
      },
      {
        name: '超值优惠',
        value: '2',
        checked: false
      },
      {
        name: '门店自提',
        value: '3',
        checked: false
      },
      {
        name: '最快三小时',
        value: '4',
        checked: false
      },
      {
        name: '专人配送',
        value: '0',
        checked: true
      },
      {
        name: '精品品牌',
        value: '1',
        checked: false
      },
      {
        name: '超值优惠',
        value: '2',
        checked: false
      },
      {
        name: '门店自提',
        value: '3',
        checked: false
      },
      {
        name: '最快三小时',
        value: '4',
        checked: false
      },
      {
        name: '超值优惠',
        value: '2',
        checked: false
      },
      {
        name: '门店自提',
        value: '3',
        checked: false
      },
      {
        name: '最快三小时',
        value: '4',
        checked: false
      },
    ],
    sortList: baseSelect.sortListOptions,
    sortSelect: 0,
    showSort: false,
    showData: false,
    dataOption: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dataSelect: [0],
    dataList: [],
    list: [],
    page: 0,
    size: 10,
    datatype: null, // 产品类型
    city: '深圳', // 城市
    allHeight: '',
    listHeight: '',
    requestLoading: false, //"上拉加载"的变量，默认false，隐藏
    requestLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    checked_style: `background: #ffffff url(../../assets/img/active.png) no-repeat right bottom;
    border-color: #ff4a00;`
  },
  selecttap: function(e) {
    let index = e.currentTarget.dataset.index;
    let dataOption = this.data.dataOption;
    dataOption[index] = !dataOption[index];
    this.setData({
      dataOption,
    })
  },
  serviceValChange: function(e) {
    var dataOption = this.data.dataOption;
    var checkArr = e.detail.value;
    for (var i = 0; i < dataOption.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        dataOption[i].checked = true;
      } else {
        dataOption[i].checked = false;
      }
    }
    this.setData({
      dataOption: dataOption
    })
  },
  selectOptionClick(e) {
    this.setData({
      sortSelect: e.target.dataset.value,
      showSort: !this.showSort,
      showData: false
    });
  },

  toggleSort() {
    this.setData({
      showSort: !this.data.showSort,
      showData: false
    });
  },

  toggleData() {
    this.setData({
      showData: !this.data.showData,
      showSort: false
    })
  },

  closeSort() {
    this.setData({
      showData: false,
      showSort: false
    })
    this.showSort = false;
    this.showData = false;
  },

  // 为你推荐产品列表
  infiniteHandler() {
    apiHome.list(this.data.page, this.data.size, this.data.city, this.data.datatype).then((res) => {
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
  // 取出图片地址
  toArr(arr) {
    let url = null;
    if (convert.convertImgArr(arr)[0]) {
      url = convert.convertImgArr(arr)[0].url;
    }
    return url;
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type) {
      this.setData({
        datatype: options.type,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        // 计算主体部分高度,单位为px
        that.setData({
          allHeight: `height: ${res.windowHeight - 32}px; overflow-y: auto;`,
          listHeight: `height: ${res.innerHeight - 52}px; overflow-y: auto; margin-top: 52px;`
        })
      }
    });
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