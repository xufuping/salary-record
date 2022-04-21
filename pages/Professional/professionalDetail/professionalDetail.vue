<template>
	<view class="professionDetail">
		<view class="baseInfo">
			<view class="posName" @click="searchUpper(detailData.comName)">
				<view class="surpport">公司:</view>
				<view class="active">
					<view class="active_text">{{detailData.comName}}</view>
					<view  class="clickButton">></view>
				</view>
			</view>
			<view class="posName" @click="searchUpper(detailData.comAddress)">
				<view class="surpport">城市:</view>
				<view class="active">
					<view class="active_text">{{detailData.comAddress}}</view>
					<view  class="clickButton">></view>
				</view>
			</view>
			<view class="posName" @click="searchUpper(detailData.posName)">
				<view class="surpport">岗位:</view>
				<view class="active">
					<view class="active_text">{{detailData.posName}}</view>
					<view  class="clickButton">></view>
				</view>
			</view>
			<view class="salary">
				<view class="salary_fixed_text">薪资:</view>
				<view class="salary_active_text">{{detailData.posSalary}}</view>
			</view>
			<view class="reliability">
				<view class="reliability_fixed_text">可信度:</view>
				<view class="reliability_active_text">{{10}}</view>
			</view>
		</view>
		
		<view class="center">
			<view class="center_content">
				<view>行业:</view>
				<view>{{detailData.profession}}</view>
			</view>
			<view class="center_content">
				<view>学历:</view>
				<view>{{detailData.education}}</view>
			</view>
			<view class="center_content">
				<view>发布时间:</view>
				<view><!-- {{detailData.releaseTime}} -->{{"2022-01-04"}}</view>
			</view>
			<view class="center_content">
				<view>浏览量:</view>
				<view>{{detailData.pageView}}</view>
			</view>
		</view>
		
		<view class="quantity">
			<view class="quantity_fixed">点赞量:</view>
			<view class="quantity_active">{{detailData.quantity}}{{100}}</view>
		</view>
		
		<view class="remark">
			{{ detailData.explain }}
		</view>
		<view class="comments"> 评论 </view>
		<view class="advertising">
			<!-- <ad></ad> -->
		</view>
	    
		
	</view>
</template>

<script>
	import {
		ref,
		reactive,
		onMounted
	} from "vue";
	import sendPostRequest from "../../utils/utils/sendPostRequest.js"
	import router from "../../utils/route.js"

	export default {
		props:{
			type:String,
			id:String
		},
		setup(props) {
			onMounted(() => {
				search();
			})
			const type = reactive(props.type);
			const id = ref(props.id);

			
			function search() {
				let data = {}
				sendPostRequest(
					type.value === 1 ?router.ordinaryGetAllWork : router.ordinaryGetAllWork,
					 data, {
						success(res) {
							console.log("REss",res)
							if(res.message === "success"){
							operateData(res.data.data);
							}
							else{}
						},
						fail() {}
					},
					true)
			}

			function operateData(data) {
				console.log("DATA",data)
				detailData.posName = data[0].post;//岗位
				detailData.posSalary = data[0].salaryStr;//字符串薪资
				detailData.comAddress = data[0].city.cityName;//城市
				detailData.education = data[0].degree.degreeName;//学历
				detailData.profession = data[0].profession.professionName;//行业
				detailData.comName = data[0].company;//公司
				detailData.releaseTime = data[0].createTime;//发布时间
				detailData.explain = data[0].explain;//福利待遇
				detailData.pageView = data[0].lookCount;//浏览量
				detailData.quantity = data[0].likeCount;//点赞量
			}
			const detailData = reactive({
				posName: null,
				posSalary: null,
				comAddress: null,
				education: null,
				posType: null,
				comName: null,
				releaseTime: null,
				explain: null,
			});
			
			const searchUpper = (value) => {
				console.log(value)
				uni.navigateTo({
					url: (type.value === 1 ? "../searchDetail/Ordinary/ordinary" :
							"../searchDetail/Emerging/Emerging") + "?inputValue=" + value
				})
			}
			
			return {
				searchUpper,
				type,
				id,
				search,
				operateData,
				detailData,
			};
		},
	};
</script>

<style scoped lang="scss">
	.professionDetail {
		background-color: #00bf57;
		box-sizing: border-box;
		width: 100vw;
		min-height: 100vh;
		padding: 10px 20px;

		.baseInfo {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-bottom: 15rpx;

			.posName {
				display: flex;
				width: 100%;
				font-size: 30rpx;
				box-sizing: border-box;
				padding: 20rpx;
				background-color: #fff;
				border-radius: 10rpx;
				box-shadow: 0px 0px 15rpx rgba(0, 0, 0, 0.2);
				margin-bottom: 30rpx;
				.surpport{
					width: 200rpx;
					color: darkcyan;

				}
				.active{
					display: flex;
					justify-content: space-between;
					width: 570rpx;
					.active_text{
						color: blue;
					}
					.clickButton{
						color: blue;
					}
				}
			}

			.salary {
				display: flex;
				width: 100%;
				font-size: 30rpx;
				box-sizing: border-box;
				padding: 20rpx;
				background-color: #fff;
				border-radius: 10rpx;
				box-shadow: 0px 0px 15rpx rgba(0, 0, 0, 0.2);
				margin-bottom: 30rpx;
				.salary_fixed_text{
					color: darkcyan;
					width: 200rpx;
				}
				.salary_active_text{
					width: 570rpx;
				}
			}

			.reliability{
				display: flex;
				width: 100%;
				font-size: 30rpx;
				box-sizing: border-box;
				padding: 20rpx;
				background-color: #fff;
				border-radius: 10rpx;
				box-shadow: 0px 0px 15rpx rgba(0, 0, 0, 0.2);
				margin-bottom: 30rpx;
				.reliability_fixed_text{
					color: darkcyan;
					width: 200rpx;
				}
				.reliability_active_text{
					width: 570rpx;
				}
			}
		}

		.center{
			display: flex;
			flex-wrap: wrap;
			.center_content{
				display: flex;
				width: 325rpx;
				color: darkcyan;
				font-size: 30rpx;
				box-sizing: border-box;
				padding: 20rpx;
				background-color: #fff;
				border-radius: 10rpx;
				box-shadow: 0px 0px 15rpx rgba(0, 0, 0, 0.2);
				margin-bottom: 30rpx;
				margin-right: 10rpx;
			}
		}
		
		.quantity{
			display: flex;
			box-sizing: border-box;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 10rpx;
			box-shadow: 0px 0px 15rpx rgba(0, 0, 0, 0.2);
			margin-bottom: 30rpx;
			.quantity_fixed{
				color: darkcyan;
			}
			.quantity_active{
				
			}
		}
		
		.remark {
			box-sizing: border-box;
			width: 100%;
			padding: 100rpx;
			border: 1rpx solid gray;
			text-align: center;
			margin-top: 20rpx;
		}

		.comments {
			box-sizing: border-box;
			width: 100%;
			padding: 100rpx;
			border: 1rpx solid gray;
			text-align: center;
			margin-top: 20rpx;
		}

		.advertising {
			box-sizing: border-box;
			width: 100%;
			padding: 100rpx;
			border: 1rpx solid gray;
			text-align: center;
			margin-top: 20rpx;
		}
	}
</style>
<style lang="scss">
	// .professionDetail{}
</style>
