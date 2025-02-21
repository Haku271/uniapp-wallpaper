<template>
  <view class="home pageBg">
    <custom-nav-bar title="推荐"></custom-nav-bar>
    <view class="banner">
      <swiper indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay circular>
        <swiper-item v-for="item in bannerList" :key="item._id">
          <image :src="item.picurl" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>

    <view class="notice">
      <view class="left">
        <uni-icons type="sound-filled" size="20"></uni-icons>
        <view class="text">公告</view>
      </view>
      <view class="center">
        <swiper autoplay vertical interval="1500" duration="300" circular>
          <swiper-item v-for="item in noticeList" :key="item._id">
            <navigator url="/pages/notice/detail">{{item.title}}</navigator>
          </swiper-item>
        </swiper>
      </view>
      <view class="right">
        <uni-icons type="right" color="#333" size="16"></uni-icons>
      </view>
    </view>

    <view class="select">
      <common-title>
        <template #name>每日推荐</template>
        <template #custom>
          <view class="date">
            <uni-icons type="calendar" size="20"></uni-icons>
            <uni-dateformat :date="Date.now()" format="dd号"></uni-dateformat>
          </view>
        </template>
      </common-title>
      <view class="center">
        <scroll-view scroll-x>
          <navigator url="/pages/preview/preview">
            <view v-for="item in randomList" :key='item._id' class="box">
              <image :src="item.smallPicurl" mode="aspectFill"></image>
            </view>
          </navigator>
        </scroll-view>
      </view>
    </view>

    <view class="theme">
      <common-title>
        <template #name>专题精选</template>
        <template #custom>
          <navigator url="/pages/classify/classify" class="more" open-type="reLaunch">More+</navigator>
        </template>
      </common-title>

      <view class="content">
        <theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
        <theme-item :isMore="true"></theme-item>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {ref} from "vue"
  import {apiGetBanner,apigetDayRandom,apinotice,apiclassify,apiwall} from '@/api/apis.js'
  const bannerList = ref([])
  const randomList = ref([])
  const noticeList = ref([])
  const classifyList = ref([])

const getBanner = async ()=>{
  let res = await apiGetBanner()
  bannerList.value = res.data
}
const getDayRandom = async ()=>{
  let res = await apigetDayRandom()
  randomList.value = res.data
}

const getNotice = async ()=>{
  let res = await apinotice()
  noticeList.value = '公告'
}
const getclassify = async ()=>{
  let res = await apiclassify({select:true})
  classifyList.value = res.data
}

getBanner()
getDayRandom()
getNotice()
getclassify()
</script>

<style lang="scss" scoped>
.home {
  .banner {
    width: 750rpx;
    padding: 30rpx 0;
    swiper {
      width: 750rpx;
      height: 340rpx;
      &-item {
        width: 100%;
        height: 100%;
        padding: 0 30rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
        }
      }
    }
  }
  .notice {
    width: 690rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 80rpx;
    background-color: #f9f9f9;
    display: flex;
    margin: 0 auto;
    .left {
      width: 140rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep() {
        .uni-icons {
          color: $theme-c !important;
        }
      }
      .text {
        color: $theme-c;
        font-size: 28rpx;
        font-weight: 600;
      }
    }
    .center {
      flex: 1;
      swiper {
        height: 100%;
        &-item {
          height: 100%;
          font-size: 30rpx;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .right {
      width: 70rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .select {
    // padding-top: 50rpx;
    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $theme-c;
      :deep() {
        .uni-icons {
          color: $theme-c !important;
        }
      }
    }
    .center {
      width: 720rpx;
      margin-left: 30rpx;
      display: flex;
      justify-content: space-between;
      // padding-top: 35rpx;
      scroll-view {
        white-space: nowrap;
      }
      .box {
        width: 200rpx;
        height: 430rpx;
        display: inline-block;
        margin-right: 15rpx;
      }
      image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
    }
  }

  .theme {
    padding-bottom: 50rpx;
    .custom {
      .more {
        font-size: 32rpx;
        color: #888;
      }
    }
    .content {
      // margin: 0 30rpx;
      padding: 0 30rpx;
      display: grid;
      grid-template-columns: 3fr 3fr 3fr;
      gap: 15rpx;
    }
  }
}
</style>
