"use strict";
var common_vendor = require("../../../common/vendor.js");
var config_configData = require("../../../config/configData.js");
var config_professionalMockData = require("../../../config/professionalMockData.js");
const _sfc_main = {
  props: {
    target: Number
  },
  setup(props) {
    common_vendor.onMounted(() => {
      getHotData();
      changeTab(props.target);
    });
    let changeNum = common_vendor.ref(0);
    let changeNumOfCity = common_vendor.ref(0);
    const tabStatus = common_vendor.ref(1);
    const changeTab = (target) => {
      tabStatus.value = target;
      loadingList();
    };
    const inputValue = common_vendor.ref("");
    const moreList = common_vendor.reactive({});
    const ordinaryList = common_vendor.reactive(config_configData.HOT_ORDINARY);
    const emergingList = common_vendor.reactive({
      data: []
    });
    const hotAreaList = common_vendor.reactive({
      data: []
    });
    const getHotData = () => {
      {
        operateData(config_professionalMockData.HOT_PROFESSION.data);
        operateAreaData(config_professionalMockData.HOT_CITYDATA.data);
      }
    };
    const operateData = (result) => {
      emergingList.data = [];
      result.forEach((item) => {
        emergingList.data.push(item);
        changeNum.value++;
      });
    };
    const operateAreaData = (result) => {
      hotAreaList.data = [];
      result.forEach((item) => {
        hotAreaList.data.push(item);
        changeNumOfCity.value++;
      });
    };
    function selectHotOptions(list) {
      loadingList();
      for (let key in common_vendor.toRaw(moreList.value)) {
        if (moreList.value[key].id === list) {
          search(moreList.value[key].name);
        }
      }
    }
    function loadingList() {
      moreList.value = tabStatus.value === 1 ? common_vendor.toRaw(ordinaryList.data) : common_vendor.toRaw(emergingList.data);
    }
    const search = (value) => {
      common_vendor.index.navigateTo({
        url: (tabStatus.value === 1 ? "../searchDetail/Ordinary/ordinary" : "../searchDetail/Emerging/Emerging") + "?inputValue=" + value
      });
    };
    return {
      hotAreaList,
      changeNum,
      changeNumOfCity,
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.tabStatus === 1 ? 1 : "",
    b: common_vendor.o(($event) => $setup.changeTab(1)),
    c: $setup.tabStatus === 2 ? 1 : "",
    d: common_vendor.o(($event) => $setup.changeTab(2)),
    e: $setup.inputValue,
    f: common_vendor.o(($event) => $setup.inputValue = $event.detail.value),
    g: common_vendor.o(($event) => $setup.search($setup.inputValue)),
    h: $setup.tabStatus === 2
  }, $setup.tabStatus === 2 ? {
    i: common_vendor.f($setup.emergingList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.professionName),
        b: item.id
      };
    }),
    j: $setup.changeNum > 3 ? 1 : "",
    k: common_vendor.f($setup.hotAreaList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.cityName),
        b: item.id
      };
    }),
    l: $setup.changeNumOfCity > 3 ? 1 : ""
  } : {}, {
    m: $setup.tabStatus === 1
  }, $setup.tabStatus === 1 ? {
    n: common_vendor.f($setup.ordinaryList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: common_vendor.o(($event) => $setup.selectHotOptions(item.id), item.id)
      };
    }),
    o: common_vendor.f(20, (n, k0, i0) => {
      return {
        a: n
      };
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-20eca980"], ["__file", "/Users/xuqingfeng/web/wudingxuan/salary-record/pages/Professional/Professional/Professional.vue"]]);
wx.createPage(MiniProgramPage);
