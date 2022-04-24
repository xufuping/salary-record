<template>	
	
 <view class="releaseProfessional">
    <view class="header">
      <view class="header_logo">logo</view>
      <view class="header_list">
        <view
          class="header_tab"
          :class="{ header_tab_line: tabStatus === 1 }"
          @click="changeTab(1)"
          >普通职业</view
        >
        <view
          class="header_tab"
          :class="{ header_tab_line: tabStatus === 2 }"
          @click="changeTab(2)"
          >新兴职业</view
        >
      </view>
    </view>

    <view class="info_item" >
      <view class="label"><span class="required_label">*</span>公司</view>
      <view class="inp">
		<uni-easyinput v-model="company" :placeholder="tabStatus===1?'请输入公司名称':'快递公司/美团/抖音'">
		</uni-easyinput>
      </view>
    </view>

    <view class="info_item">
      <view class="label">岗位</view>
      <view class="inp">
        <uni-easyinput v-model="job" :placeholder="tabStatus===1?'输入岗位名称':'外卖/快递/直播/网约车'">
        </uni-easyinput>
      </view>
    </view>

    <view class="info_item">
      <view class="label"><span class="required_label">*</span>薪资描述</view>
      <view class="inp">
        <uni-easyinput type = "number" v-model="salary" placeholder="如:28W或者14*13">
        </uni-easyinput>
      </view>
    </view>

	<view class="info_item">
	  <view class="label"><span class="required_label">*</span>薪资范围</view>
	  <view class="inp">
	    <view class="box_sort">
			<view class="inputbox">
				<uni-easyinput placeholder="最低工资" v-model="dSalary"
				></uni-easyinput>
			</view>
			<view>---</view>
			<view class="inputbox">
				<uni-easyinput placeholder="最高工资" v-model="hSalary"
				></uni-easyinput>
			</view>
		</view>
	  </view>
	</view>

    <view class="info_item" v-if="tabStatus === 1">
      <view class="label">类型</view>
      <view class="inp">
        <view class="type_list">
          <view
            class="type_item"
            v-for="item in type_list"
            :key="item.id"
            :class="{ sel_item: selType === item.id }"
            @click="changeSelType(item.id)"
          >
            {{ item.label }}
          </view>
        </view>
      </view>
    </view>

    <view class="info_item" v-if="tabStatus === 1">
      <view class="label">学历</view>
      <view class="inp">
		<picker @change="changeEducation" :value="index" :range="eduList">
		<view class="sel_education">
		  {{ sel_education }}
		</view>	
		</picker>
      </view>
    </view>

    <view class="info_item">
      <view class="label">行业</view>
      <view class="inp">
		<picker @change="changeIndustry" :value="index" :range="tabStatus === 1 ? induList[0] : induList[1]">
		<view class="sel_education">
		  {{ sel_industry }}
		</view>	
		</picker>
      </view>
    </view>

    <view class="info_item">
      <view class="label">城市</view>
      <view class="inp">
        <navigator  url="../Professional/common/switchCity/switchCity">
		<button type="default" class="label">{{storeCity.defaultCity}}</button>
		</navigator>
      </view>
    </view>

    <view class="info_item">
      <view class="label">备注</view>
      <view class="inp">
        <uni-easyinput
          type="textarea"
          v-model="job_note"
          placeholder="可填写工作详细信息,如福利补贴,福利待遇等"
        >
        </uni-easyinput>
      </view>
    </view>

    <view class="info_item">
      <view class="detailTitle">
        <view class="instructions_label">说明</view>
        <icon type="info" color="grey" size="10px" @click="showDetail"></icon>
      </view>
      <view class="instructions_text"> 严禁发布不良信息，违法必究 </view>
    </view>

    <view class="release_botton" @click="submit">点击发布</view>

    <!-- <view class="bottom_tabelbar">
      <navigator class="tabelbar_item active" url="./releaseProfessional"
        >发布信息</navigator
      >
      <navigator class="tabelbar_item" url="../index/index">薪资查询</navigator>
    </view> -->
  </view>
</template>

<script>
import {
	ref,
	reactive,
	onMounted
} from 'vue';
import sendPostRequest from "../utils/utils/sendPostRequest.js"
import edu_list from "./json/edu_list.json";
import indu_list from "./json/indu_list.json";
import typeList from "./json/typeList.json";
import router from "../utils/route.js";
import store from '../../store/index.js'

