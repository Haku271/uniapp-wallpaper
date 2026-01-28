"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/classify/classify.js";
  "./pages/user/user.js";
  "./pages/popular/popular.js";
  "./pages/preview/preview.js";
  "./pages/classify-edit/EditImages.js";
  "./pages/catImg/catImg.js";
  "./pages/search/search.js";
  "./pages/classify-text/classify-text.js";
  "./pages/login/login.js";
  "./pages/favorite/favorite.js";
  "./pages/download/download.js";
  "./pages/agreement/service.js";
  "./pages/agreement/privacy.js";
}
const _sfc_main = {
  globalData: {
    api: "sk-qocnpgkzzysqvqwesudilnumtygkyxrxgpjnzvjeuriwhffl"
  },
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
const MescrollEmpty = () => "./uni_modules/mescroll-uni/components/mescroll-empty/mescroll-empty.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.component("mescroll-empty", MescrollEmpty);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
