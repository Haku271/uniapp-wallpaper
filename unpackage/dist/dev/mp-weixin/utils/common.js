"use strict";
const time = (times) => {
  const Time = (/* @__PURE__ */ new Date()).getTime();
  const Diff = Time - times;
  if (Diff < 6e3) {
    return "一分钟内";
  } else if (Diff < 36e5) {
    return Math.floor(Diff / 6e4) + "分钟";
  } else if (Diff < 864e5) {
    return Math.floor(Diff / 36e5) + "小时";
  } else if (Diff < 2592e6) {
    return Math.floor(Diff / 864e5) + "天";
  } else if (Diff < 7776e6) {
    return Math.floor(Diff / 2592e6) + "月";
  } else {
    return null;
  }
};
exports.time = time;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
