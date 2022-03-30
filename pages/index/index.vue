<template>
	<view class="indexPage">
		<view class="header">
			<view class="headLogo">SALARY SHOW</view>
			<view class="headSelect">
				<view @click="enter" class="salary">薪资查询</view>
				<view class="outer">
					<view v-for="item in professionalInfoList" :key="item.id" @click="enterProfessional(item.id)" class="item">
						<text>{{item.label}}</text>
						<text class="info">{{item.info}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in contentList" :key="index">{{item}}</view>
		</view>
		<!-- <ad></ad> -->
		<view class="footer">
			<view class="bottom_tabelbar">
				<navigator class="tabelbar_item active" url="../releaseProfessional/releaseProfessional">发布信息
				</navigator>
				<navigator class="tabelbar_item" url="#">薪资查询</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {reactive} from 'vue';

	const INSURANCE_LIST =["五险一金查询方式","五险一金的使用","各城市五险一金缴纳比例","个人所得税相关政策","减免税申报条件"]

	export default {
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '自定义分享标题',
				path: '/pages/test/test?id=123'
			}
		},
		setup() {
			//1-普通职业 2-新兴职业
			const professionalInfoList=[
				{
					id:1,
					label:"普通职业",
					info:"打工人",
				},
				{
					id:2,
					label:"新兴职业",
					info:"创新者",
				}
			]
			const enterProfessional = (target) => {
				uni.navigateTo({
					url: `../Professional/Professional/Professional?target=${target}`
				});
			};

			//五险等内容列表
			const contentList = reactive(INSURANCE_LIST);

			function enter() {
				uni.navigateTo({
					url: "#",
				})
			}
			//获取列表 存储到缓存
			const allCityList = []
			function getIndexedList(){
				sendPostRequest(router.getCityListByName,{}, {
						success(res) {
							if(res.message === "success"){
								allCityList = res.data;
								localStorage.setItem("cityList",allCitylist)
								// res.data.forEach(item => cityList.data.push(item.cityName))
								// cityList.data.push(res.data.data.cityName);
							}
							else{}
						},
						fail() {}
					},true)
			}

			return {
				contentList,
				professionalInfoList,
				enterProfessional,
				enter
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
<style lang="scss" scoped>
	.indexPage {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
	}

	.header {
		background-color: #00bf57;
		padding-bottom: 20rpx;
		.headLogo {
			width: 50%;
			color: white;
			font-size: 75rpx;
			margin: 0 auto;
			text-align: center;
		}

		.salary {
			display: flex;
			width: 30%;
			height: 100rpx;
			border: 5rpx solid white;
			border-radius: 20rpx;
			color: white;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
		}

		.outer {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 15rpx 0;

			.item {
				display: flex;
				flex-wrap: wrap;
				width: 30%;
				height: 130rpx;
				border: 5rpx solid white;
				border-radius: 20rpx;
				color: white;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;

				.info {
					font-size: 30rpx;
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
		background-color: white;

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

	.bottom_tabelbar {
		width: 100%;
		position: fixed;
		bottom: 0;

		.tabelbar_item {
			background-color: #eeeeee;
			display: inline-block;
			width: 50%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-family: "黑体";
		}

		.active {
			color: red;
		}
	}
</style>
