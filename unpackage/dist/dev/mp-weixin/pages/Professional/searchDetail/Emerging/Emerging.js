"use strict";
var common_vendor = require("../../../../common/vendor.js");
var config_configData = require("../../../../config/configData.js");
var utils_cityListTools = require("../../../../utils/cityListTools.js");
var pages_Professional_searchDetail_Emerging_constants = require("./constants.js");
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
    const selSortTypeItem = pages_Professional_searchDetail_Emerging_constants.selSortType;
    const tabTarget = common_vendor.reactive({
      order: ""
    });
    const sendInformation = common_vendor.reactive({
      information: props.inputValue,
      city: [],
      dSalary: null,
      hSalary: null,
      order: "",
      currentPage: 0,
      pageSize: 0
    });
    const changeTabTarget = (target) => {
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
    function chooseCity(cityCode) {
      if (cityClassID.id !== cityCode) {
        sendInformation.city = cityCode;
        cityClassID.id = cityCode;
        search();
      } else {
        cityClassID.id = 0;
      }
    }
    const yearOrMonthSalary = common_vendor.ref(false);
    function changeYearOrMonthSalary() {
      if (yearOrMonthSalary.value) {
        sendInformation.dSalary = sendInformation.dSalary === null ? null : Math.floor(sendInformation.dSalary / 12);
        sendInformation.hSalary = sendInformation.hSalary === null ? null : Math.floor(sendInformation.hSalary / 12);
      } else {
        sendInformation.dSalary = sendInformation.dSalary === null ? null : sendInformation.dSalary * 12;
        sendInformation.hSalary = sendInformation.hSalary === null ? null : sendInformation.hSalary * 12;
      }
      yearOrMonthSalary.value = !yearOrMonthSalary.value;
    }
    function chooseSalary(salaryId) {
      yearOrMonthSalary.value = false;
      for (let i = 0; i < salaryList.data.length; i++) {
        salaryList.data[i].active = "";
      }
      salaryList.data[salaryId - 1].active = "active";
      switch (salaryId) {
        case 1:
          sendInformation.dSalary = 0;
          sendInformation.hSalary = 1e4;
          break;
        case 2:
          sendInformation.dSalary = 1e4;
          sendInformation.hSalary = 5e4;
          break;
        case 3:
          sendInformation.dSalary = 5e4;
          sendInformation.hSalary = null;
          break;
      }
    }
    const cityClassID = common_vendor.reactive({ id: 0 });
    const cityList = common_vendor.reactive(utils_cityListTools.addHotCity(config_configData.SCREEN_CITY));
    const salaryList = common_vendor.reactive(pages_Professional_searchDetail_Emerging_constants.SALARY_LIST);
    function search() {
      detail.data = [];
      if (sendInformation.information === "" || !sendInformation.information)
        return;
      if (!checkSalary()) {
        common_vendor.index.showModal({
          content: "\u8F93\u5165\u4E0D\u6B63\u786E\uFF01\u8BF7\u91CD\u65B0\u8F93\u5165!",
          showCancel: false
        });
        return;
      }
      const data = {};
      if (sendInformation.information)
        data.information = sendInformation.information;
      if (tabTarget.order)
        data.order = sendInformation.order;
      utils_sendPostRequest.sendPostRequest(utils_route.router.emergingGetActicleList, data, {
        success(res) {
          if (res.message === "success") {
            operateData(res.data.data);
          } else {
            {
              operateData(config_MAKRDATA.EMERGING.data.data);
            }
          }
        },
        fail() {
          {
            operateData(config_MAKRDATA.EMERGING.data.data);
          }
        }
      }, true);
    }
    function checkSalary() {
      const testReg = /^(0|[1-9][0-9]*)$/;
      if (sendInformation.dSalary === null || sendInformation.hSalary === null)
        return true;
      if (testReg.test(sendInformation.dSalary) && testReg.test(sendInformation.hSalary)) {
        return sendInformation.dSalary < sendInformation.hSalary;
      }
      return false;
    }
    function operateData(info) {
      console.log("info", info);
      detail.data = [];
      Array.isArray(info) && info.forEach((item) => {
        detail.data.push(item);
      });
    }
    const detail = common_vendor.reactive({
      data: []
    });
    const showIndexedList = common_vendor.ref(false);
    const searchPopup2 = common_vendor.ref(null);
    const open = () => {
      showIndexedList.value = true;
      searchPopup2.value.popup.open("bottom");
    };
    const changeShowIndexedList = (data) => {
      showIndexedList.value = data;
    };
    const popList = utils_cityListTools.getPopCityList();
    const getResult = (res) => {
      console.log("getResult", res);
    };
    function clearActive() {
      for (let i = 0; i < salaryList.data.length; i++) {
        salaryList.data[i].active = "";
      }
    }
    const myList = [
      "qwe",
      "wsd",
      "dff",
      "ssxc",
      "asd123",
      "sd34",
      123
    ];
    const seledType = common_vendor.reactive({
      type: "active"
    });
    const changePage = (value) => {
      if (value === 2) {
        return;
      } else {
        seledType.type = "";
        common_vendor.index.redirectTo({
          url: "../Ordinary/ordinary"
        });
      }
    };
    return {
      cityClassID,
      seledType,
      changePage,
      selSortTypeItem,
      getResult,
      showIndexedList,
      changeShowIndexedList,
      myList,
      sendInformation,
      search,
      popList,
      open,
      searchPopup: searchPopup2,
      detail,
      changeList,
      showList,
      cityList,
      salaryList,
      showCollapse,
      closeCollapse,
      openCollapse,
      tabTarget,
      changeTabTarget,
      chooseCity,
      chooseSalary,
      clearActive,
      operateData,
      checkSalary,
      yearOrMonthSalary,
      changeYearOrMonthSalary
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
  return common_vendor.e({
    a: common_vendor.o(($event) => $setup.search()),
    b: common_vendor.o(($event) => $setup.sendInformation.information = $event),
    c: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0/\u57CE\u5E02/\u5C97\u4F4D",
      prefixIcon: "search",
      modelValue: $setup.sendInformation.information
    }),
    d: common_vendor.f($setup.cityList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.city),
        b: ($setup.cityClassID.id === item.cityCode ? true : false) ? 1 : "",
        c: item.cityCode,
        d: common_vendor.o(($event) => $setup.chooseCity(item.cityCode), item.cityCode)
      };
    }),
    e: common_vendor.o($setup.clearActive),
    f: common_vendor.o(($event) => $setup.sendInformation.dSalary = $event),
    g: common_vendor.p({
      type: "number",
      placeholder: "\u6700\u4F4E\u5DE5\u8D44",
      modelValue: $setup.sendInformation.dSalary
    }),
    h: common_vendor.o($setup.clearActive),
    i: common_vendor.o(($event) => $setup.sendInformation.hSalary = $event),
    j: common_vendor.p({
      type: "number",
      placeholder: "\u6700\u9AD8\u5DE5\u8D44",
      modelValue: $setup.sendInformation.hSalary
    }),
    k: !$setup.yearOrMonthSalary
  }, !$setup.yearOrMonthSalary ? {
    l: common_vendor.o((...args) => $setup.changeYearOrMonthSalary && $setup.changeYearOrMonthSalary(...args))
  } : {}, {
    m: $setup.yearOrMonthSalary
  }, $setup.yearOrMonthSalary ? {
    n: common_vendor.o((...args) => $setup.changeYearOrMonthSalary && $setup.changeYearOrMonthSalary(...args))
  } : {}, {
    o: common_vendor.f($setup.salaryList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(item.active),
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseSalary(item.id), item.id)
      };
    }),
    p: common_vendor.f($setup.selSortTypeItem, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.sortType),
        b: $setup.tabTarget.order === item.order ? 1 : "",
        c: common_vendor.o(($event) => $setup.changeTabTarget(item.order), _ctx.index)
      };
    }),
    q: _ctx.index,
    r: common_vendor.f($setup.detail.data, (item, k0, i0) => {
      return {
        a: "5ff45318-3-" + i0,
        b: common_vendor.p({
          detail: item,
          type: 2
        }),
        c: item.id
      };
    }),
    s: common_vendor.o(($event) => $setup.changePage(1)),
    t: common_vendor.n($setup.seledType.type),
    v: common_vendor.o(($event) => $setup.changePage(2)),
    w: common_vendor.sr("searchPopup", "5ff45318-4"),
    x: common_vendor.o($setup.changeShowIndexedList),
    y: common_vendor.o($setup.getResult),
    z: common_vendor.p({
      comBoxText: "\u8BF7\u8F93\u5165\u57CE\u5E02",
      showIndexedList: $setup.showIndexedList,
      comBoxList: $setup.myList,
      indexedList: $setup.popList
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5ff45318"], ["__file", "/Users/xuqingfeng/web/project/salary-record/pages/Professional/searchDetail/Emerging/Emerging.vue"]]);
wx.createPage(MiniProgramPage);
