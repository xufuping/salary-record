<template>
	<view class="tabbar">
		<view class="tabbar_ordinary" @click="changeTabbar()">普通职业</view>
		<view class="tabbar_emerging" @click="changeTabbar()">新兴职业</view>
	</view>
</template>

<script>
	export default {
		setup(){
			const changeTabbar = () =>{
				
			}
			return {
				changeTabbar
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabbar{
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		margin-left: -20rpx;
		
		.tabbar_ordinary{
			background-color: #eeeeee;
			display: inline-block;
			width: 50%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-family: "黑体";
		}
		
		.tabbar_emerging{
			background-color: #eeeeee;
			display: inline-block;
			width: 50%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-family: "黑体";
		}
	}
</style>
