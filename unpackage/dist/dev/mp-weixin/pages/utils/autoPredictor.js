"use strict";
var pages_utils_utils = require("./utils.js");
var pages_utils_cityListTools = require("./cityListTools.js");
const { isNotEmpty, isChinese, getSlicedName } = pages_utils_utils.utils;
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
    const CITY_LIST = pages_utils_cityListTools.editCityDataUsedForSerach();
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
    return isNotEmpty(array) ? array.map((item) => ({ city: item.city, cityCode: item.cityCode })) : pages_utils_cityListTools.CITY_NOT_FOUND;
  }
}
exports.AutoPredictor = AutoPredictor;
