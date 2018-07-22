// pages/date/data.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
import apiHome from '../../api/home';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["7月", "8月", "9月"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    date: [],
    weeks: [],
    pagetype: 'day',
    cYear: null, // 当前年
    cMonth: null, // 当前月份
    sYear: null, // 选中年
    sMonth: null, // 选中月份
    monthNum: [],
    selectNum: -1,
    childrenMore: "",
    warnShow: false,
    amount: 0,
    handlevalue1: 0,
    handlevalue2: 0,
    handadult: {
      stockqty: 0,
      singlePrice: 0,
      groupSinglePrice: 0,
      groupKidsPrice: 0,
      kidsPrice: 0,
    },
  },
  warnView: function() {
    this.setData({
      warnShow: !this.data.warnShow,
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.dataset.index
    });
    this.calendarListFn(e.currentTarget.dataset.id);
  },
  submitbtn: function() {
    if (!this.data.amount) return
    console.log(123)
  },
  // 产品详情
  dataItem() {
    apiHome.item(14, 2).then((res) => {
      if (res.data.code === 0) {
        this.setData({
          childrenMore: res.data.result.childrenMore || '暂无'
        })
      }
    });
  },
  marchDate() {
    this.setData({
      cYear: (new Date()).getFullYear(),
      cMonth: (new Date()).getMonth() + 1,
    })
    const form = {
      productId: 14,
      type: 'march',
      year: this.data.cYear,
      month: this.data.cMonth,
    };
    apiHome.calendarList(form).then((res) => {
      if (res.data.code === 0) {
        let nomthNum = [];
        const data = res.data.result;
        for (let i = 0; i < data.length; i += 1) {
          const nstr = data[i].date.replace(/-/g, '/');
          const date = new Date(nstr);
          const y = date.getFullYear(); // 年
          const m = date.getMonth() + 1; // 月
          const a = {
            year: y,
            month: m,
            price: data[i].minPrice,
          };
          nomthNum.push(a);
        }
        this.setData({
          nomthNum,
        });
        this.tapCenter()
        this.calendarListFn(7);
      }
    });
  },
  //数量变化
  handleChangeOne({
    detail
  }) {
    this.setData({
      handlevalue1: detail.value,
      amount: this.data.handadult.kidsPrice * this.data.handlevalue2 + this.data.handadult.singlePrice * detail.value
    })
  },
  handleChangeTwo({
    detail
  }) {
    this.setData({
      handlevalue2: detail.value,
      amount: this.data.handadult.kidsPrice * detail.value + this.data.handadult.singlePrice * this.data.handlevalue1
    })
  },
  // tap标签居中显示
  tapCenter() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.nomthNum.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.nomthNum.length * that.data.activeIndex
        });
      }
    });
  },
  // 月价格日历
  calendarListFn(months) {
    const form = {
      productId: 14,
      type: 'month',
      year: 2018,
      month: months,
    };
    let that = this;
    apiHome.calendarList(form).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result;
        this.dateData(data, form.month, that)
      }
      this.dataItem();
    });
  },

  // 点中选择事件
  sureBind: function(e) {
    let indexs = e.currentTarget.dataset.indexs;
    let stockqty = e.currentTarget.dataset.stockqty;
    if (!stockqty) return
    if (this.data.selectNum == indexs) indexs = -1;
    this.setData({
      selectNum: indexs,
      handadult: {
        stockqty: indexs == -1 ? 0 : this.data.date[0][indexs].stockqty,
        singlePrice: indexs == -1 ? 0 : this.data.date[0][indexs].singlePrice,
        groupSinglePrice: indexs == -1 ? 0 : this.data.date[0][indexs].groupSinglePrice,
        groupKidsPrice: indexs == -1 ? 0 : this.data.date[0][indexs].groupKidsPrice,
        kidsPrice: indexs == -1 ? 0 : this.data.date[0][indexs].kidsPrice,
      },
      amount: this.data.date[0][indexs].kidsPrice * this.data.handlevalue2 + this.data.date[0][indexs].singlePrice * this.data.handlevalue1
    })

  },

  dateData: function(res, mon, that) {
    console.log('res', res)
    let dataAll = [] //总日历数据
    let dataAll2 = [] //总日历数据
    let dataMonth = [] //月日历数据
    let date = new Date //当前日期
    let year = date.getFullYear() //当前年
    let week = date.getDay(); //当天星期几
    let weeks = []
    let month = date.getMonth() + 1 //当前月份
    let day = date.getDate() //当天
    let daysCount = 30 //一共显示多少天
    let dayscNow = 0 //计数器
    let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] //月份列表
    let nowMonthList = [] //本年剩余月份
    that.setData({
      date: [],
      weeks: []
    })
    for (let i = month; i < 13; i++) {
      nowMonthList.push(i)
    }
    let yearList = [year] //年份最大可能
    for (let i = 0; i < daysCount / 365; i++) {
      yearList.push(year + i + 1)
    }
    let leapYear = function(Year) { //判断是否闰年 
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
      } else {
        return (false);
      }
    }
    let MonthscNow = 0
    for (let i = 0; i < yearList.length; i++) { //遍历年
      if (MonthscNow > 0) break;
      let mList
      if (yearList[i] == year) { //判断当前年份
        mList = nowMonthList
      } else {
        mList = monthList
      }
      let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      let t_days_thisYear = []
      if (yearList[i] == year) {
        for (let m = 0; m < nowMonthList.length; m++) {
          t_days_thisYear.push(t_days[mList[m] - 1])
        }
        t_days = t_days_thisYear
      } else {
        t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      }
      for (let j = 0; j < mList.length; j++) { //循环月份
        if (mList[j] != mon) continue;
        dataMonth = []
        for (let k = 0; k < t_days[j]; k++) { //循环每天
          //   dayscNow++
          let nowData
          //   if (dayscNow < daysCount) { //如果计数器没满
          let days = k + 1
          if (days < 10) {
            days = "0" + days
          }
          if (yearList[i] == year && mList[j] == month) { //判断当年当月
            nowData = {
              year: yearList[i],
              month: mList[j],
              day: k + 1 == day ? '今天' : k + 1,
              date: yearList[i] + "" + mList[j] + days,
              selected: 0,
              re: yearList[i] + "-" + mList[j] + "-" + days,
              outday: k < day,
              groupSinglePrice: res[k].groupSinglePrice,
              singlePrice: res[k].singlePrice,
              stockqty: res[k].stockQty,
              groupKidsPrice: res[k].groupKidsPrice,
              kidsPrice: res[k].kidsPrice
            }
            dataMonth.push(nowData)
            if (k == 1) {
              let date = new Date(yearList[i] + "-" + mList[j] + "-" + k)
              let weekss = date.getDay() //获取每个月第一天是周几
              weeks.push(weekss)
            }
          } else { //其他情况
            nowData = { //组装自己需要的数据
              year: yearList[i],
              month: mList[j],
              day: k + 1,
              date: yearList[i] + "" + mList[j] + days,
              selected: 0,
              re: yearList[i] + "-" + mList[j] + "-" + days,
              groupSinglePrice: res[k].groupSinglePrice,
              singlePrice: res[k].singlePrice,
              stockqty: res[k].stockQty,
              groupKidsPrice: res[k].groupKidsPrice,
              kidsPrice: res[k].kidsPrice
            }
            dataMonth.push(nowData)
            if (k == 0) {
              let date = new Date(yearList[i] + "-" + mList[j] + "-" + k + 1)
              let weekss = date.getDay() //获取每个月第一天是周几
              weeks.push(weekss)
            }
          }
        }
        dataAll.push(dataMonth)
        MonthscNow++
        if (MonthscNow > 0) break;
      }
    }
    for (let i = 0; i < dataAll.length; i++) {
      if (dataAll[i].length != 0) {
        dataAll2.push(dataAll[i]);
      }
    }
    console.log('dataAll2', dataAll2)
    that.setData({
      date: dataAll2,
      weeks: weeks
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.marchDate()
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