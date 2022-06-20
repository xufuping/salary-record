"use strict";
var common_vendor = require("../common/vendor.js");
var config_configData = require("../config/configData.js");
var config_allCityData = require("../config/allCityData.js");
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
const getCityList = () => {
  return new Promise((resolve) => {
    {
      resolve(config_allCityData.CITY_DATA);
    }
  });
};
const finalUsedCityList = () => {
  const version = common_vendor.index.getStorageSync("VERSION");
  const allCityList = common_vendor.index.getStorageSync("allCityList");
  if (version && allCityList) {
    if (version === config_configData.VERSION) {
      return common_vendor.index.getStorageSync("allCityList");
    } else {
      let cityList;
      getCityList().then((res) => {
        cityList = res.data;
      });
      common_vendor.index.clearStorageSync();
      common_vendor.index.setStorageSync("allCityList", cityList);
      common_vendor.index.setStorageSync("VERSION", config_configData.VERSION);
      return cityList;
    }
  } else {
    let cityList;
    common_vendor.index.setStorageSync("VERSION", config_configData.VERSION);
    getCityList().then((res) => {
      cityList = res.data;
      common_vendor.index.setStorageSync("allCityList", cityList);
    });
    return cityList;
  }
};
const getCityListSortedByInitialLetter = () => {
  const CITY_LIST = common_vendor.index.getStorageSync("allCityList");
  const cityListSortedByInitialLetter = LETTERS.map((letter) => ({
    initial: letter,
    cityInfo: Array.isArray(CITY_LIST[letter]) && CITY_LIST[letter].length && CITY_LIST[letter].map((item) => {
      const resCityList = {};
      resCityList.city = item.cityName;
      resCityList.cityCode = item.id;
      return resCityList;
    })
  }));
  return cityListSortedByInitialLetter;
};
const editCityDataUsedForSerach = () => {
  const allCityList = common_vendor.index.getStorageSync("allCityList");
  const CITY_LIST = [];
  for (let letter in allCityList) {
    if (allCityList[letter].length > 0) {
      allCityList[letter].map((cityData) => {
        CITY_LIST.push({
          city: cityData.cityName,
          cityCode: cityData.id
        });
      });
    }
  }
  return CITY_LIST;
};
const getCityInfoByName = (cityName) => {
  const searchCityList = getCityListSortedByInitialLetter();
  let resCity;
  searchCityList.forEach((item) => {
    let list = Array.isArray(item.cityInfo) && item.cityInfo.filter((info) => info.city === cityName);
    if (list.length)
      resCity = list;
  });
  return resCity;
};
const addHotCity = (cityArray) => {
  const HOT_CITY_LIST = [];
  Array.isArray(cityArray) && cityArray.forEach((item) => {
    const hotCity = getCityInfoByName(item);
    if (hotCity) {
      HOT_CITY_LIST.push(hotCity[0]);
    }
  });
  return HOT_CITY_LIST;
};
const getPopCityList = () => {
  const cityList = getCityListSortedByInitialLetter();
  const useList = cityList.map((item) => ({
    letter: item.initial,
    data: item.cityInfo.map((item2) => item2.city)
  }));
  return useList;
};
exports.LETTERS = LETTERS;
exports.addHotCity = addHotCity;
exports.editCityDataUsedForSerach = editCityDataUsedForSerach;
exports.finalUsedCityList = finalUsedCityList;
exports.getCityInfoByName = getCityInfoByName;
exports.getCityListSortedByInitialLetter = getCityListSortedByInitialLetter;
exports.getPopCityList = getPopCityList;
