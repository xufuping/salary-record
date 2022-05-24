<template>
	<view class="professionPage">
		
		<view class="header">
			<view class="header_logo">新兴职业</view>
		</view>
		
		<view class="content_search">
			<uni-easyinput v-model="sendInformation.information" placeholder="请输入公司名称/城市/岗位" prefixIcon="search"
				@iconClick="search()">
			</uni-easyinput>
		</view>
		
		<view class="content_more">
			
			<view class="more_list">
				<view class="label">城市</view>
				<view class="list_scroll">
					<view class="sel_list">
						<!-- 此行下面class待修改 -->
						<view class="sel_item" :class="{active:(cityClassID.id === item.cityCode ? true : false)}" v-for="item in cityList" :key="item.cityCode"
							@click="chooseCity(item.cityCode)">{{ item.city }}
						</view>
						<!-- TODO 更多内容没有做 -->
						<view class="sel_item" @click="open">更多</view>
					</view>
				</view>
			</view>
			
			<view class="more_list">
				<view class="label">收入区间</view>
				<view class="input_salary">
					<!-- TODO 使用uni-easyinput时在微信端无法调用keyup和keydown事件响应函数。 -->
					<uni-easyinput type="number" class="input" v-model="sendInformation.dSalary" placeholder="最低工资"
						@keydown="clearActive" ></uni-easyinput>
					<view>~</view>
					<uni-easyinput type="number" class="input" v-model="sendInformation.hSalary" placeholder="最高工资"
						@keydown="clearActive"></uni-easyinput>
					<view v-if="!yearOrMonthSalary" @click="changeYearOrMonthSalary" class="year-month">月薪</view>
					<view v-if="yearOrMonthSalary" @click="changeYearOrMonthSalary" class="year-month">年薪</view>
				</view>
			</view>
			
			<view class="more_list">
				<view class="label">常见区间（月薪）</view>
				<view class="list_scroll">
					<view class="sel_list">
						<view class="sel_item_salary" :class="item.active" v-for="item in salaryList.data"
							:key="item.id" @click="chooseSalary(item.id)">{{ item.name }}
						</view>
					</view>
				</view>
			</view>
			
			<view class="content_table">
				<view class="table_sel_list">
					<view v-for="item in selSortTypeItem" class="sel_item" :class="{seled_item:tabTarget.order===item.order}" @click="changeTabTarget(item.order)">{{item.sortType}}</view>
				</view>
				<view v-for="item in detail.data" :key="item.id" class="searchItem">
					<searchItem :detail="item" :type="2"></searchItem>
				</view>
			</view>
		</view>
		
		<view class="bottom_tabelbar">
			<view class="tabelbar_item" @click="changePage(1)" >普通职业</view>
			<view class="tabelbar_item" :class="seledType.type" @click="changePage(2)" >新兴职业</view>
		</view>
		
		<searchPopup
		ref="searchPopup"
		comBoxText="请输入城市"
		:showIndexedList="showIndexedList"
		:comBoxList="myList"
		:indexedList="popList"
		@changeShowIndexedList="changeShowIndexedList"
		@getResult="getResult"
		>
		</searchPopup>
		
		
	</view>
</template>

