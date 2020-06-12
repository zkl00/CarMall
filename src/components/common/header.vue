<template>
  <div class="cart">
    <div class="left"></div>
    <div class="content">
      <!-- 地图盒子 -->
      <div ref="mapList"></div>
      <div class="content-warp">
        <div>当前为位置:{{position}}</div>
        <div class="zhuangKuang">
          天气情况：{{title.cond_txt}}
          <div>
            <img :src="imgs" alt />
          </div>
        </div>
        <div>当前温度：{{title.tmp}}℃</div>
        <div>当前时间:{{title.update}}</div>
      </div>
    </div>
    <div class="right">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="rgba(84,92,100)"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">
          <el-badge :value="3">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-menu-item>

        <el-menu-item index="4">
          <el-button type="text">管理员</el-button>
        </el-menu-item>
        <el-menu-item index="5">
          <el-button type="danger" size="mini" round>退出</el-button>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      activeIndex2: "1",
      imgs: "",
      title: {},
      mapName: null,
      position: ""
    };
  },
  mounted() {
    this.lonchange(); //获取当前位置
  },
  methods: {
    // 获取当前天使情况
    weather_get(cityName) {
      axios({
        url: `https://www.tianqiapi.com/free/day?appid=${"57358439"}&appsecret=${"F1fWwbzE "}&city=${cityName}`
      }).then(res => {
        let { city, update_time, wea_img, wea, tem } = res.data;
        // 获取图片地址
        this.imgs = `/img/longan/${wea_img}.png`;
        // 获取天气的状态
        this.title = {
          cond_txt: wea,
          tmp: tem,
          update: update_time
        };
      });
    },
    // 获取当前位置
    lonchange() {
      this.mapName = new AMap.Map(this.$refs.mapList, {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        center: [116.397428, 39.90923] //初始化地图中心点
      });
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        });
        this.mapName.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          console.log("111s");
          if (status == "complete") {
            //拿去位置
            this.onComplete(result);
            // this.londch(result)
          } else {
            this.onError(result);
          }
        });
      });
    },
    onComplete(data) {
      let { addressComponent } = data;
      this.weather_get(addressComponent.city); //获取天气情况
      console.log(
        addressComponent.city +
          "," +
          addressComponent.street +
          "," +
          addressComponent.district
      );
      this.position = addressComponent.city + "," + addressComponent.district;
    },
    onError(data) {
      console.log(data);
      this.$message.error("定位失败");
      // document.getElementById('status').innerHTML='定位失败'
      // document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
    },
    handleSelect() {}
  }
};
</script>
<style lang="scss">
.cart {
  display: flex; //
  height: 100%;
  justify-content: space-between;
  width: 100%;
}
.left {
  background: red;
  width: 20%;
}
.content {
  width: 50%;
  display: flex;
  align-items: center;
  // background: darkblue;
}

.right {
  width: 30%;
  background: burlywood;
}

.right,
.el-badge__content.is-fixed {
  top: 16px;
}
.content-warp {
  width: 100%;
  display: flex;
  color: aliceblue;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.zhuangKuang {
  display: flex;
  align-items: center;
}
.zhuangKuang img {
  margin: 0 10px;
}
.right .el-menu {
  display: flex;
  align-items: center;
}
</style>