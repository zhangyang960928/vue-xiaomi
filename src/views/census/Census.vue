<template>
  <div>
    <!-- 头部 -->
    <div class="census displayF">
      <div class="census1 displayF align-itemsC">
        <div
          class="census1A displayF flex-directionC justify-contentC align-itemsC"
        >
          <div>今日发布</div>
          <div>{{getTime()}}</div>
        </div>
        <i class="el-icon-check"></i>
      </div>
      <div class="census2 displayF align-itemsC">
        <div
          class="census1A displayF flex-directionC justify-contentC align-itemsC"
        >
          <div>原创文章</div>
          <div>{{ getCategory() }}</div>
        </div>
        <i class="el-icon-tickets"></i>
      </div>
      <div class="census3 displayF align-itemsC">
        <div
          class="census1A displayF flex-directionC justify-contentC align-itemsC"
        >
          <div>新留言</div>
          <div>0</div>
        </div>
        <i class="el-icon-bell"></i>
      </div>
      <div class="census4 displayF align-itemsC">
        <div
          class="census1A displayF flex-directionC justify-contentC align-itemsC"
        >
          <div>新消息</div>
          <div>0</div>
        </div>
        <i class="el-icon-phone-outline"></i>
      </div>
    </div>
    <!-- 统计中间部分 -->
    <div class="middle displayF">
      <one></one>
      <two></two>
    </div>
    <!-- 尾部 -->
    <div>
      <three></three>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import one from '../../components/one/One'
import two from '../../components/two/Two'
import three from '../../components/three/Three'
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
    };
  },
  components: {
    one,
    two,
    three,
  },
  methods: {
    getData() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          // console.log(res.data.data);
          this.list = res.data.data;
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    getCategory() {
      let arr = this.list.filter((item) => {
        return item.source === "原创";
      });
      return arr.length;
    },
    getTime() {
      let timer1=dayjs().format("YYYY年MM月DD日")
      // console.log(timer1);
      let arr1=this.list.filter(item =>{
        return dayjs(item.date).format("YYYY年MM月DD日")===timer1
      })
      return arr1.length;
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.census1 {
  width: 319.8px;
  background: #7ccabf;
  height: 50px;
}
.census2 {
  width: 319.8px;
  background: #e88a87;
  height: 50px;
}
.census3 {
  width: 319.8px;
  background: #8375a3;
  height: 50px;
}
.census4 {
  width: 319.8px;
  background: #9fcec1;
  height: 50px;
}
.census1A {
  margin-left: 130px;
  color: white;
  font-size: 12px;
}
.el-icon-check {
  color: white;
  margin-left: 80px;
}
.el-icon-tickets {
  color: white;
  margin-left: 80px;
}
.el-icon-bell {
  color: white;
  margin-left: 80px;
}
.el-icon-phone-outline {
  color: white;
  margin-left: 80px;
}
</style>