import api from './index';

const path = {
  list: '/manage/provinces/city/list/date',
};

// 查询出所有的市
const list = (city) => api.get(path.list, {
  city,
});

export default {
  list,
};