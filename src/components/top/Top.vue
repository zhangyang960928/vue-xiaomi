<template>
  <div>
    <!-- 第一个盒子 -->
    <div class="top displayF justify-contentB">
      <div class="topOne displayF align-itemsC">
        <i class="iconfont icon-lianxirenqunkehu"></i>
        <div class="one displayF flex-directionC justify-contentC align-itemsC">
          <div class="two">New Visits</div>
          <div class="three">
            <countTo
              :startVal="startVal"
              :endVal="list.visits"
              :duration="3000"
            ></countTo>
          </div>
        </div>
      </div>
      <!-- 第二个盒子 -->
      <div class="topOne displayF align-itemsC">
        <i class="iconfont icon-xiaoxi"></i>
        <div class="one displayF flex-directionC justify-contentC align-itemsC">
          <div class="two">Messages</div>
          <div class="three">
            <countTo
              :startVal="startVal"
              :endVal="list.messages"
              :duration="3000"
            ></countTo>
          </div>
        </div>
      </div>
      <!-- 第三个盒子 -->
      <div class="topOne displayF align-itemsC">
        <i class="iconfont icon-qian-copy"></i>
        <div class="one displayF flex-directionC justify-contentC align-itemsC">
          <div class="two">Purchases</div>
          <div class="three">
            <countTo
              :startVal="startVal"
              :endVal="list.purchases"
              :duration="3000"
            ></countTo>
          </div>
        </div>
      </div>
      <!-- 第四个盒子 -->
      <div class="topOne displayF align-itemsC">
        <i class="iconfont icon-gouwuchekong"></i>
        <div class="one displayF flex-directionC justify-contentC align-itemsC">
          <div class="two">Shoppings</div>
          <div class="three">
            <countTo
              :startVal="startVal"
              :endVal="list.shopping"
              :duration="3000"
            ></countTo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      startVal: 0,
    };
  },
  components: {
    countTo,
  },
  methods: {
    // 发请求    计数器的路径
    getData() {
      axios
        .get("/api/homeData")
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          // console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
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
.top {
  padding: 20px 0;
  .topOne {
    width: 315px;
    height: 80px;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  .icon-lianxirenqunkehu {
    color: #44c8c5;
    font-size: 50px;
    margin-left: 30px;
  }
  .icon-xiaoxi {
    color: #3ba2f4;
    font-size: 50px;
    margin-left: 30px;
  }
  .icon-qian-copy {
    color: #f25972;
    font-size: 60px;
    margin-left: 30px;
  }
  .icon-gouwuchekong {
    color: #feba85;
    font-size: 50px;
    margin-left: 30px;
  }
}
.one {
  margin-left: 120px;
}
.two {
  color: gray;
  font-size: 14px;
  margin-bottom: 5px;
}
.three {
  color: #676666;
}
</style>