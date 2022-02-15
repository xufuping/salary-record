"use strict";
var common_vendor = require("../../../../common/vendor.js");
const searchItem = () => "../../common/searchItem.js";
const _sfc_main = {
  components: {
    searchItem
  },
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
        }
      ]
    });
    const tabTarget = common_vendor.ref(1);
    const changeTabTarget = (target) => {
      tabTarget.value = target;
    };
    const detail = {
      com_name: "\u817E\u8BAF",
      com_address: "\u91CD\u5E86\u5E02\u5357\u90E8\u4E0A\u8BFE\u5730\u65B9",
      pos_name: "\u5F00\u53D1\u5DE5\u7A0B\u5E08",
      pos_salary: 1e5,
      credibility: "\u9AD8",
      quantity: 1e3,
      release_time: "2010-10-10"
    };
    const popup = common_vendor.ref(null);
    const open = () => {
      console.log(popup);
      popup.value.open("bottom");
    };
    const enterDetail = () => {
      console.log(12123);
    };
    const popList = [
      {
        "letter": "A",
        "data": [
          "\u963F\u514B\u82CF\u673A\u573A",
          "\u963F\u62C9\u5C71\u53E3\u673A\u573A",
          "\u963F\u52D2\u6CF0\u673A\u573A",
          "\u963F\u91CC\u6606\u838E\u673A\u573A",
          "\u5B89\u5E86\u5929\u67F1\u5C71\u673A\u573A",
          "\u6FB3\u95E8\u56FD\u9645\u673A\u573A"
        ]
      },
      {
        "letter": "B",
        "data": [
          "\u4FDD\u5C71\u673A\u573A",
          "\u5305\u5934\u673A\u573A",
          "\u5317\u6D77\u798F\u6210\u673A\u573A",
          "\u5317\u4EAC\u5357\u82D1\u673A\u573A",
          "\u5317\u4EAC\u9996\u90FD\u56FD\u9645\u673A\u573A"
        ]
      },
      {
        "letter": "c",
        "data": [
          "\u4FDD\u5C71\u673A\u573A",
          "\u5305\u5934\u673A\u573A",
          "\u5317\u6D77\u798F\u6210\u673A\u573A",
          "\u5317\u4EAC\u5357\u82D1\u673A\u573A",
          "\u5317\u4EAC\u9996\u90FD\u56FD\u9645\u673A\u573A"
        ]
      },
      {
        "letter": "d",
        "data": [
          "\u4FDD\u5C71\u673A\u573A",
          "\u5305\u5934\u673A\u573A",
          "\u5317\u6D77\u798F\u6210\u673A\u573A",
          "\u5317\u4EAC\u5357\u82D1\u673A\u573A",
          "\u5317\u4EAC\u9996\u90FD\u56FD\u9645\u673A\u573A"
        ]
      }
    ];
    return {
      popList,
      open,
      popup,
      detail,
      tabStatus,
      changeList,
      showList,
      moreList,
      changeTab,
      showCollapse,
      closeCollapse,
      openCollapse,
      tabTarget,
      changeTabTarget,
      enterDetail
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _component_searchItem = common_vendor.resolveComponent("searchItem");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _component_searchItem + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_indexed_list2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_collapse_item = () => "../../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_indexed_list = () => "../../../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_indexed_list + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => _ctx.value = $event),
    b: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0/\u57CE\u5E02/\u5C97\u4F4D",
      prefixIcon: "search",
      modelValue: _ctx.value
    }),
    c: common_vendor.f($setup.moreList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id
      };
    }),
    d: common_vendor.o((...args) => $setup.open && $setup.open(...args)),
    e: common_vendor.f($setup.moreList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id
      };
    }),
    f: common_vendor.n(_ctx.sel_item),
    g: common_vendor.o((...args) => $setup.open && $setup.open(...args)),
    h: common_vendor.f($setup.moreList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id
      };
    }),
    i: common_vendor.o((...args) => $setup.open && $setup.open(...args)),
    j: $setup.tabTarget === 1 ? 1 : "",
    k: common_vendor.o(($event) => $setup.changeTabTarget(1)),
    l: $setup.tabTarget === 2 ? 1 : "",
    m: common_vendor.o(($event) => $setup.changeTabTarget(2)),
    n: $setup.tabTarget === 3 ? 1 : "",
    o: common_vendor.o(($event) => $setup.changeTabTarget(3)),
    p: common_vendor.f(10, (item, k0, i0) => {
      return {
        a: "5ff45318-1-" + i0,
        b: item
      };
    }),
    q: common_vendor.p({
      detail: $setup.detail
    }),
    r: common_vendor.o($setup.closeCollapse),
    s: common_vendor.o($setup.openCollapse),
    t: common_vendor.o(($event) => _ctx.value = $event),
    v: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0/\u57CE\u5E02/\u5C97\u4F4D",
      prefixIcon: "search",
      modelValue: _ctx.value
    }),
    w: common_vendor.p({
      ["title-border"]: "none",
      border: false,
      ["show-arrow"]: false,
      open: $setup.showCollapse
    }),
    x: common_vendor.p({
      options: $setup.popList,
      showSelect: true
    }),
    y: common_vendor.sr("popup", "5ff45318-2"),
    z: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5ff45318"]]);
wx.createPage(MiniProgramPage);
