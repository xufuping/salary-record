"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_utils_utils_sendPostRequest = require("./utils/sendPostRequest.js");
var pages_utils_route = require("./route.js");
const createProfession = () => {
  const userCode = {
    code: ""
  };
  common_vendor.index.login({
    provider: "weixin",
    onlyAuthorize: true,
    success: function(loginRes) {
      console.log("loginRes.code", loginRes.code);
      const user = {
        userName: "wangdz",
        phone: 15123301497,
        code: userCode.code
      };
      pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.createUser, user, {
        success(res) {
          console.log("resUser", res);
        },
        fail() {
        }
      }, true);
    }
  });
  const profInfo = {
    degree: "\u626B\u5730\u50E7",
    status: 1
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.createProfession, profInfo, {
    success(res) {
      console.log("res", res);
    },
    fail() {
    }
  }, true);
};
const getAllProfession = () => {
  const data = {
    status: 1
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.getAllProfessionList, data, {
    success(res) {
      console.log("resProfession", res);
      if (res.message === "success") {
        console.log("Profession", res);
      }
    },
    fail() {
    }
  }, true);
  const userInfo = {
    code: "",
    form: "WEI_XIN"
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.getUserOpenId, userInfo, {
    success(res) {
      console.log("resOpenID", res);
      if (res.message === "success") {
        console.log("openID", res);
      }
    },
    fail() {
    }
  }, true);
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.createType, {}, {
    success(res) {
      console.log("resType", res);
      if (res.message === "success") {
        console.log("Type", res);
      }
    },
    fail() {
    }
  }, true);
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.getAllDegere, {}, {
    success(res) {
      console.log("resDegere", res);
      if (res.message === "success") {
        console.log("Degere", res);
      }
    },
    fail() {
    }
  }, true);
  const para = {
    information: "\u534E\u4E3A"
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.ordinaryGetActicleList, para, {
    success(res) {
      console.log("resOrderNormal", res);
      if (res.message === "success") {
        console.log("OrderNormal", res);
      }
    },
    fail() {
    }
  }, true);
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.emergingGetActicleList, para, {
    success(res) {
      console.log("resOrderEmerging", res);
      if (res.message === "success") {
        console.log("OrderEmerging", res);
      }
    },
    fail() {
    }
  }, true);
  const workID = {
    normalWork: 5
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.ordinaryGetDetail, workID, {
    success(res) {
      console.log("resDetailNormal", res);
      if (res.message === "success") {
        console.log("DetailNormal", res);
      }
    },
    fail() {
    }
  }, true);
  const workId = {
    newWork: 3
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.emergingGetDetail, workId, {
    success(res) {
      console.log("resDetailEmerging", res);
      if (res.message === "success") {
        console.log("DetailEmerging", res);
      }
    },
    fail() {
    }
  }, true);
  const allNormalWork = {
    currentPage: 1,
    pageSize: 5
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.ordinaryGetAllWork, allNormalWork, {
    success(res) {
      console.log("resAllNormalWork", res);
      if (res.message === "success") {
        console.log("allNormalWork", res);
      }
    },
    fail() {
    }
  }, true);
  const allNewlWork = {
    currentPage: 1,
    pageSize: 5
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.emergingGetAllWork, allNewlWork, {
    success(res) {
      console.log("resAllNewlWork", res);
      if (res.message === "success") {
        console.log("allNewlWork", res);
      }
    },
    fail() {
    }
  }, true);
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.getAllProvince, {}, {
    success(res) {
      console.log("resAllProvince", res);
      if (res.message === "success") {
        console.log("AllProvince", res);
      }
    },
    fail() {
    }
  }, true);
  const province = {
    province: 13e4
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.getAllCityByProvince, province, {
    success(res) {
      console.log("resAllCityByProvince", res);
      if (res.message === "success") {
        console.log("AllCityByProvince", res);
      }
    },
    fail() {
    }
  }, true);
  const cityCode = {
    city: 130100
  };
  pages_utils_utils_sendPostRequest.sendPostRequest(pages_utils_route.router.getAllDistrictByCity, cityCode, {
    success(res) {
      console.log("resAllDistrictByCity", res);
      if (res.message === "success") {
        console.log("AllDistrictByCity", res);
      }
    },
    fail() {
    }
  }, true);
};
exports.createProfession = createProfession;
exports.getAllProfession = getAllProfession;
