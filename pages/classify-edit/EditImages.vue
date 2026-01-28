<template>
  <view class="layout pageBg">
    <custom-nav-bar></custom-nav-bar>
    <!-- <view class="navbar"></view> -->
    <view class="content">
      <image :src="imagePath" mode="scaleToFill" class="preview-img" />
    </view>
    <!-- 选择菜单 -->
    <view class="menu">
      <view class="menu-navbar">
        <view class="menu-but" @tap="applyPrompt">应用</view>
      </view>
      <scroll-view scroll-x :show-scrollbar="false" class="scroll">
        <view
          class="box"
          v-for="(value, index) in imgData"
          :key="index"
          @tap="choiceImg = index"
          :class="{ activate: index === choiceImg }"
        >
          <image :src="value.url" mode="aspectFill" webp></image>
          <view class="box-name">{{ value.name }}</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { aiGenerator } from '@/utils/aiGenerator.js'

const choiceImg = ref('')
const imagePath = ref('') // 上传图片路径
const prompt = ref('') // 提示词

onLoad((options) => {
  if (options.path) {
    imagePath.value = decodeURIComponent(options.path)
  }
})

// 图片数据
const imgData = ref([
  {
    name: '圣诞帽',
    url: '/static/classify-edit/output.jpg',
    prompt:
      '将图中人物添加戴着红白相间的圣诞帽，站在飘落雪花的冬夜街头。她的面庞被温暖的金色街灯照亮，映出柔和的光晕。背景是一排装饰着彩灯的橱窗与模糊的城市灯影，营造出梦幻般的节日氛围。女孩身穿毛绒外套，帽子上的白色绒球轻轻垂在侧面，脸上露出温柔微笑。整体色调以温暖的金色与圣诞红为主，点缀冷调的蓝白雪光，形成强烈的冷暖对比。画面风格细腻写实，带有柔焦效果与电影级光影质感，呈现出圣诞节温馨而浪漫的视觉氛围。',
  },
  {
    name: '冰霜风',
    url: '/static/classify-edit/output2.jpg',
    prompt:
      '将画面人物站立于寒冷荒原中，皮肤透出淡蓝色的冰晶纹理，发丝宛如凝结的白霜，在微风中轻盈飘动。服饰由闪烁的冰片与透明水晶构成，反射着冷冽的月光。背景是一片被厚雪覆盖的山峦与冻结的湖面，远处有薄雾与飞舞的雪花营造出朦胧氛围。整体色调以冰蓝、银白为主，伴有微弱的冷光在边缘勾勒轮廓，光影对比鲜明，突出冰霜的质感与寒意。艺术风格偏向高细节写实结合奇幻插画，细致描绘每一处冰晶的折射与霜雾的弥散效果，仿佛寒气从画面中溢出。',
  },
  {
    name: '赛博风',
    url: '/static/classify-edit/output3.jpg',
    prompt:
      '将图中图片风格调整为赛博风；背景是层叠的未来都市高楼，布满全息广告与悬浮车辆，色彩以深蓝、紫色和炽热的霓虹粉为主，营造强烈的冷暖对比；光影效果强调暗处的阴影与明亮的灯牌交替闪烁，在人物的轮廓上形成高对比的光边；人物身着细节丰富的科技装甲，表面镶嵌微型LED电路，肩部延伸出机械臂结构，质感结合金属光泽与磨砂材质；构图采用略微仰视的角度，增强气势与未来感，整体画面充满动态张力与沉浸式的科技氛围。',
  },
  {
    name: 'Q版',
    url: '/static/classify-edit/output4.jpg',
    prompt:
      '将图中人物变成Q版人物形象，头身比例夸张，圆润可爱，五官精致生动；采用柔和的粉彩色调与高饱和度的亮色点缀，营造童话般的暖心氛围；背景为简洁梦幻场景，带有漂浮的云朵与闪烁星光；光影柔和，带有微光晕效果让人物更加立体；线条细腻流畅，仿手绘插画风格，细节处加入小饰品如蝴蝶结、迷你背包或抱着小动物，表现童趣与温暖；整体构图居中，人物与背景完美融合，呈现轻松愉快的视觉体验。',
  },
  {
    name: '卡通',
    url: '/static/classify-edit/output5.jpg',
    prompt:
      '将图片中的人物变成充满活力的卡通人物形象，采用细腻的手绘风格与夸张的表情设计，整体色彩明亮饱和，背景为柔和渐变的天空与简洁的城市场景。构图以人物为中心，采用中景镜头突出角色动态姿势，线条流畅，造型圆润可爱，光影柔和且高对比，营造出愉快、轻松的氛围。细节上强调人物的服饰纹理、发丝的曲线，以及面部的生动表情，画面具有浓厚的动画片质感与故事氛围。',
  },
  {
    name: '极简',
    url: '/static/classify-edit/output6.jpg',
    prompt:
      '将图片变成极简主义风格，画面中线条简洁流畅，构图居中并留有大量负空间，整体配色以柔和的黑白或浅米色调为主，光线柔和且均匀投射，人物形象干净利落，服饰简约无多余装饰，细节精致但克制，整体氛围静谧而富有高级感，呈现出现代艺术摄影般的质感与优雅气息。',
  },
  {
    name: '油画',
    url: '/static/classify-edit/output7.jpg',
    prompt:
      '将图中的人物肖像化，采用古典油画风格，细腻而富有层次感的笔触表现人物面部与服饰的质感；柔和的暖色调背景，带有复古棕金色渐变，凸显主体的高贵与典雅；构图居中，人物三分之二身位，目光微微偏向画面左侧；光源柔和如烛光，在面部与肩部形成温暖的明暗对比；背景隐约可见精致的纹理与虚化的幕布，营造深邃空间感；整体色彩饱满而和谐，细节处的肌理与微光使画面散发浓郁的古典艺术魅力。',
  },
  {
    name: '绘本风',
    url: '/static/classify-edit/output8.jpg',
    prompt:
      '将图中人物变成温暖柔和的绘本风人物插画，采用低饱和度的马卡龙色调与细腻的手绘质感，人物面部表情生动而富有故事性，五官细节以细腻笔触呈现；背景为简洁而温馨的场景，如阳光透过窗户洒落在木质地板上，形成柔和的光影渐变；构图平衡且富有留白感，人物置于画面中央或稍偏一侧，营造宁静温暖的氛围；整体风格融合日系与欧式绘本特征，边缘带有水彩渲染的轻晕效果，画面流露出童话般的温情与梦幻感。',
  },
  {
    name: '玩具风',
    url: '/static/classify-edit/output9.jpg',
    prompt:
      '将图片中的人物变成一个可爱的人物形象置于充满梦幻感的玩具世界中，场景色彩明亮且饱和，整体以柔和的粉彩与糖果色为主调；人物比例略带夸张，拥有圆润的面部与闪亮的眼睛，表情生动；背景由堆叠的积木、毛绒玩具以及微型火车组成，呈现出童话般的构图；光线柔和而温暖，如午后阳光透过窗户洒下，在玩具表面形成细腻的高光与阴影；质感精致，仿佛每个玩具都带有细微的布料纹理或塑料光泽；整体风格融合卡通渲染与微缩模型质感，带来富有温度与怀旧感的视觉体验。',
  },
  {
    name: '中世纪幻想风',
    url: '/static/classify-edit/output10.jpg',
    prompt:
      '将图中人物变成一位身穿精致银色锁子甲与深蓝天鹅绒披风的中世纪幻想人物，置身于薄雾笼罩的古老森林入口，背景是高耸的石质城堡塔楼与泛着金辉的落日天空。构图以人物为中心，微微仰角拍摄，强调其威严与力量。光影柔和而富有层次，夕阳的暖橙色与森林的冷绿色形成强烈色彩对比，盔甲反射出细腻的金属光泽，披风的布料纹理清晰可见，风轻轻扬起衣角。整体画面融合中世纪油画的质感与奇幻插画的精致细节，氛围宏大而神秘。',
  },
  {
    name: '水彩风',
    url: '/static/classify-edit/output11.jpg',
    prompt:
      '将图中人物变成柔和水彩风格的人物肖像，画面充满细腻的手绘质感与微晕的色彩过渡，采用温暖柔和的配色方案，如浅粉、米白、湖蓝，背景为淡雅的渐变水彩晕染，仿佛纸面上渗透的颜料。人物置于画面中央，面部轮廓精致，眼神温柔，头发以松散的笔触呈现出自然飘动感。光源柔和从左上方洒下，在人物面部与肩膀处形成细腻的高光与半透明层叠效果，整体氛围梦幻、宁静，画面中可见细微的水彩纸纹理与笔刷水迹，营造出手工艺术般的真实感。',
  },
  {
    name: '低多边形风',
    url: '/static/classify-edit/output12.jpg',
    prompt:
      '将图中人物，整体造型采用极简低多边形风格，轮廓由锐利的几何切面构成，呈现出简洁而富有张力的结构感。画面以对称构图为主，人物置于前景，背景由抽象的多面体山脉与几何天空组成。光源来自斜侧方，投射出硬朗的阴影与高反差光感，强调多边形面之间的明暗变化。色彩以冷暖对比呈现，冷色的蓝灰背景衬托人物服饰的暖色黄橙调，在低饱和度中透出微妙光泽。整体风格融合现代极简主义与数字艺术美学，细节中可见多边形边缘微微闪烁的高光，营造出虚拟世界的质感与层次感。',
  },
  {
    name: '像素风',
    url: '/static/classify-edit/output13.jpg',
    prompt:
      '将图中人物变成复古像素风格人物立绘，采用明亮且饱和度高的色彩，背景为简洁的8位像素场景，如微微泛光的城市街道或黄昏余辉下的森林。人物以正面或三分侧面构图呈现，轮廓清晰且以粗像素线条勾勒，细节处表现衣物的褶皱与配饰的闪光。画面带有轻微颗粒感与像素格的可见边缘，光影对比明显，营造怀旧的游戏氛围，整体风格参考早期主机游戏的精灵图质感，色彩分层鲜明，透出温暖又带点冒险感的视觉体验。',
  },
  {
    name: '装饰艺术风',
    url: '/static/classify-edit/output14.jpg',
    prompt:
      '将图片中一位优雅的人物置身于充满装饰艺术风格的场景，背景为几何线条与对称构图的建筑，带有金色、黑色与深蓝的精致配色，整体氛围奢华而现代。人物服饰融合了流畅的曲线与金属质感细节，帽饰或配件呈现复古的装饰花纹。画面采用柔和的定向灯光与高对比阴影，凸显立体感与肌理。整体艺术风格融合1920年代的典雅与当代摄影的锐利质感，色彩饱和且层次丰富，背景中有闪烁的灯饰与精美的墙面雕刻，营造出华丽而戏剧化的视觉效果。',
  },
  {
    name: '大理石绘画风',
    url: '/static/classify-edit/output15.jpg',
    prompt:
      '将图片中的人物立于画面中央，姿态端庄而富有故事感，面部五官精致且表情微妙，仿佛隐含着内心的情绪变化。整体以大理石绘画风呈现，背景与人物的肌理如同细腻的白色与灰色纹路交织，仿佛雕刻在冰凉的石面上。画面采用柔和而对比鲜明的光影，从侧面洒落的暖光与冷色阴影形成丰富的层次，突显面部轮廓与细节质感。色彩主调以象牙白、淡灰、浅金和柔和的灰蓝为主，点缀细微的金属反光，使作品带有古典与永恒的氛围。构图集中且平衡，背景简洁，突出人物的存在感；整体艺术风格融合古典雕刻感与静谧的绘画意境，给人一种庄严、诗意又梦幻的视觉体验。',
  },
  {
    name: '黑暗末世风',
    url: '/static/classify-edit/output16.jpg',
    prompt:
      '将图片中的人物末世废墟中环境，站立在崩塌的城市街道中央，周围是断裂的高楼骨架与缠绕的钢筋，地面布满碎石与破败的标志牌；天空被厚重的乌云笼罩，呈深灰与血红交织的色调，远处偶尔闪过电光，将场景映照出冷峻而诡异的高对比阴影；人物身穿破旧的战术风衣与护甲，面容被半破的防毒面具遮盖，眼神在微光中透出警觉与孤寂；视觉风格偏向电影级后末日写实，加入细腻的纹理与尘埃粒子效果，整体构图以人物为中心，背景向远处延伸制造深度感，光影采用强烈的冷暖对比，增强压迫与绝望的氛围。',
  },
  {
    name: '可爱风',
    url: '/static/classify-edit/output17.jpg',
    prompt:
      '将图片中的人物变成可爱风格的人物置于画面中央，整体采用柔和的粉色、薄荷绿与奶油白配色，背景为温暖的浅色渐变或梦幻糖果色空间。人物面容圆润，眼睛大而明亮，带有细腻的光泽与倒影，表情温暖甜美。服装为蓬松柔软的材质，如薄纱与针织，融合蝴蝶结、荷叶边、镶珠等精致装饰。画面采用高饱和度与柔焦镜头处理，光线柔和、略带漫射，仿佛清晨的阳光或室内暖灯照射，让整体呈现温馨氛围。构图均衡，背景细节可加入漂浮的卡通饰物、小花、气泡或闪光粒子，营造出梦幻童话感。艺术风格可参考日系动漫与水彩插画结合，既有精致的线条又保留手绘质感。',
  },
  {
    name: '罪恶都市风',
    url: '/static/classify-edit/output18.jpg',
    prompt:
      '将图片中的人物霓虹闪烁的夜色中，站在湿漉漉的街道中央，背景是高耸的摩天大楼与闪烁的广告牌，映射出冷暖交织的光影；街道上弥漫着微薄的雾气与汽油味，路面反射着紫色与青蓝色的霓虹，营造出浓厚的罪恶都市氛围；人物身着华丽却略显破旧的皮夹克，面容被半明半暗的灯光切割，眼神冷峻而充满故事感；画面采用高对比度与电影级构图，细节包含街角小贩的摊位、远处的警车红蓝灯闪烁，以及零星飘落的纸屑，在赛博朋克与黑色电影风格的融合下，整个场景充满危险、欲望与孤独的气息。',
  },
  {
    name: '恐怖风',
    url: '/static/classify-edit/output19.jpg',
    prompt:
      '将图片中的人物在昏暗走廊中，面容模糊而扭曲，散发令人不安的气息；背景是破败老旧的建筑，墙壁布满裂痕与斑驳的污渍，地面湿滑反射微弱光线；光源来自摇曳的昏黄灯泡和窗外渗入的冷蓝月光，形成强烈光影对比；色调整体偏向深灰、墨绿与血红，营造压抑与惊悚氛围；细节处可见空气中漂浮的灰尘、蜘蛛网缠绕角落、墙壁阴影中隐约闪动的诡异眼睛；采用电影级恐怖片风格，镜头构图略显倾斜，带有心理悬疑感与压迫感。',
  },
  {
    name: '定格动画风',
    url: '/static/classify-edit/output20.jpg',
    prompt:
      '将图片中的人物变成一个充满手工质感的定格动画场景，主角人物以夸张的形体比例与温暖的面部表情呈现，动作略带生硬却富有灵魂；背景为精心制作的微缩世界，包含彩色纸板建筑、手工布料树木与细致的纹理道具；柔和的暖色光源营造黄昏氛围，阴影略显浓重，增强立体感；摄像机仿佛停留在低角度，突出人物在画面中央的存在感，周围细节微微虚化；整体色彩鲜艳但带有些许复古滤镜质感，仿佛来自传统手工动画电影；画面颗粒感与微妙的不完美线条进一步强化定格动画的手作温度与怀旧氛围。',
  },
  {
    name: '复古风',
    url: '/static/classify-edit/output21.jpg',
    prompt:
      '将图片中人物变成复古氛围的人物肖像，画面采用20世纪中叶的经典美学风格，柔和暖调的色彩，如褪色的棕褐与浅金色，营造怀旧感；人物穿着精致的复古服饰，细节包括优雅的帽饰、精工刺绣、怀表或蕾丝手套；构图以半身或三分之一特写为主，背景为老式咖啡馆、木质书柜或昏黄街灯下的石板路；光影柔和，带有漫反射的自然光与阴影交织，突显面部轮廓与服装质感；画面颗粒细微，略带胶片质感，可结合油画笔触或插画风格，整体沉浸式呈现复古年代的典雅与温度。',
  },
  {
    name: '草图风',
    url: '/static/classify-edit/output22.jpg',
    prompt:
      '一幅以单个人物为核心的画面，整体呈现精致的手绘草图风格。画面采用简洁的构图，人物置于画面中央或略偏一侧，以自然姿态呈现。线条流畅而富有表现力，带有微妙的粗细变化与手绘质感。光影柔和，如铅笔或炭笔轻轻晕染的阴影层次，营造立体感。色彩以黑白灰为主，辅以少量淡色点缀，增加视觉层次。画面背景干净简约，可带有轻描淡写的环境元素，使人物更加突出。这种风格融合速写的随性与艺术的细腻，整体传递温暖而富有人情味的氛围。',
  },
])

