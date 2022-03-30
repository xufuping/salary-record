"use strict";
var pages_Professional_common_switchCity_citydata = require("../Professional/common/switchCity/citydata.js");
var pages_utils_utils = require("./utils.js");
const { isNotEmpty, isChinese, getSlicedName } = pages_utils_utils.utils;
class AutoPredictor {
  constructor(inputContent) {
    this.content = inputContent.toLowerCase();
  }
  associativeSearch() {
    let tempList = this.searchList(this.content);
    let resultList = this.showList(tempList);
    return resultList;
  }
  searchList(str) {
    let targetCity;
    return pages_Professional_common_switchCity_citydata.CITY_LIST.filter((city) => {
      targetCity = this.getTargetCity(str, city);
      return targetCity && targetCity == str;
    });
  }
  getTargetCity(str, cityObj) {
    if (isChinese(str)) {
      const slicedChineseName = getSlicedName(cityObj, "city", str.length);
      return slicedChineseName;
    } else {
      const slicedPinyinName = getSlicedName(cityObj, "short", str.length).toLowerCase();
      return slicedPinyinName;
    }
  }
  showList(array) {
    return isNotEmpty(array) ? array.map((item) => ({ city: item.city, code: item.code })) : pages_Professional_common_switchCity_citydata.CITY_NOT_FOUND;
  }
}
exports.AutoPredictor = AutoPredictor;
