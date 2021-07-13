<template>
  <div class="login displayF justify-contentC align-itemsC">
    <el-card class="box-card">
      <!-- 头部固定部分 -->
      <div slot="header" class="clearfix">
        <span>欢迎来到小爱后台管理系统</span>
      </div>
      <!-- 中间输入部分 -->
        <div style="width: 500px">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
          >
            <el-form-item
              label="请输入用户名"
              prop="username"
              class="login--input--text"
            >
              <el-input v-model.trim="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item
              label="请输入密码"
              prop="password"
              required
              class="login--input--text"
            >
              <el-input
                v-model.trim="ruleForm.password"
                show-password
              ></el-input>
            </el-form-item>
            <div class="box displayF">
              <el-form-item>
                <el-button type="primary" @click="login">立即注册</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="remove">立即登录</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    // 判定输入是否为汉字
    let checkusername = (rule, value, callback) => {
      let regex = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!regex.test(value)) {
        return callback(new Error("用户名不能输入汉字!"));
      } else {
        return callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        // 账户判断
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 6,
            message: "用户名在2到6位之间",
            trigger: "blur",
          },
          {
            validator: checkusername,
            trigger: "blur",
          },
        ],
        // 密码判断
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "密码在6到15之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    // 判定是否输入正确  注册按钮
    login() {
      this.$refs.ruleForm.validate((valid) => {
        // 正确进行下一步
        if (valid) {
          // 给数据库发送请求
          axios
            .post("/api/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              // 请求如果成果则跳转登录页面
              console.log(res);
              if (res.data.code===200) {
                this.$message.success("注册成功");
                this.$router.push("/login");
              }else {
                this.$message.error(res.data.message)
              }
            })
            // 失败
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else {
          // 输入有误
          this.$message.error("表单填写有误,请检查");
          return;
        }
      });
    },
    // 登录按钮
    remove() {
      this.$router.push("/login");
    },
  },
  mounted() {
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.login {
  width: 100%;
  height: 721px;
  background: skyblue;
}
.el-input {
  width: 80%;
}
span {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>