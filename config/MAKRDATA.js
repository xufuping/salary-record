//全局配置变量为self时使用MOCK数据，反之为接口数据（'prod'）
export const ENV = 'self'

export const ORDINARY = {
    "code": 200,
    "message": "success",
    "data": {
        "totalCount": 3,
        "totalPage": 1,
        "currentPage": 1,
        "pageSize": 5,
        "data": [
            {
                "id": 7,
                "company": "字节跳动",
                "post": "数据产品实习",
                "city": {
                    "id": 110100,
                    "cityName": "北京",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "3.6k",
                "salaryRange": "3.6k",
                "type": {
                    "id": 2,
                    "typeName": "实习"
                },
                "degree": {
                    "id": 4,
                    "degreeName": "本科"
                },
                "profession": {
                    "id": 2,
                    "professionName": "计算机",
                    "status": 1
                },
                "user": {
                    "id": 1,
                    "userName": "wzd",
                    "openId": null,
                    "phone": 1222,
                    "openidWx": null
                },
                "explain": null,
                "status": null,
                "from": null,
                "createTime": null,
                "lookCount": 1,
                "likeCount": 1,
                "credibility": null
            },
            {
                "id": 11,
                "company": "网易互娱",
                "post": "游戏策划",
                "city": {
                    "id": 610100,
                    "cityName": "杭州",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "20.5k",
                "salaryRange": "122",
                "type": {
                    "id": 3,
                    "typeName": "校招"
                },
                "degree": {
                    "id": 4,
                    "degreeName": "硕士及以上"
                },
                "profession": null,
                "user": {
                    "id": 1115,
                    "userName": "wangdz",
                    "openId": null,
                    "phone": 15123301497,
                    "openidWx": null
                },
                "explain": "16薪+房补1.5k+各种福利",
                "status": null,
                "from": null,
                "createTime": null,
                "lookCount": 16,
                "likeCount": 0,
                "credibility": null
            },
            {
                "id": 12,
                "company": "腾讯CSIG智慧出行",
                "post": "后台开发实习生",
                "city": {
                    "id": 610100,
                    "cityName": "北京市",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "7k",
                "salaryRange": "14115",
                "type": {
                    "id": 2,
                    "typeName": "实习"
                },
                "degree": {
                    "id": 5,
                    "degreeName": "硕士及以上"
                },
                "profession": null,
                "user": {
                    "id": 1115,
                    "userName": "wangdz",
                    "openId": null,
                    "phone": 15123301497,
                    "openidWx": null
                },
                "explain": "加油包5k一次性发放，外地交通补贴2k 住房补贴2k",
                "status": null,
                "from": null,
                "createTime": null,
                "lookCount": 0,
                "likeCount": 8,
                "credibility": null
            },{
                "id": 10,
                "company": "腾讯",
                "post": "产品运营实习生",
                "city": {
                    "id": 610100,
                    "cityName": "深圳市",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "5k",
                "salaryRange": "14115",
                "type": {
                    "id": 2,
                    "typeName": "实习"
                },
                "degree": {
                    "id": 5,
                    "degreeName": "硕士及以上"
                },
                "profession": null,
                "user": {
                    "id": 1115,
                    "userName": "wangdz",
                    "openId": null,
                    "phone": 15123301497,
                    "openidWx": null
                },
                "explain": "第一个页中转酒店+交通补贴+住房补贴2k，加油包5k随第二个月工资发放",
                "status": null,
                "from": null,
                "createTime": null,
                "lookCount": 0,
                "likeCount": 8,
                "credibility": null
            },
			{
			    "id": 19,
			    "company": "深信服",
			    "post": "go语言开发",
			    "city": {
			        "id": 610100,
			        "cityName": "深圳市",
			        "cityPreId": null,
			        "UpdateTime": null,
			        "cityTotalNum": null,
			        "updateTime": null
			    },
			    "salaryNum": 0,
			    "salaryStr": "13k",
			    "salaryRange": "14115",
			    "type": {
			        "id": 3,
			        "typeName": "校招"
			    },
			    "degree": {
			        "id": 5,
			        "degreeName": "硕士及以上"
			    },
			    "profession": null,
			    "user": {
			        "id": 1115,
			        "userName": "wangdz",
			        "openId": null,
			        "phone": 15123301497,
			        "openidWx": null
			    },
			    "explain": "",
			    "status": null,
			    "from": null,
			    "createTime": null,
			    "lookCount": 0,
			    "likeCount": 8,
			    "credibility": null
			},
			{
			    "id": 19,
			    "company": "中国移动杭州研发中心",
			    "post": "开发岗",
			    "city": {
			        "id": 610100,
			        "cityName": "杭州市",
			        "cityPreId": null,
			        "UpdateTime": null,
			        "cityTotalNum": null,
			        "updateTime": null
			    },
			    "salaryNum": 0,
			    "salaryStr": "15k",
			    "salaryRange": "14115",
			    "type": {
			        "id": 3,
			        "typeName": "校招"
			    },
			    "degree": {
			        "id": 5,
			        "degreeName": "硕士及以上"
			    },
			    "profession": null,
			    "user": {
			        "id": 1115,
			        "userName": "wangdz",
			        "openId": null,
			        "phone": 15123301497,
			        "openidWx": null
			    },
			    "explain": "",
			    "status": null,
			    "from": null,
			    "createTime": null,
			    "lookCount": 0,
			    "likeCount": 8,
			    "credibility": null
			}
        ]
    }
}

export const EMERGING = {
    "code": 200,
    "message": "success",
    "data": {
        "totalCount": 2,
        "totalPage": 1,
        "currentPage": 1,
        "pageSize": 5,
        "data": [
            {
                "id": 4,
                "company": "美团",
                "post": "外卖员",
                "city": {
                    "id": 110100,
                    "cityName": "重庆",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "6k",
                "salaryRange": "8k",
                "profession": {
                    "id": 2,
                    "professionName": "计算机",
                    "status": 1
                },
                "user": {
                    "id": 1,
                    "userName": "wzd",
                    "openId": null,
                    "phone": 1222,
                    "openidWx": null
                },
                "explain": "1111",
                "status": null,
                "from": null,
                "createTime": "2022-04-16",
                "lookCount": 6,
                "likeCount": 0,
                "credibility": null
            },
            {
                "id": 8,
                "company": "星艺传媒",
                "post": "新媒体主播",
                "city": {
                    "id": 420100,
                    "cityName": "西安市",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "20k",
                "salaryRange": "6k",
                "profession": null,
                "user": {
                    "id": 1115,
                    "userName": "wangdz",
                    "openId": null,
                    "phone": 15123301497,
                    "openidWx": null
                },
                "explain": "新媒体主播，工作时间自由，工时制，福利多多。",
                "status": null,
                "from": null,
                "createTime": "2022-05-06",
                "lookCount": null,
                "likeCount": null,
                "credibility": null
            },
			{
			    "id": 4,
			    "company": "曹操出行",
			    "post": "网约车司机",
			    "city": {
			        "id": 110100,
			        "cityName": "重庆",
			        "cityPreId": null,
			        "UpdateTime": null,
			        "cityTotalNum": null,
			        "updateTime": null
			    },
			    "salaryNum": 0,
			    "salaryStr": "6.5k",
			    "salaryRange": "9k",
			    "profession": {
			        "id": 2,
			        "professionName": "计算机",
			        "status": 1
			    },
			    "user": {
			        "id": 1,
			        "userName": "wzd",
			        "openId": null,
			        "phone": 1222,
			        "openidWx": null
			    },
			    "explain": "1111",
			    "status": null,
			    "from": null,
			    "createTime": "2022-04-30",
			    "lookCount": 6,
			    "likeCount": 0,
			    "credibility": null
			},
			{
			    "id": 6,
			    "company": "T3出行",
			    "post": "网约车司机",
			    "city": {
			        "id": 110100,
			        "cityName": "四川",
			        "cityPreId": null,
			        "UpdateTime": null,
			        "cityTotalNum": null,
			        "updateTime": null
			    },
			    "salaryNum": 0,
			    "salaryStr": "7k",
			    "salaryRange": "9k",
			    "profession": {
			        "id": 2,
			        "professionName": "计算机",
			        "status": 1
			    },
			    "user": {
			        "id": 1,
			        "userName": "wzd",
			        "openId": null,
			        "phone": 1222,
			        "openidWx": null
			    },
			    "explain": "工作时间自由，福利好，单子多",
			    "status": null,
			    "from": null,
			    "createTime": "2022-04-30",
			    "lookCount": 6,
			    "likeCount": 0,
			    "credibility": null
			}
        ]
    }
}