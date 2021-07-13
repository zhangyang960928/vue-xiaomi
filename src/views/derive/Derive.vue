<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" :show-close="false">
      <div>名称：<el-input v-model="usename" /></div>
      <div>现价：<el-input v-model="originalPrice" /></div>
      <div>原价：<el-input v-model="presentPrice" /></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div>
      <el-input placeholder="请输入您想搜索的商品" v-model="search"></el-input>
    </div>
    <!-- 主体部分 -->
    <div>
      <el-table
        :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        style="width: 100%"
      >
        <el-table-column
          label="名称"
          width="255"
          prop="NAME"
          align="center"
        ></el-table-column>
        <el-table-column
          label="商品编号"
          width="255"
          prop="GOODS_SERIAL_NUMBER"
          align="center"
        ></el-table-column>
        <el-table-column
          label="原价"
          width="255"
          prop="ORI_PRICE"
          align="center"
        ></el-table-column>
        <el-table-column
          label="现价"
          width="255"
          prop="PRESENT_PRICE"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.row)"
            >
              修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
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
      <!-- 导出数据 -->
      <div class="displayF">
        <JsonExcel
          :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
          header="商品详情"
          name="商品详情.xls"
        >
          <el-button type="primary" class="excle">导出xls</el-button>
        </JsonExcel>
        <JsonExcel
          :data="list.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
          header="商品详情"
          name="商品详情.csv"
          type=csv
        >
          <el-button type="danger">导出csv</el-button>
        </JsonExcel>
        
      </div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import axios from "axios";
import JsonExcel from "vue-json-excel";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      list1: [],
      size: "",
      currentPage: 1,
      pagesize: 10,
      dialogVisible: false,
      usename: "",
      originalPrice: "",
      presentPrice: "",
      search: "",
    };
  },
  components: {
    // JsonExcel 进入一个组件的形式  必须在components里写上
    JsonExcel
  },
  methods: {
    // 请求数据
    getData() {
      axios
        .get("/api/tableData")
        .then((res) => {
          // console.log(res);
          // 给定义的两个都赋值数组
          this.list = res.data.data;
          this.list1 = res.data.data;
          // console.log(this.list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 点击编辑   赋值给输入框
    handleEdit(row) {
      // 弹出对话框
      this.dialogVisible = true;
      this.usename = row.NAME;
      this.originalPrice = row.ORI_PRICE;
      this.presentPrice = row.PRESENT_PRICE;
    },
    // 删除
    handleDelete(row) {
      this.list.splice(row, 1);
    },
    // 每页条数
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {
    // 监听输入框的值  用到多定义的数组
    search(val1, val2) {
      console.log(val1, val2);
      if (val1 !== "") {
        this.list = this.list.filter((item) => {
          return item.NAME.includes(val1);
        });
      } else {
        this.list = this.list1;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.el-input {
  width: 300px;
  margin-bottom: 20px;
}
.block {
  margin-top: 15px;
  margin-bottom: 20px;
}
.excle {
  margin-right: 30px;
}
</style>