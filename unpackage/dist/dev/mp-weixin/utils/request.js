"use strict";
const common_vendor = require("../common/vendor.js");
const URL = "https://picsum.photos";
const request = (config = {}) => {
  let { url } = config;
  url = URL + url;
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else if (res.statusCode === 400) {
          common_vendor.index.showModal({
            title: "错误提示",
            content: res.errMsg,
            showCancel: false
          });
        } else {
          common_vendor.index.showToast({
            title: res.errMsg,
            icon: "none"
          });
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
