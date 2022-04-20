"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("../utils/utils/sendPostRequest.js");
var pages_utils_route = require("../utils/route.js");
var store_index = require("../../store/index.js");
var edu_list = [
  "\u5176\u4ED6",
  "\u7855\u58EB\u53CA\u4EE5\u4E0A",
  "\u672C\u79D1",
  "\u4E13\u79D1",
  "\u9AD8\u4E2D",
  "\u521D\u4E2D\u53CA\u4EE5\u4E0B"
];
var indu_list = [
  [
    "IT | \u901A\u4FE1 | \u4E92\u8054\u7F51",
    "\u91D1\u878D",
    "\u9500\u552E | \u5BA2\u670D | \u5E02\u573A",
    "\u8D22\u52A1 | \u4EBA\u529B\u8D44\u6E90 | \u884C\u653F",
    "\u9879\u76EE\u8D28\u91CF | \u9AD8\u7EA7\u7BA1\u7406",
    "\u623F\u4EA7 | \u5EFA\u7B51 | \u7269\u4E1A\u7BA1\u7406",
    "\u91C7\u8D2D | \u4EA4\u901A | \u8D38\u6613 | \u7269\u6D41",
    "\u751F\u4EA7 | \u5236\u9020",
    "\u4F20\u5A92 | \u827A\u672F | \u8BBE\u8BA1 | \u5370\u5237",
    "\u54A8\u8BE2 | \u6CD5\u5F8B | \u6559\u80B2 | \u7FFB\u8BD1",
    "\u670D\u52A1\u4E1A",
    "\u80FD\u6E90\u73AF\u4FDD | \u519C\u4E1A\u79D1\u7814",
    "\u5176\u4ED6\u884C\u4E1A"
  ],
  [
    "\u7F51\u7EDC\u4E3B\u64AD | \u89C6\u9891\u62CD\u6444 | \u535A\u4E3B",
    "\u5916\u5356 | \u95EA\u9001",
    "\u4EE3\u9A7E | \u7F51\u7EA6\u8F66",
    "\u5176\u4ED6\u884C\u4E1A"
  ]
];
var typeList = [
  {
    id: 1,
    label: "\u6821\u62DB"
  },
  {
    id: 2,
    label: "\u5B9E\u4E60"
  },
  {
    id: 3,
    label: "\u793E\u62DB"
  }
];
const _sfc_main = {
  setup() {
    const clearPage = () => {
      company.value = "";
      job.value = "";
      store_index.store.commit("clearCity");
      salary.value = null;
      sel_industry.value = "\u8BF7\u9009\u62E9\u884C\u4E1A";
      job_note.value = "";
    };
    const tabStatus = common_vendor.ref(1);
    const changeTab = (data) => {
      tabStatus.value = data;
      clearPage();
    };
    const company = common_vendor.ref("");
    const job = common_vendor.ref("");
    const storeCity = store_index.store.state.city;
    const salary = common_vendor.ref(0);
    const dSalary = common_vendor.ref("");
    const hSalary = common_vendor.ref("");
    const type_list = typeList;
    const selType = common_vendor.ref(1);
    const changeSelType = (data) => {
      selType.value = data;
    };
    const sel_education = common_vendor.ref("\u8BF7\u9009\u62E9\u5B66\u5386");
    const eduList = common_vendor.reactive(edu_list);
    function changeEducation(e) {
      sel_education.value = edu_list[e.detail.value];
    }
    const sel_industry = common_vendor.ref("\u8BF7\u9009\u62E9\u884C\u4E1A");
    const induList = common_vendor.reactive(indu_list);
    function changeIndustry(e) {
      sel_industry.value = indu_list[tabStatus.value - 1][e.detail.value];
    }
    const job_note = common_vendor.ref("");
    function showDetail() {
      common_vendor.index.showModal({
        content: "\u4E25\u7981\u53D1\u5E03\u4E0D\u826F\u4FE1\u606F\uFF0C\u8FDD\u6CD5\u5FC5\u7A76\r\n\u6240\u6709\u6570\u636E\u672A\u7ECF\u5141\u8BB8\u4E0D\u5F97\u76D7\u7528\uFF0C\u4FB5\u6743\u5FC5\u7A76\r\n\u4FE1\u606F\u5747\u4E3A\u7528\u6237\u81EA\u613F\u5171\u4EAB\u53D1\u5E03\r\n\u5E0C\u671B\u5927\u5BB6\u80FD\u81EA\u89C9\u9075\u5B88\u58F0\u660E",
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
                type: tabStatus.value === 1 ? selType.value : 0,
                degree: 1,
                profession: tabStatus.value,
                openId: "13334521234",
                from: "WEI_XIN",
                explain: job_note.value
              };
              pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.ordinaryPublish, sendInformation, {
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
                profession: tabStatus.value,
                openId: "13334521234",
                from: "WEI_XIN",
                explain: job_note.value
              };
              pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.emergingPublish, sendInformation, {
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
      dSalary,
      hSalary,
      storeCity,
      salary,
      company,
      job,
      tabStatus,
      changeTab,
      type_list,
      job_note,
      selType,
      changeSelType,
      sel_education,
      sel_industry,
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
      modelValue: $setup.company
    }),
    g: common_vendor.o(($event) => $setup.job = $event),
    h: common_vendor.p({
      placeholder: $setup.tabStatus === 1 ? "\u8F93\u5165\u5C97\u4F4D\u540D\u79F0" : "\u5916\u5356/\u5FEB\u9012/\u76F4\u64AD/\u7F51\u7EA6\u8F66",
      modelValue: $setup.job
    }),
    i: common_vendor.o(($event) => $setup.salary = $event),
    j: common_vendor.p({
      type: "number",
      placeholder: "\u5982:28W\u6216\u800514*13",
      modelValue: $setup.salary
    }),
    k: common_vendor.o(($event) => $setup.dSalary = $event),
    l: common_vendor.p({
      placeholder: "\u6700\u4F4E\u5DE5\u8D44",
      modelValue: $setup.dSalary
    }),
    m: common_vendor.o(($event) => $setup.hSalary = $event),
    n: common_vendor.p({
      placeholder: "\u6700\u9AD8\u5DE5\u8D44",
      modelValue: $setup.hSalary
    }),
    o: $setup.tabStatus === 1
  }, $setup.tabStatus === 1 ? {
    p: common_vendor.f($setup.type_list, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: item.id,
        c: $setup.selType === item.id ? 1 : "",
        d: common_vendor.o(($event) => $setup.changeSelType(item.id), item.id)
      };
    })
  } : {}, {
    q: $setup.tabStatus === 1
  }, $setup.tabStatus === 1 ? {
    r: common_vendor.t($setup.sel_education),
    s: common_vendor.o((...args) => $setup.changeEducation && $setup.changeEducation(...args)),
    t: _ctx.index,
    v: $setup.eduList
  } : {}, {
    w: common_vendor.t($setup.sel_industry),
    x: common_vendor.o((...args) => $setup.changeIndustry && $setup.changeIndustry(...args)),
    y: _ctx.index,
    z: $setup.tabStatus === 1 ? $setup.induList[0] : $setup.induList[1],
    A: common_vendor.t($setup.storeCity.defaultCity),
    B: common_vendor.o(($event) => $setup.job_note = $event),
    C: common_vendor.p({
      type: "textarea",
      placeholder: "\u53EF\u586B\u5199\u5DE5\u4F5C\u8BE6\u7EC6\u4FE1\u606F,\u5982\u798F\u5229\u8865\u8D34,\u798F\u5229\u5F85\u9047\u7B49",
      modelValue: $setup.job_note
    }),
    D: common_vendor.o((...args) => $setup.showDetail && $setup.showDetail(...args)),
    E: common_vendor.o((...args) => $setup.submit && $setup.submit(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ce65f5b8"]]);
wx.createPage(MiniProgramPage);
