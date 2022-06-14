"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_Professional_common_switchCity_constants = require("./constants.js");
var utils_autoPredictor = require("../../../../utils/autoPredictor.js");
var utils_toolsFnAndGetPosition = require("../../../../utils/toolsFnAndGetPosition.js");
var store_index = require("../../../../store/index.js");
var config_configData = require("../../../../config/configData.js");
var utils_cityListTools = require("../../../../utils/cityListTools.js");
require("../../../../utils/sendPostRequest.js");
require("../../../../utils/route.js");
require("../../../../config/allCityData.js");
const {
  isNotEmpty,
  safeGet,
  getLocationUrl,
  getCountyListUrl,
  onFail
} = utils_toolsFnAndGetPosition.utils;
const _sfc_main = {
  setup() {
    const sideBarLetterList = common_vendor.reactive({
      data: []
    });
    const windowHeight = common_vendor.ref(0);
    const cityList = common_vendor.reactive({
      data: []
    });
    const HOT_CITY_LIST = utils_cityListTools.addHotCity(config_configData.SET_HOT_LIST);
    const hotCityList = common_vendor.reactive(HOT_CITY_LIST);
    const showChosenLetterToast = common_vendor.ref(false);
    const scrollTopId = common_vendor.ref("");
    const city = common_vendor.reactive({
      code: 0,
      seledCity: pages_Professional_common_switchCity_constants.COMMON_MESSAGE["location.getting"]
    });
    const inputName = common_vendor.ref("");
    const completeList = common_vendor.reactive({
      data: []
    });
    const toastShowLetter = common_vendor.ref("");
    const getLocationFromGeoCoord = (geoCoord) => {
      const { latitude, longitude } = geoCoord;
      common_vendor.index.request({
        url: getLocationUrl(latitude, longitude),
        success: (res) => {
          const compareCity = utils_cityListTools.getCityInfoByName(res.data.result.ad_info.city);
          if (compareCity) {
            city.seledCity = compareCity[0].city;
            city.code = compareCity[0].cityCode;
          } else {
            city.seledCity = pages_Professional_common_switchCity_constants.COMMON_MESSAGE["location.noCompareCity.fail"];
          }
        }
      });
    };
    const getLocation = () => {
      common_vendor.index.getLocation({
        type: "wgs84",
        geocode: true,
        success: function(res) {
          getLocationFromGeoCoord(res);
        },
        fail: function() {
          onFail(pages_Professional_common_switchCity_constants.COMMON_MESSAGE["location.city.fail"]);
        }
      });
    };
    common_vendor.onMounted(() => {
      const cityListSortedByInitialLetter = utils_cityListTools.getCityListSortedByInitialLetter();
      let sysInfo;
      common_vendor.index.getSystemInfo({
        success: (e) => {
          sysInfo = e;
        }
      });
      const winHeight = sysInfo.windowHeight;
      const sideBarLetterListValue = utils_cityListTools.LETTERS.map((letter) => ({ name: letter }));
      windowHeight.value = winHeight;
      sideBarLetterList.data = sideBarLetterListValue;
      cityList.data = cityListSortedByInitialLetter;
      getLocation();
    });
    const touchSideBarLetter = (para) => {
      toastShowLetter.value = para;
      showChosenLetterToast.value = true;
      scrollTopId.value = para;
      setTimeout(() => {
        showChosenLetterToast.value = false;
      }, 500);
    };
    const chooseCity = (code, seledCity) => {
      completeList.data = [];
      store_index.store.commit("updateCityData", { code, seledCity });
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    const reGetLocation = () => {
      if (city.seledCity !== "\u65E0\u6CD5\u83B7\u53D6\u5F53\u524D\u57CE\u5E02\u4FE1\u606F\uFF0C\u8BF7\u624B\u52A8\u9009\u62E9") {
        store_index.store.commit("updateCityData", city);
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else {
        common_vendor.index.showModal({
          content: "\u8BF7\u624B\u52A8\u9009\u62E9\u57CE\u5E02",
          showCancel: false
        });
      }
    };
    const bindBlur = (e) => {
      inputName.value = "";
      completeList.data = [];
    };
    const useAutoPredictor = (content) => {
      let autoPredictor = new utils_autoPredictor.AutoPredictor(content);
      let completeListValue = autoPredictor.associativeSearch();
      completeList.data = completeListValue;
    };
    const bindKeyInput = (e) => {
      let inputNameValue = e.detail.value.trim();
      inputName.value = inputNameValue;
      if (!inputName) {
        completeList.data = [];
      }
      useAutoPredictor(inputName.value);
    };
    return {
      bindBlur,
      bindKeyInput,
      chooseCity,
      toastShowLetter,
      reGetLocation,
      sideBarLetterList,
      touchSideBarLetter,
      windowHeight,
      cityList,
      hotCityList,
      showChosenLetterToast,
      scrollTopId,
      city,
      inputName,
      completeList
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $setup.inputName = $event.detail.value, (...args) => $setup.bindKeyInput && $setup.bindKeyInput(...args)]),
    b: common_vendor.o((...args) => $setup.bindBlur && $setup.bindBlur(...args)),
    c: $setup.inputName,
    d: common_vendor.f($setup.sideBarLetterList.data, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.o(($event) => $setup.touchSideBarLetter(item.name))
      };
    }),
    e: $setup.showChosenLetterToast
  }, $setup.showChosenLetterToast ? {
    f: common_vendor.t($setup.toastShowLetter)
  } : {}, {
    g: common_vendor.f($setup.completeList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.city),
        b: item.cityCode,
        c: common_vendor.o(($event) => $setup.chooseCity(item.cityCode, item.city), item.cityCode)
      };
    }),
    h: common_vendor.t($setup.city.seledCity),
    i: common_vendor.o(($event) => $setup.reGetLocation()),
    j: common_vendor.f($setup.hotCityList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.city),
        b: common_vendor.o(($event) => $setup.chooseCity(item.cityCode, item.city)),
        c: item.cityCode
      };
    }),
    k: common_vendor.f($setup.cityList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.initial),
        b: item.initial,
        c: common_vendor.f(item.cityInfo, (itemChild, k1, i1) => {
          return {
            a: common_vendor.t(itemChild.city),
            b: itemChild.cityCode,
            c: common_vendor.o(($event) => $setup.chooseCity(itemChild.cityCode, itemChild.city), itemChild.cityCode)
          };
        }),
        d: item.initial
      };
    }),
    l: $setup.scrollTopId,
    m: $setup.windowHeight + "px"
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xuqingfeng/web/project/salary-record/pages/Professional/common/switchCity/switchCity.vue"]]);
wx.createPage(MiniProgramPage);
