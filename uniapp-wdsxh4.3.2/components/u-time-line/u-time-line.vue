<template>
	<view class="u-time-axis">
		<slot />
	</view>
</template>

<script>
	export default {
		name: "u-time-line",
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	
	.u-time-axis {
		padding-left: 40rpx;
		position: relative;
	}

	.u-time-axis::before {
		content: " ";
		position: absolute;
		left: 0;
		top: 12rpx;
		width: 1px;
		bottom: 0;
		border-left: 1px solid #ddd;
		transform-origin: 0 0;
		transform: scaleX(0.5);
	}
</style>
