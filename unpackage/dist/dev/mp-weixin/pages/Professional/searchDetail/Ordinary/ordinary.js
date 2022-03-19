"use strict";
var common_vendor = require("../../../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("../../../utils/utils/sendPostRequest.js");
var pages_utils_route = require("../../../utils/route.js");
var city_pop_list = [
  {
    letter: "A",
    data: [
      "\u978D\u5C71",
      "\u5B89\u9633",
      "\u5B89\u5EB7"
    ]
  },
  {
    letter: "B",
    data: [
      "\u5317\u4EAC",
      "\u5305\u5934",
      "\u4FDD\u5B9A",
      "\u868C\u57E0",
      "\u6EE8\u5DDE",
      "\u5B9D\u9E21",
      "\u767E\u8272",
      "\u5317\u6D77",
      "\u6BD5\u8282"
    ]
  },
  {
    letter: "C",
    data: [
      "\u957F\u6625",
      "\u6210\u90FD",
      "\u91CD\u5E86",
      "\u957F\u6C99",
      "\u5E38\u5DDE"
    ]
  },
  {
    letter: "D",
    data: [
      "\u5927\u8FDE",
      "\u4E1C\u839E",
      "\u5927\u540C",
      "\u5927\u5E86",
      "\u4E39\u4E1C",
      "\u8FBE\u5DDE"
    ]
  },
  {
    letter: "E",
    data: [
      "\u9102\u5C14\u591A\u65AF",
      "\u6069\u65BD"
    ]
  },
  {
    letter: "F",
    data: [
      "\u798F\u5DDE",
      "\u4F5B\u5C71",
      "\u9632\u57CE\u6E2F"
    ]
  },
  {
    letter: "G",
    data: [
      "\u8D35\u9633",
      "\u5E7F\u5DDE",
      "\u6842\u6797",
      "\u8D63\u5DDE",
      "\u5E7F\u5B89"
    ]
  },
  {
    letter: "H",
    data: [
      "\u54C8\u5C14\u6EE8",
      "\u547C\u548C\u6D69\u7279",
      "\u5408\u80A5",
      "\u676D\u5DDE",
      "\u6D77\u53E3",
      "\u90AF\u90F8",
      "\u6E56\u5DDE"
    ]
  },
  {
    letter: "I",
    data: []
  },
  {
    letter: "J",
    data: [
      "\u6D4E\u5357",
      "\u5409\u6797",
      "\u5609\u5174",
      "\u91D1\u534E",
      "\u7126\u4F5C",
      "\u666F\u5FB7\u9547"
    ]
  },
  {
    letter: "K",
    data: [
      "\u6606\u660E",
      "\u5F00\u5C01"
    ]
  },
  {
    letter: "L",
    data: [
      "\u5170\u5DDE",
      "\u62C9\u8428",
      "\u8FDE\u4E91\u6E2F",
      "\u6D1B\u9633",
      "\u67F3\u5DDE",
      "\u516D\u76D8\u6C34",
      "\u4E3D\u6C5F"
    ]
  },
  {
    letter: "M",
    data: [
      "\u7EF5\u9633",
      "\u8302\u540D",
      "\u9A6C\u978D\u5C71"
    ]
  },
  {
    letter: "N",
    data: [
      "\u5357\u4EAC",
      "\u5357\u660C",
      "\u5357\u5B81",
      "\u5B81\u6CE2",
      "\u5357\u901A",
      "\u5357\u9633"
    ]
  },
  {
    letter: "O",
    data: []
  },
  {
    letter: "P",
    data: [
      "\u8386\u7530",
      "\u5E73\u9876\u5C71",
      "\u6500\u679D\u82B1",
      "\u666E\u6D31"
    ]
  },
  {
    letter: "Q",
    data: [
      "\u9752\u5C9B",
      "\u79E6\u7687\u5C9B",
      "\u9F50\u9F50\u54C8\u5C14"
    ]
  },
  {
    letter: "R",
    data: [
      "\u65E5\u7167"
    ]
  },
  {
    letter: "S",
    data: [
      "\u6C88\u9633",
      "\u77F3\u5BB6\u5E84",
      "\u4E0A\u6D77",
      "\u6DF1\u5733",
      "\u6C55\u5934",
      "\u4E09\u4E9A",
      "\u82CF\u5DDE",
      "\u7ECD\u5174",
      "\u5341\u5830",
      "\u5546\u4E18",
      "\u4E09\u95E8\u5CE1"
    ]
  },
  {
    letter: "T",
    data: [
      "\u5929\u6D25",
      "\u592A\u539F",
      "\u5510\u5C71",
      "\u6CF0\u5B89"
    ]
  },
  {
    letter: "U",
    data: []
  },
  {
    letter: "V",
    data: []
  },
  {
    letter: "W",
    data: [
      "\u4E4C\u9C81\u6728\u9F50",
      "\u6B66\u6C49",
      "\u65E0\u9521",
      "\u6E29\u5DDE",
      "\u6F4D\u574A",
      "\u5A01\u6D77",
      "\u829C\u6E56"
    ]
  },
  {
    letter: "X",
    data: [
      "\u897F\u5B81",
      "\u897F\u5B89",
      "\u53A6\u95E8",
      "\u5F90\u5DDE",
      "\u8944\u9633",
      "\u5BA3\u57CE",
      "\u54B8\u9633",
      "\u897F\u53CC\u7248\u7EB3"
    ]
  },
  {
    letter: "Y",
    data: [
      "\u94F6\u5DDD",
      "\u5EF6\u5B89",
      "\u70DF\u53F0",
      "\u626C\u5DDE",
      "\u5B9C\u660C"
    ]
  },
  {
    letter: "Z",
    data: [
      "\u90D1\u5DDE",
      "\u6DC4\u535A",
      "\u4E2D\u5C71",
      "\u6E5B\u6C5F",
      "\u9547\u6C5F",
      "\u682A\u6D32",
      "\u73E0\u6D77"
    ]
  }
];
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
    const popList = city_pop_list;
    const searchPopupList = common_vendor.reactive([
      {
        id: 0,
        ref: "typePopup",
        comBoxText: "\u8BF7\u8F93\u5165\u7C7B\u578B",
        showIndexedList: true,
        comBoxList: [1, 2, 3, 4],
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
        id: 2,
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
    const listItem = list;
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
      pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.ordinaryGetAllNormalwork, dataAll, {
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
      listItem,
      pushPopupRef,
      searchPopupList,
      sendInformation,
      popList,
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
    e: common_vendor.o(($event) => $setup.open(0)),
    f: common_vendor.f($setup.cityList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(item.active),
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseCity(item.id), item.id)
      };
    }),
    g: common_vendor.o(($event) => $setup.open(1)),
    h: common_vendor.f($setup.jobList.data, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(item.active),
        c: item.id,
        d: common_vendor.o(($event) => $setup.chooseJob(item.id), item.id)
      };
    }),
    i: common_vendor.o(($event) => $setup.open(2)),
    j: common_vendor.f($setup.listItem, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item,
        c: $setup.tabTarget === item ? 1 : "",
        d: common_vendor.o(($event) => $setup.changeTabTarget(item))
      };
    }),
    k: common_vendor.f($setup.detail.data, (item, k0, i0) => {
      return {
        a: "571a6f38-1-" + i0,
        b: common_vendor.p({
          detail: item,
          type: 1
        }),
        c: item.id
      };
    }),
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-571a6f38"]]);
wx.createPage(MiniProgramPage);
