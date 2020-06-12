<template>
<!-- 分页 -->
<!-- :current-page.sync="tableQuery.page" 当前的页数 -->
<!-- :page-size 每页展示的页数 -->
<!--  :page-sizes="pageSizes" 下拉的条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageData.page"
      :page-size="pageData.rows"
       :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
    ></el-pagination>
</template>
<script>
export default {
    props:{
        // 总数量
        total:{
            type:Number,
            default:0
        },
         // 分页数据（当前页/每页展示数据条数）
         pageData:{
             type:Object,
             default:{
                 page:1,
                 rows:10
             }
         },
        //  下拉的条数
        pageSizes:{
            type:Array,
            default(){
                return [5,10,15,20]
            }
        },
        // 分页条数布局
        layout:{
            type:String,
            default:"total, sizes, prev, pager, next, jumper"
        },
        // 方法
        getTableList:{
            type:Function
        }
    },
    methods:{
           // 下拉的页数
        handleSizeChange(val){
            // console.log(val);
            this.$set(this.pageData,"rows",val)
            if(this.getTableList){
                this.getTableList()
            }
        },
     
        handleCurrentChange(val){
            // console.log(val);
              if(this.getTableList){
                this.getTableList()
            }

        },
    }
}
</script>