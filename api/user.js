/**
 * 用户 api
 */

import api from './index';
import config from '../config';

const path = {
  validatePhone: '/validate/phone',
  bind: '/binding',
  updatePhone: '/update/phone',
  userInfo: '/mobile/user/info',
  touristList: '/mobile/tourist/list',
  touristItem: '/mobile/tourist/item',
  touristCreate: '/mobile/tourist/create',
  touristUpdate: '/mobile/tourist/update',
  touristDelete: '/mobile/tourist/delete',
};

// 判断手机号是否已被使用
const validatePhone = (phone) => api.get(`${config.getAuthServer()}${path.validatePhone}`, {
  params: {
    phone,
  },
});


// 绑定手机号
const bind = (phone, code, userId) => api.get(`${config.getAuthServer()}${path.bind}`, {
  params: {
    phone,
    code,
    userId,
  },
});

// 修改手机号
const updatePhone = (phone, code, userId) => api.get(`${config.getAuthServer()}${path.updatePhone}`, {
  params: {
    phone,
    code,
    userId,
  },
});

// 个人信息
const userInfo = () => api.get(path.userInfo);

// 常用联系人-列表
const touristList = () => api.get(path.touristList);

// 常用联系人-详情
const touristItem = (id) => api.get(path.touristItem, {
  params: {
    id,
  },
});

// 新増常用联系人
const touristCreate = (form) => api.post(path.touristCreate, {
  birthDate: form.birthDate,
  firstName: form.firstName,
  idCardNo: form.idCardNo,
  idCardType: form.idCardType,
  lastName: form.lastName,
  name: form.name,
  phone: form.phone,
  sex: form.sex,
  userId: form.userId,
  validDate: form.validDate,
});

// 编辑常用联系人
const touristUpdate = (form) => api.post(path.touristUpdate, {
  birthDate: form.birthDate,
  firstName: form.firstName,
  idCardNo: form.idCardNo,
  idCardType: form.idCardType,
  lastName: form.lastName,
  name: form.name,
  phone: form.phone,
  sex: form.sex,
  userId: form.userId,
  validDate: form.validDate,
}, {
  params: {
    id: form.id,
  },
});

// 删除常用联系人
const touristDelete = (id) => api.get(path.touristDelete, {
  params: {
    id,
  },
});

export default {
  validatePhone,
  bind,
  updatePhone,
  userInfo,
  touristList,
  touristItem,
  touristCreate,
  touristUpdate,
  touristDelete,
};