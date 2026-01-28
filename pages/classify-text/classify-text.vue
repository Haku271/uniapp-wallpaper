<template>
  <view class="layout pageBg">
    <custom-nav-bar title="创意描述"></custom-nav-bar>
    <view class="container">
      <view class="input-card">
        <textarea
          class="input-area"
          placeholder="请详细描述你想要生成的画面内容（例如：一只在霓虹灯下奔跑的赛博朋克风格猫咪）..."
          placeholder-style="color: rgba(255,255,255,0.3)"
          v-model="prompt"
          maxlength="500"
        ></textarea>
        <view class="word-count">{{ prompt.length }}/500</view>
      </view>

      <button class="submit-btn" hover-class="btn-hover" @tap="submitIdea">
        开始生成
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { aiGenerator } from '@/utils/aiGenerator.js'

const prompt = ref('')

const submitIdea = () => {
  if (!prompt.value.trim()) {
    uni.showToast({
      title: '请输入创意描述',
      icon: 'none',
    })
    return
  }
  aiGenerator(prompt.value)
}
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;

  .input-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 24rpx;
    padding: 30rpx;
    border: 1px solid rgba(255, 255, 255, 0.15);
    margin-bottom: 60rpx;
    backdrop-filter: blur(10px);

    .input-area {
      width: 100%;
      height: 400rpx;
      font-size: 30rpx;
      color: #fff;
      line-height: 1.6;
    }

    .word-count {
      text-align: right;
      color: rgba(255, 255, 255, 0.5);
      font-size: 24rpx;
      margin-top: 20rpx;
    }
  }

  .submit-btn {
    background: linear-gradient(90deg, #667eea, #764ba2);
    color: white;
    border-radius: 50rpx;
    font-size: 34rpx;
    border: none;
    box-shadow: 0 8rpx 24rpx rgba(118, 75, 162, 0.3);

    &::after {
      border: none;
    }
  }

  .btn-hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
}
</style>
