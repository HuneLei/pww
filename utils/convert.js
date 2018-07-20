// 星期
const weekName = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
};

// 图像：字符串->数组
const convertImgArr = (str) => {
  if (str) {
    return JSON.parse(str);
  }
  return [];
};

// 字符串->数组
const stringToArr = (str) => {
  let ret = [];
  if (str) {
    ret = str.split(',');
  }
  return ret;
};

const weekDate = (str) => {
  if (str) {
    const nstr = str.replace(/-/g, '/');
    const date = new Date(nstr);
    const a = date.getDay(); // 周几
    const m = date.getMonth() + 1; // 月
    const d = date.getDate(); // 日
    return `${m}/${d} ${weekName[a]}`;
  }
  return '';
};

// 根据身份证计算出生日期、年龄、性别
const calculateCard = (str) => {
  const ret = {
    birthday: null,
    age: null,
    gender: null,
  };
  const len = str.length;
  if (len === 15 || len === 18) {
    // 计算出生日期 - birthday
    if (len === 18) {
      ret.birthday = `${str.substr(6, 4)}/${str.substr(10, 2)}/${str.substr(12, 2)}`;
    }
    if (len === 15) {
      ret.birthday = `19${str.substr(6, 2)}/${str.substr(8, 2)}/${str.substr(10, 2)}`;
    }
    // 计算年龄 - age
    const ageVal = new Date(ret.birthday);
    const nowDateTime = new Date();
    ret.age = nowDateTime.getFullYear() - ageVal.getFullYear();
    // 月、天的差异
    if (nowDateTime.getMonth() < ageVal.getMonth() ||
     (nowDateTime.getMonth() === ageVal.getMonth() && nowDateTime.getDate() < ageVal.getDate())) {
      ret.age -= 1;
    }
    // 计算性别 - gender
    ret.gender = (parseInt(str.substr(16, 1), 10) % 2 === 1) ? '男' : '女';
  }
  return ret;
};

// 根据出生日期计算年龄
const dateToAge = (str) => {
  if (str) {
    let age = null;
    const nstr = str.replace(/-/g, '/');
    const ageVal = new Date(nstr);
    const nowDateTime = new Date();
    age = nowDateTime.getFullYear() - ageVal.getFullYear();
    if (nowDateTime.getMonth() < ageVal.getMonth() ||
     (nowDateTime.getMonth() === ageVal.getMonth() && nowDateTime.getDate() < ageVal.getDate())) {
      age -= 1;
    }
    return age;
  }
  return 0;
};

// 格式化日期
const convertDate = (olddate) => {
  let ret = null;
  if (olddate) {
    const date = (new Date(olddate.replace(/-/g, '/')));
    const y = date.getFullYear();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    if (m.length < 2) {
      m = `0${m}`;
    }
    if (d.length < 2) {
      d = `0${d}`;
    }
    ret = `${y}-${m}-${d}`;
  }
  return ret;
};

// 格式化日期 - 今天
const convertNewDate = (olddate) => {
  let ret = null;
  if (olddate) {
    const y = olddate.getFullYear();
    let m = (olddate.getMonth() + 1).toString();
    let d = olddate.getDate().toString();
    if (m.length < 2) {
      m = `0${m}`;
    }
    if (d.length < 2) {
      d = `0${d}`;
    }
    ret = `${y}-${m}-${d}`;
  }
  return ret;
};

// 格式化日期-时分秒
const convertTime = (date) => {
  const y = date.getFullYear();
  let m = (date.getMonth() + 1).toString();
  let d = date.getDate().toString();
  let hh = date.getHours().toString();
  let mm = date.getMinutes().toString();
  let ss = date.getSeconds().toString();
  if (m.length < 2) {
    m = `0${m}`;
  }
  if (d.length < 2) {
    d = `0${d}`;
  }
  if (hh.length < 2) {
    hh = `0${hh}`;
  }
  if (mm.length < 2) {
    mm = `0${mm}`;
  }
  if (ss.length < 2) {
    ss = `0${ss}`;
  }
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
};

// 格式化日期-只要时分秒
const convertSecondTime = (olddate) => {
  let ret = null;
  if (olddate) {
    const date = (new Date(olddate.replace(/-/g, '/')));
    let hh = date.getHours().toString();
    let mm = date.getMinutes().toString();
    if (hh.length < 2) {
      hh = `0${hh}`;
    }
    if (mm.length < 2) {
      mm = `0${mm}`;
    }
    ret = `${hh}:${mm}`;
  }
  return ret;
};

// 计算昨天及之前 - 聊天时间
// type (1: 只有时间，2：加上文字如：[今天 03:13])
const convertChatTime = (olddate, type) => {
  let ret = null;
  if (olddate) {
    const Today = convertNewDate(new Date()); // 今天
    const Yesterday = convertNewDate(new Date((new Date()).getTime() - (1000 * 60 * 60 * 24))); // 昨天
    // 判断今天、昨天
    let isToday = false;
    let isYesterday = false;
    const convertOlddate = convertDate(olddate);
    if (convertOlddate === Today) {
      isToday = true;
    }
    if (convertOlddate === Yesterday) {
      isYesterday = true;
    }
    // 类型为1
    if (type === 1) {
      if (isToday) {
        ret = `${convertSecondTime(olddate)}`;
      } else if (isYesterday) {
        ret = '昨天';
      } else {
        ret = `${convertDate(olddate)}`;
      }
    }
    // 类型为2
    if (type === 2) {
      if (isToday) {
        ret = `今天 ${convertSecondTime(olddate)}`;
      } else if (isYesterday) {
        ret = `昨天 ${convertSecondTime(olddate)}`;
      } else {
        ret = `${convertDate(olddate)} ${convertSecondTime(olddate)}`;
      }
    }
  }
  return ret;
};

// 计算查询拼团人的时间
const groupDateSlot = () => {
  const ret = {
    now: null,
    old: null,
  };
  ret.now = convertTime(new Date());
  ret.old = convertTime(new Date((new Date()).getTime() - (1000 * 60 * 60 * 24)));
  return ret;
};

export default {
  convertImgArr,
  weekDate,
  calculateCard,
  dateToAge,
  groupDateSlot,
  convertDate,
  stringToArr,
  convertSecondTime,
  convertChatTime,
  convertTime,
};
