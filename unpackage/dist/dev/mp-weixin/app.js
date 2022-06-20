"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_cityListTools = require("./utils/cityListTools.js");
var store_index = require("./store/index.js");
require("./config/configData.js");
require("./config/allCityData.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/releaseProfessional/releaseProfessional.js";
  "./pages/Professional/Professional/Professional.js";
  "./pages/Professional/searchDetail/Ordinary/ordinary.js";
  "./pages/Professional/searchDetail/Emerging/Emerging.js";
  "./pages/Professional/professionalDetail/professionalDetail.js";
  "./pages/Professional/common/switchCity/switchCity.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
    utils_cityListTools.finalUsedCityList();
  },
  onHide: function() {
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xuqingfeng/web/wudingxuan/salary-record/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
