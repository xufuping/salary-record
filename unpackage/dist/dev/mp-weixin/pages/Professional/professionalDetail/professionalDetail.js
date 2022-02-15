"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  setup() {
    const data = {
      salary: 1e5,
      com_name: "\u817E\u8BAF",
      pos_name: "\u5F00\u53D1\u5DE5\u7A0B\u5E08",
      address: "\u91CD\u5E86\u5546\u5BB6\u6765\u8BF4\u5730\u65B9\u5F00\u59CB\u7684\u5730\u65B9",
      pos_type: "\u5F00\u53D1",
      education: "\u7814\u7A76\u751F",
      send_time: "2020-01-01",
      read_count: 8938,
      praise_count: 8080
    };
    return {
      data
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($setup.data.pos_name),
    b: common_vendor.t($setup.data.salary),
    c: common_vendor.t($setup.data.address),
    d: common_vendor.t($setup.data.education),
    e: common_vendor.t($setup.data.pos_type),
    f: common_vendor.t($setup.data.com_name),
    g: common_vendor.t($setup.data.send_time),
    h: common_vendor.t($setup.data.read_count),
    i: common_vendor.t($setup.data.praise_count)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a9323b40"]]);
wx.createPage(MiniProgramPage);
