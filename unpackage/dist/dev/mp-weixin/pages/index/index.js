"use strict";
const common_vendor = require("../../common/vendor.js");
const api_mock = require("../../api/mock.js");
const hooks_mescroll = require("../../hooks/mescroll.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_nav_bar2 + _easycom_theme_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + common_vendor.unref(commonTitle) + _easycom_theme_item + MescrollUni)();
}
const MescrollUni = () => "../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.js";
const commonTitle = () => "../../components/common-title/common-title.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const randomList = common_vendor.ref([]);
    const To = () => {
      common_vendor.index.navigateTo({ url: "/pages/popular/popular" });
    };
    const getRandomList = async () => {
      const res = await api_mock.randomData();
      randomList.value = res.data;
      common_vendor.index.__f__("log", "at pages/index/index.vue:117", res);
    };
    const gotoPreview = (item) => {
      common_vendor.index.setStorageSync("storgwallList", randomList.value);
      common_vendor.index.navigateTo({
        url: `/pages/preview/preview?id=${item.id}`
      });
    };
    common_vendor.onLoad(() => {
      getRandomList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showSearch: true
        }),
        b: common_vendor.o(($event) => To()),
        c: common_vendor.o(($event) => To()),
        d: common_vendor.o(($event) => To()),
        e: common_vendor.o(($event) => To()),
        f: common_vendor.o(getRandomList),
        g: common_vendor.f(randomList.value, (item, k0, i0) => {
          return {
            a: item.download_url,
            b: item._id,
            c: common_vendor.o(($event) => gotoPreview(item), item._id)
          };
        }),
        h: common_vendor.f(common_vendor.unref(hooks_mescroll.List), (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(common_vendor.unref(hooks_mescroll.gotoThemePreview), item.id),
            c: "1cf27b2a-4-" + i0 + ",1cf27b2a-0",
            d: common_vendor.p({
              item
            })
          };
        }),
        i: common_vendor.sr("mescrollRef", "1cf27b2a-0"),
        j: common_vendor.o(common_vendor.unref(hooks_mescroll.upCallback)),
        k: common_vendor.p({
          up: common_vendor.unref(hooks_mescroll.upOption),
          down: common_vendor.unref(hooks_mescroll.downOption),
          height: common_vendor.unref(hooks_mescroll.scrollHeight)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
