<template>
  <div>
    <!-- 头部的绿色部分 -->
    <div class="box4 displayF justify-contentE">
      <el-button type="danger" size="mini ">查看</el-button>
      <el-button type="primary" size="mini" class="box">发布</el-button>
    </div>
    <!-- 中间填写部分 -->
    <div>
      <!-- 绑定rules -->
      <el-form
        ref="ruleForm"
        label-width="80px"
        :rules="rules"
        :model="ruleForm"
      >
        <!-- 文章标题框 -->
        <el-form-item label="文章标题" required class="box1" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!-- 文章摘要框 -->
        <el-form-item label="文章摘要" required prop="abstract">
          <el-input v-model="ruleForm.abstract"></el-input>
        </el-form-item>
        <!-- 并排五个框 -->
        <div class="box3 displayF">
          <!-- 作者框 -->
          <el-form-item label="作者" required prop="author">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <!-- 类目框 -->
          <el-form-item label="类目" required prop="category">
            <el-select placeholder="请选择" v-model="ruleForm.category">
              <el-option label="Vue" value="Vue"></el-option>
              <el-option label="React" value="React"></el-option>
              <el-option label="Node.js" value="Node.js"></el-option>
              <el-option label="性能优化" value="性能优化"></el-option>
              <el-option label="JavaScript" value="JavaScript"></el-option>
              <el-option label="小程序" value="小程序"></el-option>
              <el-option label="工具类" value="工具类"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <!-- 来源框 -->
          <el-form-item label="来源" required prop="source">
            <el-select placeholder="请选择" v-model="ruleForm.source">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="与他人合作" value="与他人合作"></el-option>
            </el-select>
          </el-form-item>
          <!-- 重要性框 -->
          <el-form-item label="重要性" required prop="star">
            <el-select placeholder="请选择" v-model="ruleForm.star">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <!-- 时间框 -->
          <el-form-item label="活动时间" prop="date">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="ruleForm.date"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <!-- 文章内容 -->
        <mavon-editor v-model.trim="ruleForm.text" />
      </el-form>
    </div>
    <!-- 发布按钮 -->
    <div class="add displayF justify-contentC">
      <el-button type="primary" @click="add">发布</el-button>
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
      // 规则的内容的种类
      ruleForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        date: "",
        text: "",
      },
      // 各个种类的规则
      rules: {
        tilte: [
          {
            required: true,
            message: "文章标题不能为空",
            trigger: "blur",
          },
        ],
        abstract: [
          {
            required: true,
            message: "文章摘要不能为空",
            trigger: "blur",
          },
        ],
        author: [
          {
            required: true,
            message: "作者名字不能为空",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "请选择类目",
            trigger: "change",
          },
        ],
        source: [
          {
            required: true,
            message: "请选择来源",
            trigger: "change",
          },
        ],
        star: [
          {
            required: true,
            message: "请选择重要性级别",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    // 发布按钮的点击事件
    add() {
      // 判定是否全部满足
      this.$refs.ruleForm.validate((valid) => {
        // 判定文章不能为空
        if (this.text === "") {
          this.$message.error("文章内容不能为空");
        }
        // 成功则进行请求发送
        if (valid) {
          // 发送请求
          axios
            .post("/api/article/create", {
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              text: this.ruleForm.text,
              date: this.ruleForm.date,
            })
            .then((res) => {
              // 发送成功则跳到主页面
              if (res.data.code===200) {
                this.$message.success("发布成功");
                this.$router.push("/");
              }else {
                // 其余情况
                this.$message.error('发布失败')
              }
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else {
          // 判定为满足
          this.$message.error("表单填写有误,请检查");
          return;
        }
      });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box4 {
  background: #59a586;
  padding: 5px 0;
  .box {
    margin-right: 20px;
  }
}
.box1 {
  margin-top: 20px;
}
.add {
  margin-top: 10px;
}
</style>