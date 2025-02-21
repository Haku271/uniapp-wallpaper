"use strict";
const utils_request = require("../utils/request.js");
const apiGetBanner = () => {
  return utils_request.request({
    url: "homeBanner"
  });
};
const apigetDayRandom = () => {
  return utils_request.request({
    url: "randomWall"
  });
};
const apinotice = () => {
  return utils_request.request({
    url: "wallNewsList",
    data: {
      select: true
    }
  });
};
const apiclassify = (data = {}) => {
  return utils_request.request({
    url: "classify",
    data
  });
};
const apiwall = (data = {}) => {
  return utils_request.request({
    url: "wallList",
    data
  });
};
exports.apiGetBanner = apiGetBanner;
exports.apiclassify = apiclassify;
exports.apigetDayRandom = apigetDayRandom;
exports.apinotice = apinotice;
exports.apiwall = apiwall;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/apis.js.map
