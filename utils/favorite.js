/**
 * 收藏功能工具模块
 * 提供收藏相关的数据操作方法
 */

const STORAGE_KEY = 'fav_walls_local'

/**
 * 获取收藏列表的存储key
 */
function getStorageKey() {
  return STORAGE_KEY
}

/**
 * 获取收藏列表
 * @returns {Array} 收藏的壁纸列表
 */
function getFavoriteList() {
  const key = getStorageKey()
  return uni.getStorageSync(key) || []
}

/**
 * 保存收藏列表
 * @param {Array} list 收藏列表
 */
function saveFavoriteList(list) {
  const key = getStorageKey()
  uni.setStorageSync(key, list)
  return true
}

/**
 * 检查壁纸是否已收藏
 * @param {Object|Number} wall 壁纸对象或ID
 * @returns {Boolean}
 */
function isFavorite(wall) {
  const wallId = typeof wall === 'object' ? (wall._id || wall.id) : wall
  const list = getFavoriteList()
  return list.some(item => String(item._id || item.id) === String(wallId))
}

/**
 * 添加收藏
 * @param {Object} wall 壁纸对象
 * @returns {Boolean} 是否成功
 */
function addFavorite(wall) {
  if (!wall || !wall._id && !wall.id) {
    console.error('无效的壁纸对象')
    return false
  }

  // 检查是否已收藏
  if (isFavorite(wall)) {
    uni.showToast({
      title: '已收藏',
      icon: 'none'
    })
    return false
  }

  const list = getFavoriteList()

  // 构建收藏数据对象
  const favItem = {
    _id: wall._id || wall.id,
    download_url: wall.download_url || wall.picurl,
    picurl: wall.picurl || wall.download_url,
    thumbUrl: wall.thumbUrl || (wall.download_url || '').replace(/\/id\/(\d+)\/\d+\/\d+/, '/id/$1/400/600'),
    categoryId: wall.categoryId || null,
    createTime: Date.now()
  }

  // 添加到列表头部
  list.unshift(favItem)

  // 保存
  saveFavoriteList(list)

  uni.showToast({
    title: '收藏成功',
    icon: 'success'
  })

  return true
}

/**
 * 取消收藏
 * @param {Object|Number} wall 壁纸对象或ID
 * @returns {Boolean} 是否成功
 */
function removeFavorite(wall) {
  const wallId = typeof wall === 'object' ? (wall._id || wall.id) : wall
  const list = getFavoriteList()

  const index = list.findIndex(item => String(item._id || item.id) === String(wallId))
  if (index === -1) {
    return false
  }

  list.splice(index, 1)
  saveFavoriteList(list)

  uni.showToast({
    title: '已取消收藏',
    icon: 'none'
  })

  return true
}

/**
 * 切换收藏状态
 * @param {Object} wall 壁纸对象
 * @returns {Boolean} 当前的收藏状态（true=已收藏，false=未收藏）
 */
function toggleFavorite(wall) {
  if (isFavorite(wall)) {
    removeFavorite(wall)
    return false
  } else {
    addFavorite(wall)
    return true
  }
}

/**
 * 清空收藏列表
 */
function clearFavorites() {
  const key = getStorageKey()
  if (key) {
    uni.removeStorageSync(key)
  }
}

/**
 * 获取收藏数量
 */
function getFavoriteCount() {
  return getFavoriteList().length
}

export {
  isFavorite,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  getFavoriteList,
  getFavoriteCount,
  clearFavorites
}
