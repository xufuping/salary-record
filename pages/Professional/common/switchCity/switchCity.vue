<template>
  <view class="input">
    <input
      @input="bindKeyInput"
      @blur="bindBlur"
	  placeholder-style="font-size: 30rpx"
      placeholder="输入城市名或拼音查询"
      v-model="inputName.value"
    />
  </view>

  <view class="container-inner">
    <view class="side-bar-letter-list touch-class">
      <view class="side-bar-hot-city">
        <view style="margin-top: 0"  @click="hotCity">热门</view>
        <view style="margin-top: 0"  @click="hotCity">城市</view>
        <view
        v-for="(item,index) in sideBarLetterList.data"
        style="color: #8bc34a; font-size: 20rpx"
        :key="index"
         @touchend="touchSideBarLetter(item.name)"
        >{{item.name}}</view>
      </view>
	
    </view>
    <view class="container">
      <block v-if="showChosenLetterToast">
        <view class="show-chosen-letter">
          {{ toastShowLetter }}
        </view>
      </block>
	  
      <scroll-view 
		scroll-y="true" 
		@scroll="scroll"
		:scroll-into-view="scrollTopId"
		:style="{ height: windowHeight + 'px'}"
        :scroll-top="scrollTop">
        <ul class="ul">
          <li
            v-for="item in completeList.data"
            :key="item.code"
            @click="chooseCity(item.code, item.city)"
            class="li"
          >
            {{ item.city }}
          </li>
        </ul>

        <view class="city-picker">
          <view class="hotcity-common" @click="reGetLocation()"
            >点击定位城区</view
          >
          <view
            class="current-city"
            >{{ city }} {{ county.data }}</view
          >
          <view class="hotcity-common">热门城市</view>

          <view class="hot-city">
            <view v-for="item in hotCityList" :key="item.cityCode">
              <view
                class="weui-grid"
                @click="chooseCity(item.cityCode, item.city)"
              >
                <view class="weui-grid-label">{{ item.city }}</view>
              </view>
            </view>
          </view>
        </view>

        <view
          class="selection"
          v-for="item in cityList.data"
          :key="item.initial"
        >
          <view class="item-letter" :id="item.initial">
            {{ item.initial }}</view>
          <view
            class="item-city"
            v-for="itemChild in item.cityInfo"
            :key="itemChild.code"
            @click="chooseCity(itemChild.code, itemChild.city)"
          >
            {{ itemChild.city }}
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import {ref,reactive,onMounted} from "vue";
import { LETTERS, HOT_CITY_LIST } from './citydata'
import { commonMessage } from './commonMessageZhCn'
import { AutoPredictor } from '../../../utils/autoPredictor'
import sendPostRequest from '../../../utils/utils/sendPostRequest'
import utils from '../../../utils/utils'

const {
  isNotEmpty,
  safeGet,
  getCityListSortedByInitialLetter,
  getLocationUrl,
  getCountyListUrl,
  onFail,
} = utils;

export default{
setup(){

const appInstance = getApp();
const sideBarLetterList = reactive({
	data:[]
	});
const windowHeight = ref(0);
const cityList = reactive({
	data:[]
	});
const hotCityList = reactive(HOT_CITY_LIST);
const showChosenLetterToast = ref(false);
const scrollTop = ref(0);
const scrollTopId = ref('');
const city = ref(commonMessage['location.getting'])
const currentCityCode = ref('');
const inputName = ref ('');
const completeList = reactive({
	data:[]
});
const countyList = reactive({
	data:[]
});
const county = ref({data:''});
const showCountyPicker = ref(false);
const auto = ref(true);
const toastShowLetter =ref('')

  const setCityCounty = (location) => {
    const res = safeGet(['data', 'result', 'ad_info'], location)
    if(auto.value){
        city.value = res.city;
        currentCityCode.value = res.adcode;
        county.data = res.district;
        appInstance.globalData.defaultCity = res.city
    }
  }

 const  getLocationFromGeoCoord = (geoCoord) => {
    const { latitude, longitude } = geoCoord
    // sendPostRequest(getLocationUrl(latitude, longitude),{},{
    //   success (location) { setCityCounty(location)},
	//   fail(){}
    // },true)
 }

  const getLocation = () => {
    county.data = '';
	uni.getLocation({
		type: 'wgs84',
		success: function (res) {
			getLocationFromGeoCoord(res)
		},
		fail:function(){onFail(commonMessage['location.city.fail'])}
	});
  }

onMounted(()=>{
	
    // 生命周期函数--监听页面加载
    const cityListSortedByInitialLetter = getCityListSortedByInitialLetter();
    let sysInfo ;
    uni.getSystemInfo({
        success:(e)=>{
            sysInfo=e
        },
    });
	const winHeight = sysInfo.windowHeight;
	const sideBarLetterListValue = LETTERS.map(letter => ({ name: letter }));
	windowHeight.value = winHeight;
	sideBarLetterList.data = sideBarLetterListValue;
	cityList.data = cityListSortedByInitialLetter;
    // 定位
    getLocation();
  })

  const touchSideBarLetter = (para) => {
      toastShowLetter.value = para;
      showChosenLetterToast.value = true;
      scrollTopId.value = para;
    // close toast of chosenLetter
    setTimeout(() => {showChosenLetterToast.value = false }, 500)
  }
  
const setCountyList = (res) => {
    const resultArray = safeGet(['data', 'result'], res)
    const countyListValue = isNotEmpty(resultArray) ? resultArray[0] : []
    countyList.data = countyListValue;
  }

// 选择城市
const chooseCity = (code, seledCity) => {
    // const { city, code } = safeGet(['currentTarget', 'dataset'], e)
      auto.value = false;
      showCountyPicker.value = true;
      city.value = seledCity;
      currentCityCode.value = code;
      scrollTop.value = 0;
      completeList.data = [];
      county.data = '';
    // getCountyList();
    appInstance.globalData.defaultCity = city;
    appInstance.globalData.defaultCounty = '';
  }


//点击热门城市回到顶部
  const hotCity = () => {
    scrollTop.value = 0 ;
  }
  const scroll = (e) => {
		// TODO 如果使用此方法，请自行增加防抖处理
		scrollTop.value = e.detail.scrollTop
	}

  const reGetLocation = () => {
    // const { city, county } = this.data
    appInstance.globalData.defaultCity = city.value
    appInstance.globalData.defaultCounty = county.value
    console.log(appInstance.globalData.defaultCity);
    //返回首页
    uni.navigateTo({
	url: '../../../releaseProfessional/releaseProfessional'
        });
  }
  // 失焦时清空输入框
  const bindBlur = (e) => {
      inputName.value = '';
      completeList.data = [];
  }

// 输入框自动联想搜索
  const useAutoPredictor = (content) => {
    let autoPredictor = new AutoPredictor(content)
    let completeListValue = autoPredictor.associativeSearch()
    completeList.data = completeListValue;
  }

  const bindKeyInput = (e) => {
    let inputNameValue = e.detail.value.trim()
    inputName.value = inputNameValue;
    if (!inputName) {
    completeList.data = [];
    }
    useAutoPredictor(inputName.value)
  }

	return {
		scroll,
		 bindBlur,
		 bindKeyInput,
		 hotCity,
		 countyList,
		 chooseCity,
		 toastShowLetter,
		 reGetLocation,
		 appInstance,
		 sideBarLetterList,
		 touchSideBarLetter,
		 windowHeight,
		 cityList,
		 hotCityList,
		 showChosenLetterToast,
		 scrollTop,
		 scrollTopId ,
		 city,
		 currentCityCode,
		 inputName,
		 completeList,
		 county,
		 showCountyPicker,
		 auto
		}
	}
}
</script>

