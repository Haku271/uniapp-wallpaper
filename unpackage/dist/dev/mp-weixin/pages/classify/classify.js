"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  _easycom_custom_nav_bar2();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
if (!Math) {
  _easycom_custom_nav_bar();
}
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    const images = [
      "https://picsum.photos/id/64/400/800",
      // 风格1
      "https://picsum.photos/id/67/400/800",
      // 风格2
      "https://picsum.photos/id/66/400/800"
      // 风格3
    ];
    const currentIndex = common_vendor.ref(0);
    let timer = null;
    const img = () => {
      common_vendor.index.chooseMedia({
        count: 1,
        //默认9
        mediaType: ["image"],
        sizeType: ["original"],
        //可以指定是原图还是压缩图，默认二者都有
        success: function(res) {
          const path = encodeURIComponent(res.tempFiles[0].tempFilePath);
          common_vendor.index.navigateTo({ url: `/pages/classify-edit/EditImages?path=${path}` });
        }
      });
    };
    const gotoText = () => {
      common_vendor.index.navigateTo({
        url: "/pages/classify-text/classify-text"
      });
    };
    common_vendor.onMounted(() => {
      timer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length;
      }, 1e3);
    });
    common_vendor.onUnmounted(() => {
      clearInterval(timer);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(img),
        b: common_vendor.o(gotoText),
        c: `url(${images[currentIndex.value]})`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bcfa975"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classify/classify.js.map
