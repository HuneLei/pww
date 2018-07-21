import baseSelect from '../../utils/baseSelect.js'
import convert from '../../utils/convert.js'
import apiOrder from '../../api/order.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ID: null,
    form: {},
    userInfo: {},
    serviceStatusOption: baseSelect.serviceStatus,
    orderTypeTip: baseSelect.orderTypeTip,
    // 顶部背景图 invite：进行中 success：成功 fail：失败 根据status判断
    tipStatusBg: {
      0: 'background: url(../../assets/img/invite.jpg) no-repeat;',
      1: 'background: url(../../assets/img/invite.jpg) no-repeat;',
      2: 'background: url(../../assets/img/success.jpg) no-repeat;',
      3: 'background: url(../../assets/img/success.jpg) no-repeat;',
      4: 'background: url(../../assets/img/success.jpg) no-repeat;',
      5: 'background: url(../../assets/img/success.jpg) no-repeat;',
      6: 'background: url(../../assets/img/fail.jpg) no-repeat;',
    },
    // 顶部背景图 invite：进行中 success：成功 fail：失败 根据serviceStatus判断
    tipServiceStatusBg: {
      1: 'background: url(../../assets/img/invite.jpg) no-repeat;',
      2: 'background: url(../../assets/img/success.jpg) no-repeat;',
      5: 'background: url(../../assets/img/invite.jpg) no-repeat;',
      6: 'background: url(../../assets/img/success.jpg) no-repeat;',
    },
    // tipStatus: {
    //   1: '拼团还未成功',
    //   2: '拼团成功',
    //   3: '拼团成功',
    //   4: '行程结束',
    //   5: '拼团失败',
    //   6: '行程结束',
    // },
    tipPrompt: {
      0: '15分钟内未支付订单将自动取消',
      1: '赶快邀请小伙伴一起拼团吧！',
      2: '请做好您的出行准备，祝您旅途愉快',
      3: '祝您旅途愉快',
      4: '感谢您的评价，期待与您再次同行',
      5: '订单已取消',
      6: '不想就这样与你错过，再试一试吧',
    },
    tipServiceStatusPrompt: {
      1: '',
      2: '不想就这样与你错过，再试一试吧',
      5: '不想就这样与你错过，再试一试吧',
      6: '不想就这样与你错过，再试一试吧',
    },
  },

  // 去支付
  toPay() {},

  // 订单详情
  orderItem() {
    apiOrder.item(this.data.ID || 179).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result;
        if (data.userId !== this.data.userInfo.userId) {
          // this.$router.push('/Home');
        }
        if (this.toArr(data.productLogo)[0]) {
          data.productLogo = this.toArr(data.productLogo)[0].img;
        } else {
          data.productLogo = null;
        }
        data.orderTypeTip = baseSelect.orderTypeTip[`${data.orderType}${data.status}`];
        data.serviceStatusOption = baseSelect.serviceStatus[data.serviceStatus]
        // 拼团人头像
        data.groupMemberLogos = convert.stringToArr(data.groupMemberLogos);
        console.log('data', data)
        this.setData({
          form: data,
        })
      }
    });
  },
  // 产品图片转换
  toArr(arr) {
    const imgUrl = [];
    const imgArr = convert.convertImgArr(arr);
    for (let i = 0; i < imgArr.length; i += 1) {
      const a = {
        img: imgArr[i].url,
      };
      imgUrl.push(a);
    }
    return imgUrl;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.orderItem();
    if (options.id) {
      this.setData({
        ID: Number(options.id)
      })
      this.orderItem();
    }
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