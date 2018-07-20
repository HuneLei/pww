// components/trip-item/trip-item.js
import baseSelect from '../../utils/baseSelect';

Component({
  properties: {
    tripItemData: {
      type: Object,
      value: null,
    },
  },
  /**
   * 页面的初始数据
   */
  data: {},

  methods: {
    showDetailFn(e) {
      let index = e.currentTarget.dataset.index;
      let dataList = this.data.tripItemData
      dataList[index].showDetailed = !dataList[index].showDetailed;
      this.setData({
        tripItemData: dataList
      })
    },
  },
})