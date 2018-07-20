// components/Info-list/info-list.js
import baseSelect from '../../utils/baseSelect';

Component({
  properties: {
    productList: {
      type: Object,
      value: null,
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    travalType: baseSelect.travalType,
    travalTypeColor: baseSelect.travalTypeColor,
  },

  methods: {
    // 推荐链接
    goProductItem(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/item/item?id=' + id
      })
    },
  },
})