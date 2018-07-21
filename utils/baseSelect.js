/**
 * 公共下拉选择条件
 */

// 排序下拉选择
const sortListOptions = [
  {
    value: 0,
    label: '综合排序',
  },
  {
    value: 1,
    label: '近期销量最高',
  },
  {
    value: 2,
    label: '产品评分最高',
  },
  {
    value: 3,
    label: '价格从高到低',
  },
  {
    value: 4,
    label: '价格从低到高',
  },
];

// 证件类型
const idCardTypeOption = [
  {
    key: 0,
    value: '身份证',
  },
  {
    key: 1,
    value: '护照',
  },
  {
    key: 2,
    value: '港澳通行证',
  },
  {
    key: 3,
    value: '台湾通行证',
  },
  {
    key: 4,
    value: '回乡证',
  },
  {
    key: 5,
    value: '台胞证',
  },
  {
    key: 6,
    value: '军官证',
  },
];

// 性别
const sexOption = [
  {
    key: 0,
    value: '男',
  },
  {
    key: 1,
    value: '女',
  },
];

// 性别
const sex = {
  0: '女',
  1: '男',
};

// 产品类别
const travalType = {
  1: '跟团游',
  2: '自由行',
  3: '周边游',
  4: '一日游',
};

// 产品类别-颜色
const travalTypeColor = {
  1: 'list-img-tip tip-g',
  2: 'list-img-tip tip-z',
  3: 'list-img-tip tip-b',
  4: 'list-img-tip tip-y',
};

// 申请退款原因
const retreatReasonOption = [
  {
    key: 1,
    value: '特殊原因，行程有变',
  },
  {
    key: 2,
    value: '信息输入有误',
  },
  {
    key: 3,
    value: '更换旅游线路',
  },
  {
    key: 4,
    value: '其他',
  },
];

// 申请退款原因 - 显示
const retreatReasonLabel = {
  1: '特殊原因，行程有变',
  2: '信息输入有误',
  3: '更换旅游线路',
  4: '其他',
};

// 支付状态
const payStatus = {
  0: '待支付',
  1: '已支付',
  2: '支付失败',
};

// 订单状态
const orderStatus = {
  0: '待支付',
  1: '待拼团',
  2: '待出行',
  3: '待评价',
  4: '已评价',
  5: '已取消',
  6: '拼团失败',
};

// 售后状态 0：没有售后
const serviceStatus = {
  1: '申请退款，商家处理中', // 退款申请中
  2: '同意退款',
  3: '驳回退款',
  4: '撤销申请',
  5: '退款中',
  6: '已退款',
};

// 订单类型
const orderType = {
  1: '旅游',
  2: '酒店',
  3: '门票',
  4: '机票',
};

// 订单状态文字显示 - 列表
const orderTypeTip = {
  10: '待付款', // 旅游
  11: '待拼团',
  12: '待出行',
  13: '待评价',
  14: '已评价',
  15: '已取消',
  16: '拼团失败',
  30: '未出票', // 门票
  31: '出票中',
  32: '已出票',
  33: '已出票',
  34: '已评价',
  35: '已取消',
  36: '拼团失败',
};

export default {
  sortListOptions,
  idCardTypeOption,
  sexOption,
  sex,
  travalType,
  travalTypeColor,
  retreatReasonOption,
  retreatReasonLabel,
  payStatus,
  orderStatus,
  serviceStatus,
  orderType,
  orderTypeTip,
};
