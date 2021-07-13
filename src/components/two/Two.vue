<template>
  <div>
    <div class="pie1">
      <div id="pietwo" :style="{ width: '400px', height: '400px' }"></div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "",
  props: {},
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "center",
          top: "10%",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          // console.log(res.data.data);
          let arr = lodash.groupBy(res.data.data, "source");
          // console.log(arr);
          for (let i in arr) {
            this.option.series[0].data.push({ value: arr[i].length, name: i });
          }
          let chartDom3 = document.getElementById("pietwo");
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
</style>