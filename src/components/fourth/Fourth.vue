<template>
  <div>
    <div class="box">
      <div id="myChart2" :style="{ width: '400px', height: '400px' }"></div>
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
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "5%",
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [20, 140],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: [
              { value: "", name: "" },
              { value: "", name: "" },
              { value: "", name: "" },
              { value: "", name: "" },
              { value: "", name: "" },
            ],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    // 发送请求   饼图的请求
    getData() {
      axios
        .get("/api/ringChat")
        .then((res) => {
          // console.log(res.data.data);
          this.list = res.data.data;
          // 拿到所有的name
          let arr = this.list.map((item) => {
            return item.name;
          });
          // console.log(arr);
          // 拿到所有的data
          let arr1 = this.list.map((item) => {
            return item.data;
          });
          // console.log(arr1);
          // 系列1赋值
          this.option.series[0].data[0].value = arr1[0];
          this.option.series[0].data[0].name = arr[0];
          // 系列2赋值
          this.option.series[0].data[1].value = arr1[1];
          this.option.series[0].data[1].name = arr[1];
          // 系列3赋值
          this.option.series[0].data[2].value = arr1[2];
          this.option.series[0].data[2].name = arr[2];
          // 系列4赋值
          this.option.series[0].data[3].value = arr1[3];
          this.option.series[0].data[3].name = arr[3];
          // 系列5赋值
          this.option.series[0].data[4].value = arr1[4];
          this.option.series[0].data[4].name = arr[4];

          let chartDom2 = document.getElementById("myChart2");
          let myChart2 = echarts.init(chartDom2);
          myChart2.setOption(this.option);
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
  width: 400px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>