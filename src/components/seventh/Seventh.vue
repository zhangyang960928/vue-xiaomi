<template>
  <div>
    <div class="seventh">
      <img src="../../assets/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt="" />
      <div>
        {{ list2[0] }}
        <el-progress :percentage="list1[0]"></el-progress>
        {{ list2[1] }}
        <el-progress :percentage="list1[1]" status="success"></el-progress>
        {{ list2[2] }}
        <el-progress :percentage="list1[2]"></el-progress>
        {{ list2[3] }}
        <el-progress :percentage="list1[3]"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      list1: [],
      list2: [],
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/progress")
        .then((res) => {
          // console.log(res.data.data);
          this.list = res.data.data;
          // 拿到所有的progress值
          this.list1 = this.list.map((item) => {
            return item.progress * 100;
          });
          // console.log(this.list1);
          // 拿到所有的name
          this.list2 = this.list.map((item) => {
            return item.name;
          });
          // console.log(this.list2);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.seventh {
  height: 483.63px;
  width: 365px;
  padding: 20px;
  background: white;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
img {
  width: 365px;
  height: 300px;
  margin-bottom: 20px;
}
</style>