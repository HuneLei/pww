import apiHome from '../../api/home.js'
import convert from '../../utils/convert.js'

Page({
  data: {
    x: 0,
    y: 0,
    scale: 2,
    maskValue: null,
    productItem: {},
    height: 0,
    bgHeight: 0,
    loading: false,
    showOn: false, // 进入动画
    percent: 0,
    touch: {},
    nexProductItemImg: null, // 下一个产品的图片
    showSlideTip: false,
    isMove: null, // 判断是否是滑动
    cardRightIn: false,
    cardLeftIn: false,
    list: []
  },
  // 产品详情
  dataListFn() {
    // this.loading = true;
    apiHome.discovery().then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result;
        let nexProductItemImg = this.toArr(res.data.result.logo);
        this.setData({
          showOn: true,
          productItem: data,
          nexProductItemImg: nexProductItemImg
        })
        // this.$refs.back.style.transform = 'translateX(0)';
      }
      // this.loading = false;
    });
  },

  toArr(arr) {
    let url = null;
    if (convert.convertImgArr(arr)[0]) {
      url = convert.convertImgArr(arr)[0].url;
    }
    return url;
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },

  /**
* 计算滑动角度
* @param {Object} start 起点坐标
* @param {Object} end 终点坐标
*/
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  },

  //滑动事件处理
  touchmove: function (e) {
    let idx = e.currentTarget.dataset.index;
    let startX = this.data.startX,//开始X坐标
      startY = this.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    //滑动超过45度角 return
    if (Math.abs(angle) > 45) return;

    if (touchMoveX > startX) { //右滑
      this.setData({
        currentIndex: idx == 0 ? 0 : idx - 1,
        cardRightIn: false,
        cardLeftIn: true
      })
    } else {
      this.setData({
        currentIndex: idx == this.data.list.length - 1 ? idx : idx + 1,
        cardRightIn: true,
        cardLeftIn: false
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dataListFn();
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