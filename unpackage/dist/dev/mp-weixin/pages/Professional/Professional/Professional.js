"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup() {
    const tabStatus = common_vendor.ref(1);
    const changeTab = (target) => {
      tabStatus.value = target;
    };
    const showCollapse = common_vendor.ref(false);
    const closeCollapse = () => {
      showCollapse.value = false;
      console.log(showCollapse.value);
    };
    const openCollapse = () => {
      showCollapse.value = true;
      console.log(showCollapse.value);
    };
    const showList = common_vendor.ref(true);
    const changeList = () => {
      showList.value = !showList.value;
    };
    const moreList = common_vendor.reactive({
      data: [
        {
          id: 1,
          name: "\u817E\u8BAF1"
        },
        {
          id: 2,
          name: "\u817E\u8BAF2"
        },
        {
          id: 3,
          name: "\u817E\u8BAF3"
        },
        {
          id: 4,
          name: "\u817E\u8BAF4"
        },
        {
          id: 5,
          name: "\u817E\u8BAF5"
        },
        {
          id: 6,
          name: "\u817E\u8BAF6"
        }
      ]
    });
    const search = () => {
      common_vendor.index.navigateTo({
        url: tabStatus.value === 1 ? "../searchDetail/Ordinary/ordinary" : "../searchDetail/Emerging/Emerging"
      });
    };
    return {
      search,
      tabStatus,
      changeList,
      showList,
      moreList,
      changeTab,
      showCollapse,
      closeCollapse,
      openCollapse
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_easyinput2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.tabStatus === 1 ? 1 : "",
    b: common_vendor.o(($event) => $setup.changeTab(1)),
    c: $setup.tabStatus === 2 ? 1 : "",
    d: common_vendor.o(($event) => $setup.changeTab(2)),
    e: $setup.tabStatus === 2
  }, $setup.tabStatus === 2 ? {
    f: common_vendor.o($setup.closeCollapse),
    g: common_vendor.o($setup.openCollapse),
    h: common_vendor.o(($event) => _ctx.value = $event),
    i: common_vendor.p({
      placeholder: "\u67E5\u770B\u66F4\u591A\u65B0\u5174\u5C97\u4F4D",
      modelValue: _ctx.value
    }),
    j: common_vendor.p({
      ["title-border"]: "none",
      border: false,
      ["show-arrow"]: false,
      open: $setup.showCollapse
    })
  } : {}, {
    k: common_vendor.o($setup.search),
    l: common_vendor.o(($event) => _ctx.value = $event),
    m: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0/\u57CE\u5E02/\u5C97\u4F4D",
      prefixIcon: "search",
      modelValue: _ctx.value
    }),
    n: $setup.showList
  }, $setup.showList ? {
    o: common_vendor.f($setup.moreList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id
      };
    }),
    p: common_vendor.f(20, (n, k0, i0) => {
      return {
        a: n
      };
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-20eca980"]]);
wx.createPage(MiniProgramPage);
