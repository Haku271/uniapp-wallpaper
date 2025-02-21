<template>
  <view class="preview">
    <swiper circular>
      <swiper-item  v-for="item in wallList" :key="item._id">
        <image @click="hide" :src="item.picurl" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <view class="mask" v-if="mask">
      <view class="back" @click="back" :style="{top: statusBarHeight() + 'px'}">
        <uni-icons type="back" size="20" color="#fff"></uni-icons>
      </view>
      <view class="count">1/{{wallList.length}}</view>
      <view class="time"><uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat></view>
      <view class="date"><uni-dateformat :date="Date.now()" format="MM月dd日"></uni-dateformat></view>
      <view class="info">
        <view class="box" @click="infoopen">
          <uni-icons type="info" size="28"></uni-icons>
          <view class="text">信息</view>
        </view>
        <view class="box" @click="staropen">
          <uni-icons type="star" size="28"></uni-icons>
          <view class="text">5分</view>
        </view>
        <view class="box">
          <uni-icons type="download" size="24"></uni-icons>
          <view class="text">下载</view>
        </view>
      </view>
    </view>

    <!-- info弹窗 -->
    <uni-popup ref="infopopup" type="bottom">
      <view class="infopopup">
        <view class="Header">
          <view></view>
          <text class="title">壁纸信息</text>
          <view class="close" @click="close">
            <uni-icons type="closeempty" size="18"></uni-icons>
          </view>
        </view>
        <scroll-view scroll-y>
          <view class="content">
            <view class="row">
              <view class="label">壁纸ID：</view>
              <text selectable class="value">121212121212</text>
            </view>
            <view class="row">
              <view class="label">发布者：</view>
              <text selectable class="value">我</text>
            </view>
            <view class="row">
              <view class="label">评分：</view>
              <view class="value star">
                <uni-rate value="5" readonly touchable size="16" />
                <view class="score">5分</view>
              </view>
            </view>
            <view class="row">
              <view class="label">摘要：</view>
              <text selectable class="value">灭有</text>
            </view>
            <view class="row">
              <view class="label">标签：</view>
              <view selectable class="value tabs">
                <view class="tab" v-for="item in 3" >明星</view>
              </view>
            </view>
            <view class="copyright">
              声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱2832167832@qq.com，管理将删除侵权壁纸，维护您的权益。
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
    <!-- 评分弹窗 -->
    <uni-popup ref="starpopup">
      <view class="starpopup">
        <view class="Header">
          <view class=""></view>
          <view class="title">壁纸信息</view>
          <view class="close" @click="close">
            <uni-icons type="closeempty" size="18"></uni-icons>
          </view>
        </view>
        <view class="content">
          <uni-rate v-model="userstar" allowHalf/>
          <text class='text'>{{userstar}}分</text>
        </view>
        <view class="footer">
          <button @click="submit" size="mini" :disabled="!userstar">确认评分</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {statusBarHeight} from '@/utils/sys.js'
  import {onLoad} from "@dcloudio/uni-app"
import { ref, toRefs } from 'vue';

const mask = ref(true);
const infopopup = ref(null);
const starpopup = ref(null);
const userstar = ref(0)
const wallList = ref([])
const current = ref(null)

const storgwallList = uni.getStorageSync("storgwallList") || []
wallList.value = storgwallList.map(item=>{
  return {
    ...item,
    picurl:item.smallPicurl.replace("_small.webp",".jpg")
  }
})

onLoad((e)=>{
  current.value = e.id
})

//隐藏遮罩层
const hide = () => {
  console.log(mask.value);
  mask.value = !mask.value;
};

//返回首页
const back = ()=>{
  uni.navigateBack()
}

//信息弹出层
const infoopen = () => {
  infopopup.value.open('bottom');
};

//关闭弹出层
const close = ()=>{
  infopopup.value.close()
  starpopup.value.close()
}

//打开评分弹出层
const staropen = ()=>{
  starpopup.value.open()
}

//确认评分
const submit = ()=>{
  starpopup.value.close()
}
</script>
<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100vh;
  position: relative;
  swiper {
    height: 100%;
    width: 100%;
    image {
      height: 100%;
      width: 100%;
    }
  }
  .mask {
    & > view {
      position: absolute;
      color: #fff;
    }
    display: flex;
    justify-content: center;
    .back {
      border: 1px solid rgba(255, 255, 255, 0.3);
      top: 0;
      left: 30rpx;
      border-radius: 100px;
      width: 38px;
      height: 38px;
      background: rgba(0, 0, 0, 0.5);
      margin-left: 0;
      backdrop-filter: blur(10rpx);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .count {
      top: 10vh;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 40rpx;
      font-size: 28rpx;
      padding: 8rpx 28rpx;
      backdrop-filter: blur(10rpx);
    }
    .time {
      top: calc(10vh + 80rpx);
      font-size: 140rpx;
      font-weight: 100;
      line-height: 1em;
      text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
    }
    .date {
      top: calc(10vh + 230rpx);
      font-size: 34rpx;
      text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
    }
    .info {
      bottom: 10vh;
      background: rgba(255, 255, 255, 0.8);
      width: 30vh;
      height: 120rpx;
      // color: #000;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 120rpx;
      box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20rpx);
      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rpx 12rpx;
        .text {
          font-size: 26rpx;
          color: $font2;
        }
      }
    }
  }
      .Header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        color: $font2;
        font-size: 26rpx;
      }
      .close {
        padding: 6rpx;
      }
    }
  .infopopup {
    background: #fff;
    padding: 30rpx;
    border-radius: 30rpx 30rpx 0 0;
    // overflow: hidden;
    scroll-view {
    max-height: 50vh;
    .content {
      .row {
        display: flex;
        padding: 16rpx 0;
        font-size: 32rpx;
        line-height: 1.7em;
        .label {
          color: $font3;
          width: 140rpx;
          text-align: right;
          font-size: 30rpx;
        }
        .value {
          flex: 1;
          width: 0;
        }
        .star {
          display: flex;
          align-items: center;
          .score {
            font-size: 26rpx;
            color: $font3;
            padding-left: 20rpx;
          }
        }
        .tabs{
          display: flex;
          flex-wrap: wrap;
          .tab{
            border: 1px solid $theme-c;
            color: $theme-c;
            font-size: 22rpx;
            padding: 10rpx 30rpx;
            border-radius: 40rpx;
            line-height: 1em;
            margin: 0 10rpx 10rpx 0
          }
        }
      }
      .copyright{
        font-size: 28rpx;
        padding: 20rpx;
        background: #f6f6f6;
        color: #666;
        border-radius: 10rpx;
        margin: 20rpx 0;
        line-height: 1.6em;
      }
    }
  }
  }
  .starpopup{
    background: #fff;
    border-radius: 30rpx;
    padding: 30rpx;
    // width: 70vh;
    .content{
      display: flex;
      padding: 30rpx;
      justify-content: center;
      align-items: center;
      .text{
        color: #ffca3e;
        padding-left: 10rpx;
        width: 80rpx;
        line-height: 1em;
        text-align: right;
      }
    }
    .footer{
      display: flex;
      justify-content: center;
      padding: 10rpx 0;
      button{
        color: $font3;
      }
    }
  }
}
</style>
