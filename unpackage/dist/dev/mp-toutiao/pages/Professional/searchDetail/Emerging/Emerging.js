"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("../../../utils/sendPostRequest.js");
var pages_utils_route = require("../../../utils/route.js");
var pop_list = [
  {
    letter: "A",
    data: [
      "\u963F\u514B\u82CF\u673A\u573A",
      "\u963F\u62C9\u5C71\u53E3\u673A\u573A",
      "\u963F\u52D2\u6CF0\u673A\u573A",
      "\u963F\u91CC\u6606\u838E\u673A\u573A",
      "\u5B89\u5E86\u5929\u67F1\u5C71\u673A\u573A",
      "\u6FB3\u95E8\u56FD\u9645\u673A\u573A"
    ]
  },
  {
    letter: "B",
    data: [
      "\u4FDD\u5C71\u673A\u573A",
      "\u5305\u5934\u673A\u573A",
      "\u5317\u6D77\u798F\u6210\u673A\u573A",
      "\u5317\u4EAC\u5357\u82D1\u673A\u573A",
      "\u5317\u4EAC\u9996\u90FD\u56FD\u9645\u673A\u573A"
    ]
  },
  {
    letter: "c",
    data: [
      "\u4FDD\u5C71\u673A\u573A",
      "\u5305\u5934\u673A\u573A",
      "\u5317\u6D77\u798F\u6210\u673A\u573A",
      "\u5317\u4EAC\u5357\u82D1\u673A\u573A",
      "\u5317\u4EAC\u9996\u90FD\u56FD\u9645\u673A\u573A"
    ]
  },
  {
    letter: "d",
    data: [
      "\u4FDD\u5C71\u673A\u573A",
      "\u5305\u5934\u673A\u573A",
      "\u5317\u6D77\u798F\u6210\u673A\u573A",
      "\u5317\u4EAC\u5357\u82D1\u673A\u573A",
      "\u5317\u4EAC\u9996\u90FD\u56FD\u9645\u673A\u573A"
    ]
  }
];
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
  }
];
var city_list = {
  data: data$1
};
const data = [
  {
    id: 1,
    name: "0-10k",
    active: ""
  },
  {
    id: 2,
    name: "10k-50k",
    active: ""
  },
  {
    id: 3,
    name: "50k\u4EE5\u4E0A",
    active: ""
  }
];
var salary_list = {
  data
};
const searchItem = () => "../../common/searchItem.js";
const searchPopup = () => "../../common/SearchPopup.js";
const list = ["\u6309\u65F6\u95F4\u6392\u5E8F", "\u6309\u70B9\u8D5E\u6570\u6392\u5E8F", "\u6309\u53EF\u4FE1\u5EA6\u6392\u5E8F"];
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
    const listItem = list;
    const tabStatus = common_vendor.ref(1);
    const changeTab = (target2) => {
      tabStatus.value = target2;
    };
    const sendInformation = common_vendor.reactive({
      information: props.inputValue,
      city: 0,
      dSalary: null,
      hSalary: null,
      order: tabStatus.value,
      currentPage: 0,
      pageSize: 0
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
    function chooseCity(cityId) {
      for (let i = 0; i < cityList.data.length; i++) {
        cityList.data[i].active = "";
      }
      cityList.data[cityId - 1].active = "active";
      sendInformation.city = cityId;
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
    const cityList = common_vendor.reactive(city_list);
    const salaryList = common_vendor.reactive(salary_list);
    function search() {
      if (sendInformation.information === "" || !sendInformation.information)
        return;
      if (!checkSalary()) {
        common_vendor.index.showModal({
          content: "\u8F93\u5165\u4E0D\u6B63\u786E\uFF01\u8BF7\u91CD\u65B0\u8F93\u5165!",
          showCancel: false
        });
        return;
      }
      const data2 = {};
      if (sendInformation.information)
        data2.information = sendInformation.information;
      if (target.value)
        data2.order = target.value;
      pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.emergingGetActicleList, data2, {
        success(res) {
          if (res.message === "success") {
            console.log(res);
            operateData(data2);
          }
        },
        fail(error) {
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
    function operateData(data2) {
      sendInformation.currentPage = data2.data.currentPage;
      sendInformation.pageSize = data2.data.pageSize;
      detail.length = 0;
      for (let i = 0; i < data2.data.data.length; i++) {
        detail.push(data2.data.data[i]);
      }
    }
    const tabTarget = common_vendor.ref(1);
    const changeTabTarget = (target2) => {
      tabTarget.value = target2;
    };
    const detail = common_vendor.reactive([]);
    const showIndexedList = common_vendor.ref(false);
    const searchPopup2 = common_vendor.ref(null);
    const open = () => {
      showIndexedList.value = true;
      searchPopup2.value.popup.open("bottom");
    };
    const changeShowIndexedList = (data2) => {
      showIndexedList.value = data2;
    };
    const popList = pop_list;
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
    return {
      listItem,
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
      tabStatus,
      changeList,
      showList,
      cityList,
      salaryList,
      changeTab,
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
    d: common_vendor.f($setup.cityList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(item.active),
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseCity(item.id))
      };
    }),
    e: common_vendor.o((...args) => $setup.open && $setup.open(...args)),
    f: common_vendor.o($setup.clearActive),
    g: common_vendor.o(($event) => $setup.sendInformation.dSalary = $event),
    h: common_vendor.p({
      type: "number",
      placeholder: "\u6700\u4F4E\u5DE5\u8D44",
      modelValue: $setup.sendInformation.dSalary
    }),
    i: common_vendor.o($setup.clearActive),
    j: common_vendor.o(($event) => $setup.sendInformation.hSalary = $event),
    k: common_vendor.p({
      type: "number",
      placeholder: "\u6700\u9AD8\u5DE5\u8D44",
      modelValue: $setup.sendInformation.hSalary
    }),
    l: !$setup.yearOrMonthSalary
  }, !$setup.yearOrMonthSalary ? {
    m: common_vendor.o((...args) => $setup.changeYearOrMonthSalary && $setup.changeYearOrMonthSalary(...args))
  } : {}, {
    n: $setup.yearOrMonthSalary
  }, $setup.yearOrMonthSalary ? {
    o: common_vendor.o((...args) => $setup.changeYearOrMonthSalary && $setup.changeYearOrMonthSalary(...args))
  } : {}, {
    p: common_vendor.f($setup.salaryList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(item.active),
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseSalary(item.id))
      };
    }),
    q: common_vendor.f($setup.listItem, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: $setup.tabTarget === item ? 1 : "",
        c: common_vendor.o(($event) => $setup.changeTabTarget(item))
      };
    }),
    r: common_vendor.f($setup.detail, (item, k0, i0) => {
      return {
        a: "5ff45318-3-" + i0,
        b: common_vendor.p({
          detail: item,
          type: 2
        }),
        c: item.id
      };
    }),
    s: common_vendor.sr("searchPopup", "5ff45318-4"),
    t: common_vendor.o($setup.changeShowIndexedList),
    v: common_vendor.o($setup.getResult),
    w: common_vendor.p({
      comBoxText: "\u8BF7\u8F93\u5165\u57CE\u5E02",
      showIndexedList: $setup.showIndexedList,
      comBoxList: $setup.myList,
      indexedList: $setup.popList
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5ff45318"]]);
tt.createPage(MiniProgramPage);
