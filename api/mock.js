// Mock 数据 - 使用 Picsum 免费图片服务
import { request } from '@/utils/request.js'

// 精选（随机图片）- 生成随机种子图片URL
export const randomData = () => {
  const list = []
  const seedBase = Date.now()  // 统一的种子基准，确保同一批次的图片一致

  for (let i = 0; i < 26; i++) {
    const seed = seedBase + i
    list.push({
      id: seed,  // 统一使用 id 字段
      download_url: `https://picsum.photos/seed/${seed}/400/800`,
    })
  }
  return Promise.resolve({ data: list })
}

// 热门（列表）
export const list = (page = 1, limit = 12) => {
  return request({
    url: `/v2/list?page=${page}&limit=${limit}`,
  })
}
