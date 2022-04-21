"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("../../../utils/utils/sendPostRequest.js");
var pages_utils_route = require("../../../utils/route.js");
var pages_utils_cityListTools = require("../../../utils/cityListTools.js");
const data$2 = [
  {
    id: 1,
    name: "\u5B9E\u4E60",
    active: ""
  },
  {
    id: 2,
    name: "\u6821\u62DB",
    active: ""
  },
  {
    id: 3,
    name: "\u793E\u62DB",
    active: ""
  }
];
var type_list = {
  data: data$2
};
const data$1 = [
  {
    id: 1,
    name: "\u91CD\u5E86",
    active: ""
  },
  {
    id: 2,
    name: "\u5317\u4EAC",
    active: ""
  },
  {
    id: 3,
    name: "\u4E0A\u6D77",
    active: ""
  },
  {
    id: 4,
    name: "\u676D\u5DDE",
    active: ""
  }
];
var city_list = {
  data: data$1
};
const data = [
  {
    id: 1,
    name: "\u91D1\u878D",
    active: ""
  },
  {
    id: 2,
    name: "IT",
    active: ""
  },
  {
    id: 3,
    name: "\u6559\u80B2",
    active: ""
  }
];
var job_list = {
  data
};
const searchItem = () => "../../common/searchItem.js";
const searchPopup = () => "../../common/SearchPopup.js";
const selSortType = ["\u6309\u65F6\u95F4\u6392\u5E8F", "\u6309\u70B9\u8D5E\u6570\u6392\u5E8F", "\u6309\u53EF\u4FE1\u5EA6\u6392\u5E8F"];
const _sfc_main = {
  components: {
    searchItem,
    searchPopup
  },
  props: {
    inputValue: String
  },
  setup(props) {
    const popList = pages_utils_cityListTools.getPopCityList();
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
    const selSortTypeItem = selSortType;
    common_vendor.onMounted(() => {
      showAll();
    });
    const tabStatus = common_vendor.ref(1);
    const changeTab = (target) => {
      tabStatus.value = target;
    };
    const sendInformation = common_vendor.reactive({
      information: props.inputValue,
      city: 0,
      type: "",
      profession: "",
      order: tabStatus.value,
      currentPage: 1,
      pageSize: 10
    });
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
    function chooseType(typeId) {
      for (let i = 0; i < typeList.data.length; i++) {
        typeList.data[i].active = "";
      }
      typeList.data[typeId - 1].active = "active";
      sendInformation.type = typeId;
      console.log(typeId);
    }
    function chooseCity(cityId) {
      sendInformation.city = cityId;
      for (let i = 0; i < cityList.data.length; i++) {
        cityList.data[i].active = "";
      }
      cityList.data[cityId - 1].active = "active";
    }
    function chooseJob(jobId) {
      sendInformation.profession = jobId;
      for (let i = 0; i < jobList.data.length; i++) {
        jobList.data[i].active = "";
      }
      jobList.data[jobId - 1].active = "active";
    }
    const typeList = common_vendor.reactive(type_list);
    const cityList = common_vendor.reactive(city_list);
    const jobList = common_vendor.reactive(job_list);
    const dataAll = {
      currentPage: 1,
      pageSize: 5
    };
    function showAll() {
      pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.ordinaryGetAllWork, dataAll, {
        success(res) {
          if (res.message === "success") {
            operateData(res.data.data);
          }
        },
        fail() {
        }
      }, true);
    }
    function search() {
      let data2 = {};
      if (sendInformation.information)
        data2.information = sendInformation.information;
      if (tabTarget.value)
        data2.order = tabTarget.value;
      pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.ordinaryGetActicleList, data2, {
        success(res) {
          if (res.message === "success") {
            operateData(res.data.data);
          }
        },
        fail() {
        }
      }, true);
    }
    function operateData(data2) {
      detail.data = [];
      data2.forEach((item) => {
        detail.data.push(item);
      });
    }
    const tabTarget = common_vendor.ref(1);
    const changeTabTarget = (target) => {
      tabTarget.value = target;
      search();
    };
    let detail = common_vendor.reactive({
      data: []
    });
    const PopupRefList = common_vendor.reactive([]);
    const pushPopupRef = (e) => {
      if (e)
        PopupRefList.push(e);
    };
    const open = (data2) => {
      console.log(PopupRefList);
      searchPopupList[data2].showIndexedList = true;
      PopupRefList[data2].popup.open("bottom");
    };
    const selectedItem = common_vendor.reactive([]);
    return {
      selSortTypeItem,
      pushPopupRef,
      searchPopupList,
      sendInformation,
      open,
      detail,
      tabStatus,
      changeList,
      chooseType,
      chooseCity,
      chooseJob,
      showList,
      typeList,
      cityList,
      jobList,
      changeTab,
      showCollapse,
      closeCollapse,
      openCollapse,
      tabTarget,
      changeTabTarget,
      search,
      operateData,
      selectedItem
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
    a: common_vendor.o(($event) => $setup.search()),
    b: common_vendor.o(($event) => $setup.sendInformation.information = $event),
    c: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0/\u57CE\u5E02/\u5C97\u4F4D",
      prefixIcon: "search",
      modelValue: $setup.sendInformation.information
    }),
    d: common_vendor.f($setup.typeList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(item.active),
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseType(item.id), item.id)
      };
    }),
    e: common_vendor.f($setup.cityList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(item.active),
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseCity(item.id), item.id)
      };
    }),
    f: common_vendor.o(($event) => $setup.open(0)),
    g: common_vendor.f($setup.jobList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(item.active),
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseJob(item.id), item.id)
      };
    }),
    h: common_vendor.o(($event) => $setup.open(1)),
    i: common_vendor.f($setup.selSortTypeItem, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item,
        c: $setup.tabTarget === item ? 1 : "",
        d: common_vendor.o(($event) => $setup.changeTabTarget(item))
      };
    }),
    j: common_vendor.f($setup.detail.data, (item, k0, i0) => {
      return {
        a: "571a6f38-1-" + i0,
        b: common_vendor.p({
          detail: item,
          type: 1
        }),
        c: item.id
      };
    }),
    k: common_vendor.f($setup.searchPopupList, (item, k0, i0) => {
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
    l: $setup.pushPopupRef
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-571a6f38"]]);
wx.createPage(MiniProgramPage);
