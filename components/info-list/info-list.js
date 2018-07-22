// components/Info-list/info-list.js
import baseSelect from '../../utils/baseSelect';

Component({
  properties: {
    productList: {
      type: Object,
      value: null,
    },
  },
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