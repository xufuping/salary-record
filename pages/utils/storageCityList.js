import sendPostRequest from "./utils/sendPostRequest"
import router from  'route.js'

const allCityList =[];
const storageCityList = () =>{
			sendPostRequest(router.getCityListByName,{}, {
					success(res) {
						if(res.message === "success"){
							uni.setStorage({
								key: 'allCityList',
								data:res.data,
								success: function () {
									console.log('success');
								}
							});
						}
						else{}
					},
					fail() {}
				},true)
		}
export default storageCityList;

