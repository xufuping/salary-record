import { createStore } from 'vuex'
const store = createStore({
	state:{//存放状态
		city:{
			defaultCityID:0,
			defaultCity:"选择城市"
		}
	},
	mutations: {
			updateCityData(state,cityInfo) {
				// 变更状态
				state.city.defaultCityID = cityInfo.code;
				state.city.defaultCity = cityInfo.seledCity
			},
			clearCity(state){
				state.city.defaultCityID = 0;
				state.city.defaultCity = "选择城市"
			}
		}
})

export default store