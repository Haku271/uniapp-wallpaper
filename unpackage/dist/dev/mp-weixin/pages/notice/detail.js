"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_sys = require("../../utils/sys.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(utils_sys.titleBarHeight)() + "px",
        b: common_vendor.p({
          text: "置顶",
          type: "error",
          inverted: true
        }),
        c: common_vendor.p({
          date: Date.now(),
          format: "yyyy-mm-dd hh:mm:ss"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/detail.js.map
