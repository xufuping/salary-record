"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_Professional_common_switchCity_citydata = require("./citydata.js");
var pages_Professional_common_switchCity_commonMessageZhCn = require("./commonMessageZhCn.js");
var pages_utils_autoPredictor = require("../../../utils/autoPredictor.js");
var pages_utils_utils = require("../../../utils/utils.js");
const {
  isNotEmpty,
  safeGet,
  getCityListSortedByInitialLetter,
  getLocationUrl,
  getCountyListUrl,
  onFail
} = pages_utils_utils.utils;
const _sfc_main = {
  setup() {
    const appInstance = getApp();
    const sideBarLetterList = common_vendor.reactive({
      data: []
    });
    const windowHeight = common_vendor.ref(0);
    const cityList = common_vendor.reactive({
      data: []
    });
    const hotCityList = common_vendor.reactive(pages_Professional_common_switchCity_citydata.HOT_CITY_LIST);
    const showChosenLetterToast = common_vendor.ref(false);
    const scrollTop = common_vendor.ref(0);
    const scrollTopId = common_vendor.ref("");
    const city = common_vendor.ref(pages_Professional_common_switchCity_commonMessageZhCn.commonMessage["location.getting"]);
    const currentCityCode = common_vendor.ref("");
    const inputName = common_vendor.ref("");
    const completeList = common_vendor.reactive({
      data: []
    });
    const countyList = common_vendor.reactive({
      data: []
    });
    const county = common_vendor.ref({ data: "" });
    const showCountyPicker = common_vendor.ref(false);
    const auto = common_vendor.ref(true);
    const toastShowLetter = common_vendor.ref("");
    const getLocation = () => {
      county.data = "";
      common_vendor.index.getLocation({
        type: "wgs84",
        success: function(res) {
        },
        fail: function() {
          onFail(pages_Professional_common_switchCity_commonMessageZhCn.commonMessage["location.city.fail"]);
        }
      });
    };
    common_vendor.onMounted(() => {
      const cityListSortedByInitialLetter = getCityListSortedByInitialLetter();
      let sysInfo;
      common_vendor.index.getSystemInfo({
        success: (e) => {
          sysInfo = e;
        }
      });
      const winHeight = sysInfo.windowHeight;
      const sideBarLetterListValue = pages_Professional_common_switchCity_citydata.LETTERS.map((letter) => ({ name: letter }));
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
      auto.value = false;
      showCountyPicker.value = true;
      city.value = seledCity;
      currentCityCode.value = code;
      scrollTop.value = 0;
      completeList.data = [];
      county.data = "";
      appInstance.globalData.defaultCity = city;
      appInstance.globalData.defaultCounty = "";
    };
    const hotCity = () => {
      scrollTop.value = 0;
    };
    const scroll = (e) => {
      scrollTop.value = e.detail.scrollTop;
    };
    const reGetLocation = () => {
      appInstance.globalData.defaultCity = city.value;
      appInstance.globalData.defaultCounty = county.value;
      console.log(appInstance.globalData.defaultCity);
      common_vendor.index.navigateTo({
        url: "../../../releaseProfessional/releaseProfessional"
      });
    };
    const bindBlur = (e) => {
      inputName.value = "";
      completeList.data = [];
    };
    const useAutoPredictor = (content) => {
      let autoPredictor = new pages_utils_autoPredictor.AutoPredictor(content);
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
      scroll,
      bindBlur,
      bindKeyInput,
      hotCity,
      countyList,
      chooseCity,
      toastShowLetter,
      reGetLocation,
      appInstance,
      sideBarLetterList,
      touchSideBarLetter,
      windowHeight,
      cityList,
      hotCityList,
      showChosenLetterToast,
      scrollTop,
      scrollTopId,
      city,
      currentCityCode,
      inputName,
      completeList,
      county,
      showCountyPicker,
      auto
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $setup.inputName.value = $event.detail.value, (...args) => $setup.bindKeyInput && $setup.bindKeyInput(...args)]),
    b: common_vendor.o((...args) => $setup.bindBlur && $setup.bindBlur(...args)),
    c: $setup.inputName.value,
    d: common_vendor.o((...args) => $setup.hotCity && $setup.hotCity(...args)),
    e: common_vendor.o((...args) => $setup.hotCity && $setup.hotCity(...args)),
    f: common_vendor.f($setup.sideBarLetterList.data, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.o(($event) => $setup.touchSideBarLetter(item.name))
      };
    }),
    g: $setup.showChosenLetterToast
  }, $setup.showChosenLetterToast ? {
    h: common_vendor.t($setup.toastShowLetter)
  } : {}, {
    i: common_vendor.f($setup.completeList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.city),
        b: item.code,
        c: common_vendor.o(($event) => $setup.chooseCity(item.code, item.city), item.code)
      };
    }),
    j: common_vendor.o(($event) => $setup.reGetLocation()),
    k: common_vendor.t($setup.city),
    l: common_vendor.t($setup.county.data),
    m: common_vendor.f($setup.hotCityList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.city),
        b: common_vendor.o(($event) => $setup.chooseCity(item.cityCode, item.city)),
        c: item.cityCode
      };
    }),
    n: common_vendor.f($setup.cityList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.initial),
        b: item.initial,
        c: common_vendor.f(item.cityInfo, (itemChild, k1, i1) => {
          return {
            a: common_vendor.t(itemChild.city),
            b: itemChild.code,
            c: common_vendor.o(($event) => $setup.chooseCity(itemChild.code, itemChild.city), itemChild.code)
          };
        }),
        d: item.initial
      };
    }),
    o: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    p: $setup.scrollTopId,
    q: $setup.windowHeight + "px",
    r: $setup.scrollTop
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
