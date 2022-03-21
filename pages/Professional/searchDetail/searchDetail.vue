<template>
	<view class="professionPage">
		<view class="header">
				<view class="header_logo">普通职业</view>
		</view>
		<view class="content_search">
				<uni-easyinput v-model="value" placeholder="请输入公司名称/城市/岗位" prefixIcon="search"></uni-easyinput>
		</view>
		<view class="content_more">
			<view class="more_title">
				<view class="more_label">热门搜索</view>
			</view>
			<view class="more_list" v-if="showList">
				<view class="more_list_item" v-for="item in moreList.data" :key="item.id">
					{{item.name}}
				</view>
			</view>		
		</view>
	</view>
</template>

<script>
import {ref,reactive} from 'vue'
export default {
	components:{
	},
	setup(){
		//tab 切换
		const tabStatus = ref(1)
		const changeTab =(target)=>{
			tabStatus.value=target
		}
		//筛选
		const showCollapse = ref(false)
		const closeCollapse = ()=>{
			showCollapse.value=false
			console.log(showCollapse.value)
		}
		const openCollapse = ()=>{
			showCollapse.value=true
			console.log(showCollapse.value)
		}
		//热门
		const showList = ref(true)
		const changeList =()=>{
			showList.value=!showList.value
		}
		const moreList=reactive({
			data:[
			{
				id:1,
				name:"腾讯1"
			},
			{
				id:2,
				name:"腾讯2"
			},
			{
				id:3,
				name:"腾讯3"
			},
			{
				id:4,
				name:"腾讯4"
			},
			{
				id:5,
				name:"腾讯5"
			},
			{
				id:6,
				name:"腾讯6"
			},
		]
		})
		return {
			tabStatus,
			changeList,
			showList,
			moreList,
			changeTab,
			showCollapse,
			closeCollapse,
			openCollapse
		}
	}
}
</script>

<style scoped lang="scss">
.professionPage{
	box-sizing: border-box;
	background-color: #00bf57;
	width: 100%;
	min-height: 100vh;
	padding: 20rpx;
	.header{
		width: 100%;
		height: 250rpx;
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		.header_logo{
			margin-top: 25rpx;
			font-size: 60rpx;
		}
		.header_list{
			margin-top: 25rpx;
			font-size: 24rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			.header_tab{
				margin: 0 40rpx;
				box-sizing: border-box;
				padding: 20rpx 0;
			}
			.header_tab_line{
				border-bottom: 4rpx solid #fff;
				border-radius: 5%;
			}
		}
	}
	.content_search{
		border-radius: 8rpx;
		overflow: hidden;
		margin-bottom: 10px;
	}
	.content_more{
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx;
		// height: 400rpx;
		border-radius: 10rpx;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
		background-color: #fff;
		margin-bottom: 10px;
		.more_title{
			display: flex;
			justify-content: space-between;
			width: 100%;
			.more_label{
				font-size: 22rpx;
				color: gray;
			}
			.more_hidden{
				font-size: 22rpx;
				color: gray;
			}
		}
		.more_list{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			width: 100%;
			flex-wrap: wrap;
			.more_list_item{
				padding: 15rpx;
				margin: 10rpx 20rpx;
				border: 1rpx solid #00bf57;
				color: #00bf57;
				border-radius: 10rpx;
			}
			.fill_item{
				height: 0;
				margin: 10rpx 20rpx;
				visibility: hidden;
			}
		}
	}
	.content_table{
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
<style lang="scss">
	.professionPage{
		.content_search{
			.is-input-border.data-v-abe12412 {
				background-color: #fff;
			}
		}
	}
</style>

