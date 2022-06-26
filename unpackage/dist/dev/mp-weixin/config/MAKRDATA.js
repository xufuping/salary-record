"use strict";
const ORDINARY = {
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
        "company": "\u5317\u4EAC\u7F51\u8BAF",
        "post": "\u6570\u5B57ic\u8BBE\u8BA1",
        "city": {
          "id": 110100,
          "cityName": "\u676D\u5DDE",
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
          "typeName": "\u793E\u62DB"
        },
        "degree": {
          "id": 4,
          "degreeName": "\u672C\u79D1"
        },
        "profession": {
          "id": 2,
          "professionName": "\u8BA1\u7B97\u673A",
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
        "company": "\u4E0A\u6D77\u94F6\u884C\u6DF1\u5733\u5206\u884C",
        "post": "\u4E1A\u52A1",
        "city": {
          "id": 610100,
          "cityName": "\u6DF1\u5733",
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
          "typeName": "\u5B9E\u4E60"
        },
        "degree": {
          "id": 4,
          "degreeName": "\u672C\u79D1"
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
        "company": "\u767E\u79CB",
        "post": "\u7BA1\u57F9\u751F",
        "city": {
          "id": 610100,
          "cityName": "\u4E0A\u6D77",
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
          "typeName": "\u5B9E\u4E60"
        },
        "degree": {
          "id": 5,
          "degreeName": "\u7855\u58EB\u53CA\u4EE5\u4E0A"
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
};
const EMERGING = {
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
        "company": "\u7F8E\u56E2",
        "post": "\u5916\u5356\u5458",
        "city": {
          "id": 110100,
          "cityName": "\u91CD\u5E86",
          "cityPreId": null,
          "UpdateTime": null,
          "cityTotalNum": null,
          "updateTime": null
        },
        "salaryNum": 0,
        "salaryStr": "8k",
        "salaryRange": "8k",
        "profession": {
          "id": 2,
          "professionName": "\u8BA1\u7B97\u673A",
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
        "company": "\u661F\u827A\u4F20\u5A92",
        "post": "\u65B0\u5A92\u4F53\u4E3B\u64AD",
        "city": {
          "id": 420100,
          "cityName": "\u897F\u5B89\u5E02",
          "cityPreId": null,
          "UpdateTime": null,
          "cityTotalNum": null,
          "updateTime": null
        },
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
        "explain": "\u65B0\u5A92\u4F53\u4E3B\u64AD\uFF0C\u5DE5\u4F5C\u65F6\u95F4\u81EA\u7531\uFF0C\u5DE5\u65F6\u5236\uFF0C\u798F\u5229\u591A\u591A\u3002",
        "status": null,
        "from": null,
        "createTime": "2022-05-06",
        "lookCount": null,
        "likeCount": null,
        "credibility": null
      },
      {
        "id": 4,
        "company": "\u66F9\u64CD\u51FA\u884C",
        "post": "\u7F51\u7EA6\u8F66\u53F8\u673A",
        "city": {
          "id": 110100,
          "cityName": "\u91CD\u5E86",
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
          "professionName": "\u8BA1\u7B97\u673A",
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
    ]
  }
};
exports.EMERGING = EMERGING;
exports.ORDINARY = ORDINARY;
