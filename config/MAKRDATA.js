//全局配置变量self时为接口不通使用MARK数据，反之为接口数据（'prod'）
export const ENV =  'self'

export const ORDINARY = {
   "code": 200,
   "message": "success",
   "data": {
       "totalCount": 2,
       "totalPage": 1,
       "currentPage": 1,
       "pageSize": 5,
       "data": [
           {
               "id": 2,
               "company": "重邮",
               "post": "学生",
               "city": {
                   "id": 1,
                   "cityName": "重庆",
                   "cityPreId": null,
                   "cityTotalNum": null,
                   "updateTime": null
               },
               "salary": 1111,
               "type": {
                   "id": 1,
                   "typeName": "社招"
               },
               "degree": {
                   "id": 1,
                   "degreeName": "大学"
               },
               "profession": {
                   "id": 1,
                   "professionName": "金融",
                   "status": null
               },
               "user": {
                   "id": 1,
                   "from": null,
                   "openId": 1,
                   "userName": "wangzd"
               },
               "explain": "1",
               "status": 2,
               "createTime": "2022-01-06T13:43:39.000+00:00",
               "lookCount": null,
               "likeCount": null,
               "credibility": null
           },
           {
               "id": 3,
               "company": "重庆xx公司",
               "post": "后端",
               "city": {
                   "id": 1,
                   "cityName": "重庆",
                   "cityPreId": null,
                   "cityTotalNum": null,
                   "updateTime": null
               },
               "salary": 10000,
               "type": {
                   "id": 1,
                   "typeName": "社招"
               },
               "degree": {
                   "id": 1,
                   "degreeName": "大学"
               },
               "profession": {
                   "id": 2,
                   "professionName": "计算机",
                   "status": null
               },
               "user": {
                   "id": 1,
                   "from": null,
                   "openId": 1,
                   "userName": "wangzd"
               },
               "explain": " 这是一个测试",
               "status": 2,
               "createTime": "2022-01-15T13:36:56.000+00:00",
               "lookCount": null,
               "likeCount": null,
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
                "id": 2,
                "company": "美团",
                "post": "外卖员",
                "city": {
                    "id": 110100,
                    "cityName": "北京市",
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
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
                    "cityPreId": null,
                    "UpdateTime": null,
                    "cityTotalNum": null,
                    "updateTime": null
                },
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
        ]
    }
}