export default {
	setup() {
		//清空页面信息
		const clearPage = () =>{
			company.value = ''
			job.value = ''
			store.commit("clearCity")
			salary.value = null
			dSalary.value = ''
			hSalary.value = ''
			sel_industry.value = '请选择行业'
			job_note.value = ''
		}
		//切换tab
		const tabStatus = ref(1)
		const changeTab = (data) => {
			if(company.value !== '' 
			   || job.value !== ''
			   || job_note.value !== ''
			   || dSalary.value !== ''
			   || hSalary.value !== ''
			   || sel_industry.value !== '请选择行业'
			   || salary.value !== null
			   || storeCity.defaultCity !== '选择城市'
			 ){
				uni.showModal({
					content: "此操作会清空已输入信息，确定吗？",
					success(res) {
						if (res.confirm) {
									clearPage()
									tabStatus.value = data
								} 
					},
				})
			}else{
				clearPage()
				tabStatus.value = data
			}
			
		}
		//公司
		const company = ref('')
		//      || storeCity !== '选择城市'
		//岗位
		const job = ref('')
		
		//城市
		const storeCity = store.state.city;
		
		
		//薪资
		const salary = ref(null)
		
		//薪资范围
		const dSalary = ref('')
		const hSalary = ref('')
		
		//类型
		const type_list = typeList;
		const selType = ref(1);
		const changeSelType = (data) => {
			selType.value = data
		}
		
		// TODO 学历、行业两个数据来源，接口、待修复，目前采用的本地JSON数据
		//学历
		const sel_education = ref("请选择学历")
		const eduList = reactive(edu_list);
		function changeEducation(e) {
			sel_education.value = eduList[e.detail.value]
		}
		
		//行业
		const sel_industry = ref("请选择行业")
		const induList = reactive(indu_list);
		function changeIndustry(e) {
			sel_industry.value = indu_list[tabStatus.value - 1][e.detail.value]
		}
		
		//待遇
		const job_note = ref('')

		//
		function showDetail() {
			uni.showModal({
				content: "严禁发布不良信息，违法必究\r\n所有数据未经允许不得盗用，侵权必究\r\n信息均为用户自愿共享发布\r\n希望大家能自觉遵守声明",
				showCancel: false,
			})
		}
		
		//发布
		function submit() {
			if (company.value === "" || salary.value === "") {
				uni.showModal({
					content: "请填完带*的选项",
					showCancel: false
				})
				return;
			}
			
			//进行提交操作
			if(tabStatus.value === 1){
			uni.showModal({
				content: "你确定要提交吗？",
				success(res) {
					if (res.confirm) {
						let sendInformation = {
							company: company.value,
							post: job.value,
							city: storeCity.defaultCityID,
							salaryNUm: parseInt(salary.value),
							salaryStr:salary.value,
							salaryRange:dSalary.value+hSalary.value,
							type: tabStatus.value === 1 ? selType.value : 0, //0为选择新兴职业时的类型代码
							// degree: sel_education.value,
							degree:1,
							profession: tabStatus.value,
							openId : "13334521234",
							from : "WEI_XIN",					
							explain: job_note.value,
						}
						sendPostRequest(router.ordinaryPublish, sendInformation, {
								success() {
									uni.showModal({
										content: "提交成功！",
										showCancel: false
									})
								},
								fail() {}
							},
							true);
					} else if (res.cancel) {
						return;
					}
				}
			})
			}else{
			uni.showModal({
				content: "你确定要提交吗？",
				success(res) {
					if (res.confirm) {
						let sendInformation = {
							company: company.value,
							post: job.value,
							city: storeCity.defaultCityID,
							salaryNUm: parseInt(salary.value),
							salaryStr:salary.value,
							salaryRange:dSalary.value+hSalary.value,
							profession: tabStatus.value,
							openId : "13334521234",
							from : "WEI_XIN",						
							explain: job_note.value,
						}
						sendPostRequest( router.emergingPublish,sendInformation, {
								success() {
									uni.showModal({
										content: "提交成功！",
										showCancel: false
									})
								},
								fail() {}
							},
							true);
					} else if (res.cancel) {
						return;
					}
				}
			})
			}
		}

		onMounted(()=>{
			//getIndexedList()
		})
		return {
			dSalary,
			hSalary,
			storeCity,
			salary,
			company,
			job,
			tabStatus,
			changeTab,
			type_list,
			job_note,
			selType,
			changeSelType,
			sel_education,
			sel_industry,
			changeEducation,
			changeIndustry,
			submit,
			showDetail,
			eduList,
			induList
		}
	}
}
</script>

<style lang="scss" scoped>
.releaseProfessional {
  box-sizing: border-box;
  background-color: #00bf57;
  width: 100%;
  min-height: 100vh;
  padding: 20rpx;
  padding-bottom: 170rpx;

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

  .release_botton {
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

  .info_item {
    box-sizing: border-box;
    width: 100%;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0px 0px 15rpx rgba(0, 0, 0, 0.2);
    margin-bottom: 30rpx;

    .label {
      font-size: 30rpx;
      margin: 10rpx;
      color: gray;

      .required_label {
        color: red;
        margin-right: 5rpx;
      }
    }

    .inp {
        .city_item {
          font-size: 22rpx;
          padding: 10rpx 30rpx 10rpx 20rpx;
          border: 1rpx solid rgba(0, 0, 0, 0.1);
          border-radius: 10rpx;
          color: gray;
          position: relative;

          .city_close {
            font-size: 15rpx;
            position: absolute;
            top: 5rpx;
            right: 10rpx;
          }
        }
      .box_sort{
		  display: flex;
		  justify-content: space-around;
	  }
	  .inputbox{
		  width: 250rpx;
	  }

      .type_list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20rpx auto;

        .type_item {
          margin: 0 10rpx;
          flex: 1;
          display: flex;
          justify-content: center;
          font-size: 22rpx;
          padding: 15rpx 0;
          border: 1rpx solid rgba(0, 0, 0, 0.1);
          border-radius: 10rpx;
          color: gray;
        }

        .sel_item {
          border-color: #00bf57;
          color: #00bf57;
        }
      }

      .sel_education {
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 72rpx;
        background: #fff;
        color: gray;
        border: 1rpx solid #dcdfe6;
        border-radius: 8rpx;
        font-size: 28rpx;
        padding: 0 20rpx;
      }
    }

    .instructions_label {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40rpx;
      color: gray;
      margin: 10rpx 0;
      margin-right: 20rpx;
    }

    .instructions_text {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      color: gray;
      margin: 30rpx 0;
    }
  }

  .release_bottom {
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

    .release_botton {
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

.detailTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
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
</style>


<style lang="scss">
	.skdfhj{}
</style>
