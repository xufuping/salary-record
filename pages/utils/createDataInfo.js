import sendPostRequest from "./utils/sendPostRequest.js"
import router from "./route.js"

//新建职业
const createProfession = () =>{

	const userCode = {
		code : '',
		form:"WEI_XIN"
	}
	uni.login({
	  provider: 'weixin',
	  onlyAuthorize:true,
	  success: function (loginRes) {
	    console.log("loginRes.code",loginRes.code);
		userCode.code = loginRes.code
		const user = {
			userName:"wangdz",
			phone:15123301497,
			code:userCode.code 
		}
		sendPostRequest(router.createUser,user,{
			success(res) {
				console.log('resUser',res)
			},
			fail() {}
		},true)
		
		sendPostRequest(router.getUserOpenId,userCode,{
			success(res) {
				console.log("resOpenID",res)
				if(res.message === "success"){
					console.log("openID",res)
				}
				else{}
			},
			fail() {}
		},true)
	    // 获取用户信息
	    // uni.getUserInfo({
	    //   provider: 'weixin',
	    //   success: function (infoRes) {
	    //     console.log('用户昵称为：' + infoRes.userInfo.nickName);
	    //   }
	    // });
	  }
	});
	
	//职业接口
	const profInfo = {
		degree : "扫地僧",
		status : 1
	}
	sendPostRequest(router.createProfession,profInfo,{
		success(res) {
			console.log('res',res)
		},
		fail() {}
	},true)
	
	//用户创造接口
	// const user = {
	// 	userName:"wangdz",
	// 	phone:15123301497,
	// 	code:userCode.code 
	// }
	// sendPostRequest(router.createUser,user,{
	// 	success(res) {
	// 		console.log('resUser',res)
	// 	},
	// 	fail() {}
	// },true)
}

//获取
const getAllProfession = () =>{
	
	//职业获取接口
	const profnList = []
	const data = {
		status:1
	}
	sendPostRequest(router.getAllProfessionList,data,{
		success(res) {
			console.log("resProfession",res)
			if(res.message === "success"){
				console.log("Profession",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//openId获取接口
	const userInfo = {
		code:'' ,
		form:"WEI_XIN"
	}
	sendPostRequest(router.getUserOpenId,userInfo,{
		success(res) {
			console.log("resOpenID",res)
			if(res.message === "success"){
				console.log("openID",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//职业类型获取接口
	sendPostRequest(router.createType,{},{
		success(res) {
			console.log("resType",res)
			if(res.message === "success"){
				console.log("Type",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//学历获取接口
	sendPostRequest(router.getAllDegere,{},{
		success(res) {
			console.log("resDegere",res)
			if(res.message === "success"){
				console.log("Degere",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//有序列表接口-普通职业
	const para = {
		information:"华为"
	}
	sendPostRequest(router.ordinaryGetActicleList,para,{
		success(res) {
			console.log("resOrderNormal",res)
			if(res.message === "success"){
				console.log("OrderNormal",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//有序列表接口-新兴职业
	sendPostRequest(router.emergingGetActicleList,para,{
		success(res) {
			console.log("resOrderEmerging",res)
			if(res.message === "success"){
				console.log("OrderEmerging",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//详情-普通职业
	const workID = 	{
		normalWork:5
	}
	sendPostRequest(router.ordinaryGetDetail,workID,{
		success(res) {
			console.log("resDetailNormal",res)
			if(res.message === "success"){
				console.log("DetailNormal",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//详情-新兴职业
	const workId = 	{
		newWork:3
	}
	sendPostRequest(router.emergingGetDetail,workId,{
		success(res) {
			console.log("resDetailEmerging",res)
			if(res.message === "success"){
				console.log("DetailEmerging",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//管理-获取全部普通职业状态
	const allNormalWork = {
		currentPage:1,
		pageSize:5
	}
	sendPostRequest(router.ordinaryGetAllWork,allNormalWork,{
		success(res) {
			console.log("resAllNormalWork",res)
			if(res.message === "success"){
				console.log("allNormalWork",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//管理-获取全部新兴职业状态
	const allNewlWork = {
		currentPage:1,
		pageSize:5
	}
	sendPostRequest(router.emergingGetAllWork,allNewlWork,{
		success(res) {
			console.log("resAllNewlWork",res)
			if(res.message === "success"){
				console.log("allNewlWork",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//获取所有省份
	sendPostRequest(router.getAllProvince,{},{
		success(res) {
			console.log("resAllProvince",res)
			if(res.message === "success"){
				console.log("AllProvince",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//获取所有城市根据省
	const province = {
		province:130000
	}
	sendPostRequest(router.getAllCityByProvince,province,{
		success(res) {
			console.log("resAllCityByProvince",res)
			if(res.message === "success"){
				console.log("AllCityByProvince",res)
			}
			else{}
		},
		fail() {}
	},true)
	
	//获取所有区县根据城市
	const cityCode = {
		city:130100
	}
	sendPostRequest(router.getAllDistrictByCity,cityCode,{
		success(res) {
			console.log("resAllDistrictByCity",res)
			if(res.message === "success"){
				console.log("AllDistrictByCity",res)
			}
			else{}
		},
		fail() {}
	},true)
}


export {
	createProfession,
	getAllProfession
	};