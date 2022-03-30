"use strict";
var pages_Professional_common_switchCity_citydata = require("../Professional/common/switchCity/citydata.js");
const config = {
  key: "jdhsfksdjfksdj"
};
const getLocationUrl = (latitude, longitude) => `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`;
const getCountyListUrl = (code) => `https://apis.map.qq.com/ws/district/v1/getchildren?&id=${code}&key=${config.key}`;
const safeGet = (keyList, obj) => keyList.reduce((preValue, curKey) => preValue && preValue[curKey] ? preValue[curKey] : null, obj);
const isNotEmpty = (array) => Array.isArray(array) && array.length > 0;
const isChinese = (str) => /^[\u4e00-\u9fa5]+$/.test(str);
const getCityListSortedByInitialLetter = () => pages_Professional_common_switchCity_citydata.LETTERS.map((letter) => ({
  initial: letter,
  cityInfo: pages_Professional_common_switchCity_citydata.CITY_LIST.filter((city) => city.initial == letter)
}));
const getSlicedName = (cityObj, key, sliceLen) => cityObj[key] && cityObj[key].slice(0, sliceLen);
const onFail = (err) => {
  console.log(err);
};
var utils = {
  getLocationUrl,
  getCountyListUrl,
  safeGet,
  isNotEmpty,
  isChinese,
  getCityListSortedByInitialLetter,
  getSlicedName,
  onFail
};
exports.utils = utils;
