"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_isLogin = require("../../utils/isLogin.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  _easycom_custom_nav_bar2();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
if (!Math) {
  _easycom_custom_nav_bar();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const isLog = common_vendor.ref(false);
    const top = common_vendor.ref(null);
    const clsLogin = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确认退出登录",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("key");
            common_vendor.index.removeStorageSync("info");
            isLog.value = false;
          }
        }
      });
    };
    const goLogin = () => {
      common_vendor.index.navigateTo({ url: "/pages/login/login" });
    };
    const goFavorite = () => {
      common_vendor.index.navigateTo({ url: "/pages/favorite/favorite" });
    };
    const goDownload = () => {
      common_vendor.index.navigateTo({ url: "/pages/download/download" });
    };
    common_vendor.onShow(() => {
      top.value = common_vendor.index.getStorageSync("top");
      common_vendor.index.__f__("log", "at pages/user/user.vue:97", "获取头像", top.value);
      isLog.value = utils_isLogin.isLogin();
      common_vendor.index.__f__("log", "at pages/user/user.vue:99", "isLog", isLog.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isLog.value
      }, !isLog.value ? {
        b: common_vendor.o(goLogin)
      } : {}, {
        c: isLog.value
      }, isLog.value ? {
        d: top.value
      } : {}, {
        e: !isLog.value
      }, !isLog.value ? {
        f: common_vendor.o(goLogin)
      } : {}, {
        g: common_vendor.o(goDownload),
        h: common_vendor.o(goFavorite),
        i: isLog.value
      }, isLog.value ? {
        j: common_vendor.o(clsLogin)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
