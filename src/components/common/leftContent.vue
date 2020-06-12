<template>
  <div class="leftContent">
    <!--   background-color="rgba(84,92,100)" -->
    <!-- <el-menu
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="item.id" v-for="item in moenu" :key="item.id">
        <template slot="title" >
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group v-if="item.chiilerd" v-for="items in item.chiilerd" :key="item.id">
          <el-menu-item :index="item.id">{{items.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>-->
    <el-menu default-active="/main" router class="el-menu-vertical-demo"   background-color="#545c64"
      text-color="#fff"
      @select="activeFun"
      active-text-color="#ffd04b">
      <template v-for="item in moenu">
        <el-submenu :index="item.path" v-if="item.chiilerd" >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group v-for="itemName in item.chiilerd" :key="itemName.id">
            <el-menu-item :index="itemName.path">{{itemName.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>



  
  </div>
</template>
<script>
import {NavLeft} from '../../network/index'
export default {
  data() {
    return {
      moenu: [],
      loading:true,
      active:'',
    };
  },
  mounted() {
   this.Postmoenu()
  },
  methods:{
    activeFun(e){
      this.active = e
    },
    async Postmoenu(){
      const res = await NavLeft()
      let {result,data} = res
      if(result){
        this.loading = false//关闭加载中
      this.moenu = data
      }else{
        this.$message.error(result)
      }
    },
  }
};
</script>
<style lang="scss">
.leftContent,
.el-menu {
  height: 100%;
}
</style>