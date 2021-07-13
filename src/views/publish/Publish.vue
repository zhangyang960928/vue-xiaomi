<template>
  <div>
    <div>
      <!-- 没一个数据分布在不同的表格 -->
      <el-table :data="list" border style="width: 100%">
        <!-- index   自动排序 -->
        <el-table-column fixed type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300" align="center">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类目"
          width="100"
          align="center"
        >
          <!-- 判断类目的形式   附加上不同的标签 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.category === '其他'">{{
              scope.row.category
            }}</el-tag>
            <el-tag
              type="success"
              v-else-if="
                scope.row.category === 'Vue' || scope.row.category === 'Node.js'
              "
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              type="info"
              v-else-if="
                scope.row.category === 'React' ||
                scope.row.category === '性能优化'
              "
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              type="warning"
              v-else-if="
                scope.row.category === 'JavaScript' ||
                scope.row.category === '小程序'
              "
              >{{ scope.row.category }}</el-tag
            >
            <el-tag type="danger" v-else-if="scope.row.category === '工具类'">{{
              scope.row.category
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源" width="80" align="center">
        </el-table-column>
        <el-table-column prop="star" label="重要性" width="180" align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.starNum" disabled> </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="188" align="center">
          <!-- 转换时间  定义一个方法 -->
          <template slot-scope="scope">
            {{ time(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row._id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)"
              >删除</el-button
            >
            <el-button
              type="success"
              size="mini"
              @click="handleWatch(scope.row._id)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      currentPage: 1,
      pagesize: 10,
    };
  },
  components: {},
  methods: {
    // 发送请求  获取所有文章的路径
    getData() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            console.log(res.data.data);
            // 将数据赋值给定义的新数组
            this.list = res.data.data;
            this.list.map((item) => {
              // 循环给每个元素增加新属性   重要性需转换数字类型
              return this.$set(item, "starNum", Number(item.star));
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击编辑  将文章的id传给编辑页面
    handleEdit(val) {
      this.$router.push({
        path: "/Edit",
        query: {
          id: val,
        },
      });
    },
    // 点击查看   将文章的id传给编辑页面
    handleWatch(val1) {
      this.$router.push({
        path: "/See",
        query: {
          id1: val1,
        },
      });
    },
    // 点击删除
    handleDelete(id) {
      // 发送请求   删除文章的路径
      axios
        .post("/api/article/delete", {
          _id: id,
        })
        .then((res) => {
          // 请求成功  重新调用请求拿到全部文章的方法
          this.getData();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 当前条数
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 定义的转换时间的方法   用dayjs转换
    time(row) {
      if (row === "") {
        return row;
      } else {
        return dayjs(row).format("YYYY年MM月DD日HH时mm分ss秒");
      }
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
.block {
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>