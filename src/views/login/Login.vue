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
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="请输入密码"
            prop="password"
            required
            class="login--input--text"
          >
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item
            label="请输入验证码"
            prop="code"
            required
            class="login--input--text login--input--length"
          >
            <div class="displayF">
              <!-- 验证码盒子 -->
              <el-input v-model="ruleForm.code"></el-input>
              <div v-html="codeData" @click="refresh" class='refresh'></div>
            </div>
          </el-form-item>
          <div class="box displayF">
            <el-form-item>
              <el-button type="primary" @click="jon">立即登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reg">立即注册</el-button>
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
    // 判定账户不能有汉字
    let checkusername = (rule, value, callback) => {
      let regex = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!regex.test(value)) {
        return callback(new Error("用户名不能输入汉字!"));
      } else {
        return callback();
      }
    };
    return {
      codeData: "",
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        // 判定账户
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
        // 判定密码
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
    // 获取验证码
    getData() {
      axios
        .get("/api/captcha")
        .then((res) => {
          if (res.status === 200) {
            this.codeData = res.data;
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 登录按钮 
    jon() {
       this.$refs.ruleForm.validate((valid) => {
        //  输入正确进行下一步
        if (valid) {
          // 请求数据库
          axios
            .post("/api/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              code:this.ruleForm.code
            })
            .then((res) => {
              // 请求成功
              console.log(res);
              if (res.data.code===200) {
                console.log(res.data.data);
                this.$message.success("登录成功");
                // 储存账户密码  转成字符串
                localStorage.setItem('vue-name',JSON.stringify(res.data.data[0]))
                // 跳转主页面
                this.$router.push("/");
              }else {
                // 显示其余情况
                this.$message.error(res.data.message)
              }
            })
            // 请求失败
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else {
          // 输入不正确
          this.$message.error("填写有误,请检查");
          return;
        }
      });
    },
    // 注册按钮
    reg() {
      this.$router.push("/register");
    },
    // 刷新验证码   直接用请求验证码的方法
    refresh() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
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
.refresh:hover {
  cursor: pointer;
}
</style>