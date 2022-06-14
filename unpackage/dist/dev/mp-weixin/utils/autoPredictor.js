"use strict";
var utils_toolsFnAndGetPosition = require("./toolsFnAndGetPosition.js");
var utils_cityListTools = require("./cityListTools.js");
const { isNotEmpty, isChinese, getSlicedName } = utils_toolsFnAndGetPosition.utils;
const CITY_NOT_FOUND = [{ city: "\u65E0\u5339\u914D\u57CE\u5E02", code: "000" }];
class AutoPredictor {
  constructor(inputContent) {
    this.content = inputContent;
  }
  associativeSearch() {
    let tempList = this.searchList(this.content);
    let resultList = this.showList(tempList);
    return resultList;
  }
  searchList(str) {
    const CITY_LIST = utils_cityListTools.editCityDataUsedForSerach();
    let targetCity;
    return CITY_LIST.filter((city) => {
      targetCity = this.getTargetCity(str, city);
      return targetCity && targetCity == str;
    });
  }
  getTargetCity(str, cityObj) {
    if (isChinese(str)) {
      const slicedChineseName = getSlicedName(cityObj, "city", str.length);
      return slicedChineseName;
    }
  }
  showList(array) {
    return isNotEmpty(array) ? array.map((item) => ({ city: item.city, cityCode: item.cityCode })) : CITY_NOT_FOUND;
  }
}
exports.AutoPredictor = AutoPredictor;
