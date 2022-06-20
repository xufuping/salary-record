"use strict";
var common_vendor = require("../../../common/vendor.js");
var utils_sendPostRequest = require("../../../utils/sendPostRequest.js");
var utils_route = require("../../../utils/route.js");
var config_professionalDetailMock = require("../../../config/professionalDetailMock.js");
const _sfc_main = {
  props: {
    type: Number,
    id: Number
  },
  setup(props) {
    common_vendor.onMounted(() => {
      search();
    });
    const type = common_vendor.ref(props.type);
    const id = common_vendor.ref(props.id);
    function search() {
      ({
        workId: id.value
      });
      {
        type.value === 1 ? operateData(config_professionalDetailMock.ORDINARY_DETAIL.data) : operateData(config_professionalDetailMock.EMERGING_DETAIL.data);
      }
    }
    function operateData(data) {
      var _a, _b;
      detailData.posName = data.post;
      detailData.posSalary = data.salaryStr;
      detailData.comAddress = data.city.cityName;
      detailData.education = (_a = data.degree) == null ? void 0 : _a.degreeName;
      detailData.profession = (_b = data.profession) == null ? void 0 : _b.professionName;
      detailData.comName = data.company;
      detailData.releaseTime = data.createTime;
      detailData.explain = data.explain;
      detailData.pageView = data.lookCount;
      detailData.quantity = data.likeCount;
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
    const routeOfPage = {
      ordinary: "../searchDetail/Ordinary/ordinary",
      emerging: "../searchDetail/Emerging/Emerging"
    };
    const searchUpper = (value) => {
      common_vendor.index.navigateTo({
        url: (type.value === 1 ? routeOfPage.ordinary : routeOfPage.emerging) + "?inputValue=" + value
      });
    };
    const likeCount = () => {
      const like = {
        workId: id.value,
        likeType: "LIKE",
        workType: type.value === 1 ? "NORMAL" : "NEW"
      };
      utils_sendPostRequest.sendPostRequest(utils_route.router.updateLikeNum, like, {
        success(res) {
          console.log("resLike", res);
          if (res.message === "success") {
            console.log("LIke", res);
          }
        },
        fail() {
        }
      }, true);
    };
    const changeTide = {
      believe: "BELIEVE",
      disbelieve: "DISBELIEVE"
    };
    const believeOprater = (believe) => {
      const credibility = {
        workId: id.value,
        credibilityType: believe,
        workType: type.value === 1 ? "NORMAL" : "NEW"
      };
      utils_sendPostRequest.sendPostRequest(utils_route.router.credibilityOprater, credibility, {
        success(res) {
          if (res.message === "success") {
            console.log("credibility", res);
          }
        },
        fail() {
        }
      }, true);
    };
    return {
      changeTide,
      believeOprater,
      likeCount,
      searchUpper,
      type,
      id,
      operateData,
      detailData
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($setup.detailData.posSalary),
    b: common_vendor.t($setup.detailData.comAddress),
    c: common_vendor.t($setup.detailData.profession),
    d: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.comAddress)),
    e: common_vendor.t($setup.detailData.posName),
    f: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.posName)),
    g: common_vendor.t($setup.detailData.comName),
    h: common_vendor.o(($event) => $setup.searchUpper($setup.detailData.comName)),
    i: common_vendor.t($setup.detailData.education),
    j: common_vendor.t($setup.detailData.releaseTime),
    k: common_vendor.t($setup.detailData.pageView),
    l: common_vendor.o(($event) => $setup.believeOprater($setup.changeTide.believe)),
    m: common_vendor.o(($event) => $setup.believeOprater($setup.changeTide.disbelieve)),
    n: common_vendor.o((...args) => $setup.likeCount && $setup.likeCount(...args)),
    o: common_vendor.t($setup.detailData.quantity)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a9323b40"], ["__file", "/Users/xuqingfeng/web/wudingxuan/salary-record/pages/Professional/professionalDetail/professionalDetail.vue"]]);
wx.createPage(MiniProgramPage);
