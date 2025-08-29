<template>
  <view class="star-container">
    <!-- 星级显示 -->
    <view class="star-rating">
      <view 
        v-for="n in 5" 
        :key="n"
        :class="['star', { 'active': n < currentStarLevel }]"
      >
        ★
      </view>
      <view class="score">当前积分:{{points}}分</view>
    </view>
    
    <!-- 轮播显示区域 -->
    <view class="progress-display">
      <!-- 经验条显示 -->
      <view class="exp-bar-container" v-if="showProgressBar">
        <view class="exp-bar">
          <view class="exp-progress" :style="{width: progressPercent + '%'}"></view>
        </view>
      </view>
      
      <!-- 分数进度显示 -->
      <view class="fraction-progress" v-else>
        {{totalPoints}}/{{nextLevelPoints}}
      </view>
    </view>
    
    <view class="max-level" v-if="currentStarLevel >= 5">
      <view class="max-text">已达到最高星级</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    points: {
      type: Number,
      required: true,
      default: 0
    },
	totalPoints:{
		type: Number,
		required:true,
		default:0
	}
  },
  data() {
    return {
      showProgressBar: true,
      progressInterval: null
    }
  },
  computed: {
    starThresholds() {
      return [0,5000, 15000, 50000, 100000, 200000]
    },
    currentStarLevel() {
      const { totalPoints, starThresholds } = this
      for (let i = starThresholds.length - 1; i >= 0; i--) {
        if (totalPoints >= starThresholds[i]){ 
		return i}
      }
	 
      return 0
    },
    nextLevelPoints() {
      return this.starThresholds[this.currentStarLevel + 1] || '∞'
    },
    currentPoints() {
      return this.points - this.starThresholds[this.currentStarLevel]
    },
    progressPercent() {
      if (this.currentStarLevel >= 5) return 100
      const total = this.nextLevelPoints - this.starThresholds[this.currentStarLevel]
      return Math.min(100, ((this.totalPoints - this.starThresholds[this.currentStarLevel]) / total) * 100)
    }
  },
  mounted() {
    this.startProgressInterval()
  },
  beforeUnmount() {
    this.clearProgressInterval()
  },
  methods: {
    startProgressInterval() {
      this.clearProgressInterval()
      this.progressInterval = setInterval(() => {
        this.showProgressBar = !this.showProgressBar
      }, this.showProgressBar ? 8000 : 4000) // 经验条显示10秒，分数显示5秒
    },
    clearProgressInterval() {
      if (this.progressInterval) {
        clearInterval(this.progressInterval)
        this.progressInterval = null
      }
    }
  }
}
</script>

<style scoped>
.star-container {
  width: 100%;
  margin: 6px 0;
}

.star-rating {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.star {
  color: #e0e0e0;
  font-size: 16px;
  margin-right: 2px;
}

.star.active {
  color: #FFD700;
  text-shadow: 0 0 1px rgba(255, 215, 0, 0.3);
}

.score {
  margin-left: 6px;
  font-size: 12px;
  color: #888;
  font-weight: normal;
}

/* 进度显示区域 */
.progress-display {
  height: 20px; /* 固定高度防止切换时布局跳动 */
  display: flex;
  align-items: center;
}

/* 经验条容器 */
.exp-bar-container {
  width: 100%;
  display: flex;
  align-items: center;
}

/* 经验条样式 */
.exp-bar {
  flex: 1;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.exp-progress {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* 分数进度显示 */
.fraction-progress {
  width: 100%;
  font-size: 12px;
  color: #666;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

/* 最高等级提示 */
.max-level {
  margin-top: 2px;
}

.max-text {
  font-size: 10px;
  color: #FFD700;
  font-weight: normal;
}

/* 淡入动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>