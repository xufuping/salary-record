"use strict";
var router = {
  ordinaryPublish: "/publish/auditNormalWork",
  ordinaryGetDetail: "/showDetail/getNormalWork",
  ordinaryGetActicleList: "/showOrder/orderGetNormalWork",
  ordinaryGetAllWork: "/admin/work/getAllNormalWork",
  emergingPublish: "/publish/auditNewWork",
  emergingGetDetail: "/showDetail/getNewWork",
  emergingGetActicleList: "/showOrder/orderGetNewWork",
  emergingGetAllWork: "/admin/work/getAllNewWork",
  getAllProvince: "/universal/city/getAllProvince",
  getAllCityByProvince: "/universal/city/getAllCityByProvince",
  getAllDistrictByCity: "/universal/city/getAllDistrictByCity",
  getCityListByName: "/universal/city/getAllCityOrderByName",
  createProfession: "/test/profession/createProfession",
  getAllProfessionList: "/test/profession/getAllProfession",
  createDegree: "/test/degree/createDegree",
  getAllDegere: "/test/degree/getAllDegree",
  createType: "/test/type/createType",
  getAllType: "/test/type/getAllType",
  createUser: "/universal/user/createUser",
  getUserOpenId: "/universal/user/getUserOpenId"
};
exports.router = router;
