<template>
	<view class="professionDetail">
		<view class="baseInfo">
			<view class="posName" @click="searchUpper(detailData.comName)">
				<view class="surpport">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>公司:</view>
				</view>
				<view class="active">
					<view class="active_text">{{detailData.comName}}</view>
					<view  class="clickButton">></view>
				</view>
			</view>
			<view class="posName" @click="searchUpper(detailData.comAddress)">
				<view class="surpport">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>城市:</view>
				</view>
				<view class="active">
					<view class="active_text">{{detailData.comAddress}}</view>
					<view  class="clickButton">></view>
				</view>
			</view>
			<view class="posName" @click="searchUpper(detailData.posName)">
				<view class="surpport">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>岗位:</view>
				</view>
				<view class="active">
					<view class="active_text">{{detailData.posName}}</view>
					<view  class="clickButton">></view>
				</view>
			</view>
			<view class="salary">
				<view class="salary_fixed_text">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>薪资:</view>
				</view>
				<view class="salary_active_text">{{detailData.posSalary}}</view>
			</view>
			<view class="reliability">
				<view class="reliability_fixed_text">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>可信:</view>
				</view>
				<view class="reliability_active_text">{{10}}</view>
			</view>
		</view>
		
		<view class="center">
			<view class="center_content">
				<view class="center_content_text">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>行业:</view>
				</view>
				<view>{{detailData.profession}}</view>
			</view>
			<view class="center_content">
				<view class="center_content_text">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>学历:</view>
				</view>
				<view>{{detailData.education}}</view>
			</view>
			<view class="center_content">
				<view class="center_content_text">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>发布:</view>
				</view>
				<view>{{detailData.releaseTime}}</view>
			</view>
			<view class="center_content">
				<view class="center_content_text">
					<image style="width: 40rpx; height: 40rpx;" src="../../../static/img/professionalDetail/qa.png"
					></image>
					<view>浏览量:</view>
				</view>
				<view>{{detailData.pageView}}</view>
			</view>
		</view>
		
		<view class="quantity">
			<view class="quantity_fixed">
				<image 
				style="width: 40rpx; height: 40rpx;" 
				src="../../../static/img/professionalDetail/qa.png"
				@click="likeCount()"
				></image>
				<view>点赞量:</view>
			</view>
			<view class="quantity_active">{{detailData.quantity}}</view>
		</view>
		
		<view class="capsule">
			<view class="capsule_forhead"></view>
			<view class="capsule_upper">
				<image  class="capsule_upper_image" src="../../../static/img/professionalDetail/qa.png"
				></image>
				<view class="capsule_upper_text">真实可信</view>
			</view>
			<view class="triangle_left"></view>
			<view class="triangle_right"></view>
			<view class="capsule_lower">
				<image class="capsule_lower_image" src="../../../static/img/professionalDetail/qa.png"
				></image>
				<view class="capsule_lower_text">不真实</view>
			</view>
			<view class="capsule_behind"></view>
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
	import sendPostRequest from "../../../utils/sendPostRequest.js"
	import router from "../../../utils/route.js"
	
	//测试变量导入
	import {EMERGING,ENV} from "../../../config/MAKRDATA.js"

	export default {
		props:{
			type:Number,
			id:Number
		},
		setup(props) {
			onMounted(() => {
				search();
			})
			
			const type = ref(props.type);
			const id = ref(props.id);
			
			function search() {
				let data = {
					workId:id.value
				}
				sendPostRequest(
					type.value === 1 ? router.ordinaryGetDetail : router.emergingGetDetail,
					 data, {
						success(res) {
							if(res.message === "success"){
							operateData(res.data);
							}
							else{
								if(ENV === "self"){
									operateData(EMERGING.data.data)
								}
							}
						},
						fail() {
							if(ENV === "self"){
								operateData(EMERGING.data.data)
							}
						}
					},
					true)
			}

			function operateData(data) {
				detailData.posName = data.post;//岗位
				detailData.posSalary = data.salaryStr;//字符串薪资
				detailData.comAddress = data.city.cityName;//城市
				detailData.education = data.degree?.degreeName;//学历
				detailData.profession = data.profession?.professionName;//行业
				detailData.comName = data.company;//公司
				detailData.releaseTime = data.createTime;//发布时间
				detailData.explain = data.explain;//福利待遇
				detailData.pageView = data.lookCount;//浏览量
				detailData.quantity = data.likeCount;//点赞量
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
			
			//跳转路由
			const routeOfPage = {
				ordinary:"../searchDetail/Ordinary/ordinary",
				emerging:"../searchDetail/Emerging/Emerging"
			}
			
			const searchUpper = (value) => {
				uni.navigateTo({
					url: (type.value === 1 ? routeOfPage.ordinary :
							routeOfPage.emerging) + "?inputValue=" + value 
				})
			}
			
			//点赞
			const likeCount = () =>{
				const like = {
					workId:id.value,
					likeType:"LIKE",
					workType:type.value === 1 ? "NORMAL" : "NEW"
				}
				sendPostRequest(router.updateLikeNum,like,{
					success(res) {
						console.log("resLike",res)
						if(res.message === "success"){
							console.log("LIke",res)
						}
						else{}
					},
					fail() {}
				},true)
			}
			
			return {
				likeCount,
				searchUpper,
				type,
				id,
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
					display: flex;
					justify-content: space-around;
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
					display: flex;
					justify-content: space-around;
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
					display: flex;
					justify-content: space-around;
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
				.center_content_text{
					display: flex;
					justify-content: space-around;
				}
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
				display: flex;
				justify-content: space-around;
				color: darkcyan;
			}
			.quantity_active{
				
			}
		}
		
		.capsule{
			display: flex;
			width: 100%;
			.capsule_forhead{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50% 0 0 50%;
				background-color: red;
			}
			.capsule_upper{
				display: flex;
				background-color: red;
				width: 257rpx;
				height: 60rpx;
				
				.capsule_upper_image{
					width: 40rpx; 
					height: 40rpx;
					margin-left: 40rpx;
					margin-top: 10rpx;
				}
				.capsule_upper_text{
					color: white;
					margin-top: 10rpx;
					margin-left: 10rpx;
				}
			}
			.triangle_left{
				width: 0;
				height: 0;
				border-bottom: 60rpx solid red;
				border-right: 35rpx solid transparent;
				margin-right: -17px;
			}
			.triangle_right{
				width: 0;
				height: 0;
				border-top: 60rpx solid blue;
				border-left: 35rpx solid transparent;
			}
			.capsule_lower{
				display: flex;
				background: blue;
				width: 257rpx;
				height: 60rpx;
				.capsule_lower_image{
					width: 40rpx;
					height: 40rpx;
					margin-left: 40rpx;
					margin-top: 10rpx;
				}
				.capsule_lower_text{
					color: white;
					margin-top: 10rpx;
					margin-left: 10rpx;
				}
			}
			
			.capsule_behind{
				width: 60rpx;
				height: 60rpx;
				border-radius: 0 50% 50% 0;
				background-color: blue;
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
