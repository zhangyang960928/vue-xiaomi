<template>
  <div>
    <div>
      <el-button type="primary" size='mini' @click='return1'>返回</el-button>
    </div>
    <div class="one displayF justify-contentC">{{list.title}}</div>
    <div class="two displayF justify-contentC">摘要:{{list.abstract}}</div>
    <div class="three displayF justify-contentC">发表于:{{list.author}}</div>
    <div class="four" v-html='list.text'></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      ids1: "",
      list: [],
    };
  },
  components: {},
  methods: {
    // 发送请求  查看单个文章的路径
    getData() {
      axios
        .post("/api/article/article", {
          _id: this.ids1,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.list = res.data.data;
            console.log(this.list);
          } else {
            this.$message.error("查看失败");
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 点击返回  跳转到已发布页面
    return1 () {
      this.$router.push('/Publish')
    }
  },
  mounted() { 
    // 接收已发布页面查看按钮传过来的id
    // 先拿到id   再调用方法
    this.ids1 = this.$route.query.id1;
    this.getData();
    console.log(this.ids1);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.one {
  font-size: 25px;
  font-weight: bold;
}
.two {
  margin-top: 40px;
}
.three {
  margin-top: 10px;
  font-size: 12px;
  color: #cccccd;
}
.four {
  background: white;
}
</style>