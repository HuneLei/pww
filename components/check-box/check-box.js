Component({
  properties: {
    key: { // key值
      type: String,
      value: ''
    },
    value: { // value值
      type: String,
      value: ''
    },
    num: { //几个一排
      type: Number,
      value: 5,
    },
    tap_open: { //点击后样式开关
      type: Boolean,
      value: false,
    },
    hover_open: {
      type: Boolean,
      value: null
    },
    set_hover: { //自定义Class
      type: String,
      value: ''
    },
    set_class: { //自定义Class
      type: String,
      value: null
    },
    tap_class: { //点击自定义Class
      type: String,
      value: 'tap_class'
    },
    datalist: { //传入数据 name,value,checked
      type: Object,
      value: null
    }
  },

  data: {},

  methods: {
    selecttap(e) {
      let index = e.currentTarget.dataset.index;
      let datalist = this.data.datalist;
      datalist[index].checked = !datalist[index].checked;
      this.setData({
        datalist,
      })
    },
  },
})