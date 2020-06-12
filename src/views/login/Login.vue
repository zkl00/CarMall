<template>
  <div class="login">
    <div class="formData">
      <el-form
        label-position="right"
        label-width="80px"
        ref="formLabelAlign"
        :model="formLabelAlign"
        class="from"
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="formLabelAlign.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formLabelAlign.password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="regionClick('formLabelAlign')">登陆</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Longin } from "../../network/index";
import { async } from "q";
export default {
  data() {
    return {
      formLabelAlign: {
        password: "000000",
        username: "admin"
      },
      rules: {
        // 账号
        name: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        //密码
        region: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 登陆验证
    regionClick(formName) {
      this.$refs[formName].validate(async valid => {
        console.log(valid);
        if (valid) {
          let { username, password } = this.formLabelAlign;
          //  console.log(username)
          const res = await Longin(username, password);
          let { result,data } = res;
          if (result) {
            this.$message.success("登陆成功");
            sessionStorage.setItem('token', data)//缓存taoken
            this.$router.push("/index");
          }
        } else {
          this.$message.error("账号不能为空");
        }
      });
    }
  }
};
</script>
<style  lang="scss">
.login {
  height: 100%;
  background: url("../../assets/img/pao.png");
  position: relative;
}
.formData {
  height: 300px;
  width: 500px;
  background-color: rgba(255, 255, 255, 0.5); //*背景
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-40%, -40%);
  padding: 0 30px;
}
.from {
  margin: 80px 0;
}
</style>