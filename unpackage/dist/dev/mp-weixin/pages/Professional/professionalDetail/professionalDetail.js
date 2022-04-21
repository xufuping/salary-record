"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("../../utils/utils/sendPostRequest.js");
var pages_utils_route = require("../../utils/route.js");
const _sfc_main = {
  props: {
    type: String,
    id: String
  },
  setup(props) {
    common_vendor.onMounted(() => {
      search();
    });
    const type = common_vendor.reactive(props.type);
    const id = common_vendor.ref(props.id);
    function search() {
      let data = {};
      pages_utils_utils_sendPostRequest.sendPostRequest(type.value === 1 ? pages_utils_route.router.ordinaryGetAllWork : pages_utils_route.router.ordinaryGetAllWork, data, {
        success(res) {
          console.log("REss", res);
          if (res.message === "success") {
            operateData(res.data.data);
          }
        },
        fail() {
        }
      }, true);
    }
    function operateData(data) {
      console.log("DATA", data);
      detailData.posName = data[0].post;
      detailData.posSalary = data[0].salaryStr;
      detailData.comAddress = data[0].city.cityName;
      detailData.education = data[0].degree.degreeName;
      detailData.profession = data[0].profession.professionName;
      detailData.comName = data[0].company;
      detailData.releaseTime = data[0].createTime;
      detailData.explain = data[0].explain;
      detailData.pageView = data[0].lookCount;
      detailData.quantity = data[0].likeCount;
    }
    const detailData = common_vendor.reactive({
      posName: null,
      posSalary: null,
      comAddress: null,
      education: null,
      posType: null,
      comName: null,
      releaseTime: null,
      explain: null
    });
    const searchUpper = (value) => {
      console.log(value);
      common_vendor.index.navigateTo({
        url: (type.value === 1 ? "../searchDetail/Ordinary/ordinary" : "../searchDetail/Emerging/Emerging") + "?inputValue=" + value
      });
    };
    return {
      searchUpper,
      type,
      id,
      search,
      operateData,
      detailData
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($setup.detailData.comName),
    b: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.comName)),
    c: common_vendor.t($setup.detailData.comAddress),
    d: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.comAddress)),
    e: common_vendor.t($setup.detailData.posName),
    f: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.posName)),
    g: common_vendor.t($setup.detailData.posSalary),
    h: common_vendor.t(10),
    i: common_vendor.t($setup.detailData.profession),
    j: common_vendor.t($setup.detailData.education),
    k: common_vendor.t("2022-01-04"),
    l: common_vendor.t($setup.detailData.pageView),
    m: common_vendor.t($setup.detailData.quantity),
    n: common_vendor.t(100),
    o: common_vendor.t($setup.detailData.explain)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a9323b40"]]);
wx.createPage(MiniProgramPage);
