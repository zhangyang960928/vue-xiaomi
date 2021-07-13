<template>
  <div>
    <div class="bgcolor">
      <el-container>
        <!-- 头部部分 -->
        <el-header class="head displayF justify-contentB align-itemsC">
          <!-- 头部左边部分 -->
          <div class="uname">欢迎{{ username }}来到小爱后台管理系统</div>
          <!-- 头部右边部分 -->
          <div class="ontime">
            {{timeslot}}，亲爱的{{ username }} 上次登录时间:{{ ontime }}
          </div>
        </el-header>
        <!-- 侧边导航栏 -->
        <el-container>
          <el-aside width="200px">
            <div>
              <el-col :span="12">
                <el-menu
                  :default-active="$route.meta.index"
                  class="el-menu-vertical-demo"
                  background-color="#344055"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  router
                >
                  <el-menu-item index="/">
                    <i class="el-icon-location"></i>
                    <span slot="title">首页</span>
                  </el-menu-item>
                  <el-menu-item index="/Publish">
                    <i class="el-icon-menu"></i>
                    <span slot="title">已发布</span>
                  </el-menu-item>
                  <el-menu-item index="/Census">
                    <i class="el-icon-menu"></i>
                    <span slot="title">统计</span>
                  </el-menu-item>
                  <el-menu-item index="/Article">
                    <i class="el-icon-check"></i>
                    <span slot="title">发表文章</span>
                  </el-menu-item>
                  <el-menu-item index="/Tag">
                    <i class="el-icon-setting"></i>
                    <span slot="title">标签页</span>
                  </el-menu-item>
                  <el-menu-item index="/Derive">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导出excel</span>
                  </el-menu-item>
                  <el-menu-item index="/Servlet">
                    <i class="el-icon-setting"></i>
                    <span slot="title">图片上传</span>
                  </el-menu-item>
                  <el-menu-item index="/Signout">
                    <i class="el-icon-delete"></i>
                    <span slot="title">退出系统</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </div>
          </el-aside>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 定义中间变量
      username: "",
      ontime: "",
      timeslot:''
    };
  },
  components: {},
  methods: {},
  mounted() {
    // 获取储存的账户密码
    let uname = localStorage.getItem("vue-name");
    // console.log(uname);
    // 判断是否为空
    if (uname !== null) {
      uname = JSON.parse(uname);
      this.username = uname.username;
      this.ontime = dayjs(uname.date).format("YYYY年MM月DD日HH时mm分ss秒");
    }
    // 获取当前小时
    let hour=dayjs().format('HH')
    // console.log(hour);
    // 判断时间
    if(hour<=12||hour>=6) {
      this.timeslot='早上好'
    }else if(hour>12||hour<=14) {
      this.timeslot='中午好'
    }else if(hour>14||hour<=18) {
      this.timeslot='下午好'
    }else if(hour>18||hour<=24) {
      this.timeslot='晚上好'
    }else if(hour>0||hour<6) {
      this.timeslot='该睡觉了'
    }
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  background: #2e5e85;
}
.uname {
  color: white;
  font-size: 18px;
}
.ontime {
  color: white;
  font-size: 14px;
}
.el-menu-item {
  width: 200px;
}
.bgcolor {
  background: #f0f2f5;
}
</style>