import sendPostRequest from "../../utils/sendPostRequest.js";
import router from "../../utils/route.js";

sendPostRequest(router.getAllDegere,{},{
		success(res) {
			if(res.message === "success"){
				console.log("Degere",res)
			}
			else{}
		},
		fail() {}
	},true)
	
const data = {
		type:"NORMAL"
	}
sendPostRequest(router.getAllProfession,data,{
	success(res) {
		if(res.message === "success"){
			console.log("Profession",res)
		}
		else{}
	},
	fail() {}
},true)

export const EDU_LIST = [
        {
            "id": 1,
            "degreeName": "初中及以下"
        },
        {
            "id": 2,
            "degreeName": "高中"
        },
		{
		    "id": 3,
		    "degreeName": "专科"
		},
		{
			"id": 4,
			"degreeName":"本科"
		},
		{
			"id": 5,
			"degreeName":"硕士及以上"
		}
    ]

export const INDU_LIST = {
	ordinary : [
		{
			id : 100,
			industry : "IT | 通信 | 互联网"
 		},
		{
			id : 101,
			industry : "金融"
		},
		{
			id : 102,
			industry : "销售 | 客服 | 市场"
		},
		{
			id : 103,
			industry : "财务 | 人力资源 | 行政"
		},
		{
			id : 104,
			industry : "项目质量 | 高级管理"
		},
		{
			id : 105,
			industry : "房产 | 建筑 | 物业管理"
		},
		{
			id : 106,
			industry : "采购 | 交通 | 贸易 | 物流"
		},
		{
			id : 107,
			industry : "生产 | 制造"
		},
		{
			id : 108,
			industry : "传媒 | 艺术 | 设计 | 印刷"
		},
		{
			id : 109,
			industry : "咨询 | 法律 | 教育 | 翻译"
		},
		{
			id : 110,
			industry : "服务业"
		},
		{
			id : 111,
			industry : "能源环保 | 农业科研"
		},
		{
			id : 112,
			industry : "其他行业"
		}
		],
	emerging : [
		{
			id : 200,
			industry : "网络主播 | 博主"
		},
		{
			id : 201,
			industry : "创业"
		},
		{
			id : 202,
			industry : "外卖 | 闪送"
		},
		{
			id : 203,
			industry : "代驾 | 网约车"
		},
		{
			id : 204,
			industry : "其他行业"
		}
	]
}