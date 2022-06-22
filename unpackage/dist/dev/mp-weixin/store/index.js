"use strict";
var common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    city: {
      defaultCityID: 110100,
      defaultCity: "\u5317\u4EAC\u5E02"
    }
  },
  mutations: {
    updateCityData(state, cityInfo) {
      state.city.defaultCityID = cityInfo.code;
      state.city.defaultCity = cityInfo.seledCity;
    },
    clearCity(state) {
      state.city.defaultCityID = 110100;
      state.city.defaultCity = "\u5317\u4EAC\u5E02";
    }
  }
});
exports.store = store;
