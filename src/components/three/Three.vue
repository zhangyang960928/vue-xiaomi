<template>
  <div>
    <div class="pie2">
      <div id="piethree" :style="{ width: '1279px', height: '400px' }"></div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import axios from "axios";
import * as echarts from "echarts";
import dayjs from 'dayjs'
export default {
  name: "",
  props: {},
  data() {
    return {
      option: {
        title: {
          subtext: "数量",
          // sublink: "http://e.weibo.com/1341556070/AjQH99che",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)",
            },
            emphasis: {
              itemStyle: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: [], //空白条数据
          },
          {
            name: "个数",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [], //显示数据
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
          console.log(res.data.data);
          // 拿到所有时间及对应的条数
          let arr = lodash.groupBy(res.data.data, "date");
          // let 一个总和
          let total=0
          // console.log(arr);
          // 循环时间对象
          for (let i in arr) {
            if (i.includes('Z')){
              let arr1=dayjs(i).format("YYYY年MM月DD日")
              // 把每个时间添加到X轴
              this.option.xAxis.data.push(arr1)
            }else{
              // 增加空白的时间
              this.option.xAxis.data.push('')
            }
            // 给对应的每个时间加上它自身的条数
            this.option.series[1].data.push(arr[i].length)
            // 总和
            total += arr[i].length

          }
          // 在X轴最前面添加总和这个元素
          this.option.xAxis.data.unshift('总和')
          // 将总数赋给中间变量
          let num=total
          // 循环每个时间对应的数
          this.option.series[1].data.map(item=>{
            // 用总数减去每个时间对应的数  就是空白对应的数
            this.option.series[0].data.push(num-item)
            // 每次循环总数变化  重新赋值
            num=num-item
          })
          // 给总数添加空白部分  空白部分就是0
          this.option.series[0].data.unshift(0)
          // 给x轴总数加上计算的总和
          this.option.series[1].data.unshift(total)


          let chartDom3 = document.getElementById("piethree");
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