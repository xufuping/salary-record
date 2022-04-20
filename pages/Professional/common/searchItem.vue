<template>
	<view class="search_card_item">
		<view class="item_label">
			<view class="comName">{{information.comName}}</view>
			<view class="comAddress">{{information.comAddress}}</view>
		</view>
		<view class="item_content">
			<view class="posName">{{information.posName}}</view>
			<view class="posSalary">
				<span class="num">{{information.posSalary}}</span>
				<span class="unit">/月</span>
			</view>
		</view>
		<view class="item_more">
			<view class="item_more_left">
				<view class="more_item">可信度:{{information.credibility}}</view>
				<view class="more_item">点赞量:{{information.quantity}}</view>
				<view class="more_item">发布时间:{{information.releaseTime}}</view>
			</view>
			<view class="enterDetail" @click='enterDetail'>查看详情 ></view>
		</view>
	</view>
</template>

<script>
	import {
		reactive
	} from "vue";
	export default {
		props: {
			detail: Object,
			type: Number,
		},
		setup(props) {
			console.log("PROPs",props.detail.salaryRange)
			const information = reactive({
				comName: props.detail.company,
				comAddress: props.detail.city?.cityName,
				posName: props.detail.post,
				posSalary: props.detail.salaryNUm,
				credibility: props.detail.credibility,
				quantity: 0,
				releaseTime: props.detail.createTime
			});
			//查看详情
			const enterDetail = () => {
				uni.navigateTo({
					url: "/pages/Professional/professionalDetail/professionalDetail?type=" + props.type +
						"&id=" + props.detail.id
				})
			}
			return {
				enterDetail,
				information
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search_card_item {
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx;
		border: 1rpx solid transparent;
		border-radius: 30rpx;
		box-shadow: 0px 0px 15rpx rgba(0, 0, 0, 0.2);

		.item_label {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.comName,
			.comAddress {
				font-size: 20rpx;
				margin-right: 10rpx;
				color: gray;
			}
		}

		.item_content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 15rpx 10rpx;
			font-size: 38rpx;

			.posName {
				color: rgba(0, 0, 0, 0.7);
			}

			.posSalary {
				.num {
					color: #00bf57;
				}

				.unit {
					font-size: 24rpx;
					color: gray;
				}
			}
		}

		.item_more {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item_more_left {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-size: 18rpx;
				color: gray;

				.more_item {
					margin-right: 15rpx;
				}
			}

			.enterDetail {
				color: rgba(0, 0, 0, 0.7);
				font-size: 25rpx;
			}
		}
	}
</style>
