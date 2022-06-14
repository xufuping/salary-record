"use strict";
require("../common/vendor.js");
const config = {
  key: "WPEBZ-BPM6O-RH2WA-S2MWT-LQ6JJ-OYBZH"
};
const getLocationUrl = (latitude, longitude) => `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`;
const safeGet = (keyList, obj) => keyList.reduce((preValue, curKey) => preValue && preValue[curKey] ? preValue[curKey] : null, obj);
const isNotEmpty = (array) => Array.isArray(array) && array.length > 0;
const isChinese = (str) => /^[\u4e00-\u9fa5]+$/.test(str);
const getSlicedName = (cityObj, key, sliceLen) => cityObj[key] && cityObj[key].slice(0, sliceLen);
const onFail = (err) => {
  console.log(err);
};
var utils = {
  getLocationUrl,
  safeGet,
  isNotEmpty,
  isChinese,
  getSlicedName,
  onFail
};
exports.utils = utils;
