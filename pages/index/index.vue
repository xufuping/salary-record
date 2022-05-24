<template>
	<view class="indexPage">
		<view class="header">
			<!-- <view class="headLogo">SALARY SHOW</view> -->
			<view class="headselect">
				<view @click="enter" class="salary">请选择您想要查询的职位:</view>
				<view class="outer">
					<view @click="enterProfessional(1)" class="item_ordinary">
						<image class="image" src="../../static/img/index/ordinary.png"></image>
						<view class="info">普通职业打工人</view>
					</view>
					<view class="item_line"></view>
					<view @click="enterProfessional(2)" class="item_emerging">
						<image class="image" src="../../static/img/index/emerging.png"></image>
						<view class="info">新兴职业创新者</view>
					</view>
					<!-- <button @login = 'createProfession' @getphonenumber = 'getPhoneNumber' open-type="getPhoneNumber">login</button> -->
				</view>
			</view>
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in content" :key="index">{{item}}</view>
		</view>
		<!-- <ad></ad> -->
	</view>
</template>

<script>
	import {
		ref,reactive
	} from 'vue';
	//import item from "./json/item.json";
	import {createProfession,getAllProfession} from "../../utils/createDataInfo.js"
	import {getCityList} from "../../utils/cityListTools.js" 
	
	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '自定义分享标题',
				path: '/pages/test/test?id=123'
			}
		},
		setup() {
			const content = reactive();//原：const content = reactive(item)
			const enterProfessional = (target) => {
				uni.navigateTo({
					url: `../Professional/Professional/Professional?target=${target}`
				});
			};
			
			//测试-
			createProfession()
			getAllProfession()
			
			const getPhoneNumber = (e) =>{
				// console.log("fffff",e)
			}
			
			function enter() {
				uni.navigateTo({
					url: "#",
				})
			}
			return {
				createProfession,
				getPhoneNumber,
				content,
				enterProfessional,
				enter
			}
		}
	}
</script>
	
<style lang="scss" scoped>
	.indexPage {
	}

	.header {
		
		background: #C4C4C4;
		width: 770rpx;
		height: 350rpx;
		border-radius: 0 0 50px 30px;
		background-image: url('~@/static/img/background/background.png');
		
		.headLogo {
			width: 50%;
			color: white;
			font-size: 75rpx;
			margin: 0 auto;
			text-align: center;
		}
		
		.headselect{
			position: absolute;
			width: 324px;
			height: 123px;
			left: 26px;
			top: 180rpx;
		}

		.salary {
			display: flex;
			width: 328rpx;
			height: 38rpx;
			font-size: 14px;
			color: white;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
		}

		.outer {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 628rpx;
			height: 246rpx;
			justify-content: center;
			margin: 15rpx 0;
			background-color: #F7F7F7;
			box-shadow: 0px 3px 6px 2.5px rgba(113, 128, 174, 0.41);
			border-radius: 12px;
			
			.item_line{
				border: #5E95EE solid 0.5rpx;
				width: 500rpx;
			}
			
			.item_ordinary {
				display: flex;
				flex-wrap: nowrap;
				width: 400rpx;
				height: 46rpx;
				border-radius: 20rpx;
				color: white;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;
				margin-bottom: 20rpx;
				
				.image{
					width: 60rpx;
					height: 82rpx;
				}
				
				.info {
					width: 294rpx;
					height: 46rpx;
					font-size: 18px;
					color: #5E95EE;
					text-align: center;
					font-weight: 300;
				}
			}
			
			.item_emerging {
				display: flex;
				flex-wrap: nowrap;
				width: 400rpx;
				height: 46rpx;
				border-radius: 20rpx;
				color: white;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;
				margin-top: 20rpx;
				
				.image{
					width: 60rpx;
					height: 82rpx;
				}
				
				.info {
					width: 294rpx;
					height: 46rpx;
					font-size: 18px;
					color: #5E95EE;
					text-align: center;
					font-weight: 300;
				}
			}
		}

	}

	.content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		background-color: #C4C4C4;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			border: 5rpx solid #00bf57;
			color: #00bf57;
			border-radius: 25rpx;
			width: 150rpx;
			height: 75rpx;
			font-size: 30rpx;
			text-align: center;
			padding: 20rpx 20rpx;
			margin: 0 20rpx;
			margin-top: 20rpx;
		}
	}
</style>
