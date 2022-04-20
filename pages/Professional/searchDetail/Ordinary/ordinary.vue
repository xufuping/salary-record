<template>
	<view class="professionPage">
		<view class="header">
			<view class="header_logo">普通职业</view>
		</view>
		<view class="content_search">
			<uni-easyinput v-model="sendInformation.information" placeholder="请输入公司名称/城市/岗位" @iconClick="search()"
				prefixIcon="search"></uni-easyinput>
		</view>
		<view class="content_more">
			<!-- TODO 可以封装成一个组件，但是有点麻烦 -->
			<!-- <ChooseList label="类型" :typeList="typeList" :todo="chooseType()" :more="open()"/> -->
			<view class="more_list">
				<view class="label">类型</view>
				<view class="list_scroll">
					<view class="sel_list">
						<view class="sel_item" :class="item.active" v-for="item in typeList.data" :key="item.id"
							@click="chooseType(item.id)">{{item.name}}</view>
						<!-- TODO 更多内容没有做 -->
						<!-- <view class="sel_item" @click="open(0)">更多</view> -->
					</view>
				</view>
			</view>
			<view class="more_list">
				<view class="label">城市</view>
				<view class="list_scroll">
					<view class="sel_list">
						<view class="sel_item" :class="item.active" v-for="item in cityList.data" :key="item.id"
							@click="chooseCity(item.id)">{{item.name}}</view>
						<!-- TODO 更多内容没有做 -->
						<view class="sel_item" @click="open(0)">更多</view>
					</view>
				</view>
			</view>
			<view class="more_list">
				<view class="label">行业</view>
				<view class="list_scroll">
					<view class="sel_list">
						<view class="sel_item" :class="item.active" v-for="item in jobList.data" :key="item.id"
							@click="chooseJob(item.id)">{{item.name}}</view>
						<!-- TODO 更多内容没有做 -->
						<view class="sel_item" @click="open(1)">更多</view>
					</view>
				</view>
			</view>
			<view class="more_line"></view>
			<view class="content_table">
				<view class="table_sel_list">
					<view v-for="item in selSortTypeItem" :key="item" class="sel_item" :class="{seled_item:tabTarget===item}" @click="changeTabTarget(item)">{{item}}</view>
				</view>
				<view v-for="item in detail.data" :key="item.id" class="searchItem">
					<searchItem :detail="item" :type="1"></searchItem>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="bottom_tabelbar">
				<navigator class="tabelbar_item active" url="../Ordinary/ordinary">普通职业
				</navigator>
				<navigator class="tabelbar_item" url="../Emerging/Emerging">新兴职业</navigator>
			</view>
		</view>
		<!-- 选择城市 -->
		<searchPopup
		v-for="item in searchPopupList"
		:key="item.id"
		:index="item.id"
		:ref="pushPopupRef"
		:comBoxText="item.comBoxText"
		:showIndexedList="item.showIndexedList"
		:comBoxList="item.comBoxList"
		:indexedList="item.indexedList"
		@changeShowIndexedList="item.changeShowIndexedList"
		@getResult="item.getResult"
		>
		</searchPopup>
		
		
		<!-- :ref="item.ref" -->
	</view>
</template>

