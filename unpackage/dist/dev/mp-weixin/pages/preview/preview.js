"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_sys = require("../../utils/sys.js");
const utils_favorite = require("../../utils/favorite.js");
const utils_download = require("../../utils/download.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const mask = common_vendor.ref(true);
    common_vendor.ref(null);
    common_vendor.ref(null);
    const wallList = common_vendor.ref([]);
    const current = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(0);
    const isFavorited = common_vendor.ref(false);
    const isDownloaded = common_vendor.ref(false);
    common_vendor.onLoad((e) => {
      const id = String(e.id);
      current.value = id;
      const storgwallList = common_vendor.index.getStorageSync("storgwallList") || [];
      wallList.value = storgwallList.map((item) => ({
        ...item,
        picurl: item.download_url
      }));
      const index = wallList.value.findIndex(
        (item) => String(item.id) === id
      );
      if (index !== -1) {
        currentIndex.value = index;
      }
      checkFavoriteStatus();
      checkDownloadStatus();
    });
    const onSwiperChange = (e) => {
      currentIndex.value = e.detail.current;
      checkFavoriteStatus();
      checkDownloadStatus();
    };
    const onSwiperTransition = (e) => {
    };
    const checkFavoriteStatus = () => {
      const currentImage = wallList.value[currentIndex.value];
      if (currentImage) {
        isFavorited.value = utils_favorite.isFavorite(currentImage);
      }
    };
    const checkDownloadStatus = () => {
      const currentImage = wallList.value[currentIndex.value];
      if (currentImage) {
        isDownloaded.value = utils_download.isDownloaded(currentImage);
      }
    };
    const toggleFavorite = () => {
      const currentImage = wallList.value[currentIndex.value];
      if (!currentImage)
        return;
      const newState = utils_favorite.toggleFavorite(currentImage);
      isFavorited.value = newState;
      if (common_vendor.index.vibrateShort) {
        common_vendor.index.vibrateShort();
      }
    };
    const downloadFile = () => {
      const currentImage = wallList.value[currentIndex.value];
      if (!currentImage || !currentImage.picurl) {
        common_vendor.index.showToast({
          title: "图片不存在",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "下载中..."
      });
      common_vendor.index.downloadFile({
        url: currentImage.picurl,
        success: (res) => {
          if (res.statusCode === 200) {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                common_vendor.index.hideLoading();
                utils_download.addDownload(currentImage);
                isDownloaded.value = true;
                common_vendor.index.showToast({
                  title: "已保存到相册",
                  icon: "success"
                });
              },
              fail: (err) => {
                common_vendor.index.hideLoading();
                if (err.errMsg.includes("auth")) {
                  common_vendor.index.showModal({
                    title: "提示",
                    content: "需要您授权保存相册权限",
                    success: (modalRes) => {
                      if (modalRes.confirm) {
                        common_vendor.index.openSetting();
                      }
                    }
                  });
                } else {
                  common_vendor.index.showToast({
                    title: "保存失败",
                    icon: "none"
                  });
                }
              }
            });
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "下载失败",
              icon: "none"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.hideLoading();
          common_vendor.index.__f__("error", "at pages/preview/preview.vue:206", "下载失败:", err);
          common_vendor.index.showToast({
            title: "下载失败",
            icon: "none"
          });
        }
      });
    };
    const hide = () => {
      common_vendor.index.__f__("log", "at pages/preview/preview.vue:216", mask.value);
      mask.value = !mask.value;
    };
    const back = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(wallList.value, (item, index, i0) => {
          return {
            a: common_vendor.o(hide, item.id),
            b: item.picurl,
            c: item.id,
            d: common_vendor.n(index === currentIndex.value ? "swiper-item-active" : "")
          };
        }),
        b: common_vendor.o(onSwiperChange),
        c: common_vendor.o(onSwiperTransition),
        d: currentIndex.value,
        e: mask.value
      }, mask.value ? {
        f: common_vendor.p({
          type: "back",
          size: "20",
          color: "#fff"
        }),
        g: common_vendor.o(back),
        h: common_vendor.unref(utils_sys.statusBarHeight)() + "px",
        i: common_vendor.o(downloadFile),
        j: common_vendor.t(isFavorited.value ? "favorite" : "favorite_border"),
        k: isFavorited.value ? 1 : "",
        l: common_vendor.o(toggleFavorite)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/preview/preview.js.map
