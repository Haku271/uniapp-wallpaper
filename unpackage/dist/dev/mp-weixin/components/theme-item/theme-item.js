"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "theme-item",
  props: {
    item: {
      type: Object
    }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleClick = () => {
      emit("click", props.item);
    };
    const thumbUrl = common_vendor.computed(() => {
      var _a;
      const url = ((_a = props.item) == null ? void 0 : _a.download_url) || "";
      return url.replace(/\/id\/(\d+)\/\d+\/\d+/, "/id/$1/400/600");
    });
    return (_ctx, _cache) => {
      return {
        a: thumbUrl.value,
        b: common_vendor.o(handleClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4eafbca"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/theme-item/theme-item.js.map
