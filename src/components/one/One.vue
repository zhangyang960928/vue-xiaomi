<template>
  <div>
    <div class="pie">
      <div id="pieone" :style="{ width: '400px', height: '400px' }"></div>
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
          top: "10%"
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
          let arr=lodash.groupBy(res.data.data,'category')
          // console.log(arr);
          for (let i in arr) {
            this.option.series[0].data.push({value: arr[i].length , name: i })
          }
          let chartDom3 = document.getElementById("pieone");
          let myChart3 = echarts.init(chartDom3);
          myChart3.setOption(this.option);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getData()
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.pie {
  margin-left: 100px;
  margin-right: 250px;
}
</style>