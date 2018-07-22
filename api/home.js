/**
 * 主页文件的 api
 */

import api from './index';

const path = {
  list: '/mobile/product/list',
  item: '/mobile/product/item',
  calendarList: '/mobile/product/price/calendar/list', // 价格日历
  agendaItem: '/mobile/product/traval/agenda/item', // 行程信息(费用/须知)
  explain: '/mobile/product/explain', // 费用说明/须知说明
  discovery: '/mobile/product/discovery',
};

// 列表1
const list = (page, size, city, travalType) => api.get(path.list, {
  page,
  size,
  city,
  travalType, // 产品类型 1：一日游 2：跟团游 3：自由行 4：周边游
});

// 列表2
const homelist = (page, size) => api.get(path.list, {
    page,
    size,
});


// 详情
const item = (id, type) => api.get(path.item, {
  id,
  type, // type 为1  会添加数据 其他的就不会
});

// 价格日历
const calendarList = (form) => api.get(path.calendarList, {
    productId: form.productId,
    type: form.type, // type 查询方式（week:周,month:月,march:最近三月）day 一天
    year: form.year,
    month: form.month,
    date: form.date,
});

// 行程信息
const agendaItem = (productId) => api.get(path.agendaItem, {
    productId,
});

// 费用说明/须知说明
const explain = (templateId) => api.get(path.explain, {
    templateId,
});

// 发现
const discovery = () => api.get(path.discovery);

export default {
  list,
  item,
  calendarList,
  agendaItem,
  explain,
  discovery,
  homelist,
};