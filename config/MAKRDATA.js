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
                "company": "北京网讯",
                "post": "数字ic设计",
                "city": {
                    "id": 110100,
                    "cityName": "杭州",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "20k*14",
                "salaryRange": "20k*14",
                "type": {
                    "id": 1,
                    "typeName": "社招"
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
                "company": "上海银行深圳分行",
                "post": "业务",
                "city": {
                    "id": 610100,
                    "cityName": "深圳",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "1",
                "salaryRange": "122",
                "type": {
                    "id": 2,
                    "typeName": "实习"
                },
                "degree": {
                    "id": 4,
                    "degreeName": "本科"
                },
                "profession": null,
                "user": {
                    "id": 1115,
                    "userName": "wangdz",
                    "openId": null,
                    "phone": 15123301497,
                    "openidWx": null
                },
                "explain": null,
                "status": null,
                "from": null,
                "createTime": null,
                "lookCount": 16,
                "likeCount": 0,
                "credibility": null
            },
            {
                "id": 12,
                "company": "百秋",
                "post": "管培生",
                "city": {
                    "id": 610100,
                    "cityName": "上海",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "10",
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
                "explain": null,
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
<<<<<<< HEAD
                "id": 4,
=======
                "id": 2,
>>>>>>> d3c118154a66ac5242f42815c76a9b2d69d3271e
                "company": "美团",
                "post": "外卖员",
                "city": {
                    "id": 110100,
<<<<<<< HEAD
                    "cityName": "重庆",
=======
                    "cityName": "北京市",
>>>>>>> d3c118154a66ac5242f42815c76a9b2d69d3271e
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
<<<<<<< HEAD
                "salaryNum": 0,
                "salaryStr": "8k",
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
=======
                "salary": 10000,
                "profession": {
                    "id": 2,
                    "professionName": "计算机",
                    "status": 2
                },
                "user": {
                    "id": 1112,
                    "userName": "wangzd",
                    "openId": null,
                    "phone": 17782408
                },
                "explain": "这是一个测试",
                "status": null,
                "from": null,
                "createTime": "2022-02-28T16:00:00.000+00:00",
                "lookCount": null,
                "likeCount": null,
                "credibility": null
            },
            {
                "id": 3,
                "company": "华为",
                "post": "后端",
                "city": {
                    "id": 110100,
                    "cityName": "北京市",
>>>>>>> d3c118154a66ac5242f42815c76a9b2d69d3271e
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
<<<<<<< HEAD
                "salaryNum": 0,
                "salaryStr": "6k",
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
			    "salaryStr": "9k",
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
			}
=======
                "salary": 10000,
                "profession": {
                    "id": 2,
                    "professionName": "计算机",
                    "status": 2
                },
                "user": {
                    "id": 1112,
                    "userName": "wangzd",
                    "openId": null,
                    "phone": 17782408
                },
                "explain": "这是一个测试",
                "status": null,
                "from": null,
                "createTime": "2022-03-01T16:00:00.000+00:00",
                "lookCount": null,
                "likeCount": null,
                "credibility": null
            }
>>>>>>> d3c118154a66ac5242f42815c76a9b2d69d3271e
        ]
    }
}