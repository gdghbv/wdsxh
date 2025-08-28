<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-积分日志 开发者: [你的名字]
+---------------------------------------------------------------------- -->

<template>
  <view class="component-points-log">
    <view class="log-item" v-for="(item, index) in showData" :key="item.id">
      <view class="item-header flex align-items-center">
        <view class="header-memo flex-item">{{ item.memo }}</view>
        <view class="header-points" :style="{color: item.change === 1 ? themeColor : '#FF626E'}">
          {{ item.change === 1 ? '+' : '-' }}{{ item.points }}
        </view>
      </view>
      
      <view class="item-detail flex align-items-center">
        <view class="detail-time">{{ formatTime(item.createtime) }}</view>
        <view class="detail-state" :style="{color: item.change === 1 ? themeColor : '#FF626E'}">
          {{ item.change === 1 ? '增加' : '减少' }}
        </view>
      </view>
      
      <view class="item-footer flex align-items-center">
        <text class="footer-label">变更前:</text>
        <text class="footer-value">{{ item.before }}</text>
        <text class="footer-arrow"> →</text>
        <text class="footer-label">变更后:</text>
        <text class="footer-value">{{ item.after }}</text>
        <text class="footer-total "style="margin-left: auto;">累计: {{ item.total_points }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "componentPointsLog",
  props: {
    showData: {
      type: Array,
	  required: true,
      default: () => [],
	  validator:value =>Array.isArray(value)
    }
  },
  computed: {
    ...mapState({
      themeColor: state => state.app.themeColor,
    })
  },
  methods: {
    formatTime(timestamp) {
      if (!timestamp) return ''
      // 根据实际返回的时间格式调整
      return new Date(timestamp*1000).toLocaleString()
    }
  }
}
</script>

<style lang="scss">
.component-points-log {
  padding: 20rpx;
  
  .log-item {
    margin-bottom: 20rpx;
    padding: 24rpx;
    background: #FFF;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);

    .item-header {
      margin-bottom: 16rpx;
      
      .header-memo {
        font-size: 30rpx;
        font-weight: 600;
        color: #333;
      }
      
      .header-points {
        font-size: 36rpx;
        font-weight: bold;
      }
    }
    
    .item-detail {
      margin-bottom: 12rpx;
      font-size: 24rpx;
      
      .detail-time {
        color: #999;
        margin-right: 20rpx;
      }
      
      .detail-state {
        font-weight: 500;
      }
    }
    
    .item-footer {
      font-size: 24rpx;
      color: #666;
      padding-top: 12rpx;
      border-top: 1rpx dashed #eee;
      
      .footer-label {
        margin: 0 8rpx 0 16rpx;
      }
      
      .footer-value {
        font-weight: 500;
      }
      
      .footer-arrow {
        margin: 0 12rpx;
        color: #999;
      }
      
      .footer-total {
        color: #333;
        font-weight: 500;
      }
    }
  }
}
</style>