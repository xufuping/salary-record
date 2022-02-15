<template>
	<view class="releaseProfessional">
		<view class="header">
				<view class="header_logo">logo</view>
				<view class="header_list">
					<view class="header_tab" :class="{header_tab_line:tabStatus===1}" @click="changeTab(1)">普通职业</view>
					<view class="header_tab" :class="{header_tab_line:tabStatus===2}"  @click="changeTab(2)">新兴职业</view>
				</view>
		</view>
		
		<view class="info_item">
			<view class="label"><span class="required_label">*</span>公司</view>
			<view class="inp">
				<uni-collapse>
				    <uni-collapse-item title-border="none" :border="false" :show-arrow="false" :open="showCollapse">
				        <template v-slot:title>
				            <uni-easyinput 
							v-model="company" 
							placeholder="输入公司名称" 
							@blur="closeCollapse"
							@focus="openCollapse">
							</uni-easyinput>
				        </template>
				        <view class="content">
				            <view>职位1</view>
							<view>职位2</view>
							<view>职位3</view>
				        </view>
				    </uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		
		<view class="info_item">
			<view class="label">岗位</view>
			<view class="inp">
				<uni-easyinput
				v-model="job" 
				placeholder="输入岗位名称">
				</uni-easyinput>
			</view>
		</view>
		
		<view class="info_item">
			<view class="label">城市</view>
			<view class="inp">
				<view class="city_list">
					<view class="city_item" v-for="item in city_list" :key="item.id">
						{{item.label}}
						<view class="city_close">X</view>
					</view>
				</view>
				<uni-easyinput
				v-model="city" 
				placeholder="输入城市名称">
				</uni-easyinput>
			</view>
		</view>
		
		<view class="info_item">
			<view class="label"><span class="required_label">*</span>薪资</view>
			<view class="inp">
				<uni-easyinput
				v-model="salary" 
				placeholder="输入薪资名称">
				</uni-easyinput>
			</view>
		</view>
		
		<view class="info_item" v-if="tabStatus===1">
			<view class="label">类型</view>
			<view class="inp">
				<view class="type_list">
					<view class="type_item" 
					v-for="item in type_list" 
					:key="item.id"
					:class="{sel_item:selType===item.id}"
					@click="changeSelType(item.id)"
					>
						{{item.label}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="info_item" v-if="tabStatus===1">
			<view class="label">学历</view>
			<view class="inp">
				<view class="sel_education" @click="education_popOpen">
					{{sel_education}}
				</view>
			</view>
		</view>
		
		<view class="info_item">
			<view class="label">行业</view>
			<view class="inp">
				<view class="sel_industry" @click="industry_popOpen">
					{{sel_industry}}
				</view>
			</view>
		</view>
		
		<view class="info_item">
			<view class="label">备注</view>
			<view class="inp">
				<uni-easyinput
				type="textarea"
				v-model="job_note" 
				placeholder="可以填写工作的详情待遇,如福利补贴,福利待遇等">
				</uni-easyinput>
			</view>
		</view>
		
		<view class="info_item">
			<view class="instructions_label">说明</view>
			<view class="instructions_text">
				严禁发布不良信息，违法必究
			</view>
		</view>
		
		<view class="release_botton">点击发布</view>
		
		<!-- <view class="bottom_tabelbar">
			<view class="tabelbar_item">发布信息</view>
			<view class="tabelbar_item">薪资查询</view>
		</view> -->
		
		<uni-popup ref="education_popup" type="bottom" background-color="#fff">
			<view class="pop_list">
				<view>学历</view>
				<view>学历</view>
				<view>学历</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="industry_popup" type="bottom" background-color="#fff">
			<view class="pop_list">
				<view>行业</view>
				<view>行业</view>
				<view>行业</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import {ref,reactive} from 'vue'
	export default {
		setup(){
			//切换tab
			const tabStatus=ref(1)
			const changeTab=(data)=>{
				tabStatus.value=data
			}
			//公司
			const company=ref('')
			//岗位
			const job=ref('')
			//城市
			const city=ref('')
			const city_list=[
				{
					id:1,
					label:"上海"
				},
				{
					id:2,
					label:"北京"
				},
				{
					id:3,
					label:"重庆"
				},
				{
					id:4,
					label:"成都"
				},
			]
			//薪资
			const salary=ref('')
			//类型
			const type_list=[
				{
					id:1,
					label:"校招"
				},
				{
					id:2,
					label:"实习"
				},
				{
					id:3,
					label:"社招"
				}
			]
			const selType=ref(1)
			const changeSelType=(data)=>{
				selType.value=data
			}
			//学历
			const sel_education=ref("请选择学历")
			const education_popup=ref(null)
			const education_popOpen=()=>{
				education_popup.value.open('bottom')
			}
			//行业
			const sel_industry=ref("请选择行业")
			const industry_popup=ref(null)
			const industry_popOpen=()=>{
				industry_popup.value.open('bottom')
			}
			//待遇
			const job_note =ref('')
			return{
				city,
				salary,
				company,
				job,
				tabStatus,
				changeTab,
				city_list,
				type_list,
				job_note,
				selType,
				changeSelType,
				education_popOpen,
				education_popup,
				sel_education,
				sel_industry,
				industry_popup,
				industry_popOpen
			}
		}
	}
</script>

<style lang="scss" scoped>
.releaseProfessional{
	box-sizing: border-box;
	background-color: #00bf57;
	width: 100%;
	min-height: 100vh;
	padding: 20rpx;
	padding-bottom: 170rpx;
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
	.release_botton{
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 35rpx;
		color: #00bf57;
		background-color: #fff;
		border-radius: 8rpx;
		margin: 40rpx auto;
	}
	.info_item{
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0px 0px 15rpx rgba(0, 0, 0, 0.2);
		margin-bottom: 30rpx;
		.label{
			font-size: 30rpx;
			margin: 10rpx;
			color: gray;
			.required_label{
				color: red;
				margin-right: 5rpx;
			}
		}
		.inp{
			.city_list{
				display:flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx auto;
				.city_item{
					font-size: 22rpx;
					padding: 10rpx 30rpx 10rpx 20rpx;
					border:1rpx solid rgba(0,0,0,0.1);
					border-radius: 10rpx;
					color: gray;
					position: relative;
					.city_close{
						font-size: 15rpx;
						position: absolute;
						top: 5rpx;
						right: 10rpx;
					}
				}
			}
			.type_list{
				display:flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx auto;
				.type_item{
					margin: 0 10rpx;
					flex:1;
					display: flex;
					justify-content: center;
					font-size: 22rpx;
					padding: 15rpx 0;
					border:1rpx solid rgba(0,0,0,0.1);
					border-radius: 10rpx;
					color: gray;
				}
				.sel_item{
					border-color: #00bf57;
					color: #00bf57;
				}
			}
			.sel_education,.sel_industry{
				box-sizing: border-box;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 100%;
				height: 72rpx;
				background: #fff;
				color: gray;
				border: 1rpx solid #DCDFE6;
				border-radius: 8rpx;
				font-size: 28rpx;
				padding: 0 20rpx;
			}
		}
		.instructions_label{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 40rpx;
			color: gray;
			margin: 10rpx 0;
		}
		.instructions_text{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: gray;
			margin: 30rpx 0;
		}
	}
	.release_bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		box-sizing: border-box;
		width: 100%;
		height: 150rpx;
		background-color: #00bf57;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		.release_botton{
			width: 80%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 40rpx;
			color: #fff;
			border: 1px solid #fff;
			border-radius: 8rpx;
		}
	}
}
</style>
