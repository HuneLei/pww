import baseSelect from '../../utils/baseSelect.js'
import convert from '../../utils/convert.js'
import apiOrder from '../../api/order.js'

Component({
  properties: {
    status: {
      type: Number,
      value: null,
    },
    commentStatus: {
      type: Number,
      value: null,
    },
    serviceStatus: {
      type: Number,
      value: null,
    },
    afresh: { // 重新加载
      type: Number,
      value: null,
    },
    selectTab: {
      type: Number,
      value: null,
    },
    dataList: {
      type: Array,
      value: [],
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    current_scroll: 'tab1',
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

  methods: {},
  /**
   * 生命周期函数--监听页面加载
   */
  ready: function() {
  },
})