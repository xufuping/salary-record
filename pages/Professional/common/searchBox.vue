<template>
<view class="content_search">
	<view class="content_search_box">
	        <input
			  v-if="statusCode.statusCodeCtx === 'normal'"
	          class="content_search_input"
	          v-model="normalValue"
			  :placeholder="statusCode.statusCodeCtx ==='normal' ? '请输入公司名称/城市/岗位' : '请输入职业/城市'"
	        />
			<input
			  v-if="statusCode.statusCodeCtx === 'emerging'"
			  class="content_search_input"
			  v-model="emergingValue"
			  :placeholder="statusCode.statusCodeCtx ==='normal' ? '请输入公司名称/城市/岗位' : '请输入职业/城市'"
			/>
	        <view class="content_search_button" @click="search(statusCode.statusCodeCtx ==='normal' ? normalValue : emergingValue)">
	          <image
	            class="content_search_img"
	            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADfSURBVHgB1ZPhDYMgEIUvnYARHMER2KTdoN2gbqAb4AjtJHYDugEj0IPcxQuhgI1p4ksu/rjH53E+Af4h773GGrGsX7VgGaxuC0gRqKbgUS2whQ44rCFMKvo91pxMrEpAnsyWrhV6fl3FWDKxvsISvyO/zhkMNQ00ilYSNOWavLu+kcdJiCvKNaNgo3LnTrCzGPimN+rWg2I9rxzwSU8N7brmgPw2LQLdQX26eszC5/8h2A8oGOWvFzMpY0S3uItAs8416OTrCp6hCSquNScTWwJp4WOog72EsAvWDQ6jD0InxqabjzR3AAAAAElFTkSuQmCC"
	          ></image>
	          <view class="content_search_button_text">搜索</view>
	        </view>
	      </view>
</view>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  props: {
	tabStatus:String
  },
  setup(props) {
	//状态码
	const statusCode = reactive({
		statusCodeCtx : props.tabStatus
	})
	// console.log("code",statusCode.statusCodeCtx)
	// console.log("props",props.tabStatus)
	// 搜索框输入值
	const normalValue = ref("");
	const emergingValue = ref("")
	//搜索操作
	const search = (value) => {
	  uni.navigateTo({
	    url:
	      "../searchDetail/Ordinary/ordinary" +
	      "?inputValue=" +
	      value +
	      "&target=" +
	      statusCode.statusCodeCtx,
	  });
	  console.log("input",value)
	};
    return {
		search,
		normalValue,
		emergingValue,
		statusCode
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
