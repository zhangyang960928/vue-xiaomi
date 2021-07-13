<template>
  <div>
    <div class="box">
      <div id="myChart1" :style="{ width: '400px', height: '400px' }"></div>
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
      option: {
        legend: {
          data: [],
          top: "5%",
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { text: "" },
            { text: "" },
            { text: "" },
            { text: "" },
            { text: "" },
          ],
          center: ["50%", "50%"],
          radius: 130,
          startAngle: 90,
          splitNumber: 4,
          shape: "circle",
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [],
                name: "",
              },
              {
                value: [],
                name: "",
              },
              {
                value: [],
                name: "",
              },
            ],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/radarChat")
        .then((res) => {
          // console.log(res.data.data);
          this.list = res.data.data;
          // 循环数组  拿到所有的名字
          this.list1 = this.list.map((item) => {
            return item.name;
          });
          // 赋值给所有的名字的总和
          // console.log(this.list1);
          this.option.legend.data = this.list1;
          // console.log(this.option.legend.data);

          // 给系列1的name赋值
          this.option.series[0].data[0].name = this.list1[0];
          // console.log(this.option.series[0].data[0].name);
          // 给系列2的name赋值
          this.option.series[0].data[1].name = this.list1[1];
          // console.log(this.option.series[0].data[1].name);
          // 给系列3的name赋值
          this.option.series[0].data[2].name = this.list1[2];
          // console.log(this.option.series[0].data[2].name);

          // 给系列1的value赋值 将单个对象转换成数组
          let arr=Object.values(this.list[0])
          // console.log(this.list[0]);
          // console.log(arr);
          arr.splice(0,1)
          // console.log(arr);
          this.option.series[0].data[0].value=arr
          // 给系列2的value赋值 将单个对象转换成数组
          let arr1=Object.values(this.list[1])
          // console.log(arr1);
          arr1.splice(0,1)
          // console.log(arr1);
          this.option.series[0].data[1].value=arr1
          // 给系列3的value赋值 将单个对象转换成数组
          let arr2=Object.values(this.list[2])
          // console.log(arr2);
          arr2.splice(0,1)
          // console.log(arr2);
          this.option.series[0].data[2].value=arr2

          // 拿到单个对象的键取出来  删除头部的name 保留五个数字的名字
          let orr=Object.keys(this.list[0])
          // console.log(orr);
          orr.splice(0,1)
          // 赋值给五个角的名字
          this.option.radar.indicator[0].text=orr[0]
          this.option.radar.indicator[1].text=orr[1]
          this.option.radar.indicator[2].text=orr[2]
          this.option.radar.indicator[3].text=orr[3]
          this.option.radar.indicator[4].text=orr[4]


          let chartDom1 = document.getElementById("myChart1");
          let myChart1 = echarts.init(chartDom1);
          myChart1.setOption(this.option);
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




