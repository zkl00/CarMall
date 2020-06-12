<template>
  <div class="index">
    <el-container class="container">
      <el-header class="header">
        <!-- 公共头 -->
       <Header/>
      </el-header>
      <el-container>
        <el-aside width="220px" class="aside">
          <leftContent/>
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from '@/components/common/header'
import leftContent from '@/components/common/leftContent'
export default {
  components:{
    Header,
    leftContent
  }
};
</script>
<style lang="scss">
.header,
.el-header {
  padding: 0;
}
.index {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
}
.header {
  background-color:rgba(84, 92, 100);
  // opacity: 0.5;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  color: #333;
  text-align: center;
  height: 80px !important;
  // line-height: 60px;
}

.aside {
  background-color: #d3dce6;
  height: 100%;
}
</style>