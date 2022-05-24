<template>
</template>

<script>
	import sendPostRequest from "../../utils/sendPostRequest.js"
	
	setup(){
		//审核普通
		const auditingNormal = () =>{
			const viewNormal = 	{
				normalWork:12
			}
			sendPostRequest(router.adminNormalView,viewNormal,{
				success(res) {
					if(res.message === "success"){
						console.log("DetailEmerging",res)
					}
					else{}
				},
				fail() {}
			},true)
		}
		
		//审核新兴
		const auditingEmerging = () =>{
			const viewEmerging = 	{
				newWork:8
			}
			sendPostRequest(router.adminEmergingView,viewEmerging,{
				success(res) {
					if(res.message === "success"){
						console.log("DetailEmerging",res)
					}
					else{}
				},
				fail() {}
			},true)
		}
		
		return {
			auditingNormal,
			auditingEmerging
		}
	}
</script>

<style>
</style>
