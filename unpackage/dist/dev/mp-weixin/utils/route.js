"use strict";
var router = {
  ordinaryPublish: "/publish/auditNormalWorkJSON",
  ordinaryGetDetail: "/showDetail/getNormalWorkJSON",
  ordinaryGetActicleList: "/showOrder/orderGetNormalWorkJSON",
  ordinaryGetAllWork: "/admin/work/getAllNormalWorkJSON",
  emergingPublish: "/publish/auditNewWorkJSON",
  emergingGetDetail: "/showDetail/getNewWorkJSON",
  emergingGetActicleList: "/showOrder/orderGetNewWorkJSON",
  emergingGetAllWork: "/admin/work/getAllNewWorkJSON",
  adminNormalView: "/admin/work/publishNormalWorkJSON",
  adminEmergingView: "/admin/work/publishNewWorkJSON",
  getAllProvince: "/universal/city/getAllProvinceJSON",
  getAllCityByProvince: "/universal/city/getAllCityByProvinceJSON",
  getAllDistrictByCity: "/universal/city/getAllDistrictByCityJSON",
  getCityListByName: "/universal/city/getAllCityOrderByNameJSON",
  createProfession: "/test/profession/createProfessionJSON",
  getAllProfession: "/test/profession/getAllProfessionJSON",
  getAllDegere: "/test/degree/getAllDegreeJSON",
  getAllType: "/test/type/getAllTypeJSON",
  createUser: "/universal/user/createUserJSON",
  getUserOpenId: "/universal/user/getUserOpenIdJSON",
  updateLikeNum: "/update/updateWorkLikeNumJSON",
  credibilityOprater: "/update/updateWorkCredibilityJSON",
  getHotWork: "/update/getHeatProfessionJSON",
  getHotCity: "/update/getHeatCityJSON"
};
exports.router = router;
