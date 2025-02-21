"use strict";
const common_vendor = require("../common/vendor.js");
const URL = "https://tea.qingnian8.com/api/bizhi/";
const request = (config = {}) => {
  let { url, data, header = {}, method = "" } = config;
  url = URL + url;
  header["access-key"] = "283216";
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      data,
      header,
      method,
      success: (res) => {
        if (res.data.errCode === 0) {
          resolve(res.data);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "错误提示",
            content: res.data.errMsg,
            showCancel: false
          });
        } else {
          common_vendor.index.showToast({
            title: res.data.errMsg,
            icon: "none"
          });
          reject(res.data);
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
