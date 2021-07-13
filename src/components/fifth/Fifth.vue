<template>
  <div>
    <div class="box">
      <div id="myChart3" :style="{ width: '400px', height: '400px' }"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      list1: [],
      list2: [],
      list3: [],
      // 折线图设置
      option: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [],
          top: "5%",
        },
        xAxis: {
          type: "category",
          data: "",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "",
            data: [],
            type: "bar",
            smooth: true,
          },
          {
            name: "",
            data: [],
            type: "bar",
            smooth: true,
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    // 发送请求  折线图请求
    getData() {
      axios
        .get("/api/homeChat")
        .then((res) => {
          // console.log(res);
          this.list = res.data.data;
          // console.log(this.list);
          // 赋值给X轴数据  提出date时间
          this.list1 = this.list.map((item) => {
            return item.date;
          });
          this.option.xAxis.data = this.list1;
          // 赋值给系列中的第一个线   expected的所有值单独拿出来制作一个数组
          this.list2 = this.list.map((item) => {
            return item.expected;
          });
          this.option.series[0].data = this.list2;
          // 赋值给系列中的第二个线   actual的所有值单独拿出来制作一个数组
          this.list3 = this.list.map((item) => {
            return item.actual;
          });
          this.option.series[1].data = this.list3;
          // 拿单独一个数据
          let arr = this.list[0];
          // 获取数组值对应的键   组成新的数组
          let arr1 = Object.keys(arr);
          // console.log(arr);
          // console.log(arr1);
          // 删除其中的时间对应的值
          arr1.splice(0, 1);
          // 将剩余的赋值给系列名总和的数组
          this.option.legend.data = arr1;
          // console.log(this.option.legend.date);
          // 将对应的系列名赋值给对应系列的name
          this.option.series[0].name = arr1[0];
          // console.log(this.option.series[0].name);
          this.option.series[1].name = arr1[1];
          // console.log(this.option);
          // console.log(this.option.series[1].name);
          // this.legend.date.push(this.option.series[0].name)
          // this.legend.date.push(this.option.series[1].name)
          let chartDom3 = document.getElementById("myChart3");
          let myChart3 = echarts.init(chartDom3);
          myChart3.setOption(this.option);
        })
        .catch((err) => {
          console.log("请求失败", err);
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
.box {
  background: white;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>