"use strict";
const JOB_LIST = {
  "data": [
    {
      "id": 1,
      "name": "\u91D1\u878D",
      "active": ""
    },
    {
      "id": 2,
      "name": "IT",
      "active": ""
    },
    {
      "id": 3,
      "name": "\u6559\u80B2",
      "active": ""
    }
  ]
};
const selSortType = [
  {
    order: "",
    sortType: "\u6309\u65F6\u95F4\u6392\u5E8F"
  },
  {
    order: "LIKE_COUNT",
    sortType: "\u6309\u70B9\u8D5E\u6570\u6392\u5E8F"
  },
  {
    order: "CREDIBILITY",
    sortType: "\u6309\u53EF\u4FE1\u5EA6\u6392\u5E8F"
  }
];
exports.JOB_LIST = JOB_LIST;
exports.selSortType = selSortType;
