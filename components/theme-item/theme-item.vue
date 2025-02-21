<template>
  <view class="themeItem">
    <navigator :url="'/pages/classlist/classlist?id='+item._id+'&name='+item.name" class="box" v-if="!isMore" >
      <image class="pic" :src="item.picurl" mode="aspectFill"></image>
      <view class="mask">{{item.name}}</view>
      <view class="tab">{{time(item.updateTime)}}前更新</view>
    </navigator>

    <navigator url="/pages/classlist/classlist" class="box more" v-if="isMore">
      <image class="pic" src="../../common/image/more.jpg" mode="aspectFill"></image>
      <view class="mask">
        <uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
        <view class="text">更多</view>
      </view>
    </navigator>
  </view>
</template>

<script setup>
  import {time} from '@/utils/common.js'
  defineProps({
    isMore:{
      type: Boolean,
      dufault: false
    },
    item:{
      tyle: Object,
      default(){
        return {
          name:'默认名称',
          picurl:"../../common/images/classify1.jpg",
          updateTime:Date.now() - 1000*60*60*5
        }
      }
    },
  })
</script>

<style lang="scss" scoped>
.themeItem {
  .box {
    height: 340rpx;
    overflow: hidden;
    position: relative;
    border-radius: 10rpx;
  }
  .pic {
    width: 100%;
    height: 100%;
  }
  .tab {
    position: absolute;
    top: 0;
    height: 33rpx;
    background: rgba(250,129,90,0.7);
    border-radius: 0 0 20rpx 0;
    font-size: 22rpx;
    color: white;
    display: flex;
    justify-content: center;  
    align-items: center;
    backdrop-filter: blur(20rpx);
    padding: 6rpx 14rpx;
    transform:scale(0.8); // 最小字号12，通过变形缩放还可以变小字体
    transform-origin: left top;;
    }
  .mask {
    position: absolute;
    bottom: 0;
    height: 70rpx;
    width: 100%;
    // background-color: rgba(0,0,0,0.2);
    backdrop-filter: blur(20rpx);    
    font-size: 30rpx;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight:600
  }
  .box.more{
    .mask{
      height: 100%;
      width: 100%;
      flex-direction: column;
    }
    .text{
      font-size: 28rpx;
    }
  }
}
</style>
