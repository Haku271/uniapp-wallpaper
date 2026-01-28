import { ref } from 'vue'
import { list } from '/api/mock.js'
const List = ref([]) //热门（列表）
let page = 1
// 上拉加载更多的设置
const upOption = ref({
  page: {
    size: 12, // 每页数据的数量
  },
  noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
  empty: {
    tip: '~ 搜索无数据 ~', // 提示
    btnText: '去看看',
  },
})

// 禁用下拉刷新
const downOption = ref({
  use: false,
})

//上拉加载更多回调
const upCallback = async (ms) => {
  page = ms.num
  let res = await list(page, 12)
  ms.endBySize(res.data.length, 100)
  if (page === 1) {
    List.value = res.data
  } else {
    List.value = [...List.value, ...res.data]
  }
}

// 计算 mescroll 高度
const scrollHeight = ref('100vh')
const initHeight = () => {
  const sys = uni.getSystemInfoSync()
  scrollHeight.value = sys.windowHeight + 'px'
}
initHeight()

// 点击热门图片，存储热门数据并跳转
const gotoThemePreview = (item) => {
  uni.setStorageSync('storgwallList', List.value)
  uni.navigateTo({
    url: `/pages/preview/preview?id=${item.id}`,
  })
}

export { upCallback, upOption, gotoThemePreview, scrollHeight, downOption,List }
