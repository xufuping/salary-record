"use strict";
var common_vendor = require("../../common/vendor.js");
const INSURANCE_LIST = ["\u4E94\u9669\u4E00\u91D1\u67E5\u8BE2\u65B9\u5F0F", "\u4E94\u9669\u4E00\u91D1\u7684\u4F7F\u7528", "\u5404\u57CE\u5E02\u4E94\u9669\u4E00\u91D1\u7F34\u7EB3\u6BD4\u4F8B", "\u4E2A\u4EBA\u6240\u5F97\u7A0E\u76F8\u5173\u653F\u7B56", "\u51CF\u514D\u7A0E\u7533\u62A5\u6761\u4EF6"];
const _sfc_main = {
  onShareAppMessage(res) {
    if (res.from === "button") {
      console.log(res.target);
    }
    return {
      title: "\u81EA\u5B9A\u4E49\u5206\u4EAB\u6807\u9898",
      path: "/pages/test/test?id=123"
    };
  },
  setup() {
    const professionalInfoList = [
      {
        id: 1,
        label: "\u666E\u901A\u804C\u4E1A",
        info: "\u6253\u5DE5\u4EBA"
      },
      {
        id: 2,
        label: "\u65B0\u5174\u804C\u4E1A",
        info: "\u521B\u65B0\u8005"
      }
    ];
    const enterProfessional = (target) => {
      common_vendor.index.navigateTo({
        url: `../Professional/Professional/Professional?target=${target}`
      });
    };
    const contentList = common_vendor.reactive(INSURANCE_LIST);
    function enter() {
      common_vendor.index.navigateTo({
        url: "#"
      });
    }
    return {
      contentList,
      professionalInfoList,
      enterProfessional,
      enter
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.enter && $setup.enter(...args)),
    b: common_vendor.f($setup.professionalInfoList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: common_vendor.t(item.info),
        c: item.id,
        d: common_vendor.o(($event) => $setup.enterProfessional(item.id))
      };
    }),
    c: common_vendor.f($setup.contentList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-57280228"]]);
_sfc_main.__runtimeHooks = 2;
tt.createPage(MiniProgramPage);
