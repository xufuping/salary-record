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
        @iconClick="search()"
        prefixIcon="search"
      ></uni-easyinput>
    </view>

    <view class="content_more">
      <view class="more_list">
        <view class="label">类型</view>
        <view class="label_underline"></view>
        <view class="list_scroll">
          <view class="sel_list">
            <view
              class="sel_item"
              :class="{ active: type.id === item.id ? true : false }"
              v-for="item in typeList"
              :key="item.id"
              @click="chooseType(item)"
              >{{ item.name }}</view
            >
          </view>
        </view>
      </view>

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
              >{{ item.city }}</view
            >
          </view>
        </view>
      </view>

      <view class="more_list">
        <view class="label">行业</view>
        <view class="label_underline"></view>
        <view class="list_scroll">
          <view class="sel_list">
            <view
              class="sel_item"
              :class="{ active: jobClassID.id === item.id ? true : false }"
              v-for="item in jobList.data"
              :key="item.id"
              @click="chooseJob(item.id)"
              >{{ item.name }}</view
            >
          </view>
        </view>
      </view>

      <view class="content_table">
        <view class="label_underline"></view>
        <view class="table_sel_list">
          <view
            v-for="item in selSortTypeItem"
            :key="item.order"
            class="sel_item"
            :class="{ seled_item: tabTarget.order === item.order }"
            @click="changeTabTarget(item.order)"
            >{{ item.sortType }}</view
          >
        </view>
        <view v-for="item in detail.data" :key="item.id" class="searchItem">
          <searchItem :detail="item" :type="1"></searchItem>
        </view>
      </view>
    </view>
	
	<view class="back_to_top" @click="backToTop" >
		<image class="back_to_top_icon" src="../../../../static/img/ordinary/icon.svg"></image>
	</view>
	
  </view>
</template>

<script>
import { ref, reactive, toRaw, onMounted } from "vue";
import searchItem from "../../common/searchItem.vue";
import TYPE_LIST from "../../../../config/typeData.js";
import { SCREEN_CITY } from "../../../../config/configData.js";
import { addHotCity } from "../../../../utils/cityListTools.js";
import { JOB_LIST, selSortType } from "./constants.js";

import sendPostRequest from "../../../../utils/sendPostRequest.js";
import router from "../../../../utils/route.js";
import { getPopCityList } from "../../../../utils/cityListTools.js";

//测试导入
import { ORDINARY, ENV } from "../../../../config/MAKRDATA.js";

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

    //页面切换
    const seledType = reactive({
      type: 1,
    });
    const changePage = (value) => {
      if (value === 1) {
        return;
      } else {
        uni.redirectTo({
          url: "../Emerging/Emerging",
        });
      }
    };

    const detail = reactive({
      data: [],
    });
    const selSortTypeItem = selSortType;
    const tabTarget = reactive({
      order: "",
    });

    //发送信息对象
    const sendInformation = reactive({
      information: props.inputValue,
      cityIds: [],
      typeIds: [],
      professionIds: [],
      order: "",
      currentPage: 1,
      pageSize: 10,
    });

    //排序
    const changeTabTarget = (target = "") => {
      if (tabTarget.order === target) return;
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

    function chooseType(typeInfo) {
      if (type.id !== typeInfo.id) {
        sendInformation.typeIds.push(typeInfo.id);
        type.id = typeInfo.id;
        search();
        sendInformation.typeIds = [];
        console.log("ccii", sendInformation.typeIds);
      } else {
        type.id = 0;
        sendInformation.typeIds = [];
        search();
      }
    }

    function chooseCity(cityCode) {
      if (cityClassID.id !== cityCode) {
        sendInformation.cityIds.push(cityCode);
        cityClassID.id = cityCode;
        search();
        sendInformation.cityIds = [];
      } else {
        cityClassID.id = 0;
        search();
      }
    }

    function chooseJob(jobId) {
      if (jobClassID.id !== jobId) {
        sendInformation.profession = jobId;
        jobClassID.id = jobId;
        search();
      } else {
        jobClassID.id = 0;
      }
    }

    const type = reactive({ id: 0 });
    const typeList = reactive(TYPE_LIST);

    const cityClassID = reactive({ id: 0 });
    const cityList = reactive(addHotCity(SCREEN_CITY));

    const jobClassID = reactive({ id: 0 });
    const jobList = reactive(JOB_LIST);

    //搜索操作
    let data = {};
    function search() {
      detail.data = [];
      if (sendInformation.information)
        data.information = sendInformation.information;
      if (tabTarget.order) data.order = sendInformation.order;
      if (sendInformation.cityIds.length !== 0)
        data.cityIds = sendInformation.cityIds;
      if (sendInformation.typeIds.length !== 0)
        data.typeIds = sendInformation.typeIds;

      if (ENV !== "self") {
        sendPostRequest(
          router.ordinaryGetActicleList,
          data,
          {
            success(res) {
              if (res.message === "success") {
                operateData(res.data.data);
              } else {
                if (ENV === "self") {
                  operateData(ORDINARY.data.data);
                }
              }
            },
            fail() {
              if (ENV === "self") {
                operateData(ORDINARY.data.data);
              }
            },
          },
          true
        );
      } else {
        operateData(ORDINARY.data.data);
      }
    }

    function operateData(info) {
      // sendInformation.currentPage = data.data.data.currentPage;
      // sendInformation.pageSize = data.data.data.pageSize;
      detail.data = [];
      Array.isArray(info) &&
        info.forEach((item) => {
          detail.data.push(item);
        });
    }
	
	//回到顶部按钮
	const backToTop = () =>{
		uni.pageScrollTo({
		    scrollTop: 0,
		    duration: 100,
		});
	}

    return {
      seledType,
      type,
      cityClassID,
      jobClassID,
      changePage,
      selSortTypeItem,
      sendInformation,
      detail,
      changeList,
      chooseType,
      chooseCity,
      chooseJob,
      showList,
      typeList,
      cityList,
      jobList,
      showCollapse,
      closeCollapse,
      openCollapse,
      tabTarget,
      changeTabTarget,
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

          .sel_item {
            flex-shrink: 0;
            width: 100rpx;
            text-align: center;
            padding: 10rpx;
            border: 1rpx solid #5e95ee;
            color: #5e95ee;
            border-radius: 20rpx;
            margin-right: 30rpx;
            margin-left: 10rpx;
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
      .label_underline {
        width: 630rpx;
        height: 0px;
        border: 2rpx solid #e2e5e9;
        margin-left: 10rpx;
        margin-top: 20rpx;
        margin-bottom: 10rpx;
      }

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
          border-radius: 50px;
          text-align: center;
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
        color: #3a3a3a;
        border: 1rpx solid #3a3a3a;
        border-radius: 5rpx;
        text-align: center;
        line-height: 30rpx;
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
