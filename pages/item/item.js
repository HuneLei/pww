var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

import apiHome from '../../api/home';
import apiOrder from '../../api/order';
import convert from '../../utils/convert';

Page({
  data: {
    backshow: false,
    tabs: ["产品特色", "行程详情", "费用说明", "预定须知"],
    sysHeight: '',
    activeIndex: 0,
    sliderOffset: 0,
    intoView: '',
    featureList: ['product-feature', 'trip-item', 'cost', 'destine'],
    sliderOffset: 0,
    sliderLeft: 0,
    ID: null,
    loading: false,
    productItem: {}, // 产品
    collageList: [],
    allCollageList: [], // 更多正在拼团
    showHideOnBlur: false,
    showHideCollage: false, // 去拼团
    moreCollageList: {
      headImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
      name: '陈圣贤',
      num: 1,
      time: '20:12:38',
    },
    timeList: [], // 出行时间
    content: '<p>风景优美</p>',
    tripItemData: [],
    showMoreDate: false,
    showCollageItem: {
      id: null,
      headImg: null,
      name: null,
      num: null,
      time: null,
      isMarst: false,
    },
    shopLogo: null, // 店铺头像
    swiperImg: [], // 轮播图
    singlePrice: null, // 底部单独购买价格
    groupPrice: null, // 底部团购价格
    selectedPriceItem: null,
    priceTemplateId: null,
    reserveTemplateId: null,
    priceTemplateOne: null, // 费用模板-费用包含
    priceTemplateTwo: null, // 费用模板-费用包含
    reserveTemplateOne: null, // 须知模板-预订须知
    reserveTemplateTwo: null, // 须知模板-签证信息
    ID: null,
    collageNum: null, // 正在拼团人数
    type: null,
    allPrice: 0, // 总价
    allSinglePrice: 0, // 单人总价
    allGroupPrice: 0, // 拼团总价
    groupForm: {
      productId: null,
      status: null,
      beginTime: null,
      beginTendTimeime: null
    },
    reserveTime: null, // 价格日历预先选择好的日期
    spllOrderID: null, // 直接拼团的id
    weekSelectDate: null, // 选中的周
    url: null,
    dateorderid: null, // 价格日历中的订单标识
    // templateId: null
    templateId: 6
  },
  // tab切换
  tabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      intoView: this.data.featureList[e.currentTarget.id]
    });
  },
  // 产品详情
  dataItem(id) {
    apiHome.item(id, 1).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result;
        // document.title = res.data.result.name || '产品详情';
        data.productFeature = data.productFeature.replace(/\<img/gi, '<img style="max-width:100%;height:auto"'); // 使图片自适应
        this.setData({
          productItem: res.data.result,
          priceTemplateId: res.data.result.priceTemplateId,
          reserveTemplateId: res.data.result.reserveTemplateId,
          shopLogo: this.toHeadImg(res.data.result.shopLogo), // 店铺头像
          swiperImg: this.toArr(res.data.result.logo), // 轮播图
          singlePrice: res.data.result.minSinglePrice, // 底部单独购买价格
          groupPrice: res.data.result.minGroupSinglePrice, // 底部单独购买价格
          productFeature: data.productFeature,
        })
        // 微信自定义分享
        // const link = `${getCurrentPages().route}?id=${this.data.ID}`;
        this.CollageingFn(); // 正在拼团
        // console.log(link);
        // const productImg = this.toHeadImg(res.data.result.logo);
        // this.wxShare('这一次,我想和你一起出去玩', this.data.productItem.name, link, productImg);
      }
    });
  },
  // 正在拼团-滚动
  CollageingFn() {
    this.data.collageList = [];
    apiOrder.listGroup(this.data.groupForm).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result;
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].groupMemberIds.indexOf(this.data.userInfo.userId) > -1) {
            data[i].isMarst = true;
          } else {
            data[i].isMarst = false;
          }
        }
        this.setData({
          collageNum: res.data.result.length || 0,
        })
        let collList = [];
        for (let i = 0; i < data.length; i += 2) {
          collList.push(data.slice(i, i + 2))
        }
        this.setData({
          collageList: collList
        })
        // this.calendarListFn(7, 'week'); // 周价格表
        this.calendarListFn(this.data.ID, 'week'); // 周价格表
      }
    });
  },
  // 行程信息
  agendaItemFn(id, type) {
    apiHome.agendaItem(id, type).then((res) => {
      if (res.data.code === 0) {
        let dataList = res.data.result;
        for (let i = 0; i < dataList.length; i += 1) {
          dataList[i].showDetailed = false;
          dataList[i].details = dataList[i].details.replace(/\<img/gi, '<img style="max-width:100%;height:auto"'); // 使图片自适应
        }
        this.setData({
          tripItemData: dataList
        });
      }
    });
  },
  // 费用说明
  priceTemplateFn(templateId) {
    apiHome.explain(templateId).then((res) => {
      let priceTemplateOne = this.changeText(res.data.result.explainOne);
      let priceTemplateTwo = this.changeText(res.data.result.explainTwo)
      if (res.data.code === 0) {
        this.setData({
          priceTemplateOne,
          priceTemplateTwo,
        })
        this.reserveTemplateFn(this.data.reserveTemplateId); // 须知模板
      }
    });
  },
  // 周价格表
  calendarListFn(id, types) {
    const form = {
      productId: id,
      type: types,
    };
    apiHome.calendarList(form).then((res) => {
      if (res.data.code === 0) {
        let timeArry = res.data.result;
        for (let i = 0; i < timeArry.length; i += 1) {
          let ndate = this.toWeekDate(timeArry[i].date);
          timeArry[i].ndate = ndate;
        }
        this.setData({
          timeList: timeArry
        });
        this.priceTemplateFn(this.data.priceTemplateId); // 费用模板
      }
    });
  },
  // 须知说明
  reserveTemplateFn(templateId) {
    apiHome.explain(templateId).then((res) => {
      if (res.data.code === 0) {
        this.setData({
          reserveTemplateOne: this.changeText(res.data.result.explainOne),
          reserveTemplateTwo: this.changeText(res.data.result.explainTwo),
        })
        // this.agendaItemFn(7) // 行程信息
        this.agendaItemFn(this.data.ID) // 行程信息
      }
    });
  },
  changeText(val) {
    const arr = val.split('\n');
    let arrItems = null;
    for (let i = 0; i < arr.length; i += 1) {
      arrItems = arrItems ? `${arrItems}<p>${arr[i]}</p>` : `<p>${arr[i]}</p>`;
    }
    return arrItems;
  },
  // 轮播图转换
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
  // 获取头像
  toHeadImg(arr) {
    let url = null;
    const imgArr = convert.convertImgArr(arr);
    if (imgArr[0].url) {
      url = imgArr[0].url;
    }
    return url;
  },
  // 点击出行日期
  selectDatePrice(e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      weekSelectDate: item.date,
      singlePrice: item.singlePrice,
      groupPrice: item.groupSinglePrice,
      reserveTime: convert.convertDate(item.date),
    });
  },
  // 点击底部按钮 type：1: 单独购买, 2:拼团 4: 参与拼团
  goBuy(e) {
    console.log(e.currentTarget.dataset.type)
    let buyType = e.currentTarget.dataset.type
    this.data.allPrice = 0;
    wx.navigateTo({
      url: '/pages/date/date?id=' + this.data.ID + '&shopPhone=' + this.data.productItem.shopPhone + '&shopId=' + this.data.productItem.shopId + '&type=' + buyType + '&reserveTime=' + this.data.reserveTime + '&dateorderid=' + this.data.dateorderid,
    })
    // this.type = type;
  },
  toWeekDate(str) {
    return convert.weekDate(str);
  },
  // 更多拼团
  moreCollage: function() {

  },

  //返回首页
  backHome: function() {
    wx.switchTab({
      url: '/pages/homes/homes',
    })
  },
  // 滚动触发
  bindscroll(e) {
    if (e.detail.scrollTop > 500) {
      this.setData({
        backshow: true
      })
    } else {
      this.setData({
        backshow: false
      })
    }
  },
  // 回到顶部
  backhead() {
    this.setData({
      intoView: 'top',
    })
  },

  // 跟多日期
  toMoreDate() {
    wx.navigateTo({
      url: '/pages/date/date?id=' + this.data.ID + '&shopPhone=' + this.data.productItem.shopPhone + '&shopId=' + this.data.productItem.shopId + '&type=' + -1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    options.id = 23;
    if (options.dateorderid) {
      dateorderid: options.dateorderid
    }
    if (options.id) {
      this.setData({
        ID: options.id,
        // ID: 7,
        userInfo: {},
        groupForm: {
          productId: options.id,
          // productId: 7,
          status: 1,
          beginTime: convert.groupDateSlot().old,
          beginTendTimeime: convert.groupDateSlot().now,
        },
        sysHeight: `height: ${wx.getStorageSync('SystemInfo').windowHeight}px;`, // 计算主体部分高度,单位为px
      })
      var that = this;
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          });
        }
      });
      this.dataItem(options.id);
      // this.dataItem(7);
      // this.CollageingFn(); // 正在拼团
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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