// 获取 ai API Key
const getApiKey = () => getApp().globalData.api
export const aiGenerator = (imgData, base64, retry = false) => {
  return new Promise((resolve, reject) => {
    console.log('prompt:', imgData.prompt || imgData)

    uni.showLoading({
      title: 'AI生成中...',
    })
    if (base64) {
      uni.request({
        url: 'https://api.siliconflow.cn/v1/images/generations',
        method: 'POST',
        header: {
          Authorization: `Bearer ${getApiKey()}`,
          'Content-Type': 'application/json',
        },
        data: {
          model: 'Kwai-Kolors/Kolors',
          prompt: imgData.prompt || imgData,
          negative_prompt: '',
          image_size: '1024x1024',
          batch_size: 1,
          seed: 4999999999,
          num_inference_steps: 20,
          guidance_scale: 7.5,
          cfg: 10.05,
          image: base64,
        },
        success: function (res) {
          uni.hideLoading()
          if (res.statusCode === 200) {
            console.log('📦 OK! res.data:', res, res.data.images[0].url)
            const path = encodeURIComponent(res.data.images[0].url)
            uni.redirectTo({
              url: `/pages/catImg/catImg?path=${path}&img=${imgData.url}&prompt=${imgData.prompt}`,
            })
            // 第一次生成,第二次获取不到示例图片和提示词了，所以不保存
            if (!retry) {
              uni.setStorageSync('ai', {
                path: path,
                img: imgData.url,
                prompt: imgData.prompt,
                base64: base64,
              })
            }
          }
          if (res.statusCode === 500) {
            console.log(res.data)
            uni.showToast({
              title: res.data.message,
              icon: 'none',
            })
          }
          if (res.statusCode === 451) {
            uni.showToast({
              title: '🚫 内容被法律要求屏蔽',
              icon: 'none',
            })
          }
        },
        fail: function (err) {
          console.error('AI生成失败:', err)
          uni.showToast({
            title: 'AI生成失败',
            icon: 'none',
          })
          uni.hideLoading()
        },
      })
    } else {
            uni.request({
              url: 'https://api.siliconflow.cn/v1/images/generations',
              method: 'POST',
              header: {
                Authorization: `Bearer ${getApiKey()}`,
                'Content-Type': 'application/json',
              },
              data: {
                model: 'Kwai-Kolors/Kolors',
                prompt: imgData.prompt || imgData,
              },
              success: function (res) {
                uni.hideLoading()
                if (res.statusCode === 200) {
                  console.log('📦 OK! res.data:', res, res.data.images[0].url)
                  const path = encodeURIComponent(res.data.images[0].url)
                  uni.redirectTo({
                    url: `/pages/catImg/catImg?path=${path}&img=${imgData.url}&prompt=${imgData.prompt}`,
                  })
                  // 第一次生成,第二次获取不到示例图片和提示词了，所以不保存
                  if (!retry) {
                    uni.setStorageSync('ai', {
                      path: path,
                      img: imgData.url,
                      prompt: imgData.prompt,
                      base64: base64,
                    })
                  }
                }
                if (res.statusCode === 500) {
                  console.log(res.data)
                  uni.showToast({
                    title: res.data.message,
                    icon: 'none',
                  })
                }
                if (res.statusCode === 451) {
                  uni.showToast({
                    title: '🚫 内容被法律要求屏蔽',
                    icon: 'none',
                  })
                }
              },
              fail: function (err) {
                console.error('AI生成失败:', err)
                uni.showToast({
                  title: 'AI生成失败',
                  icon: 'none',
                })
                uni.hideLoading()
              },
            })
    }
  })
}
