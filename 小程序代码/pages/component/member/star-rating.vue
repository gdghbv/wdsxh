<<template>
  <view class="star-container">
    <view class="star-rating">
      <view 
        v-for="n in currentStarLevel" 
        :key="n"
        class="star active"
      >
        ★
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    totalPoints: {
      type: Number,
      required: true
    }
  },
  computed: {
    starThresholds() {
      return [0,5000, 15000, 50000, 100000, 200000];
    },
    currentStarLevel() {
      for (let i = this.starThresholds.length - 1; i >= 0; i--) {
        if (this.totalPoints >= this.starThresholds[i]) 
		return i ; // 返回星级数（从0开始）
      }
      return 0; // 默认0星
    }
  }
};
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



</style>