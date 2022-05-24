<template>
	<uni-popup ref="popup" type="bottom" background-color="#fff">
		<view class="pop_list">
			<view class="btnList">
				<view @click="cancle">取消</view>
				<view @click="submit">确定</view>
			</view>
			<view class="search">
				<uni-combox v-model="inpValue" @input="getInpValue" :candidates="$props.comBoxList" :placeholder="$props.comBoxText"></uni-combox>
			</view>
			<view class="selList">
				<view class="selItem" v-for="item in selList" :key="item">
					<view class="label">{{item}}</view>
					<view class="close" @click="deleteItem(item)">X</view>
				</view>
			</view>
			<view v-if="$props.showIndexedList">
				<uni-indexed-list @click="getIndexedList " :options="$props.indexedList" :showSelect="true" />
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import {ref,reactive} from 'vue'
	export default{
		props:{
			comBoxText:String,
			comBoxList:Array,
			indexedList:Array,
			showIndexedList:Boolean
		},
		emits:['changeShowIndexedList','getResult'],
		setup(props,ctx){
			const popup=ref(null)
			
			//搜索防抖
			const inpValue =ref('')
			let inpValueTime=null
			const getInpValue=()=>{
				if(inpValueTime!==null) clearTimeout(inpValueTime)
				inpValueTime=setTimeout(()=>{
					if(inpValue.value&&!selList.includes(inpValue.value)) selList.push(inpValue.value)
					inpValueTime=null
				},500)
			}
			
			//选择结果
			const selList=reactive([])
			const deleteItem=(target)=>{
				selList.splice(selList.indexOf(target),1)
			}
			
			//列表选择
			const getIndexedList=(e)=>{
				e.select.forEach(item=>{
					if(!selList.some(target=>item.name===target)) selList.push(item.name)
				})
			}
			
			//提交
			const submit=()=>{
				ctx.emit('getResult',selList,ctx.attrs.index)
				popup.value.close()
				clear()
			}
			//取消	
			const cancle=()=>{
				popup.value.close()
				clear()
			}
			//清空
			const clear=()=>{
				ctx.emit('changeShowIndexedList',false,ctx.attrs.index)
				selList.splice(0,selList.length)
				inpValue.value=''
			}
			
			return{
				clear,
				getIndexedList,
				deleteItem,
				getInpValue,
				inpValue,
				cancle,
				popup,
				selList,
				submit
			}
		}
	}
</script>

<style lang="scss">
	.pop_list {
		height: 800rpx;
		.btnList{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
		}
		.search{
			width: 100%;
			.contentList{	
				height: 130rpx;
				overflow-y: scroll;
				padding:0 10rpx;
				.contentListItem{
					width: 100%;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					border-bottom: 1rpx solid #B9B9B9;
					padding: 20rpx 0;
				}
			}
		}
		.selList{
			width: 100%;
			height: 130rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 20rpx;
			overflow-x: scroll;
			.selItem{
				padding: 10rpx;
				color: #00bf57;
				border: 1rpx solid #00bf57;
				border-radius: 20rpx;
				margin-right: 20rpx;
				display: flex;
				flex-shrink: 0;
				flex-wrap: nowrap;
				.close{
					font-size: 20rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
