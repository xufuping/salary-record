"use strict";
var common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    city: {
      defaultCityID: 0,
      defaultCity: "\u9009\u62E9\u57CE\u5E02"
    }
  },
  mutations: {
    updateCityData(state, cityInfo) {
      state.city.defaultCityID = cityInfo.code;
      state.city.defaultCity = cityInfo.seledCity;
    },
    clearCity(state) {
      state.city.defaultCityID = 0;
      state.city.defaultCity = "\u9009\u62E9\u57CE\u5E02";
    }
  }
});
exports.store = store;
