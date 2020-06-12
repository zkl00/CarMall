<template>
  <div class="fromList" v-loading="Delectloading" :element-loading-text="textContent">
    <div class="storch">
      <el-input placeholder="请输入路径" style="width:15%" v-model="tableQuery.queryMap.path__blike" clearable></el-input>
      <el-button type="primary" icon="el-icon-search" @click="PostJsonData">搜索</el-button>
      <el-button type="success" @click="addContent">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      v-loading="loading"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      border
    >
      <el-table-column label="请求路径" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Json内容" :show-overflow-tooltip="true" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.data }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button size="mini" @click="lookDlg(row)">查看</el-button>
          <el-button size="mini" @click="editFrom(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleData(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- current-page.sync 当前页数 -->
    <!--  :page-size 每页展示的页数 -->
    <!--  :page-sizes="pageSizes" 下拉的页数 -->

    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="tableQuery.page"
      :page-size="tableQuery.rows"
       :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableQuery.total"
    ></el-pagination> -->
    <!-- 封装的分页 -->
    <Page-helper :page-data="tableQuery" :total="tableQuery.total" :getTableList="PostJsonData"></Page-helper>
    <!-- 编辑框 -->
    <el-dialog title="编辑的内容" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <edit
        @cancelClick="cancle"
        :data-json="dataJson"
        :closefale="closefale"
        :is-add="isAdd"
        :post-data="PostJsonData"
        :api-fly="apiFly"
        ref="fromData"
      />
    </el-dialog>
  </div>
</template>
<script>
import { JsonData, deleData } from "@/network/index";
import { setTimeout } from "timers";
import edit from "./component/edit";
import PageHelper from '@/components/common/PageHelper'
export default {
  components: {
    edit,
    PageHelper
  },
  data() {
    return {
      textContent:"正在努力加载中...",
      tableData: [],
      dialogVisible: false,
      loading: true,
      search: "",
      pageSizes:[5,10,15,20],
      tableQuery: {
        queryMap: {},
        page: 1,
        rows: 10,
        total: 10
      },
      dataJson: "",
      isAdd: "",
      apiFly: "",
      Delectloading: false
    };
  },
  mounted() {
    this.PostJsonData();
  },
  methods: {
    // 多少页
    // handleSizeChange(val) {
    //   this.tableQuery.rows = val;
    //   this.PostJsonData();
    // },
    //页码
    handleCurrentChange(val) {
      console.log(val);
      this.tableQuery.page = val;
      this.PostJsonData();
    },
    async PostJsonData() {
      this.Delectloading = true
      // let { page, rows, total, pageNum } = this.tableQuery;
      const res = await JsonData(this.tableQuery);
      let { result, data } = res;
      if (result) {
        this.Delectloading = false
        this.loading = false; //关闭加载图标
        this.tableData = data.list;
        this.tableQuery.total = res.data.total
      }else{
        this.textContent = "网络错误请稍后..."
         this.Delectloading = false
      }
    },
    //编辑按钮
    editFrom(e) {
      // 给自组建传值
      this.apiFly = false; //点击编辑按钮的时候变变成false;
      this.isAdd = true; //判断是否显示按钮 disabled
      this.dataJson = Object.assign({}, e);
      this.dialogVisible = true;
    },
    // 关闭弹框
    cancle() {
      this.dialogVisible = false;
    },
    // 给子组件关闭的方法弹框的方法
    closefale() {
      this.dialogVisible = false;
    },
    //新增按钮
    addContent() {
      if (this.isAdd) {
      } else {
        this.isAdd = true;
      }
      this.apiFly = true;
      this.dataJson = {};
      this.dialogVisible = true;
    },
    // 查看按钮
    lookDlg(e) {
      this.isAdd = false;
      this.dataJson = Object.assign({}, e);
      this.dialogVisible = true;
    },
    // 关闭弹框
    handleClose(done) {
      done();
    },
    //删除数据
    deleData(e) {
      this.Delectloading = true;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = { id: e.id };
          const res = await deleData(data);
          if (res.result) {
            this.Delectloading = false;
            this.PostJsonData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.Delectloading = false;
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.storch {
  display: flex;
  padding-bottom: 15px;
}
.storch button {
  margin: 0 10px;
}
</style>
