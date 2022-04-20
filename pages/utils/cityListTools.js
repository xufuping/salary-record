import sendPostRequest from "./utils/sendPostRequest"
import router from './route.js'

//城市检索的首字母
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
//热门城市
const setHotCityList = [ '北京市','上海市','广州市','深圳市','杭州市', '南京市', '武汉市', '天津市', '西安市']
const CITY_NOT_FOUND = [{ city: '无匹配城市', code: "000" }]

//获取城市数据
const getCityList = () =>{
		return new Promise(resolve => {
			sendPostRequest(router.getCityListByName,{}, {
					success(res) {
						console.log("RESSS",res)
						if(res.message === "success"){
							resolve(res.data)
						}
						else{}
					},
					fail() {}
				},true)	
		})
}

//定义数据版本号
const strorageVersion = '0.0.1_20220407'
	
//缓存数据以及版本号
const finalUsedCityList = () =>{
	const version = uni.getStorageSync('strorageVersion')
	if(version){
		if(version === strorageVersion) {
			return uni.getStorageSync('allCityList'); 	
		}else{
		let cityList;
		getCityList().then(res => {
			cityList =res;
		})
		uni.clearStorageSync();
		uni.setStorageSync('allCityList', cityList);
		uni.setStorageSync('strorageVersion', strorageVersion);
		return cityList
		}
	}else{
		let cityList;
		uni.setStorageSync('strorageVersion', strorageVersion);
		getCityList().then(res => {
			cityList =res;
			uni.setStorageSync('allCityList', cityList);
		})
		return cityList;
	}
}

// 城市名按首字母分组
const getCityListSortedByInitialLetter = () => {
	const CITY_LIST = uni.getStorageSync('allCityList');
    const  cityListSortedByInitialLetter = LETTERS.map(
    letter => ({
      initial: letter,
      cityInfo:  Array.isArray(CITY_LIST[letter]) && CITY_LIST[letter].length && CITY_LIST[letter].map(item =>{
		const resCityList = {};  
		resCityList.city = item.cityName;
		resCityList.cityCode = item.id;
		return resCityList
	})
    })
  )
  return cityListSortedByInitialLetter ;
}

//用于搜索的城市数据格式
const editCityDataUsedForSerach = () =>{
	const allCityList = uni.getStorageSync('allCityList');
	const CITY_LIST = []
	for (let letter in allCityList){
		if(allCityList[letter].length > 0){
			allCityList[letter].map(cityData =>{
				CITY_LIST.push({
					city : cityData.cityName,
					cityCode : cityData.id
				})
			})
		}
	}
	return CITY_LIST
}

//通过城市名称查询城市信息
const getCityInfoByName = (cityName) =>{
	const searchCityList = getCityListSortedByInitialLetter();
	let resCity;
	searchCityList.forEach(item => {
		let list=Array.isArray(item.cityInfo) && item.cityInfo.filter(info =>info.city === cityName)
		if(list.length) resCity=list
	})
	return resCity;
}

//热门城市
const addHotCity = () =>{
	const HOT_CITY_LIST = []
	setHotCityList.forEach(item => {
		 const hotCity = getCityInfoByName(item)
		 if(hotCity){
			 HOT_CITY_LIST.push(hotCity[0])
		 }
	})
	return HOT_CITY_LIST
}

export {
	getCityList,
	getCityInfoByName,
	getCityListSortedByInitialLetter,
	finalUsedCityList,
	editCityDataUsedForSerach,
	addHotCity,
	CITY_NOT_FOUND,
	LETTERS
};

