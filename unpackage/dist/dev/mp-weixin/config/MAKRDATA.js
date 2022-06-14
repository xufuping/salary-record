"use strict";
const ORDINARY = {
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
        "company": "\u91CD\u90AE",
        "post": "\u5B66\u751F",
        "city": {
          "id": 1,
          "cityName": "\u91CD\u5E86",
          "cityPreId": null,
          "cityTotalNum": null,
          "updateTime": null
        },
        "salary": 1111,
        "type": {
          "id": 1,
          "typeName": "\u793E\u62DB"
        },
        "degree": {
          "id": 1,
          "degreeName": "\u5927\u5B66"
        },
        "profession": {
          "id": 1,
          "professionName": "\u91D1\u878D",
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
        "company": "\u91CD\u5E86xx\u516C\u53F8",
        "post": "\u540E\u7AEF",
        "city": {
          "id": 1,
          "cityName": "\u91CD\u5E86",
          "cityPreId": null,
          "cityTotalNum": null,
          "updateTime": null
        },
        "salary": 1e4,
        "type": {
          "id": 1,
          "typeName": "\u793E\u62DB"
        },
        "degree": {
          "id": 1,
          "degreeName": "\u5927\u5B66"
        },
        "profession": {
          "id": 2,
          "professionName": "\u8BA1\u7B97\u673A",
          "status": null
        },
        "user": {
          "id": 1,
          "from": null,
          "openId": 1,
          "userName": "wangzd"
        },
        "explain": " \u8FD9\u662F\u4E00\u4E2A\u6D4B\u8BD5",
        "status": 2,
        "createTime": "2022-01-15T13:36:56.000+00:00",
        "lookCount": null,
        "likeCount": null,
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
        "id": 2,
        "company": "\u7F8E\u56E2",
        "post": "\u5916\u5356\u5458",
        "city": {
          "id": 110100,
          "cityName": "\u5317\u4EAC\u5E02",
          "cityPreId": null,
          "UpdateTime": null,
          "cityTotalNum": null,
          "updateTime": null
        },
        "salary": 1e4,
        "profession": {
          "id": 2,
          "professionName": "\u8BA1\u7B97\u673A",
          "status": 2
        },
        "user": {
          "id": 1112,
          "userName": "wangzd",
          "openId": null,
          "phone": 17782408
        },
        "explain": "\u8FD9\u662F\u4E00\u4E2A\u6D4B\u8BD5",
        "status": null,
        "from": null,
        "createTime": "2022-02-28T16:00:00.000+00:00",
        "lookCount": null,
        "likeCount": null,
        "credibility": null
      },
      {
        "id": 3,
        "company": "\u534E\u4E3A",
        "post": "\u540E\u7AEF",
        "city": {
          "id": 110100,
          "cityName": "\u5317\u4EAC\u5E02",
          "cityPreId": null,
          "UpdateTime": null,
          "cityTotalNum": null,
          "updateTime": null
        },
        "salary": 1e4,
        "profession": {
          "id": 2,
          "professionName": "\u8BA1\u7B97\u673A",
          "status": 2
        },
        "user": {
          "id": 1112,
          "userName": "wangzd",
          "openId": null,
          "phone": 17782408
        },
        "explain": "\u8FD9\u662F\u4E00\u4E2A\u6D4B\u8BD5",
        "status": null,
        "from": null,
        "createTime": "2022-03-01T16:00:00.000+00:00",
        "lookCount": null,
        "likeCount": null,
        "credibility": null
      }
    ]
  }
};
exports.EMERGING = EMERGING;
exports.ORDINARY = ORDINARY;
