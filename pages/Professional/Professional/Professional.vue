<template>
  <view class="professionPage">
    <view class="header">
      <image class="header_logo" src="../../../static/logo.svg"></image>
    </view>

    <view class="header_list">
      <view
        class="headerTab"
        :class="{ headerTabLine: tabStatus === 1 }"
        @click="changeTab(1)"
        >普通职业</view
      >
      <view
        class="headerTab"
        :class="{ headerTabLine: tabStatus === 2 }"
        @click="changeTab(2)"
        >灵活职业</view
      >
    </view>

    <view class="content_search">
      <view class="content_search_box">
        <input
          v-if="tabStatus === 1"
          class="content_search_input"
          v-model="inputValue"
          placeholder="请输入公司名称/城市/岗位"
        />
        <input
          v-if="tabStatus === 2"
          class="content_search_input"
          v-model="inputValue"
          placeholder="请输入职业/城市"
        />
        <view class="content_search_button" @click="search(inputValue)">
          <image
            class="content_search_img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADfSURBVHgB1ZPhDYMgEIUvnYARHMER2KTdoN2gbqAb4AjtJHYDugEj0IPcxQuhgI1p4ksu/rjH53E+Af4h773GGrGsX7VgGaxuC0gRqKbgUS2whQ44rCFMKvo91pxMrEpAnsyWrhV6fl3FWDKxvsISvyO/zhkMNQ00ilYSNOWavLu+kcdJiCvKNaNgo3LnTrCzGPimN+rWg2I9rxzwSU8N7brmgPw2LQLdQX26eszC5/8h2A8oGOWvFzMpY0S3uItAs8416OTrCp6hCSquNScTWwJp4WOog72EsAvWDQ6jD0InxqabjzR3AAAAAElFTkSuQmCC"
          ></image>
          <view class="content_search_button_text">搜索</view>
        </view>
      </view>
    </view>

    <view class="hot_box" v-if="tabStatus === 2">
      <view class="hot_box_profession">
        <view class="hot_title_1">热门职业</view>
        <view class="under_line"></view>
        <view class="text_area">
          <view
            class="hot_item_red"
            :class="{ hot_item_blue: changeNum > 3 }"
            v-for="item in emergingList.data"
            :key="item.id"
            @click="selectHotOptions(item.id)"
            >{{ item.professionName }}</view
          >
        </view>
      </view>
      <view class="hot_box_city">
        <view class="hot_title_2">热门区域</view>
        <view class="under_line"></view>
        <view class="text_area">
          <view
            class="hot_item_red"
            :class="{ hot_item_blue: changeNumOfCity > 3 }"
            v-for="item in hotAreaList.data"
            :key="item.id"
            @click="selectHotCity(item.id)"
            >{{ item.cityName }}</view
          >
        </view>
      </view>
    </view>

    <view class="content_more" v-if="tabStatus === 1">
      <view class="more_title">
        <view class="more_label">热门搜索</view>
        <view class="under_line"></view>
      </view>
      <view class="more_list">
        <view
          class="more_list_item"
          v-for="item in ordinaryList.data"
          :key="item.id"
          @click="selectHotOptions(item.id)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, reactive, toRaw, onMounted } from "vue";
import { HOT_ORDINARY, HOT_EMERGING } from "../../../config/configData.js";
import sendPostRequest from "../../../utils/sendPostRequest.js";
import router from "../../../utils/route.js";
import {
  HOT_CITYDATA,
  HOT_PROFESSION,
} from "../../../config/professionalMockData.js";

//环境控制变量导入
import { ENV } from "../../../config/MAKRDATA.js";

export default {
  props: {
    target: Number,
  },
  setup(props) {
    onMounted(() => {
      getHotData();
      changeTab(props.target);
    });
    //样式切换变量
    let changeNum = ref(0);
    let changeNumOfCity = ref(0);
    //tab 切换
    const tabStatus = ref(1);
    const changeTab = (target) => {
      tabStatus.value = target;
      loadingList();
    };

    //输入框显示
    const inputValue = ref("");
    const moreList = reactive({});
    const ordinaryList = reactive(HOT_ORDINARY);
    const emergingList = reactive({
      data: [],
    });
    const hotAreaList = reactive({
      data: [],
    });

    //服务器获取热门数据
    const getHotData = () => {
      if (ENV !== "self") {
        //职业
        const workType = {
          workType: "NEW",
        };
        sendPostRequest(
          router.getHotWork,
          workType,
          {
            success(res) {
              if (res.message === "success") {
                operateData(res.data);
              } else {
              }
            },
            fail() {},
          },
          true
        );

        //城市
        sendPostRequest(
          router.getHotCity,
          {},
          {
            success(res) {
              if (res.message === "success") {
                operateAreaData(res.data);
              } else {
              }
            },
            fail() {},
          },
          true
        );
      } else {
        operateData(HOT_PROFESSION.data);
        operateAreaData(HOT_CITYDATA.data);
      }
    };

    //操作数据
    const operateData = (result) => {
      emergingList.data = [];
      result.forEach((item) => {
        emergingList.data.push(item);
        changeNum.value++;
      });
    };
    //城市
    const operateAreaData = (result) => {
      hotAreaList.data = [];
      result.forEach((item) => {
        hotAreaList.data.push(item);
        changeNumOfCity.value++;
      });
    };

    //热门
    function selectHotOptions(list) {
      loadingList();
      for (let key in toRaw(moreList.value)) {
        if (moreList.value[key].id === list) {
          search(moreList.value[key].name || moreList.value[key].professionName);
        }
      }
    }
	
	const selectHotCity = (id) =>{
		moreList.value = toRaw(hotAreaList.data)
		for(let key in toRaw(moreList.value)){
			if(moreList.value[key].id===id){
				search(moreList.value[key].cityName )
			}
		}
	}

    function loadingList() {
      moreList.value =
        tabStatus.value === 1
          ? toRaw(ordinaryList.data)
          : toRaw(emergingList.data);
    }

    //搜索操作
    const search = (value) => {
      uni.navigateTo({
        url:
          "../searchDetail/Ordinary/ordinary" +
          "?inputValue=" +
          value +
          "&target=" +
          tabStatus.value,
      });
    };

    return {
	  selectHotCity,
      hotAreaList,
      changeNum,
      changeNumOfCity,
      inputValue,
      search,
      selectHotOptions,
      tabStatus,
      moreList,
      ordinaryList,
      emergingList,
      changeTab,
    };
  },
};
</script>

