import InitData from '../../utils/InitData';
import convert from '../../utils/convert'
import apiArea from '../../api/area';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allHeight: "",
    cityListHeight: "",
    inputShowed: false,
    inputVal: "",
    results: [],
    cityValue: null,
    araeList: InitData.araeList,
    letter: [],
    hotList: [{
      id: 2,
      label: '深圳',
    }, ],
    historyList: ['北京', '保定'],
    cityList: [],
    type: null, // 产品类型
    city: '深圳', // 城市
  },

  // 初始配置
  init() {
    // 26个字母
    let letter = [];
    for (let i = 65; i < 91; i += 1) {
      letter.push(String.fromCharCode(i));
    }
    this.setData({
      letter,
      // historyList: convert.stringToArr(localStorage.getItem('historyList')), // 获取历史选择
    })
  },
  // 城市列表
  cityListFn() {
    let cityList = [];
    apiArea.list(this.data.cityValue).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result;
        const arr = [];
        for (let i = 0; i < this.data.letter.length; i += 1) {
          const a = {
            title: this.data.letter[i],
            list: [],
          };
          for (let j = 0; j < data.length; j += 1) {
            if (data[j].letter.charAt(0) === this.data.letter[i]) {
              a.list.push(data[j]);
            }
          }
          arr.push(a);
        }
        this.setData({
          cityList: arr,
        })
      }
    });
  },

  // 搜索事件
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  // 滑到某个位置
  toArea(e) {
    console.log(e.currentTarget.dataset.item);
    let item = e.currentTarget.dataset.item;
    if (item !== 'search-input' && item !== 'current' && item !== 'history' && item !== 'hot') {
      this.$vux.toast.text(item, 'middle');
    }
    // const name = document.getElementById(item);
    // if (name) {
    //   name.scrollIntoView();
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(wx.getStorageSync('SystemInfo').screenHeight)
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
    if (options.city) {
      this.setData({
        city: options.city
      })
    }
    this.setData({
      allHeight: `height: ${wx.getStorageSync('SystemInfo').windowHeight - 40}px;`,
      cityListHeight: `height: ${wx.getStorageSync('SystemInfo').windowHeight - 30}px; overflow-y: auto;`
    })
    this.init();
    this.cityListFn();
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