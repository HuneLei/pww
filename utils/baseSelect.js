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

// 支付状态
const payStatus = {
  0: '待支付',
  1: '已支付',
  2: '支付失败',
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

export default {
  sortListOptions,
  idCardTypeOption,
  sexOption,
  sex,
  payStatus,
  travalType,
  travalTypeColor,
  retreatReasonOption,
  retreatReasonLabel,
};
