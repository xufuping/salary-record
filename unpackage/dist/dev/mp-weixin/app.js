"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var pages_utils_cityListTools = require("./pages/utils/cityListTools.js");
var store_index = require("./store/index.js");
require("./pages/utils/utils/sendPostRequest.js");
require("./pages/utils/route.js");
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
    pages_utils_cityListTools.finalUsedCityList();
  },
  onHide: function() {
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
