import baseSelect from '../../utils/baseSelect.js'

Component({
  properties: {
    img: {
      type: String,
      value: null,
    },
    title: {
      type: String,
      value: null,
    },
    date: {
      type: String,
      value: null,
    },
    num: {
      type: String,
      value: null,
    },
    admit: {
      type: Number,
      value: 0,
    },
    child: {
      type: Number,
      value: 0,
    },
    status: {
      type: String,
      value: null,
    },
    id: {
      type: String,
      value: null,
    },
  },

  data: {
    payStatus: baseSelect.payStatus,
  },

  methods: {
    toProductItem() {
      this.$router.push(`/ProductListItem?id=${this.id}`);
    },
  },
})