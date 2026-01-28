"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_sys = require("../../utils/sys.js");
const _sfc_main = {
  __name: "custom-nav-bar",
  props: {
    showSearch: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const To = () => {
      common_vendor.index.navigateTo({ url: "/pages/search/search" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_sys.statusBarHeight)() + "px",
        b: __props.showSearch
      }, __props.showSearch ? {
        c: common_vendor.o(($event) => To())
      } : {}, {
        d: common_vendor.unref(utils_sys.titleBarHeight)() + "px",
        e: common_vendor.unref(utils_sys.navBarHeight)() + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-412fc155"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/custom-nav-bar/custom-nav-bar.js.map
