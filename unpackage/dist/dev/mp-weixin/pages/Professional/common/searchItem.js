"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: ["detail"],
  setup() {
    const enterDetail = () => {
      console.log(12123);
      common_vendor.index.navigateTo({
        url: "/pages/Professional/professionalDetail/professionalDetail"
      });
    };
    return {
      enterDetail
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.$props.detail.com_name),
    b: common_vendor.t(_ctx.$props.detail.com_address),
    c: common_vendor.t(_ctx.$props.detail.pos_name),
    d: common_vendor.t(_ctx.$props.detail.pos_salary),
    e: common_vendor.t(_ctx.$props.detail.credibility),
    f: common_vendor.t(_ctx.$props.detail.quantity),
    g: common_vendor.t(_ctx.$props.detail.release_time),
    h: common_vendor.o((...args) => $setup.enterDetail && $setup.enterDetail(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-43b3d620"]]);
wx.createComponent(Component);
