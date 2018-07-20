// components/count-down-time/count-down-time.js

Component({
  properties: {
    time: {
      type: String,
      value: "",
    },
  },

  /**
   * 页面的初始数据
   */
  data: {
    h: null,
    m: null,
    s: null,
    ms: null,
    timer: null,
  },

  ready() {
    this.startTime();
    // 定时调用
  },
  methods: {
    startTime() {
      let that = this;
      that.setData({
        timer: setInterval(function() {
          if (that.data.time) {
            const ntime = that.data.time.replace(/-/g, '/');
            const now = (new Date()).getTime();
            const end = (new Date(ntime)).getTime() + (1000 * 60 * 60 * 24);
            const leftTime = end - now;
            let h = '00';
            let m = '00';
            let s = '00';
            let ms = '0';
            if (leftTime >= 0) {
              h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
              m = Math.floor(leftTime / 1000 / 60 % 60);
              s = Math.floor(leftTime / 1000 % 60);
              ms = Math.floor((leftTime % 1000 / 100));
              if (s < 10) {
                s = `0${s}`;
              }
              if (m < 10) {
                m = `0${m}`;
              }
              if (h < 10) {
                h = `0${h}`;
              }
            } else {
              clearInterval(that.data.timer);
            }
            that.setData({
              h,
              m,
              s,
              ms
            })
          }
        }, 100)
      }) // 定时调用
    },
  },
})