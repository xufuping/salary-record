"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/releaseProfessional/releaseProfessional.js";
  "./pages/index/index.js";
  "./pages/Professional/searchDetail/Ordinary/ordinary.js";
  "./pages/Professional/searchDetail/Emerging/Emerging.js";
  "./pages/Professional/Professional/Professional.js";
  "./pages/Professional/professionalDetail/professionalDetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
