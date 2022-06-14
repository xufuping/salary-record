"use strict";
const SALARY_LIST = {
  "data": [
    {
      "id": 1,
      "name": "0-10k",
      "active": ""
    },
    {
      "id": 2,
      "name": "10k-50k",
      "active": ""
    },
    {
      "id": 3,
      "name": "50k\u4EE5\u4E0A",
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
    order: "like_count",
    sortType: "\u6309\u70B9\u8D5E\u6570\u6392\u5E8F"
  },
  {
    order: "CREDIBILITY",
    sortType: "\u6309\u53EF\u4FE1\u5EA6\u6392\u5E8F"
  }
];
exports.SALARY_LIST = SALARY_LIST;
exports.selSortType = selSortType;