<style lang="scss">
.container-inner {
  display: flex;
  flex-direction: row-reverse;
}

.container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10rpx;
}

input {
  text-align: center;
  font-size: 32rpx;
  padding: 5px;
}

scroll-view {
  padding-left: 16rpx;
}

.side-bar-letter-list {
  flex-shrink: 0;
  width: 80rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #666;
}

.side-bar-letter-list view {
  margin-top: 20rpx;
}

.touch-class {
  background-color: #fff;
  color: #fff;
  padding-top: 16rpx;
  padding-bottom: 16rpx;
}

.show-chosen-letter {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -100rpx;
  width: 200rpx;
  height: 200rpx;
  border-radius: 20rpx;
  font-size: 52rpx;
  z-index: 1;
}

.selection {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 10rpx;
}

.city-picker {
  padding: 16rpx 0 16rpx 16rpx;
  background-color: #f5f5f5;
  margin-bottom: -10rpx;
}
.county-picker {
  padding-left: 20rpx;
  margin-bottom: 10rpx;
}
.county-picker-title {
  font-size: 24rpx;
  color: #666;
  padding-bottom: 0;
  margin: 8rpx 0;
  padding-left: 4px;
}
.hot-city {
  background-color: #f5f5f5;
  margin-bottom: -10rpx;
  display: flex;
  flex-wrap: wrap;
}

.item-letter {
  display: flex;
  background-color: #f5f5f5;
  height: 40rpx;
  padding-left: 34rpx;
  align-items: center;
  font-size: 24rpx;
  color: #666;
}

.item-city {
  display: flex;
  background-color: #fff;
  height: 100rpx;
  padding-left: 34rpx;
  align-items: center;
  border-bottom: 1rpx solid #ededed;
  font-size: 24rpx;
  color: #666;
}

.hotcity-common {
  font-size: 24rpx;
  color: #666;
  padding-bottom: 0;
  margin: 8rpx 0;
  margin-left: 16rpx;
}

.county-picker-list {
  padding-right: 50rpx;
  margin: auto;
}

.current-city {
  display: inline-block;
  border: 1rpx solid #8bc34a;
  border-radius: 8rpx;
  padding: 10rpx;
  font-size: 24rpx;
  color: #8bc34a;
  text-align: center;
  min-width: 149.5rpx;
  margin: 16rpx;
}

.side-bar-hot-city {
  color: #8bc34a;
  font-size: 20rpx;
  margin: 0 !important;
}

.slectCity {
  border-color: #8bc34a !important;
}

.slectCity view {
  color: #8bc34a !important;
}

.weui-grid {
  padding: 10rpx 0;
  width: 200rpx;
  box-sizing: border-box;
  border: 1rpx solid #ececec;
  border-radius: 8rpx;
  background-color: white;
  margin: 8rpx 0 8rpx 8rpx;
}

.weui-grids {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.weui-grid-label {
  display: block;
  text-align: center;
  color: #333;
  font-size: 24rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ul {
  display: block;
  color: grey;
  margin-left: 20rpx;
}

.li {
  display: block;
  font-weight: 100;
  font-size: 28rpx;
  padding: 16rpx 0;
}

input {
  background-color: #eee;
}

.input {
  padding: 16rpx;
  border-bottom: 1rpx solid #f1f1f1;
}

.county {
  display: flex;
  flex-wrap: wrap;
}
</style>
