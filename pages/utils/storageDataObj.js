//数据量大时可以使用此方法，便于管理

//定义数据版本号
const strorageVersion = '0.0.1_20220407'

//缓存列表
const uniStorageData = {
	version : 0.0.1_20220407,
	allCityList:
	
}

function (uniStorageData){	
	Object.keys(uniStorageData).forEach(item=>{
		set(item,uniStorageData[item])
	})
}