<script>
	import {
		ref,
		reactive,
		toRaw,
		onMounted
	} from "vue";
	import searchItem from "../../common/searchItem.vue";
	import searchPopup from "../../common/SearchPopup.vue";

	import {SCREEN_CITY} from "../../../../config/configData.js";
	import {addHotCity} from "../../../../utils/cityListTools.js";
	import {SALARY_LIST,selSortType} from "./constants.js";
	import sendPostRequest from "../../../../utils/sendPostRequest.js";
	import router from "../../../../utils/route.js";
	import {getPopCityList} from '../../../../utils/cityListTools.js'
	
	//测试变量导入
	import {EMERGING,ENV} from "../../../../config/MAKRDATA.js"

	export default {
		components: {
			searchItem,
			searchPopup
		},
		props: {
			inputValue: String
		},
		setup(props) {
			onMounted(() => {
				search();
			});

			//排序
			const selSortTypeItem = selSortType;
			const tabTarget = reactive({
				order:""
			});
			//发送信息对象
			const sendInformation = reactive({
				information: props.inputValue,
				city: 0,
				dSalary: null,
				hSalary: null,
				order: "",
				currentPage: 0,
				pageSize: 0
			});
			
			const changeTabTarget = (target) => {
				if(tabTarget.order === target) return
				tabTarget.order = target;
				sendInformation.order = target;
				search();
			};
			
			//筛选
			const showCollapse = ref(false);
			const closeCollapse = () => {
				showCollapse.value = false;
				console.log(showCollapse.value);
			};
			const openCollapse = () => {
				showCollapse.value = true;
				console.log(showCollapse.value);
			};
			
			//热门
			const showList = ref(true);
			const changeList = () => {
				showList.value = !showList.value;
			};

			function chooseCity(cityCode) {
				// TODO 多选实现
				if(cityClassID.id !== cityCode){
					sendInformation.city = cityCode;
					cityClassID.id = cityCode
					search()
				}else{
					cityClassID.id = 0
				}
			}

			const yearOrMonthSalary = ref(false); //year为true，month为false

			function changeYearOrMonthSalary() {
				if (yearOrMonthSalary.value) {
					sendInformation.dSalary = sendInformation.dSalary === null ? null : Math.floor(sendInformation
						.dSalary / 12);
					sendInformation.hSalary = sendInformation.hSalary === null ? null : Math.floor(sendInformation
						.hSalary / 12);
				} else {
					sendInformation.dSalary = sendInformation.dSalary === null ? null : sendInformation.dSalary * 12;
					sendInformation.hSalary = sendInformation.hSalary === null ? null : sendInformation.hSalary * 12;
				}
				yearOrMonthSalary.value = !yearOrMonthSalary.value;
			}

			function chooseSalary(salaryId) {
				yearOrMonthSalary.value = false;
				for (let i = 0; i < salaryList.data.length; i++) {
					salaryList.data[i].active = "";
				}
				salaryList.data[salaryId - 1].active = "active";
				switch (salaryId) {
					case 1:
						sendInformation.dSalary = 0;
						sendInformation.hSalary = 10000;
						break;
					case 2:
						sendInformation.dSalary = 10000;
						sendInformation.hSalary = 50000;
						break;
					case 3:
						sendInformation.dSalary = 50000;
						sendInformation.hSalary = null;
						break;
				}
			}
			
			const cityClassID = reactive({id:0})
			const cityList = reactive(addHotCity(SCREEN_CITY));
			const salaryList = reactive(SALARY_LIST);

			//搜索操作
			function search() {
				detail.data = []
				if (sendInformation.information === "" || !sendInformation.information) return;
				if (!checkSalary()) {
					uni.showModal({
						content: "输入不正确！请重新输入!",
						showCancel: false
					})
					return;
				}
				// console.log("searching!", toRaw(sendInformation));
				const data={}
				if(sendInformation.information) data.information=sendInformation.information
				if (tabTarget.order) data.order=sendInformation.order ;
				sendPostRequest(router.emergingGetActicleList, data, {
						success(res) {
							if(res.message === "success"){
							operateData(res.data.data);
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
					true);
			}

			function checkSalary() {
				const testReg = /^(0|[1-9][0-9]*)$/;
				if (sendInformation.dSalary === null || sendInformation.hSalary === null) return true;
				if (testReg.test(sendInformation.dSalary) && testReg.test(sendInformation.hSalary)) {
					return sendInformation.dSalary < sendInformation.hSalary;
				}
				return false;
			}

			function operateData(info) {
				// sendInformation.currentPage = data.data.data.currentPage;
				// sendInformation.pageSize = data.data.data.pageSize;
				console.log("info",info)
				detail.data = [];
				Array.isArray(info) && info.forEach(item=>{
					detail.data.push(item);
				})
			}

			const detail = reactive({
				data:[]
			});
			
			//底部弹窗
			const showIndexedList=ref(false)
			const searchPopup = ref(null);
			const open = () => {
				// console.log(searchPopup.value.popup.open("bottom"));
				showIndexedList.value=true
				searchPopup.value.popup.open("bottom");
			};
			const changeShowIndexedList=(data)=>{
				showIndexedList.value=data
			}
			const popList = getPopCityList();
			const getResult=(res)=>{
				console.log('getResult',res)
			}

			function clearActive() {
				for (let i = 0; i < salaryList.data.length; i++) {
					salaryList.data[i].active = "";
				}
			}
			
			//测试数据
			const myList=[
				'qwe','wsd','dff','ssxc','asd123','sd34',123
			]
			
			//页面跳转
			const seledType = reactive({
				type:"active" 
			})
			const changePage = (value) =>{
				if(value === 2){
					return
				}else{
					seledType.type = ""
					uni.redirectTo({
						url: "../Ordinary/ordinary"
					})
					}
			}

			return {
				cityClassID,
				seledType,
				changePage,
				selSortTypeItem,
				getResult,
				showIndexedList,
				changeShowIndexedList,
				myList,
				sendInformation,
				search,
				popList,
				open,
				searchPopup,
				detail,
				changeList,
				showList,
				cityList,
				salaryList,
				showCollapse,
				closeCollapse,
				openCollapse,
				tabTarget,
				changeTabTarget,
				chooseCity,
				chooseSalary,
				clearActive,
				operateData,
				checkSalary,
				yearOrMonthSalary,
				changeYearOrMonthSalary
			};
		}
	};
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

				.input_salary {
					display: flex;
					align-items: center;

					.input {
						width: 250rpx;
					}
					.year-month{
						width: 100rpx;
						height: 60rpx;
						line-height: 60rpx;
						border: 1rpx solid #00bf57;
						border-radius: 20rpx;
						color: #00bf57;
						text-align: center;
						margin-left: 20rpx;
					}
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

						.sel_item_salary {
							flex-shrink: 0;
							width: 150rpx;
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

		// .pop_list {
		// 	height: 800rpx;
		// 	.btnList{
		// 		width: 100%;
		// 		box-sizing: border-box;
		// 		display: flex;
		// 		justify-content: space-between;
		// 		padding: 20rpx;
		// 	}
		// 	.search{
		// 		width: 100%;
		// 		.contentList{	
		// 			height: 130rpx;
		// 			overflow-y: scroll;
		// 			padding:0 10rpx;
		// 			.contentListItem{
		// 				width: 100%;
		// 				box-sizing: border-box;
		// 				display: flex;
		// 				justify-content: center;
		// 				border-bottom: 1rpx solid #B9B9B9;
		// 				padding: 10rpx 0;
		// 			}
		// 		}
		// 	}
		// 	.selList{
		// 		width: 100%;
		// 		height: 130rpx;
		// 		box-sizing: border-box;
		// 		display: flex;
		// 		justify-content: flex-start;
		// 		align-items: center;
		// 		padding: 0 20rpx;
		// 		overflow-x: scroll;
		// 		.selItem{
		// 			padding: 10rpx;
		// 			color: #00bf57;
		// 			border: 1rpx solid #00bf57;
		// 			border-radius: 20rpx;
		// 			margin-right: 20rpx;
		// 			display: flex;
		// 			.close{
		// 				font-size: 20rpx;
		// 				margin-left: 20rpx;
		// 			}
		// 		}
		// 	}
		// }

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
				padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
				padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
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
			height: 500rpx;
		}
	}
</style>
