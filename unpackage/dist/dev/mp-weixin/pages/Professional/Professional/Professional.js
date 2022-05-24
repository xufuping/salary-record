"use strict";
var common_vendor = require("../../../common/vendor.js");
var config_configData = require("../../../config/configData.js");
const _sfc_main = {
  props: {
    target: Number
  },
  setup(props) {
    const tabStatus = common_vendor.ref(1);
    const changeTab = (target) => {
      tabStatus.value = target;
      loadingList();
    };
    const inputValue = common_vendor.ref("");
    function selectHotOptions(list) {
      loadingList();
      for (let key in common_vendor.toRaw(moreList.value)) {
        if (moreList.value[key].id === list) {
          search(moreList.value[key].name);
        }
      }
    }
    const moreList = common_vendor.reactive({});
    const ordinaryList = common_vendor.reactive(config_configData.HOT_ORDINARY);
    const emergingList = common_vendor.reactive(config_configData.HOT_EMERGING);
    function loadingList() {
      moreList.value = tabStatus.value === 1 ? common_vendor.toRaw(ordinaryList.data) : common_vendor.toRaw(emergingList.data);
    }
    const search = (value) => {
      console.log("VALUE", value);
      common_vendor.index.navigateTo({
        url: (tabStatus.value === 1 ? "../searchDetail/Ordinary/ordinary" : "../searchDetail/Emerging/Emerging") + "?inputValue=" + value
      });
    };
    return {
      inputValue,
      search,
      selectHotOptions,
      tabStatus,
      moreList,
      ordinaryList,
      emergingList,
      changeTab
    };
  }
};
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_collapse_item + _easycom_uni_collapse)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.tabStatus === 1 ? 1 : "",
    b: common_vendor.o(($event) => $setup.changeTab(1)),
    c: $setup.tabStatus === 2 ? 1 : "",
    d: common_vendor.o(($event) => $setup.changeTab(2)),
    e: $setup.tabStatus === 2
  }, $setup.tabStatus === 2 ? {
    f: common_vendor.p({
      ["title-border"]: "none",
      border: false,
      ["show-arrow"]: false
    })
  } : {}, {
    g: $setup.inputValue,
    h: common_vendor.o(($event) => $setup.inputValue = $event.detail.value),
    i: common_vendor.o(($event) => $setup.search($setup.inputValue)),
    j: common_vendor.f($setup.tabStatus === 1 ? $setup.ordinaryList.data : $setup.emergingList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: common_vendor.o(($event) => $setup.selectHotOptions(item.id), item.id)
      };
    }),
    k: common_vendor.f(20, (n, k0, i0) => {
      return {
        a: n
      };
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-20eca980"], ["__file", "/Users/xuqingfeng/web/wudingxuan/salary-record-wdx/salary-record/pages/Professional/Professional/Professional.vue"]]);
wx.createPage(MiniProgramPage);
