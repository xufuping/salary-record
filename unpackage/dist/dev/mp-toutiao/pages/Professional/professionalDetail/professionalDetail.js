"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("../../utils/sendPostRequest.js");
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
      let data = {
        normalWork: 0
      };
      pages_utils_utils_sendPostRequest.sendPostRequest(type.value === 1 ? pages_utils_route.router.ordinaryGetDetail : pages_utils_route.router.rouemergingGetDetail, id.value, data, {
        success(res) {
          if (res.message === "success") {
            operateData(res.data.data);
          }
        },
        fail() {
        }
      });
    }
    function operateData(data) {
      console.log("DATA", data);
      detailData.posName = data.data.data.post;
      detailData.posSalary = data.data.data.salary;
      detailData.comAddress = data.data.data.city.cityName;
      detailData.education = data.data.data.degree.degreeName;
      detailData.posType = data.data.data.type.typeName;
      detailData.comName = data.data.data.company;
      detailData.releaseTime = data.data.data.createTime;
      detailData.explain = data.data.data.explain;
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
    return {
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
    a: common_vendor.t($setup.detailData.posName),
    b: common_vendor.t($setup.detailData.posSalary),
    c: common_vendor.t($setup.detailData.comAddress),
    d: common_vendor.t($setup.detailData.education),
    e: common_vendor.t($setup.detailData.posType),
    f: common_vendor.t($setup.detailData.comName),
    g: common_vendor.t($setup.detailData.releaseTime),
    h: common_vendor.t(1),
    i: common_vendor.t(0),
    j: common_vendor.t($setup.detailData.explain)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a9323b40"]]);
tt.createPage(MiniProgramPage);
