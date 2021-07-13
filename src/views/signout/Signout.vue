<template>
  <div>
    <div class="displayF justify-contentC align-itemsC flex-directionC">
      <div class="top">期待您的下次光临</div>
      <el-button type="primary" @click="out">确定退出</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    // 点击退出
    out() {
      // 请求数据库
      axios
        .get("/api/user/logout")
        .then((res) => {
          // 如果成功
          console.log(res);
          if (res.data.code === 0) {
            // 提示退出
            this.$message.success("退出成功");
            // 删除密码账户
            localStorage.removeItem("vue-name");
            // 跳转登录页
            this.$router.push("/Login");
          } else {
            // 显示其余情况
            this.$message.error(res.data.message);
          }
        })
        // 请求失败
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.displayF {
  margin-top: 100px;
}
.top {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>