<style scoped lang="scss">
.professionPage {
  box-sizing: border-box;
  background: linear-gradient(
    110.6deg,
    #457dea 16.45%,
    rgba(93, 178, 248, 0.794338) 78.47%,
    rgba(197, 216, 248, 0.7) 102.08%
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
    display: flex;
    margin-top: 20rpx;
    border-radius: 8rpx;
    overflow: hidden;
    margin-bottom: 20rpx;

    .content_search_box {
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      border-radius: 68rpx;
      width: 750rpx;

      .content_search_input {
        color: gray;
        padding-left: 30rpx;
        width: 500rpx;
        font-size: 28rpx;
        padding-top: 15rpx;
      }
    }

    .content_search_button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 138rpx;
      height: 68rpx;
      position: relative;
      background: linear-gradient(
        270deg,
        #4684f8 -20.25%,
        rgba(77, 146, 248, 0.93541) 31.77%,
        rgba(93, 178, 248, 0.794338) 117.72%
      );
      box-shadow: 0px 0px 4px #5e95ee;
      border-radius: 92rpx;

      .content_search_img {
        width: 32rpx;
        height: 32rpx;
        margin-right: 5rpx;
      }

      .content_search_button_text {
        color: white;
        font-size: 24rpx;
        margin-left: 5rpx;
      }
    }
  }

  .hot_box {
    width: 686rpx;
    height: 396rpx;
    background: #ffffff;
    border-radius: 20rpx;
    .under_line {
      width: 612rpx;
      height: 0px;
      border: 2rpx solid #dcdfe3;
      margin-left: 20rpx;
      margin-top: 5rpx;
    }
    .hot_title_1 {
      width: 106rpx;
      height: 34rpx;
      font-size: 26rpx;
      color: #828080;
      margin-left: 20rpx;
      padding-top: 20rpx;
    }
    .hot_title_2 {
      width: 106rpx;
      height: 34rpx;
      font-size: 26rpx;
      color: #828080;
      margin-left: 20rpx;
    }
    .text_area {
      display: flex;
      width: 686rpx;
      height: 150rpx;

      .hot_item_red {
        height: 40rpx;
        padding: 15rpx;
        margin: 10rpx 20rpx;
        border: 1rpx solid #5e95ee;
        color: #4581ea;
        border-radius: 12rpx;
        font-size: 28rpx;
        background: linear-gradient(
          90deg,
          #4581ea -43.1%,
          rgba(93, 178, 248, 0.794338) 191.38%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
      .hot_item_blue {
        background: linear-gradient(
          90deg,
          #4581ea -43.1%,
          rgba(93, 178, 248, 0.794338) 191.38%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }
    .hot_box_profession {
      width: 686rpx;
      height: 198rpx;
    }
    .hot_box_city {
      width: 686rpx;
      height: 198rpx;
    }
  }

  .content_more {
    box-sizing: border-box;
    width: 100%;
    padding: 20rpx;
    border-radius: 10rpx;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    margin-bottom: 20rpx;

    .more_title {
      .under_line {
        width: 612rpx;
        height: 0px;
        border: 2rpx solid #dcdfe3;
        margin-left: 20rpx;
        margin-top: 5rpx;
      }

      .more_label {
        font-size: 22rpx;
        color: gray;
        margin-left: 20rpx;
      }
    }

    .more_list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;

      .more_list_item {
        padding: 15rpx;
        margin: 10rpx 20rpx;
        border: 1rpx solid #5e95ee;
        color: #4581ea;
        border-radius: 12rpx;
        font-size: 28rpx;
        background: linear-gradient(
          90deg,
          #4581ea -43.1%,
          rgba(93, 178, 248, 0.794338) 191.38%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }

      .fill_item {
        height: 0;
        margin: 10rpx 20rpx;
        visibility: hidden;
      }
    }
  }

  .content_table {
    box-sizing: border-box;
    width: 100%;
    padding: 10rpx;
    height: 800rpx;
    border-radius: 10rpx;
    box-shadow: 0px 0px 60rpx rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }
}
</style>
