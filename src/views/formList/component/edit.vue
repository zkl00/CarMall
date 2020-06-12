<template>
  <div class="detile"  v-loading="Delectloading" :element-loading-text="textContent">
    <el-form :model="dataJson" ref="dataForm">
      <el-form-item label="路径名称">
        <el-input placeholder="请输入内容" :disabled="!isAdd" v-model="dataJson.path" clearable>
          <template slot="prepend">/sysData/getData/</template>
        </el-input>
      </el-form-item>
      <el-form-item label="json编辑区域">
        <el-input
          type="textarea"
          :rows="30"
          placeholder="请输入内容"
          v-model="dataJson.data"
          :disabled="!isAdd"
        ></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center;" v-show="isAdd">
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="deterMine">确 定</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import { uperJsonData,AddJsonData } from "@/network/index";

export default {
  props: {
    dataJson: {
      type: Object,
      default:{}
    },
    closefale: {
      type: Function,
      default:Function
    },
    isAdd: {
      type: Boolean,
      default(){
          return false
      }
    },
    postData: {
      type: Function
    },
    apiFly:{
        type:Boolean,
        default(){
            return false
        },
    }
  },
  data() {
    return {
       textContent:"正在努力加载中...",
       Delectloading:false
    };
  },
  mounted() {},
  methods: {
    //关闭弹框
    cancelClick() {
      this.$emit("cancelClick");
    },
    // 确定按钮
    async deterMine() {
      this.Delectloading = true
      if (this.apiFly) {
        let results = await AddJsonData(this.dataJson)
         let {result, msg } = results
         if(result){
          this.Delectloading = false
          this.postData(); //更新列表
          this.closefale(); //关闭弹框
         }else{
           this.textContent = "网络错误请稍后..."
          this.Delectloading = false
         }

      } else {
        const res = await uperJsonData(this.dataJson);
         this.Delectloading = true
        let { result, msg } = res;
        if (res.result) {
          this.$message.success(msg);
           this.Delectloading = false
          this.postData(); //更新列表
          this.closefale(); //关闭弹框
        } else {
           this.Delectloading = false
           this.textContent = "网络错误请稍后..."
          this.$message.error(msg);
        }
      }
    }
  }
};
</script>
<style  scoped>
.content {
  width: 100%;
  padding-bottom: 30px;
}
.url {
  padding-bottom: 10px;
}
.content el-inpu {
  width: 100%;
}
</style>