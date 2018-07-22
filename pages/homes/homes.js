import apiHome from '../../api/home';
import convert from '../../utils/convert';

Page({
  data: {
    page: 0,
    size: 10,
    toView: '',
    wheight: "",
    backshow: false,
    requestLoading: false, //"上拉加载"的变量，默认false，隐藏
    requestLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    dataList: [],
    baseList: [{
      url: '',
      img: '../../assets/img/banner/banner01.png',
    },
    {
      url: '',
      img: '../../assets/img/banner/banner02.png',
    },
    {
      url: '',
      img: '../../assets/img/banner/banner03.png',
    },
    {
      url: '',
      img: '../../assets/img/banner/banner04.png',
    },
    ],
    tabList: [{
      icon: 'icon iconfont icon-zhoubianyou',
      iconbg: 'a-bg',
      title: '跟团游',
      type: 1,
    },
    {
      icon: 'icon iconfont icon-guonei',
      iconbg: 'g-bg',
      title: '自由行',
      type: 2,
    },
    {
      icon: 'icon iconfont icon-chanpinfenleizhoubianyou',
      iconbg: 'l-bg',
      title: '周边游',
      type: 3,
    },
    {
      icon: 'icon iconfont icon-lvyou7',
      iconbg: 'h-bg',
      title: '一日游',
      type: 4,
    },
    ],
  },
  // tap链接
  goProductList(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/follows/follows?type=' + type
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
      toView: 'page_home',
    })
  },
  // 为你推荐产品列表
  infiniteHandler() {
    apiHome.homelist(this.data.page, this.data.size).then((res) => {
      if (res.data.code === 0) {
        const data = res.data.result.content;
        if (data.length > 0) {
          let length = Object.keys(data).length;
          for (let i = 0; i < length; i++) {
            data[i].logoUrl = this.toArr(data[i].logo)
          }
          this.setData({
            page: this.data.page + 1,
            dataList: this.data.dataList.concat(data),
            requestLoading: false,
            requestLoadingComplete: false
          })
        } else {
          this.setData({
            requestLoading: false,
            requestLoadingComplete: true
          });
        }
      }
    })
  },

  // 页面上拉触底事件的处理函数
  bindscrolltolower() {
    if (!this.data.requestLoadingComplete) {
      this.setData({
        requestLoading: true,
        requestLoadingComplete: false
      });
    }
    this.infiniteHandler();
  },

  // 取出图片地址
  toArr(arr) {
    let url = null;
    if (convert.convertImgArr(arr)[0]) {
      url = convert.convertImgArr(arr)[0].url;
    }
    return url;
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.infiniteHandler();
    this.setData({
      wheight: `height: ${wx.getStorageSync('SystemInfo').windowHeight}px;`,
    })
  },
})