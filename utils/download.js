/**
 * 下载记录工具模块
 * 提供下载历史相关的数据操作方法
 */

const STORAGE_KEY = 'download_history'

/**
 * 获取下载记录列表的存储key
 */
function getStorageKey() {
  return STORAGE_KEY
}

/**
 * 获取下载记录列表
 * @returns {Array} 下载记录列表
 */
function getDownloadList() {
  const key = getStorageKey()
  return uni.getStorageSync(key) || []
}

/**
 * 保存下载记录列表
 * @param {Array} list 下载记录列表
 */
function saveDownloadList(list) {
  const key = getStorageKey()
  uni.setStorageSync(key, list)
  return true
}

/**
 * 添加下载记录
 * @param {Object} wall 壁纸对象
 * @returns {Boolean} 是否成功
 */
function addDownload(wall) {
  if (!wall || !wall._id && !wall.id) {
    console.error('无效的壁纸对象')
    return false
  }

  const list = getDownloadList()

  // 构建下载记录数据对象
  const downloadItem = {
    _id: wall._id || wall.id,
    download_url: wall.download_url || wall.picurl,
    picurl: wall.picurl || wall.download_url,
    thumbUrl: wall.thumbUrl || (wall.download_url || '').replace(/\/id\/(\d+)\/\d+\/\d+/, '/id/$1/400/600'),
    categoryId: wall.categoryId || null,
    downloadTime: Date.now(),
    downloadTimeStr: formatTime(Date.now())
  }

  // 检查是否已存在，存在则更新时间，不存在则添加到头部
  const existingIndex = list.findIndex(item => String(item._id || item.id) === String(downloadItem._id))
  if (existingIndex !== -1) {
    list.splice(existingIndex, 1)
  }

  // 添加到列表头部
  list.unshift(downloadItem)

  // 限制记录数量，最多保存 100 条
  if (list.length > 100) {
    list.splice(100)
  }

  // 保存
  saveDownloadList(list)

  return true
}

/**
 * 删除下载记录
 * @param {Object|Number} wall 壁纸对象或ID
 * @returns {Boolean} 是否成功
 */
function removeDownload(wall) {
  const wallId = typeof wall === 'object' ? (wall._id || wall.id) : wall
  const list = getDownloadList()

  const index = list.findIndex(item => String(item._id || item.id) === String(wallId))
  if (index === -1) {
    return false
  }

  list.splice(index, 1)
  saveDownloadList(list)

  uni.showToast({
    title: '已删除记录',
    icon: 'none'
  })

  return true
}

/**
 * 清空下载记录
 */
function clearDownloads() {
  const key = getStorageKey()
  if (key) {
    uni.removeStorageSync(key)
  }
}

/**
 * 获取下载数量
 */
function getDownloadCount() {
  return getDownloadList().length
}

/**
 * 检查壁纸是否已下载过
 * @param {Object|Number} wall 壁纸对象或ID
 * @returns {Boolean}
 */
function isDownloaded(wall) {
  const wallId = typeof wall === 'object' ? (wall._id || wall.id) : wall
  const list = getDownloadList()
  return list.some(item => String(item._id || item.id) === String(wallId))
}

/**
 * 格式化时间
 * @param {Number} timestamp 时间戳
 * @returns {String} 格式化后的时间字符串
 */
function formatTime(timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

/**
 * 获取今日下载数量
 */
function getTodayDownloadCount() {
  const list = getDownloadList()
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
  const todayEnd = todayStart + 24 * 60 * 60 * 1000

  return list.filter(item => {
    return item.downloadTime >= todayStart && item.downloadTime < todayEnd
  }).length
}

export {
  getDownloadList,
  addDownload,
  removeDownload,
  isDownloaded,
  clearDownloads,
  getDownloadCount,
  getTodayDownloadCount,
  formatTime,
}
