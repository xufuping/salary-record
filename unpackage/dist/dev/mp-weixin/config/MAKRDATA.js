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
        "company": "\u897F\u5B89\u5E021111",
        "post": "\u5DE5\u4F5C",
        "city": {
          "id": 110100,
          "cityName": "\u5317\u4EAC\u5E02",
          "cityPreId": null,
          "UpdateTime": null,
          "cityTotalNum": null,
          "updateTime": null
        },
        "salaryNum": 0,
        "salaryStr": "20w",
        "salaryRange": "\u5E74\u85AA20w",
        "type": {
          "id": 1,
          "typeName": "\u793E\u62DB"
        },
        "degree": {
          "id": 2,
          "degreeName": "\u9AD8\u4E2D"
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
        "company": "\u6D4B\u8BD55.7",
        "post": "\u6D4B\u8BD5",
        "city": {
          "id": 610100,
          "cityName": "\u897F\u5B89\u5E02",
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
          "id": 2,
          "degreeName": "\u9AD8\u4E2D"
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
        "company": "\u6D4B\u8BD55.9",
        "post": "\u55EF\u55EF",
        "city": {
          "id": 610100,
          "cityName": "\u897F\u5B89\u5E02",
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
          "id": 2,
          "degreeName": "\u9AD8\u4E2D"
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
        "company": "\u9001\u5916\u5417",
        "post": "\u5916\u5356\u5458",
        "city": {
          "id": 110100,
          "cityName": "\u5317\u4EAC\u5E02",
          "cityPreId": null,
          "UpdateTime": null,
          "cityTotalNum": null,
          "updateTime": null
        },
        "salaryNum": 0,
        "salaryStr": "20w",
        "salaryRange": "\u5E74\u85AA20w",
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
        "createTime": "2022-04-16T16:00:00.000+00:00",
        "lookCount": 6,
        "likeCount": 0,
        "credibility": null
      },
      {
        "id": 8,
        "company": "\u6D4B\u8BD5\u65B0\u51745.7",
        "post": "\u6B6A\u54AA",
        "city": {
          "id": 420100,
          "cityName": "\u6B66\u6C49\u5E02",
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
        "explain": "\u6D4B\u8BD55\uFF0C7\u65B0\u5174",
        "status": null,
        "from": null,
        "createTime": "2022-05-06T16:00:00.000+00:00",
        "lookCount": null,
        "likeCount": null,
        "credibility": null
      }
    ]
  }
};
exports.EMERGING = EMERGING;
exports.ORDINARY = ORDINARY;
