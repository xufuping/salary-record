<template>
  <view class="professionPage">
    <view class="header">
      <image class="header_logo" src="../../../../static/logo.svg"></image>
    </view>
	
	<view class="header_list">
	  <view
	    class="headerTab"
	    :class="{ headerTabLine: seledType.type === 1 }"
	    @click="changePage(1)"
	    >普通职业</view
	  >
	  <view
	    class="headerTab"
	    :class="{ headerTabLine: seledType.type === 2 }"
	    @click="changePage(2)"
	    >灵活职业</view
	  >
	</view>

    <view class="content_search">
      <uni-easyinput
        v-model="sendInformation.information"
        placeholder="请输入公司名称/城市/岗位"
        prefixIcon="search"
        @iconClick="search()"
      >
      </uni-easyinput>
    </view>

    <view class="content_more">
      <view class="more_list">
        <view class="label">城市</view>
        <view class="label_underline"></view>
        <view class="list_scroll">
          <view class="sel_list">
            <view
              class="sel_item"
              :class="{
                active: cityClassID.id === item.cityCode ? true : false,
              }"
              v-for="item in cityList"
              :key="item.cityCode"
              @click="chooseCity(item.cityCode)"
              >{{ item.city }}
            </view>
          </view>
        </view>
      </view>

      <view class="more_list">
        <view class="label">收入区间</view>
        <view class="label_underline"></view>
        <view class="input_salary">
          <view class="input_salary_prefix">
            <uni-easyinput
              type="number"
              class="input"
              v-model="sendInformation.dSalary"
              placeholder="最低工资"
              @keydown="clearActive"
            ></uni-easyinput>
            <view class="middle_dashed_line"></view>
            <uni-easyinput
              type="number"
              class="input"
              v-model="sendInformation.hSalary"
              placeholder="最高工资"
              @keydown="clearActive"
            ></uni-easyinput>
          </view>
          <view class="input_salary_suffix">
            <view
              v-if="!yearOrMonthSalary"
              @click="changeYearOrMonthSalary"
              class="year-month"
              >月薪</view
            >
            <view
              v-if="yearOrMonthSalary"
              @click="changeYearOrMonthSalary"
              class="year-month"
              >年薪</view
            >
            <image
              class="suffix_image"
              src="../../../../static/img/professionalDetail/Polygon3.png"
            ></image>
          </view>
        </view>
      </view>

      <view class="more_list">
        <view class="label">常见区间（月薪）</view>
        <view class="label_underline"></view>
        <view class="list_scroll">
          <view class="sel_list">
            <view
              class="sel_item_salary"
              :class="item.active"
              v-for="item in salaryList.data"
              :key="item.id"
              @click="chooseSalary(item.id)"
              >{{ item.name }}
            </view>
          </view>
        </view>
      </view>

      <view class="content_table">
        <view class="label_underline"></view>
        <view class="table_sel_list">
          <view
            v-for="item in selSortTypeItem"
            :key="index"
            class="sel_item"
            :class="{ seled_item: tabTarget.order === item.order }"
            @click="changeTabTarget(item.order)"
            >{{ item.sortType }}</view
          >
        </view>
        <view v-for="item in detail.data" :key="item.id" class="searchItem">
          <searchItem :detail="item" :type="2"></searchItem>
        </view>
      </view>
    </view>
	
	<view class="back_to_top" @click="backToTop">
		<image class="back_to_top_icon" src="../../../../static/img/ordinary/icon.svg"></image>
	</view>
  </view>
</template>

<script>
import { ref, reactive, toRaw, onMounted } from "vue";
import searchItem from "../../common/searchItem.vue";
import { SCREEN_CITY } from "../../../../config/configData.js";
import { addHotCity } from "../../../../utils/cityListTools.js";
import { SALARY_LIST, selSortType } from "./constants.js";
import sendPostRequest from "../../../../utils/sendPostRequest.js";
import router from "../../../../utils/route.js";
import { getPopCityList } from "../../../../utils/cityListTools.js";

//测试变量导入
import { EMERGING, ENV } from "../../../../config/MAKRDATA.js";

