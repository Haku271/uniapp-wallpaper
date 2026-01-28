<template>
  <view class="themeItem" @click="handleClick">
    <view class="box">
      <image class="pic" :src="thumbUrl" mode="aspectFill" lazy-load></image>
    </view>
  </view>
</template>

<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    item:{
      type: Object,
    },
  })

  const emit = defineEmits(['click'])

  const handleClick = () => {
    emit('click', props.item)
  }

  // 转换为缩略图 URL (400x600)
  const thumbUrl = computed(() => {
    const url = props.item?.download_url || ''
    return url.replace(/\/id\/(\d+)\/\d+\/\d+/, '/id/$1/400/600')
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
