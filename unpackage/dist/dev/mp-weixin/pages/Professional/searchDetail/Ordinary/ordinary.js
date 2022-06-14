"use strict";
var common_vendor = require("../../../../common/vendor.js");
var config_typeData = require("../../../../config/typeData.js");
var config_configData = require("../../../../config/configData.js");
var utils_cityListTools = require("../../../../utils/cityListTools.js");
var pages_Professional_searchDetail_Ordinary_constants = require("./constants.js");
var utils_sendPostRequest = require("../../../../utils/sendPostRequest.js");
var utils_route = require("../../../../utils/route.js");
var config_MAKRDATA = require("../../../../config/MAKRDATA.js");
require("../../../../config/allCityData.js");
const searchItem = () => "../../common/searchItem.js";
const searchPopup = () => "../../common/SearchPopup.js";
const _sfc_main = {
  components: {
    searchItem,
    searchPopup
  },
  props: {
    inputValue: String
  },
  setup(props) {
    common_vendor.onMounted(() => {
      search();
    });
    const seledType = common_vendor.reactive({
      type: "active"
    });
    const changePage = (value) => {
      if (value === 1) {
        return;
      } else {
        seledType.type = "";
        common_vendor.index.redirectTo({
          url: "../Emerging/Emerging"
        });
      }
    };
    const popList = utils_cityListTools.getPopCityList();
    const searchPopupList = common_vendor.reactive([
      {
        id: 0,
        comBoxText: "\u8BF7\u8F93\u5165\u57CE\u5E02",
        showIndexedList: false,
        comBoxList: ["\u91CD\u5E86", "\u5357\u4EAC", "\u5317\u4EAC", "\u4E0A\u6D77", "\u56DB\u5DDD", "\u6210\u90FD", "\u6C99\u576A\u575D"],
        indexedList: popList,
        changeShowIndexedList: (data2, index2) => {
          searchPopupList[index2].showIndexedList = data2;
        },
        getResult: (data2, index2) => {
          console.log("data", data2, index2);
        }
      },
      {
        id: 1,
        comBoxText: "\u8BF7\u8F93\u5165\u884C\u4E1A",
        showIndexedList: false,
        comBoxList: [{
          id: 1,
          name: "123"
        }],
        indexedList: popList,
        changeShowIndexedList: (data2, index2) => {
          searchPopupList[index2].showIndexedList = data2;
        },
        getResult: (data2) => {
          console.log("data", data2, index);
        }
      }
    ]);
    const detail = common_vendor.reactive({
      data: []
    });
    const selSortTypeItem = pages_Professional_searchDetail_Ordinary_constants.selSortType;
    const tabTarget = common_vendor.reactive({
      order: ""
    });
    const sendInformation = common_vendor.reactive({
      information: props.inputValue,
      cityIds: [],
      typeIds: [],
      professionIds: [],
      order: "",
      currentPage: 1,
      pageSize: 10
    });
    const changeTabTarget = (target = "") => {
      if (tabTarget.order === target)
        return;
      tabTarget.order = target;
      sendInformation.order = target;
      search();
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
    function chooseType(typeInfo) {
      if (type.id !== typeInfo.id) {
        sendInformation.typeIds.push(typeInfo.id);
        type.id = typeInfo.id;
        search();
        sendInformation.typeIds = [];
      } else {
        type.id = 0;
        sendInformation.typeIds = [];
        search();
      }
    }
    function chooseCity(cityCode) {
      if (cityClassID.id !== cityCode) {
        sendInformation.cityIds.push(cityCode);
        cityClassID.id = cityCode;
        search();
        sendInformation.cityIds = [];
      } else {
        cityClassID.id = 0;
        search();
      }
    }
    function chooseJob(jobId) {
      if (jobClassID.id !== jobId) {
        sendInformation.profession = jobId;
        jobClassID.id = jobId;
        search();
      } else {
        jobClassID.id = 0;
      }
    }
    const type = common_vendor.reactive({ id: 0 });
    const typeList = common_vendor.reactive(config_typeData.TYPE_LIST);
    const cityClassID = common_vendor.reactive({ id: 0 });
    const cityList = common_vendor.reactive(utils_cityListTools.addHotCity(config_configData.SCREEN_CITY));
    const jobClassID = common_vendor.reactive({ id: 0 });
    const jobList = common_vendor.reactive(pages_Professional_searchDetail_Ordinary_constants.JOB_LIST);
    let data = {};
    function search() {
      detail.data = [];
      if (sendInformation.information)
        data.information = sendInformation.information;
      if (tabTarget.order)
        data.order = sendInformation.order;
      if (sendInformation.cityIds.length !== 0)
        data.cityIds = sendInformation.cityIds;
      if (sendInformation.typeIds.length !== 0)
        data.typeIds = sendInformation.typeIds;
      utils_sendPostRequest.sendPostRequest(utils_route.router.ordinaryGetActicleList, data, {
        success(res) {
          if (res.message === "success") {
            operateData(res.data.data);
          } else {
            {
              operateData(config_MAKRDATA.ORDINARY.data.data);
            }
          }
        },
        fail() {
          {
            operateData(config_MAKRDATA.ORDINARY.data.data);
          }
        }
      }, true);
    }
    function operateData(info) {
      detail.data = [];
      Array.isArray(info) && info.forEach((item) => {
        detail.data.push(item);
      });
    }
    const PopupRefList = common_vendor.reactive([]);
    const pushPopupRef = (e) => {
      if (e)
        PopupRefList.push(e);
    };
    const open = (data2) => {
      console.log("PopupRefList", PopupRefList);
      searchPopupList[data2].showIndexedList = true;
      PopupRefList[data2].popup.open("bottom");
    };
    return {
      seledType,
      type,
      cityClassID,
      jobClassID,
      changePage,
      selSortTypeItem,
      pushPopupRef,
      searchPopupList,
      sendInformation,
      open,
      detail,
      changeList,
      chooseType,
      chooseCity,
      chooseJob,
      showList,
      typeList,
      cityList,
      jobList,
      showCollapse,
      closeCollapse,
      openCollapse,
      tabTarget,
      changeTabTarget
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _component_searchItem = common_vendor.resolveComponent("searchItem");
  const _component_searchPopup = common_vendor.resolveComponent("searchPopup");
  (_easycom_uni_easyinput2 + _component_searchItem + _component_searchPopup)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => _ctx.search()),
    b: common_vendor.o(($event) => $setup.sendInformation.information = $event),
    c: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0/\u57CE\u5E02/\u5C97\u4F4D",
      prefixIcon: "search",
      modelValue: $setup.sendInformation.information
    }),
    d: common_vendor.f($setup.typeList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: ($setup.type.id === item.id ? true : false) ? 1 : "",
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseType(item), item.id)
      };
    }),
    e: common_vendor.f($setup.cityList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.city),
        b: ($setup.cityClassID.id === item.cityCode ? true : false) ? 1 : "",
        c: item.cityCode,
        d: common_vendor.o(($event) => $setup.chooseCity(item.cityCode), item.cityCode)
      };
    }),
    f: common_vendor.f($setup.jobList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: ($setup.jobClassID.id === item.id ? true : false) ? 1 : "",
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseJob(item.id), item.id)
      };
    }),
    g: common_vendor.f($setup.selSortTypeItem, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.sortType),
        b: item.order,
        c: $setup.tabTarget.order === item.order ? 1 : "",
        d: common_vendor.o(($event) => $setup.changeTabTarget(item.order), item.order)
      };
    }),
    h: common_vendor.f($setup.detail.data, (item, k0, i0) => {
      return {
        a: "571a6f38-1-" + i0,
        b: common_vendor.p({
          detail: item,
          type: 1
        }),
        c: item.id
      };
    }),
    i: common_vendor.n($setup.seledType.type),
    j: common_vendor.o(($event) => $setup.changePage(1)),
    k: common_vendor.o(($event) => $setup.changePage(2)),
    l: common_vendor.f($setup.searchPopupList, (item, k0, i0) => {
      return {
        a: common_vendor.sr($setup.pushPopupRef, "571a6f38-2-" + i0, {
          "f": 1
        }),
        b: item.id,
        c: common_vendor.o(item.changeShowIndexedList, item.id),
        d: common_vendor.o(item.getResult, item.id),
        e: "571a6f38-2-" + i0,
        f: common_vendor.p({
          index: item.id,
          comBoxText: item.comBoxText,
          showIndexedList: item.showIndexedList,
          comBoxList: item.comBoxList,
          indexedList: item.indexedList
        })
      };
    }),
    m: $setup.pushPopupRef
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-571a6f38"], ["__file", "/Users/xuqingfeng/web/project/salary-record/pages/Professional/searchDetail/Ordinary/ordinary.vue"]]);
wx.createPage(MiniProgramPage);
