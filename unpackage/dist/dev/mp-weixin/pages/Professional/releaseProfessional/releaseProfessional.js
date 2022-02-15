"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup() {
    const tabStatus = common_vendor.ref(1);
    const changeTab = (data) => {
      tabStatus.value = data;
    };
    const company = common_vendor.ref("");
    const job = common_vendor.ref("");
    const city = common_vendor.ref("");
    const city_list = [
      {
        id: 1,
        label: "\u4E0A\u6D77"
      },
      {
        id: 2,
        label: "\u5317\u4EAC"
      },
      {
        id: 3,
        label: "\u91CD\u5E86"
      },
      {
        id: 4,
        label: "\u6210\u90FD"
      }
    ];
    const salary = common_vendor.ref("");
    const type_list = [
      {
        id: 1,
        label: "\u6821\u62DB"
      },
      {
        id: 2,
        label: "\u5B9E\u4E60"
      },
      {
        id: 3,
        label: "\u793E\u62DB"
      }
    ];
    const selType = common_vendor.ref(1);
    const changeSelType = (data) => {
      selType.value = data;
    };
    const sel_education = common_vendor.ref("\u8BF7\u9009\u62E9\u5B66\u5386");
    const education_popup = common_vendor.ref(null);
    const education_popOpen = () => {
      education_popup.value.open("bottom");
    };
    const sel_industry = common_vendor.ref("\u8BF7\u9009\u62E9\u884C\u4E1A");
    const industry_popup = common_vendor.ref(null);
    const industry_popOpen = () => {
      industry_popup.value.open("bottom");
    };
    const job_note = common_vendor.ref("");
    return {
      city,
      salary,
      company,
      job,
      tabStatus,
      changeTab,
      city_list,
      type_list,
      job_note,
      selType,
      changeSelType,
      education_popOpen,
      education_popup,
      sel_education,
      sel_industry,
      industry_popup,
      industry_popOpen
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.tabStatus === 1 ? 1 : "",
    b: common_vendor.o(($event) => $setup.changeTab(1)),
    c: $setup.tabStatus === 2 ? 1 : "",
    d: common_vendor.o(($event) => $setup.changeTab(2)),
    e: common_vendor.o(_ctx.closeCollapse),
    f: common_vendor.o(_ctx.openCollapse),
    g: common_vendor.o(($event) => $setup.company = $event),
    h: common_vendor.p({
      placeholder: "\u8F93\u5165\u516C\u53F8\u540D\u79F0",
      modelValue: $setup.company
    }),
    i: common_vendor.p({
      ["title-border"]: "none",
      border: false,
      ["show-arrow"]: false,
      open: _ctx.showCollapse
    }),
    j: common_vendor.o(($event) => $setup.job = $event),
    k: common_vendor.p({
      placeholder: "\u8F93\u5165\u5C97\u4F4D\u540D\u79F0",
      modelValue: $setup.job
    }),
    l: common_vendor.f($setup.city_list, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: item.id
      };
    }),
    m: common_vendor.o(($event) => $setup.city = $event),
    n: common_vendor.p({
      placeholder: "\u8F93\u5165\u57CE\u5E02\u540D\u79F0",
      modelValue: $setup.city
    }),
    o: common_vendor.o(($event) => $setup.salary = $event),
    p: common_vendor.p({
      placeholder: "\u8F93\u5165\u85AA\u8D44\u540D\u79F0",
      modelValue: $setup.salary
    }),
    q: $setup.tabStatus === 1
  }, $setup.tabStatus === 1 ? {
    r: common_vendor.f($setup.type_list, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: item.id,
        c: $setup.selType === item.id ? 1 : "",
        d: common_vendor.o(($event) => $setup.changeSelType(item.id), item.id)
      };
    })
  } : {}, {
    s: $setup.tabStatus === 1
  }, $setup.tabStatus === 1 ? {
    t: common_vendor.t($setup.sel_education),
    v: common_vendor.o((...args) => $setup.education_popOpen && $setup.education_popOpen(...args))
  } : {}, {
    w: common_vendor.t($setup.sel_industry),
    x: common_vendor.o((...args) => $setup.industry_popOpen && $setup.industry_popOpen(...args)),
    y: common_vendor.o(($event) => $setup.job_note = $event),
    z: common_vendor.p({
      type: "textarea",
      placeholder: "\u53EF\u4EE5\u586B\u5199\u5DE5\u4F5C\u7684\u8BE6\u60C5\u5F85\u9047,\u5982\u798F\u5229\u8865\u8D34,\u798F\u5229\u5F85\u9047\u7B49",
      modelValue: $setup.job_note
    }),
    A: common_vendor.sr("education_popup", "748fc5be-7"),
    B: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff"
    }),
    C: common_vendor.sr("industry_popup", "748fc5be-8"),
    D: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-748fc5be"]]);
wx.createPage(MiniProgramPage);
