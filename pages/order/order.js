// pages/order/order.js
import apiHome from '../../api/home';
import apiUser from '../../api/user';
import apiOrder from '../../api/order';
import config from '../../config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionsCost: [],
    travelList: [],
    actionsNotice: [],
    visibleSpecial: false, // 特殊需求面版
    visibleNotice: false, // 预定需知面板
    visibleCost: false, // 费用明细面板
    dataSelect: [], // 选择的出行人
    showCost: false, // 费用明细
    showSpecial: false, // 特殊需求
    productName: null, // 产品详情
    childrenMinAge: null, // 儿童标准
    childrenMaxAge: null, // 儿童标准
    allAdmitPrice: null, // 大人总价
    allKidsPrice: null, // 小孩总价
    form: {},
    singlePrice: null,
    kidsPrice: null,
    admit: null,
    child: null,
    type: null,
    orderid: null, // 拼单id
    tapSelect: 'orange-view',
    reserveTemplateOne: "", // 预订须知
    reserveTemplateTwo: "", // 签证信息
    areaValue: "", //特殊需求文本内容
    cursor: 0, // 已经输入的字数
  },
  bindinput: function(event) {
    this.setData({
      cursor: event.detail.cursor,
      areaValue: event.detail.value
    })
  },
  // 特殊需求
  openSpecial() {
    this.setData({
      visibleSpecial: true
    });
  },
  handleClickSpecial({
    detail
  }) {
    console.log(detail)
  },
  handleCancelSpecial() {
    this.setData({
      visibleSpecial: false
    });
  },
  // 预定须知
  openNotice() {
    this.setData({
      visibleNotice: true
    });
  },
  handleClickNotice({
    detail
  }) {
    console.log(detail)
  },
  handleCancelNotice() {
    this.setData({
      visibleNotice: false
    });
  },
  // 费用明细
  showHideCost() {
    this.setData({
      visibleCost: true
    });
  },
  handleClickCost({
    detail
  }) {
    console.log(detail)
  },
  handleCancelCost() {
    this.setData({
      visibleCost: false
    });
  },
  // 产品详情
  productItem(id) {
    apiHome.item(id, 2).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result;
        let formList = this.data.form;
        formList.groupMinOrder = data.groupMinOrder; // 最小订单数
        formList.supplierId = data.shopId; // 供应商id
        this.reserveTemplateFn(data.reserveTemplateId); // 预订须知
        this.setData({
          productName: data.name,
          childrenMinAge: data.childrenMinAge,
          childrenMaxAge: data.childrenMaxAge,
          form: formList
        })
        // this.getUserInfoFn(); // 用户信息
      }
    });
  },
  // 查询预定须知
  reserveTemplateFn(templateId) {
    apiHome.explain(templateId).then((res) => {
      if (res.data.code === 0) {
        this.setData({
          reserveTemplateOne: res.data.result.explainOne,
          reserveTemplateTwo: res.data.result.explainTwo
        })
      }
    });
  },
  // 获取用户信息
  getUserInfoFn() {
    if (config.getToken()) {
      apiUser.userInfo().then((res) => {
        if (res.data.code === 0) {
          // this.form.orderContactsPhone = res.data.result.phone;
        }
      });
      apiOrder.findContacts().then((res) => {
        if (res.data.code === 0) {
          // this.form.orderContacts = res.data.result;
        }
      });
    }
  },
  // 初始化入口
  init(options) {
    // 原始type 1: 单独购买，2：拼团，3：未选择类型, 4: 参与别人的拼团
    // 后台type代表 组团模式(0，直接玩， 1，拼玩，2，直接参团，3，拼团)
    let groupType;
    if (Number(options.type) === 1) {
      groupType = 0; // 0，直接玩
    } else if (Number(options.type) === 2) {
      groupType = 1; // 1，拼玩
    }
    this.setData({
      form: {
        orderContacts: null,
        orderContactsPhone: null,
        specialNeeds: "",
        // productId: Number(options.id),
        productId: 14,
        // travelDate: options.date,
        groupType: groupType,
        travelDate: '2018-07-27',
        orderType: 1,
      },
      // admit: Number(options.admit),  
      // child: Number(options.child),
      // type: Number(options.type),
      // orderid: options.orderid,
      admit: Number(2),
      child: Number(0),
      type: Number(2),
      orderid: 1,
    })
    // this.productItem(Number(options.id));
    this.productItem(14)
    // this.TouristList(); // 出行人列表
    // this.getTypePrice(); // 价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init(options);
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