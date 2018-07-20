/**
 * 江苏摇铃网络科技有限公司，版权所有。- 订单
 */

import api from './index';

const path = {
  listGroup: '/mobile/order/list/group',
  list: '/mobile/order/list',
  create: '/mobile/order/create',
  update: '/mobile/order/update',
  item: '/mobile/order/item',
  applyRefund: '/mobile/order/apply/refund',
  applyDetail: '/mobile/order/apply/detail',
  revokeApply: '/mobile/order/revoke/apply',
  confirmConsume: '/mobile/order/confirm/consume',
  findContacts: '/mobile/order/find/contacts',
};

// 正在拼团
const listGroup = (form) => api.get(path.listGroup, {
  productId: form.productId,
  status: form.status, // 1表示正在拼团
  beginTime: form.beginTime,
  beginTendTimeime: form.beginTendTimeime,
});

// 订单列表
const list = (page, size, status, commentStatus, serviceStatus) => api.get(path.list, {
  page,
  size,
  // status, // 订单状态(1:待拼团2:待出游3:出游中4:已归来 5: 拼团失败, 6：确认消费)
  // commentStatus, // 评论状态(0,未评，1，已评，2，追加评论)
  // serviceStatus, // 售后状态(0:未申请 1:退团申请中2：同意退款3：驳回退款 4：撤销申请 5：已退款)
});

// 填写订单
const create = (form) => api.post(path.create, {
  commentStatus: form.commentStatus, //  评价状态（0,未评，1，已评，2，追加评论）不用传
  groupMaster: form.groupMaster, // 不用传
  groupMemberIds: form.groupMemberIds, // 不用传
  groupMinOrder: form.groupMinOrder,
  groupType: form.groupType, // 组团模式(0，直接玩， 1，拼玩，2，直接参团，3，拼团) ,
  orderContacts: form.orderContacts,
  orderContactsPhone: form.orderContactsPhone,
  orderTravalTouristFormList: form.orderTravalTouristFormList,
  orderType: form.orderType, // 1：旅游， 2：酒店， 3：门票，4：机票
  price: form.price,
  productId: form.productId,
  supplierId: form.supplierId,
  travelDate: form.travelDate,
});

// 直接拼单
const update = (form) => api.post(path.update, {
  commentStatus: form.commentStatus,
  groupMaster: form.groupMaster,
  groupMemberIds: form.groupMemberIds,
  groupMinOrder: form.groupMinOrder,
  groupType: form.groupType,
  orderContacts: form.orderContacts,
  orderContactsPhone: form.orderContactsPhone,
  orderTravalTouristFormList: form.orderTravalTouristFormList,
  orderType: form.orderType,
  price: form.price,
  productId: form.productId,
  supplierId: form.supplierId,
  travelDate: form.travelDate,
}, {
  params: {
    id: form.id,
  },
});

// 详情
const item = (id) => api.get(path.item, {
  params: {
    id,
  },
});

// 申请退款
const applyRefund = (form) => api.post(path.applyRefund, {
  retreatReason: form.retreatReason,
  detailedDescription: form.detailedDescription,
  phone: form.phone,
}, {
  params: {
    id: form.id, // 订单id
    type: form.type, // create创建申请 update修改申请 reCreate重新申请
  },
});

// 退款详情
const applyDetail = (id) => api.get(path.applyDetail, {
  params: {
    id,
  },
});

// 撤销申请
const revokeApply = (id) => api.get(path.revokeApply, {
  params: {
    id,
  },
});

// 确认消费
const confirmConsume = (id) => api.get(path.confirmConsume, {
  params: {
    id,
  },
});

// 获取最后一条订单的联系人
const findContacts = () => api.post(path.findContacts);

export default {
  listGroup,
  list,
  create,
  update,
  item,
  applyRefund,
  applyDetail,
  revokeApply,
  confirmConsume,
  findContacts,
};