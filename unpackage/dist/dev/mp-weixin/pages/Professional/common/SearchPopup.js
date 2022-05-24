"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    comBoxText: String,
    comBoxList: Array,
    indexedList: Array,
    showIndexedList: Boolean
  },
  emits: ["changeShowIndexedList", "getResult"],
  setup(props, ctx) {
    const popup = common_vendor.ref(null);
    const inpValue = common_vendor.ref("");
    let inpValueTime = null;
    const getInpValue = () => {
      if (inpValueTime !== null)
        clearTimeout(inpValueTime);
      inpValueTime = setTimeout(() => {
        if (inpValue.value && !selList.includes(inpValue.value))
          selList.push(inpValue.value);
        inpValueTime = null;
      }, 500);
    };
    const selList = common_vendor.reactive([]);
    const deleteItem = (target) => {
      selList.splice(selList.indexOf(target), 1);
    };
    const getIndexedList = (e) => {
      e.select.forEach((item) => {
        if (!selList.some((target) => item.name === target))
          selList.push(item.name);
      });
    };
    const submit = () => {
      ctx.emit("getResult", selList, ctx.attrs.index);
      popup.value.close();
      clear();
    };
    const cancle = () => {
      popup.value.close();
      clear();
    };
    const clear = () => {
      ctx.emit("changeShowIndexedList", false, ctx.attrs.index);
      selList.splice(0, selList.length);
      inpValue.value = "";
    };
    return {
      clear,
      getIndexedList,
      deleteItem,
      getInpValue,
      inpValue,
      cancle,
      popup,
      selList,
      submit
    };
  }
};
if (!Array) {
  const _easycom_uni_combox2 = common_vendor.resolveComponent("uni-combox");
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_combox2 + _easycom_uni_indexed_list2 + _easycom_uni_popup2)();
}
const _easycom_uni_combox = () => "../../../uni_modules/uni-combox/components/uni-combox/uni-combox.js";
const _easycom_uni_indexed_list = () => "../../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_combox + _easycom_uni_indexed_list + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $setup.cancle && $setup.cancle(...args)),
    b: common_vendor.o((...args) => $setup.submit && $setup.submit(...args)),
    c: common_vendor.o($setup.getInpValue),
    d: common_vendor.o(($event) => $setup.inpValue = $event),
    e: common_vendor.p({
      candidates: _ctx.$props.comBoxList,
      placeholder: _ctx.$props.comBoxText,
      modelValue: $setup.inpValue
    }),
    f: common_vendor.f($setup.selList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $setup.deleteItem(item)),
        c: item
      };
    }),
    g: _ctx.$props.showIndexedList
  }, _ctx.$props.showIndexedList ? {
    h: common_vendor.o($setup.getIndexedList),
    i: common_vendor.p({
      options: _ctx.$props.indexedList,
      showSelect: true
    })
  } : {}, {
    j: common_vendor.sr("popup", "03163278-0"),
    k: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xuqingfeng/web/wudingxuan/salary-record-wdx/salary-record/pages/Professional/common/SearchPopup.vue"]]);
wx.createComponent(Component);
