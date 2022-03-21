<template>
	<view class="professionDetail">
		<view class="top_list">
			<view class="posName">{{ detailData.posName }}</view>
			<view class="salary">{{ detailData.posSalary }}/月</view>
		</view>
		<view class="center_pos_list">
			<view class="address">{{ detailData.comAddress }}</view>
			<view class="education">{{ detailData.education }}</view>
			<view class="posType">{{ detailData.posType }}</view>
		</view>
		<view class="center_com_list">
			<view class="com_left">
				<view class="comName">{{ detailData.comName }}</view>
			</view>
			<view class="com_right">
				<view class="center_time_list">
					<view class="address">发布时间：{{ detailData.releaseTime }}</view>
				</view>
				<view class="center_more_list">
					<view class="read_count">浏览量：{{ 1 }}</view>
					<view class="praise_count">点赞量：{{ 0 }}</view>
				</view>
			</view>
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
				let data = {
					normalWork : 0
				}
				sendPostRequest(
					type.value === 1 ?router.ordinaryGetDetail : router.rouemergingGetDetail,id.value,
					 data, {
						success(res) {
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
				detailData.posName = data.data.data.post;
				detailData.posSalary = data.data.data.salary;
				detailData.comAddress = data.data.data.city.cityName;
				detailData.education = data.data.data.degree.degreeName;
				detailData.posType = data.data.data.type.typeName;
				detailData.comName = data.data.data.company;
				detailData.releaseTime = data.data.data.createTime;
				detailData.explain = data.data.data.explain;
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
			return {
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
		box-sizing: border-box;
		width: 100vw;
		min-height: 100vh;
		padding: 10px 20px;

		.top_list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15rpx;

			.posName {
				font-size: 40rpx;
			}

			.salary {
				font-size: 48rpx;
				color: #00bf57;
			}

			.center_more_list {
				font-size: 48rpx;
				color: #00bf57;
			}
		}

		.center_pos_list {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: gray;
			margin-top: 20rpx;
		}

		.center_com_list {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.com_left {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.comName {
					font-size: 38rpx;
				}
			}

			.com_right {

				// display: flex;
				// justify-content: flex-start;
				// align-items: center;
				.center_more_list,
				.center_time_list {
					display: flex;
					justify-content: flex-end;
					font-size: 24rpx;
					color: gray;
					margin-top: 20rpx;

					.read_count {
						margin-right: 30rpx;
					}
				}
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