// 应用模板
const applyPrompt = async () => {
  if (choiceImg.value === '') {
    return uni.showToast({ title: '请先选择一种风格', icon: 'none' })
  }
  const activeItem = imgData.value[choiceImg.value]
  prompt.value = activeItem.prompt
  try {
    // 本地图片转换为 base64
    const base64 = await imageToBase64(imagePath.value)

    // 提交任务
    aiGenerator(activeItem, base64)
  } catch (e) {
    uni.showToast({ title: e.message || '请求失败', icon: 'none' })
    console.error(e.message)
  }
}

const imageToBase64 = async (path) => {
  // // #ifdef H5
  // try {
  //   const response = await fetch(path)
  //   if (!response.ok) throw new Error(`HTTP ${response.status}`)

  //   const blob = await response.blob()
  //   console.log('✅ Blob获取成功:', blob.type, blob.size)

  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onloadend = () => resolve(reader.result)
  //     reader.onerror = reject
  //     reader.readAsDataURL(blob)
  //   })
  // } catch (error) {
  //   console.error('❌ 错误详情:', error)
  //   throw error
  // }
  // // #endif
  // #ifdef MP-WEIXIN
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: path,
      encoding: 'base64',
      success: (res) => resolve(`data:image/jpeg;base64,${res.data}`),
      fail: (e) => reject(e),
    })
  })
  // #endif
}
</script>

