<template>
  <view class="indexPage">
    <view class="header">
      <view class="headselect">
        <view class="salary">请选择您想要查询的职位:</view>
        <view class="outer">
          <view @click="enterProfessional(1)" class="item_ordinary">
            <image
              class="image"
              src="../../static/img/index/ordinary.svg"
            ></image>
            <view class="info">普通职业打工人</view>
          </view>
          <view class="item_line"></view>
          <view @click="enterProfessional(2)" class="item_emerging">
            <image
              class="image"
              src="../../static/img/index/emerging.svg"
            ></image>
            <view class="info">灵活职业创新者</view>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="">
		<input class="input" v-model="profInfo.id"/>
		<input class="input" v-model="profInfo.professionName"/>
		<button class="input" @click="createProfession(profInfo)">提交</button>
	</view> -->
  </view>
</template>

<script>
import { ref, reactive } from "vue";
import sendPostRequest from "../../utils/sendPostRequest.js";
import router from "../../utils/route.js";

export default {
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      title: "自定义分享标题",
      path: "/pages/test/test?id=123",
    };
  },
  setup() {
    const enterProfessional = (target) => {
      uni.navigateTo({
        url: `../Professional/Professional/Professional?target=${target}`,
      });
    };

    const profInfo = reactive({
      id: parseInt(0),
      professionName: "",
      type: "NORMAL",
    });
    const createProfession = (data) => {
      const ds = {
        id: parseInt(data.id),
        professionName: data.professionName,
        type: "NORMAL",
      };
      sendPostRequest(
        router.createProfession,
        ds,
        {
          success(res) {
            console.log("res", res);
          },
          fail() {},
        },
        true
      );
    };
    return {
      profInfo,
      createProfession,
      enterProfessional,
    };
  },
};
</script>

<style lang="scss" scoped>
.indexPage {
  background: #c4c4c4;
  width: 750rpx;
  height: 350rpx;
  border-radius: 0 0 100rpx 60rpx;
  background-image: url("data:image/png;base64,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7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQIIIdwBIEOEOAAki3AEgQYQ7ACSIcAeABBHuAJAgwh0AEkS4A0CCCHcASBDhDgAJItwBIEGEOwAkiHAHgAQR7gCQIMIdABJEuANAggh3AEgQ4Q4ACSLcASBBhDsAJIhwB4AEEe4AkCDCHQASRLgDQII6pjL/xwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4Y/8fjdgRfYE47oAAAAAASUVORK5CYII=");
  }

.input {
  width: 400rpx;
  height: 200rpx;
  border: #2799f5 solid 1px;
}

.header {
  .headselect {
    display: flex;
    flex-direction: column;
    width: 750rpx;
    height: 246rpx;
    padding-top: 180rpx;
    align-items: center;
  }

  .salary {
    display: flex;
    width: 328rpx;
    height: 38rpx;
    font-size: 28rpx;
    color: white;
    align-items: center;
    justify-content: center;
  }

  .outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 628rpx;
    height: 246rpx;
    justify-content: center;
    background-color: #f7f7f7;
    box-shadow: 0px 6rpx 12rpx 6rpx rgba(113, 128, 174, 0.41);
    border-radius: 24rpx;
    margin-top: 15rpx;

    .item_line {
      border: 1rpx solid #5e95ee;
      width: 500rpx;
    }

    .item_ordinary {
      display: flex;
      width: 400rpx;
      height: 46rpx;
      border-radius: 20rpx;
      color: white;
      align-items: center;
      justify-content: center;
      margin-bottom: 25rpx;

      .image {
        width: 52rpx;
        height: 82rpx;
        margin-left: 28rpx;
      }

      .info {
        width: 294rpx;
        height: 46rpx;
        font-size: 34rpx;
        text-align: center;
        background: linear-gradient(90deg, #2799f5 28.48%, #6ad3fb 130.07%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        padding-left: 22rpx;
        padding-right: 26rpx;
      }
    }

    .item_emerging {
      display: flex;
      width: 400rpx;
      height: 46rpx;
      border-radius: 20rpx;
      color: white;
      align-items: center;
      justify-content: center;
      margin-top: 25rpx;

      .image {
        width: 74rpx;
        height: 76rpx;
      }

      .info {
        width: 294rpx;
        height: 46rpx;
        font-size: 34rpx;
        text-align: center;
        background: linear-gradient(90deg, #2799f5 28.48%, #6ad3fb 130.07%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }
  }
}
</style>
