export default {
	//普通-新兴职业发布、有序列表、详情
	ordinaryPublish: "/publish/auditNormalWork",
	ordinaryGetDetail: "/showDetail/getNormalWork",
	ordinaryGetActicleList: "/showOrder/orderGetNormalWork",
	ordinaryGetAllWork:"/admin/work/getAllNormalWork",
	
	emergingPublish: "/publish/auditNewWork",
	emergingGetDetail: "/showDetail/getNewWork",
	emergingGetActicleList: "/showOrder/orderGetNewWork",
	emergingGetAllWork:"/admin/work/getAllNewWork",
	
	//城市
	getAllProvince:"/universal/city/getAllProvince",
	getAllCityByProvince:"/universal/city/getAllCityByProvince",
	getAllDistrictByCity:"/universal/city/getAllDistrictByCity",
	getCityListByName:"/universal/city/getAllCityOrderByName",
	
	//职业、学历、类型
	createProfession:"/test/profession/createProfession",
	getAllProfessionList:"/test/profession/getAllProfession",
	createDegree:"/test/degree/createDegree",
	getAllDegere:"/test/degree/getAllDegree",
	createType:"/test/type/createType",
	getAllType:"/test/type/getAllType",
	
	//用户
	createUser:"/universal/user/createUser",
	getUserOpenId :"/universal/user/getUserOpenId"
}