<script>
	import {
		ref,
		reactive,
		toRaw,
		onMounted
	} from 'vue'
	import searchItem from "../../common/searchItem.vue"
	import searchPopup from "../../common/SearchPopup.vue"
	// import ChooseList from "../../common/ChooseList.vue";

	import pop_list from "../../../../static/json/pop_list.json";
	import city_pop_list from "./json/city_pop_list.json";

	import type_list from "./json/type_list.json";
	import city_list from "./json/city_list.json";
	import job_list from "./json/job_list.json";

	import sendPostRequest from "../../../utils/utils/sendPostRequest.js"
	import router from "../../../utils/route.js";
	import {getCityListSortedByInitialLetter} from '../../../utils/cityListTools.js'

	const selSortType=['按时间排序','按点赞数排序','按可信度排序']

	export default {
		components: {
			searchItem,
			searchPopup
			// ChooseList
		},
		props: {
			inputValue: String
		},
		setup(props) {
			const  getPopCityList = () =>{
				const cityList = getCityListSortedByInitialLetter();
				const useList = cityList.map(item=>({
					letter : item.initial,
					data : item.cityInfo.map(item=>item.city)
				}))
				return useList;
			}

			const popList = getPopCityList();

			const searchPopupList=reactive([
				{
					id:0,
					comBoxText:"请输入城市",
					showIndexedList:false,
					comBoxList:['重庆','南京','北京','上海','四川','成都','沙坪坝'],
					indexedList:popList,
					changeShowIndexedList:(data,index)=>{
						searchPopupList[index].showIndexedList=data
					},
					getResult:(data,index)=>{
						console.log('data',data,index)
					},
				},
				{
					id:1,
					comBoxText:"请输入行业",
					showIndexedList:false,
					comBoxList:[{
						id:1,
						name:"123"
					}],
					indexedList:popList,
					changeShowIndexedList:(data,index)=>{
						searchPopupList[index].showIndexedList=data
					},
					getResult:(data)=>{
						console.log('data',data,index)
					},
				},
			])

			const selSortTypeItem = selSortType
			
			onMounted(() => {
				// search();
				showAll();
			})
			//tab 切换
			const tabStatus = ref(1) //1-按时间排序 2-按点赞数排序 3-按可信度排序
			const changeTab = (target) => {
				tabStatus.value = target
			}
			//发送信息对象
			const sendInformation = reactive({
				information: props.inputValue,
				city: 0,
				type: "",
				profession: "",
				order: tabStatus.value,
				currentPage: 1,
				pageSize: 10
			})
			//筛选
			const showCollapse = ref(false)
			const closeCollapse = () => {
				showCollapse.value = false
				console.log(showCollapse.value)
			}
			const openCollapse = () => {
				showCollapse.value = true
				console.log(showCollapse.value)
			}
			//热门
			const showList = ref(true)
			const changeList = () => {
				showList.value = !showList.value
			}

			function chooseType(typeId) {
				for (let i = 0; i < typeList.data.length; i++) {
					typeList.data[i].active = "";
				}
				typeList.data[typeId - 1].active = "active";
				sendInformation.type = typeId;
				console.log(typeId)
			}

			function chooseCity(cityId) {
				sendInformation.city = cityId;
				for (let i = 0; i < cityList.data.length; i++) {
					cityList.data[i].active = "";
				}
				cityList.data[cityId - 1].active = "active";
			}

			function chooseJob(jobId) {
				sendInformation.profession = jobId;
				for (let i = 0; i < jobList.data.length; i++) {
					jobList.data[i].active = "";
				}
				jobList.data[jobId - 1].active = "active";
			}

			const typeList = reactive(type_list);
			const cityList = reactive(city_list);
			const jobList = reactive(job_list);

			//显示所有职业列表
			const dataAll = {
				currentPage:1,
				pageSize:5
			}
			function showAll(){
				sendPostRequest(router.ordinaryGetAllWork,dataAll, {
						success(res) {
							if(res.message === "success"){
							operateData(res.data.data);
							}
							else{}
						},
						fail() {}
					},true)
			}

			//搜索操作
			function search() {
				let data={}
				if (sendInformation.information) data.information=sendInformation.information;
				if (tabTarget.value ) data.order=tabTarget.value ;

				sendPostRequest(router.ordinaryGetActicleList, data, {
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
				// sendInformation.currentPage = data.data.data.currentPage;
				// sendInformation.pageSize = data.data.data.pageSize;
				detail.data = [];
				data.forEach(item=>{
					detail.data.push(item);
				})
			}

			//搜索结果筛选
			const tabTarget = ref(1)
			const changeTabTarget = (target) => {
				tabTarget.value = target;
				search();
			}
			let detail = reactive({
				data:[]
			});
			const PopupRefList =reactive([])
			const pushPopupRef=(e)=>{
				if(e) PopupRefList.push(e)
			}
			const open = (data) => {
				console.log(PopupRefList)
				searchPopupList[data].showIndexedList=true
				PopupRefList[data].popup.open('bottom')
			}
			const selectedItem = reactive([]);
			return {
				selSortTypeItem,
				pushPopupRef,
				searchPopupList,
				sendInformation,
				popList,
				open,
				detail,
				tabStatus,
				changeList,
				chooseType,
				chooseCity,
				chooseJob,
				showList,
				typeList,
				cityList,
				jobList,
				changeTab,
				showCollapse,
				closeCollapse,
				openCollapse,
				tabTarget,
				changeTabTarget,
				search,
				operateData,
				selectedItem
			}
		}
	}
</script>

<style scoped lang="scss">
	.professionPage {
		box-sizing: border-box;
		background-color: #00bf57;
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
				margin-top: 25rpx;
				font-size: 60rpx;
			}

			.header_list {
				margin-top: 25rpx;
				font-size: 24rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.header_tab {
					margin: 0 40rpx;
					box-sizing: border-box;
					padding: 20rpx 0;
				}

				.header_tab_line {
					border-bottom: 4rpx solid #fff;
					border-radius: 5%;
				}
			}
		}

		.content_search {
			border-radius: 8rpx;
			overflow: hidden;
			margin-bottom: 10px;
		}

		.content_more {
			box-sizing: border-box;
			width: 100%;
			padding: 20rpx;
			padding-bottom:5rpx;
			// height: 400rpx;
			border-radius: 10rpx;
			box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
			background-color: #fff;
			margin-bottom: 90rpx;

			.more_list {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				margin-top: 15rpx;
				overflow: scroll;

				.label {
					margin-left: 15rpx;
					font-size: 24rpx;
					color: gray;
				}

				.list_scroll {
					width: 100%;
					box-sizing: border-box;
					overflow-x: scroll;

					.sel_list {
						margin-top: 10rpx;
						display: flex;
						flex-direction: row;
						align-items: center;

						.sel_item {
							flex-shrink: 0;
							width: 100rpx;
							text-align: center;
							padding: 10rpx;
							border: 1rpx solid #00bf57;
							color: #00bf57;
							border-radius: 20rpx;
							margin-right: 10rpx;
						}

						.active {
							background-color: #00bf57;
							color: white;
						}
					}
				}

				.list_scroll::-webkit-scrollbar {
					display: none;
				}
			}

			.more_line {
				margin-top: 20rpx;
				border: 1px solid rgba(0, 0, 0, 0.06);
				border-radius: 10%;
			}

			.content_table {
				.table_sel_list {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 40rpx;

					.sel_item {
						padding: 10rpx 0;
						margin: 0 20rpx;
						font-size: 28rpx;
						color: gray;
					}

					.seled_item {
						color: #00bf57;
						border-bottom: 2rpx solid #00bf57;
					}
				}

				.searchItem {
					margin: 20rpx 0;
				}
			}

		}

		.pop_list {
			height: 800rpx;

			.content {
				.text {
					font-size: 30rpx;
				}
			}

			.selected-area {
				display: flex;

				.selected-item {
					width: 75rpx;
					height: 30rpx;
					font-size: 20rpx;
					color: #3A3A3A;
					border: 1rpx solid #3a3a3a;
					border-radius: 5rpx;
					text-align: center;
					line-height: 30rpx;
				}
			}
		}

		.bottom_tabelbar {
			width: 100%;
			position: fixed;
			bottom: 0;
			margin-left: -20rpx;

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
	}
</style>
<style lang="scss">
	.professionPage {
		.content_search {
			.is-input-border.data-v-abe12412 {
				background-color: #fff;
			}
		}

		.uni-indexed-list.data-v-0f58ddf9 {
			top: auto;
			height: 400rpx;
		}
	}
</style>
