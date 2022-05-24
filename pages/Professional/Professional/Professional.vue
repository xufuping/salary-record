<template>
	<view class="professionPage">
		<view class="header">
			<view class="header_logo">logo</view>
			<view class="header_list">
				<!-- 1-普通职业 2-新兴职业 -->
				<view class="headerTab" :class="{headerTabLine:tabStatus===1}" @click="changeTab(1)">普通职业</view>
				<view class="headerTab" :class="{headerTabLine:tabStatus===2}" @click="changeTab(2)">新兴职业</view>
			</view>
		</view>
		<view class="content_search_emerging" v-if="tabStatus===2">
			<uni-collapse>
				<uni-collapse-item title-border="none" :border="false" :show-arrow="false" >
					<template v-slot:title>
						<view class="newJobDetail">点击查看更多新兴岗位</view>
					</template>
					<view class="content">
						<view class="innerContent">
							<view class="detail">外卖</view>
							<view class="detail">主播</view>
							<view class="detail" style="margin-right: 0;">代驾</view>
						</view>
						<view class="innerContent">
							<view class="detail">网约车</view>
							<view class="detail">快递</view>
							<view class="detail" style="margin-right: 0;">地摊</view>
						</view>
						<view class="point">. . . . . .</view>
						<view class="underPoint">非固定性职业</view>
						<view class="tip">以上职业仅在该小程序中指新兴职业</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="content_search">
			<view class="content_search_box">
				<input
				class="content_search_input"
				v-model="inputValue" 
				placeholder="请输入公司名称/城市/岗位"
				/>
				<view class="content_search_button">
					<image class="content_search_img" src="../../../static/img/professional/searchicon.png"></image>
					<view class="content_search_button_text" @click="search(inputValue)">搜索</view>
				</view>
			</view>
		</view>
		<view class="content_more">
			<view class="more_title">
				<view class="more_label">热门搜索</view>
			</view>
			<view class="more_list" >
				<view class="more_list_item" v-for="item in tabStatus===1?ordinaryList.data:emergingList.data"
					:key="item.id" @click="selectHotOptions(item.id)">
					{{item.name}}
				</view>
				<view class="fill_item" v-for="n in 20" :key="n"></view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		ref,
		reactive,
		toRaw
	} from 'vue';
	import {HOT_ORDINARY,HOT_EMERGING} from '../../../config/configData.js'

	export default {
		props:{
			target : Number
		},
		setup(props) {
			//tab 切换
			const tabStatus = ref(1)
			const changeTab = (target) => {
				tabStatus.value = target;
				loadingList();
			}

			//输入框显示
			const inputValue = ref("");
			
			//热门
			function selectHotOptions(list) {
				loadingList();
				for (let key in toRaw(moreList.value)) {
					if (moreList.value[key].id === list) {
						search(moreList.value[key].name);
					}
				}
			}
			const moreList = reactive({});
			const ordinaryList = reactive(HOT_ORDINARY);
			const emergingList = reactive(HOT_EMERGING);

			function loadingList() {
				moreList.value = tabStatus.value === 1 ? toRaw(ordinaryList.data) : toRaw(emergingList.data);
			}
			
			//搜索操作
			const search = (value) => {
				console.log("VALUE",value)
				uni.navigateTo({
					url: (tabStatus.value === 1 ? "../searchDetail/Ordinary/ordinary" :
							"../searchDetail/Emerging/Emerging") + "?inputValue=" + value
				})
			}
			
			return {
				inputValue,
				search,
				selectHotOptions,
				tabStatus,
				moreList,
				ordinaryList,
				emergingList,
				changeTab,
			}
		}
	}
</script>

<style scoped lang="scss">
	.professionPage {
		box-sizing: border-box;
		background: linear-gradient(110.6deg, #457DEA 16.45%, rgba(93, 178, 248, 0.794338) 78.47%, rgba(197, 216, 248, 0.7) 102.08%);
		width: 100%;
		min-height: 100vh;
		padding: 20rpx;

		.header {
			width: 100%;
			height: 250rpx;
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;

			.header_logo {
				width: 190rpx;
				height: 190rpx;
				margin: 0 auto;
				margin-top: 25rpx;
				border-radius: 50%;
				font-size: 60rpx;
				background: #C4C4C4;
			}

			.header_list {
				margin-top: 45rpx;
				font-size: 24rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.headerTab {
					margin: 0 40rpx;
					box-sizing: border-box;
					padding: 20rpx 0;
				}

				.headerTabLine {
					border-bottom: 4rpx solid #fff;
					border-radius: 5%;
				}
			}
		}
		
		.content_search_emerging{
			display: flex;
			margin-top: 20rpx;
			border-radius: 8rpx;
			overflow: hidden;
			margin-bottom: 10px;
			
			.newJobDetail {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #7f7f7f;
			width: 710rpx;
			}
			
			.content {
				padding: 40rpx;
			
				.tip {
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					color: blue;
				}
			
				.innerContent {
					font-size: 50rpx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
			
					.detail {
						margin-right: 50rpx;
					}
				}
			
				.point {
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					font-size: 75rpx;
				}
			
				.underPoint {
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					font-size: 35rpx;
				}
			}
		}
		
		.content_search {
			display: flex;
			margin-top: 20rpx;
			border-radius: 8rpx;
			overflow: hidden;
			margin-bottom: 10px;
			
			.content_search_box{
				display: flex;
				justify-content: space-between;
				background: #FFFFFF;
				border-radius: 34px;
				width: 750rpx;
				
				.content_search_input{
					color: gray;
					padding: 13rpx;
					padding-left: 20rpx;
					width: 500rpx;
					font-size: 30rpx;
				}
			}
			
			.content_search_button{
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				width: 69px;
				height: 34px;
				position: relative;
				z-index: 2;
				background: linear-gradient(270deg, #4684F8 -20.25%, rgba(77, 146, 248, 0.93541) 31.77%, rgba(93, 178, 248, 0.794338) 117.72%);
				box-shadow: 0px 0px 4px #5E95EE;
				border-radius: 46px;
				
				.content_search_img{
					width: 32rpx;
					height: 32rpx;
				}
				
				.content_search_button_text{
					color: white;
				}
			}
		}

		.content_more {
			box-sizing: border-box;
			width: 100%;
			padding: 20rpx;
			// height: 400rpx;
			border-radius: 10rpx;
			box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
			background-color: #fff;
			margin-bottom: 10px;

			.more_title {
				display: flex;
				justify-content: space-between;
				width: 100%;

				.more_label {
					font-size: 22rpx;
					color: gray;
				}

				.more_hidden {
					font-size: 22rpx;
					color: gray;
				}
			}

			.more_list {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				width: 100%;
				flex-wrap: wrap;

				.more_list_item {
					padding: 15rpx;
					margin: 10rpx 20rpx;
					border: 1rpx solid #5E95EE;
					color: #4581EA;
					border-radius: 12rpx;
				}

				.fill_item {
					height: 0;
					margin: 10rpx 20rpx;
					visibility: hidden;
				}
			}
		}

		.content_table {
			box-sizing: border-box;
			width: 100%;
			padding: 10rpx;
			height: 800rpx;
			border-radius: 10rpx;
			box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
			background-color: #fff;
		}
	}
</style>