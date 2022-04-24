"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("../../utils/utils/sendPostRequest.js");
var pages_utils_route = require("../../utils/route.js");
var _imports_0 = "/pages/Professional/professionalDetail/image/release.png";
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
    a: _imports_0,
    b: common_vendor.t($setup.detailData.comName),
    c: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.comName)),
    d: _imports_0,
    e: common_vendor.t($setup.detailData.comAddress),
    f: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.comAddress)),
    g: _imports_0,
    h: common_vendor.t($setup.detailData.posName),
    i: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.posName)),
    j: _imports_0,
    k: common_vendor.t($setup.detailData.posSalary),
    l: _imports_0,
    m: common_vendor.t(10),
    n: _imports_0,
    o: common_vendor.t($setup.detailData.profession),
    p: _imports_0,
    q: common_vendor.t($setup.detailData.education),
    r: _imports_0,
    s: common_vendor.t("2022.1.4"),
    t: _imports_0,
    v: common_vendor.t($setup.detailData.pageView),
    w: common_vendor.t(100),
    x: _imports_0,
    y: common_vendor.t($setup.detailData.quantity),
    z: common_vendor.t(100),
    A: _imports_0,
    B: _imports_0,
    C: common_vendor.t($setup.detailData.explain)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a9323b40"]]);
wx.createPage(MiniProgramPage);
