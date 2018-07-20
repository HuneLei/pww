Component({
  externalClasses: ['i-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    full: {
      type: Boolean,
      value: false
    },
    thumb: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    extra: {
      type: String,
      value: ''
    },
    money: {
      type: String,
      value: ''
    },
    times: {
      type: Number,
      value: 0
    }
  }
});