export default {
  components: {
    searchItem
  },
  props: {
    inputValue: String,
  },
  setup(props) {
    onMounted(() => {
      search();
    });

    //排序
    const selSortTypeItem = selSortType;
    const tabTarget = reactive({
      order: "",
    });
    //发送信息对象
    const sendInformation = reactive({
      information: props.inputValue,
      city: [],
      dSalary: null,
      hSalary: null,
      order: "",
      currentPage: 0,
      pageSize: 0,
    });

    //排序切换
    const changeTabTarget = (target) => {
      if (tabTarget.order === target) return;
      tabTarget.order = target;
      sendInformation.order = target;
      search();
    };
	
    //热门
    const showList = ref(true);
    const changeList = () => {
      showList.value = !showList.value;
    };

    function chooseCity(cityCode) {
      if (cityClassID.id !== cityCode) {
        sendInformation.city = cityCode;
        cityClassID.id = cityCode;
        search();
      } else {
        cityClassID.id = 0;
      }
    }

	//薪资
    const yearOrMonthSalary = ref(false); //year为true，month为false
	
	function clearActive() {
	  for (let i = 0; i < salaryList.data.length; i++) {
	    salaryList.data[i].active = "";
	  }
	}

    function changeYearOrMonthSalary() {
      if (yearOrMonthSalary.value) {
        sendInformation.dSalary =
          sendInformation.dSalary === null
            ? null
            : Math.floor(sendInformation.dSalary / 12);
        sendInformation.hSalary =
          sendInformation.hSalary === null
            ? null
            : Math.floor(sendInformation.hSalary / 12);
      } else {
        sendInformation.dSalary =
          sendInformation.dSalary === null
            ? null
            : sendInformation.dSalary * 12;
        sendInformation.hSalary =
          sendInformation.hSalary === null
            ? null
            : sendInformation.hSalary * 12;
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
	
    const cityClassID = reactive({ id: 0 });
    const cityList = reactive(addHotCity(SCREEN_CITY));
    const salaryList = reactive(SALARY_LIST);

    //搜索操作
    function search() {
      detail.data = [];
      if (sendInformation.information === "" || !sendInformation.information)
        return;
      if (!checkSalary()) {
        uni.showModal({
          content: "输入不正确！请重新输入!",
          showCancel: false,
        });
        return;
      }
      const data = {};
      if (sendInformation.information)
        data.information = sendInformation.information;
      if (tabTarget.order) data.order = sendInformation.order;

      if (ENV !== "self") {
        sendPostRequest(
          router.emergingGetActicleList,
          data,
          {
            success(res) {
              if (res.message === "success") {
                operateData(res.data.data);
              } else {
                if (ENV === "self") {
                  operateData(EMERGING.data.data);
                }
              }
            },
            fail() {
              if (ENV === "self") {
                operateData(EMERGING.data.data);
              }
            },
          },
          true
        );
      } else {
        operateData(EMERGING.data.data);
      }
    }

	//薪资监测
    function checkSalary() {
      const testReg = /^(0|[1-9][0-9]*)$/;
      if (sendInformation.dSalary === null || sendInformation.hSalary === null)
        return true;
      if (
        testReg.test(sendInformation.dSalary) &&
        testReg.test(sendInformation.hSalary)
      ) {
        return sendInformation.dSalary < sendInformation.hSalary;
      }
      return false;
    }
	
	//数据操作函数
    function operateData(info) {
      // sendInformation.currentPage = data.data.data.currentPage;
      // sendInformation.pageSize = data.data.data.pageSize;
      console.log("info", info);
      detail.data = [];
      Array.isArray(info) &&
        info.forEach((item) => {
          detail.data.push(item);
        });
    }

    const detail = reactive({
      data: [],
    });

    //页面跳转
    const seledType = reactive({
      type: 2,
    });
    const changePage = (value) => {
      if (value === 2) {
        return;
      } else {
        uni.redirectTo({
          url: "../Ordinary/ordinary",
        });
      }
    };
	
	//回到顶部按钮
	const backToTop = () =>{
		uni.pageScrollTo({
		    scrollTop: 0,
		    duration: 100,
		});
	}

    return {
      cityClassID,
      seledType,
      changePage,
      selSortTypeItem,
      sendInformation,
      search,
      detail,
      changeList,
      showList,
      cityList,
      salaryList,
      tabTarget,
      changeTabTarget,
      chooseCity,
      chooseSalary,
      yearOrMonthSalary,
      changeYearOrMonthSalary,
	  backToTop
    };
  },
};
</script>

<style scoped lang="scss">
.professionPage {
  box-sizing: border-box;
  background: linear-gradient(
    105.57deg,
    #457dea 15.49%,
    rgba(93, 178, 248, 0.794338) 88.26%,
    rgba(197, 216, 248, 0.7) 119.2%
  );
  width: 100%;
  min-height: 100vh;
  padding: 20rpx;

  .header {
    display: flex;
    width: 190rpx;
    height: 190rpx;
	margin: 0 auto;
    border-radius: 50%;
    margin-bottom: 20rpx;
	
	.header_logo {
	  width: 190rpx;
	  height: 190rpx;
	}
  }
  
  .header_list {
    font-size: 30rpx;
    display: flex;
    align-items: center;
    margin: 0 auto;
    color: #fff;
    width: 400rpx;
	margin-bottom: 20rpx;
  
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

  .label_underline {
    width: 630rpx;
    height: 0px;
    border: 2rpx solid #e2e5e9;
    margin-left: 10rpx;
    margin-bottom: 10rpx;
  }

  .content_search {
    border-radius: 34rpx;
    background-color: #fff;
    overflow: hidden;
    margin-bottom: 20rpx;
  }

  .content_more {
    box-sizing: border-box;
    width: 100%;
    padding: 20rpx;
    padding-bottom: 5rpx;
    border-radius: 10rpx;
    box-shadow: 0px 0px 60rpx rgba(0, 0, 0, 0.2);
    background-color: #fff;

    .more_list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 15rpx;
      overflow: scroll;
      margin-bottom: 20rpx;

      .label {
        margin-left: 15rpx;
        font-size: 24rpx;
        color: gray;
        margin: 10rpx;
      }

      .label_underline {
        width: 630rpx;
        height: 0px;
        border: 2rpx solid #e2e5e9;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
      }

      .input_salary {
        display: flex;
        align-items: center;
		margin-left: 10rpx;


        .input_salary_prefix {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 500rpx;
        }
        .input_salary_suffix {
          display: flex;
          width: 134rpx;
          line-height: 60rpx;
          border: 1rpx solid #5e95ee;
          border-radius: 42rpx;
          color: #5e95ee;
          text-align: center;
          margin-left: 20rpx;
          align-items: center;
        }
        .input {
          width: 206rpx;
          height: 72rpx;
        }

        .middle_dashed_line {
          width: 32rpx;
          height: 0px;
          border: 2rpx solid #c4c4c4;
        }

        .year-month {
          width: 100rpx;
          height: 60rpx;
        }

        .suffix_image {
          width: 24rpx;
          height: 24rpx;
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
          font-size: 32rpx;
		  justify-content: space-between;
		  margin-left: 10rpx;

          .sel_item {
            flex-shrink: 0;
            width: 100rpx;
            text-align: center;
            padding: 10rpx;
            border: 1rpx solid #5e95ee;
            color: #5e95ee;
            border-radius: 20rpx;
            margin-right: 10rpx;
          }

          .sel_item_salary {
            flex-shrink: 0;
            width: 150rpx;
            text-align: center;
            padding: 10rpx;
            border: 1rpx solid #5e95ee;
            color: #5e95ee;
            border-radius: 20rpx;
            margin-right: 10rpx;
          }

          .active {
            color: white;
            background-color: #5e95ee;
          }
        }
      }

      .list_scroll::-webkit-scrollbar {
        display: none;
      }
    }

    .more_line {
      margin-top: 20rpx;
      border: 2rpx solid rgba(0, 0, 0, 0.06);
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
          width: 170rpx;
          height: 42rpx;
          padding: 10rpx 0;
          margin: 0 20rpx;
          font-size: 28rpx;
          color: #d1d5da;
        }

        .seled_item {
          padding: 10rpx 0;
          margin: 0 20rpx;
          color: #6a758b;
          width: 170rpx;
          height: 42rpx;
          background: #eef4fa;
          border-radius: 100rpx;
          text-align: center;
        }
      }

      .searchItem {
        margin: 20rpx 0;
      }
    }
  }
	
  .back_to_top{
  	  position: fixed;
  	  width: 60rpx;
  	  height: 60rpx;
  	  border-radius: 50%;
  	  right: 40rpx;
  	  font-size: 23rpx;
  	  text-align: center;
  	  bottom: 80rpx;
  	  background: cornflowerblue;
	  
	  .back_to_top_icon{
	  	  width: 60rpx;
	  	  height: 30rpx;
	  	  margin-top: 16rpx;
	  }
  }
}
</style>
