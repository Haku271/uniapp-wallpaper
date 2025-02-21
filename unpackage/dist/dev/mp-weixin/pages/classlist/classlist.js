"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const queryParams = { pageNum: 1, pagesize: 12 };
    const wallList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    common_vendor.onLoad((e) => {
      let { id = null, name = null } = e;
      queryParams.classid = id;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      getwall();
    });
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryParams.pageNum++;
      getwall();
    });
    const getwall = async () => {
      let res = await api_apis.apiwall(queryParams);
      if (queryParams.pagesize > res.data.length)
        noData.value = true;
      wallList.value = [...wallList.value, ...res.data];
      common_vendor.index.setStorageSync("storgwallList", wallList.value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !wallList.value.length && !noData.value
      }, !wallList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(wallList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id
          };
        }),
        d: wallList.value.length
      }, wallList.value.length ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classlist/classlist.js.map
