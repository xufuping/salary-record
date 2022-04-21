"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("./utils/sendPostRequest.js");
var pages_utils_route = require("./route.js");
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
const setHotCityList = ["\u5317\u4EAC\u5E02", "\u4E0A\u6D77\u5E02", "\u5E7F\u5DDE\u5E02", "\u6DF1\u5733\u5E02", "\u676D\u5DDE\u5E02", "\u5357\u4EAC\u5E02", "\u6B66\u6C49\u5E02", "\u5929\u6D25\u5E02", "\u897F\u5B89\u5E02"];
const CITY_NOT_FOUND = [{ city: "\u65E0\u5339\u914D\u57CE\u5E02", code: "000" }];
const getCityList = () => {
  return new Promise((resolve) => {
    pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.getCityListByName, {}, {
      success(res) {
        console.log("RESSS", res);
        if (res.message === "success") {
          resolve(res.data);
        }
      },
      fail() {
      }
    }, true);
  });
};
const strorageVersion = "0.0.1_20220407";
const finalUsedCityList = () => {
  const version = common_vendor.index.getStorageSync("strorageVersion");
  if (version) {
    if (version === strorageVersion) {
      return common_vendor.index.getStorageSync("allCityList");
    } else {
      let cityList;
      getCityList().then((res) => {
        cityList = res;
      });
      common_vendor.index.clearStorageSync();
      common_vendor.index.setStorageSync("allCityList", cityList);
      common_vendor.index.setStorageSync("strorageVersion", strorageVersion);
      return cityList;
    }
  } else {
    let cityList;
    common_vendor.index.setStorageSync("strorageVersion", strorageVersion);
    getCityList().then((res) => {
      cityList = res;
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
const addHotCity = () => {
  const HOT_CITY_LIST = [];
  setHotCityList.forEach((item) => {
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
exports.CITY_NOT_FOUND = CITY_NOT_FOUND;
exports.LETTERS = LETTERS;
exports.addHotCity = addHotCity;
exports.editCityDataUsedForSerach = editCityDataUsedForSerach;
exports.finalUsedCityList = finalUsedCityList;
exports.getCityInfoByName = getCityInfoByName;
exports.getCityListSortedByInitialLetter = getCityListSortedByInitialLetter;
exports.getPopCityList = getPopCityList;
