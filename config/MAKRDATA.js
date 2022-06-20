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
                "company": "西安市1111",
                "post": "工作",
                "city": {
                    "id": 110100,
                    "cityName": "北京市",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "20w",
                "salaryRange": "年薪20w",
                "type": {
                    "id": 1,
                    "typeName": "社招"
                },
                "degree": {
                    "id": 2,
                    "degreeName": "高中"
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
                "company": "测试5.7",
                "post": "测试",
                "city": {
                    "id": 610100,
                    "cityName": "西安市",
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
                    "id": 2,
                    "degreeName": "高中"
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
                "company": "测试5.9",
                "post": "嗯嗯",
                "city": {
                    "id": 610100,
                    "cityName": "西安市",
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
                    "id": 2,
                    "degreeName": "高中"
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
                "id": 4,
                "company": "送外吗",
                "post": "外卖员",
                "city": {
                    "id": 110100,
                    "cityName": "北京市",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "20w",
                "salaryRange": "年薪20w",
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
                "createTime": "2022-04-16T16:00:00.000+00:00",
                "lookCount": 6,
                "likeCount": 0,
                "credibility": null
            },
            {
                "id": 8,
                "company": "测试新兴5.7",
                "post": "歪咪",
                "city": {
                    "id": 420100,
                    "cityName": "武汉市",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
                "salaryNum": 0,
                "salaryStr": "213",
                "salaryRange": "25",
                "profession": null,
                "user": {
                    "id": 1115,
                    "userName": "wangdz",
                    "openId": null,
                    "phone": 15123301497,
                    "openidWx": null
                },
                "explain": "测试5，7新兴",
                "status": null,
                "from": null,
                "createTime": "2022-05-06T16:00:00.000+00:00",
                "lookCount": null,
                "likeCount": null,
                "credibility": null
            }
        ]
    }
}