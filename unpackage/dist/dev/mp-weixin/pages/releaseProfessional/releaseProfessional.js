"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_sendPostRequest = require("../../utils/sendPostRequest.js");
var pages_releaseProfessional_constants = require("./constants.js");
var config_typeData = require("../../config/typeData.js");
var utils_route = require("../../utils/route.js");
var store_index = require("../../store/index.js");
const _sfc_main = {
  setup() {
    const clearPage = () => {
      company.value = "";
      job.value = "";
      store_index.store.commit("clearCity");
      salary.value = null;
      dSalary.value = "";
      hSalary.value = "";
      selIndustry.name = "\u8BF7\u9009\u62E9\u884C\u4E1A";
      job_note.value = "";
    };
    const tabStatus = common_vendor.ref(1);
    const changeTab = (data) => {
      if (company.value !== "" || job.value !== "" || job_note.value !== "" || dSalary.value !== "" || hSalary.value !== "" || selIndustry.name !== "\u8BF7\u9009\u62E9\u884C\u4E1A" || salary.value !== null || storeCity.defaultCity !== "\u5317\u4EAC\u5E02") {
        common_vendor.index.showModal({
          content: "\u6B64\u64CD\u4F5C\u4F1A\u6E05\u7A7A\u5DF2\u8F93\u5165\u4FE1\u606F\uFF0C\u786E\u5B9A\u5417\uFF1F",
          success(res) {
            if (res.confirm) {
              clearPage();
              tabStatus.value = data;
            }
          }
        });
      } else {
        clearPage();
        tabStatus.value = data;
      }
    };
    const styles = {
      borderColor: "white"
    };
    const company = common_vendor.ref("");
    const job = common_vendor.ref("");
    const storeCity = store_index.store.state.city;
    const salary = common_vendor.ref(null);
    const dSalary = common_vendor.ref("");
    const hSalary = common_vendor.ref("");
    const typelist = config_typeData.TYPE_LIST;
    const selType = common_vendor.reactive({
      id: 1,
      name: ""
    });
    const changeSelType = (data) => {
      selType.id = data;
    };
    const selEducation = common_vendor.reactive({
      id: 0,
      name: "\u8BF7\u9009\u62E9\u5B66\u5386"
    });
    let eduList = common_vendor.reactive([]);
    {
      eduList = pages_releaseProfessional_constants.EDU_LIST;
    }
    function changeEducation(e) {
      selEducation.name = eduList[e.detail.value].degreeName;
      selEducation.id = eduList[e.detail.value].id;
    }
    const selIndustry = common_vendor.reactive({
      id: 0,
      name: "\u8BF7\u9009\u62E9\u884C\u4E1A"
    });
    let induList = common_vendor.reactive([]);
    {
      induList = tabStatus.value === 1 ? pages_releaseProfessional_constants.INDU_LIST.ordinary : pages_releaseProfessional_constants.INDU_LIST.emerging;
    }
    function changeIndustry(e) {
      selIndustry.name = induList[e.detail.value].professionName;
      selIndustry.id = induList[e.detail.value].id;
    }
    const job_note = common_vendor.ref("");
    function showDetail() {
      common_vendor.index.showModal({
        content: "\u4E25\u7981\u53D1\u5E03\u4E0D\u826F\u4FE1\u606F\uFF0C\u8FDD\u6CD5\u5FC5\u7A76\r\r\n\u6240\u6709\u6570\u636E\u672A\u7ECF\u5141\u8BB8\u4E0D\u5F97\u76D7\u7528\uFF0C\u4FB5\u6743\u5FC5\u7A76\r\n\u4FE1\u606F\u5747\u4E3A\u7528\u6237\u81EA\u613F\u5171\u4EAB\u53D1\u5E03\r\n\u5E0C\u671B\u5927\u5BB6\u80FD\u81EA\u89C9\u9075\u5B88\u58F0\u660E",
        showCancel: false
      });
    }
    function submit() {
      if (company.value === "" || salary.value === "") {
        common_vendor.index.showModal({
          content: "\u8BF7\u586B\u5B8C\u5E26*\u7684\u9009\u9879",
          showCancel: false
        });
        return;
      }
      if (tabStatus.value === 1) {
        common_vendor.index.showModal({
          content: "\u4F60\u786E\u5B9A\u8981\u63D0\u4EA4\u5417\uFF1F",
          success(res) {
            if (res.confirm) {
              let sendInformation = {
                company: company.value,
                post: job.value,
                city: storeCity.defaultCityID,
                salaryNUm: parseInt(salary.value),
                salaryStr: salary.value,
                salaryRange: dSalary.value + hSalary.value,
                type: tabStatus.value === 1 ? selType.id : 0,
                degree: selEducation.id,
                profession: selIndustry.id,
                openid: "53de05c8582341ad9a8a967f4baf00bc",
                from: "WEI_XIN",
                explain: job_note.value
              };
              utils_sendPostRequest.sendPostRequest(utils_route.router.ordinaryPublish, sendInformation, {
                success() {
                  common_vendor.index.showModal({
                    content: "\u63D0\u4EA4\u6210\u529F\uFF01",
                    showCancel: false
                  });
                },
                fail() {
                }
              }, true);
            } else if (res.cancel) {
              return;
            }
          }
        });
      } else {
        common_vendor.index.showModal({
          content: "\u4F60\u786E\u5B9A\u8981\u63D0\u4EA4\u5417\uFF1F",
          success(res) {
            if (res.confirm) {
              let sendInformation = {
                company: company.value,
                post: job.value,
                city: storeCity.defaultCityID,
                salaryNUm: parseInt(salary.value),
                salaryStr: salary.value,
                salaryRange: dSalary.value + hSalary.value,
                profession: selIndustry.id,
                openid: "53de05c8582341ad9a8a967f4baf00bc",
                from: "WEI_XIN",
                explain: job_note.value
              };
              utils_sendPostRequest.sendPostRequest(utils_route.router.emergingPublish, sendInformation, {
                success() {
                  common_vendor.index.showModal({
                    content: "\u63D0\u4EA4\u6210\u529F\uFF01",
                    showCancel: false
                  });
                },
                fail() {
                }
              }, true);
            } else if (res.cancel) {
              return;
            }
          }
        });
      }
    }
    common_vendor.onMounted(() => {
    });
    return {
      styles,
      dSalary,
      hSalary,
      storeCity,
      salary,
      company,
      job,
      tabStatus,
      changeTab,
      typelist,
      job_note,
      selType,
      changeSelType,
      selEducation,
      selIndustry,
      changeEducation,
      changeIndustry,
      submit,
      showDetail,
      eduList,
      induList
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.tabStatus === 1 ? 1 : "",
    b: common_vendor.o(($event) => $setup.changeTab(1)),
    c: $setup.tabStatus === 2 ? 1 : "",
    d: common_vendor.o(($event) => $setup.changeTab(2)),
    e: common_vendor.o(($event) => $setup.company = $event),
    f: common_vendor.p({
      placeholder: $setup.tabStatus === 1 ? "\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0" : "\u5FEB\u9012\u516C\u53F8/\u7F8E\u56E2/\u6296\u97F3",
      styles: $setup.styles,
      modelValue: $setup.company
    }),
    g: common_vendor.o(($event) => $setup.job = $event),
    h: common_vendor.p({
      placeholder: $setup.tabStatus === 1 ? "\u8F93\u5165\u5C97\u4F4D\u540D\u79F0" : "\u5916\u5356/\u5FEB\u9012/\u76F4\u64AD/\u7F51\u7EA6\u8F66",
      styles: $setup.styles,
      modelValue: $setup.job
    }),
    i: common_vendor.o(($event) => $setup.salary = $event),
    j: common_vendor.p({
      placeholder: "\u5982:28W\u6216\u800514*13",
      styles: $setup.styles,
      modelValue: $setup.salary
    }),
    k: $setup.tabStatus === 1
  }, $setup.tabStatus === 1 ? {
    l: common_vendor.f($setup.typelist, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: $setup.selType.id === item.id ? 1 : "",
        d: common_vendor.o(($event) => $setup.changeSelType(item.id), item.id)
      };
    })
  } : {}, {
    m: $setup.tabStatus === 1
  }, $setup.tabStatus === 1 ? {
    n: common_vendor.t($setup.selEducation.name),
    o: common_vendor.o((...args) => $setup.changeEducation && $setup.changeEducation(...args)),
    p: $setup.eduList
  } : {}, {
    q: common_vendor.t($setup.selIndustry.name),
    r: common_vendor.o((...args) => $setup.changeIndustry && $setup.changeIndustry(...args)),
    s: $setup.induList,
    t: common_vendor.t($setup.storeCity.defaultCity),
    v: common_vendor.o(($event) => $setup.job_note = $event),
    w: common_vendor.p({
      type: "textarea",
      placeholder: "\u53EF\u586B\u5199\u5DE5\u4F5C\u8BE6\u7EC6\u4FE1\u606F,\u5982\u798F\u5229\u8865\u8D34,\u798F\u5229\u5F85\u9047\u7B49",
      styles: $setup.styles,
      modelValue: $setup.job_note
    }),
    x: common_vendor.o((...args) => $setup.showDetail && $setup.showDetail(...args)),
    y: common_vendor.o((...args) => $setup.submit && $setup.submit(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ce65f5b8"], ["__file", "/Users/xuqingfeng/web/wudingxuan/salary-record/pages/releaseProfessional/releaseProfessional.vue"]]);
wx.createPage(MiniProgramPage);
