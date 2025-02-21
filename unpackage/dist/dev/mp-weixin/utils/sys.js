"use strict";
const common_vendor = require("../common/vendor.js");
const info = common_vendor.index.getSystemInfoSync();
const statusBarHeight = () => info.statusBarHeight || 15;
const titleBarHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
    return height + (top - statusBarHeight()) * 2;
  } else {
    return 40;
  }
};
const navBarHeight = () => statusBarHeight() + titleBarHeight();
exports.navBarHeight = navBarHeight;
exports.statusBarHeight = statusBarHeight;
exports.titleBarHeight = titleBarHeight;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/sys.js.map