<style lang="scss" scoped>
.pageBg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.navbar {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
}
.content {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu {
  background-color: #1a1a1a;
  width: 100%;
  height: 30%rpx;
  border-radius: 50rpx 50rpx 0 0;
  scroll-view {
    white-space: nowrap;
    margin-top: 30rpx;
    margin-bottom: 50rpx;
  }
  .box {
    display: inline-block;
    margin-left: 25rpx;
    border-radius: 30rpx;
    box-sizing: border-box;
    padding: 8rpx 8rpx 0rpx 8rpx;
    position: relative;
    image {
      width: 150rpx;
      height: 150rpx;
      border-radius: 30rpx;
    }
    &-name {
      position: absolute;
      bottom: 8rpx;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 35rpx;
    }
    &.activate {
      background-color: #6836dd;
    }
  }
  &-but {
    width: 120rpx;
    height: 60rpx;
    background: #6836dd;
    border-radius: 25rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30rpx;
  }
  &-navbar {
    display: flex;
    justify-content: flex-end;
    padding-top: 30rpx;
  }
}
.preview-img {
  width: 90vw;
  height: 60vh;
  border-radius: 30rpx;
  margin-bottom: 30rpx;
}
.loading {
  color: #a081ea;
  margin-bottom: 30rpx;
}
</style>
