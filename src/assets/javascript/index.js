import Vue from 'vue';
import './rem.js';

const formatDate = (val, type = "yyyy-MM-dd") => {
  if (!val) return '';
  let time = new Date(val);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let min = time.getMinutes();
  let ms = time.getMilliseconds();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hour < 10) hour = '0' + hour;
  if (min < 10) min = '0' + min;
  if (ms < 10) ms = '0' + ms;
  if (type === "yyyy-MM-dd") {
    return `${year}-${month}-${day}`;
  }
};
Vue.prototype.$formatDate = formatDate;