"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_sys = require("../../utils/sys.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const mask = common_vendor.ref(true);
    const infopopup = common_vendor.ref(null);
    const starpopup = common_vendor.ref(null);
    const userstar = common_vendor.ref(0);
    const wallList = common_vendor.ref([]);
    const storgwallList = common_vendor.index.getStorageSync("storgwallList") || [];
    wallList.vallue = storgwallList.map((item) => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    common_vendor.index.__f__("log", "at pages/preview/preview.vue:114", wallList.vallue);
    const hide = () => {
      common_vendor.index.__f__("log", "at pages/preview/preview.vue:117", mask.value);
      mask.value = !mask.value;
    };
    const back = () => {
      common_vendor.index.navigateBack();
    };
    const infoopen = () => {
      infopopup.value.open("bottom");
    };
    const close = () => {
      infopopup.value.close();
      starpopup.value.close();
    };
    const staropen = () => {
      starpopup.value.open();
    };
    const submit = () => {
      starpopup.value.close();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(wallList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(hide, item._id),
            b: item.picurl,
            c: item._id
          };
        }),
        b: mask.value
      }, mask.value ? {
        c: common_vendor.p({
          type: "back",
          size: "20",
          color: "#fff"
        }),
        d: common_vendor.o(back),
        e: common_vendor.unref(utils_sys.statusBarHeight)() + "px",
        f: common_vendor.t(wallList.value.length),
        g: common_vendor.p({
          date: Date.now(),
          format: "hh:mm"
        }),
        h: common_vendor.p({
          date: Date.now(),
          format: "MM月dd日"
        }),
        i: common_vendor.p({
          type: "info",
          size: "28"
        }),
        j: common_vendor.o(infoopen),
        k: common_vendor.p({
          type: "star",
          size: "28"
        }),
        l: common_vendor.o(staropen),
        m: common_vendor.p({
          type: "download",
          size: "24"
        })
      } : {}, {
        n: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        o: common_vendor.o(close),
        p: common_vendor.p({
          value: "5",
          readonly: true,
          touchable: true,
          size: "16"
        }),
        q: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        r: common_vendor.sr(infopopup, "2dad6c07-6", {
          "k": "infopopup"
        }),
        s: common_vendor.p({
          type: "bottom"
        }),
        t: common_vendor.p({
          type: "closeempty",
          size: "18"
        }),
        v: common_vendor.o(close),
        w: common_vendor.o(($event) => userstar.value = $event),
        x: common_vendor.p({
          allowHalf: true,
          modelValue: userstar.value
        }),
        y: common_vendor.t(userstar.value),
        z: common_vendor.o(submit),
        A: !userstar.value,
        B: common_vendor.sr(starpopup, "2dad6c07-9", {
          "k": "starpopup"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map
