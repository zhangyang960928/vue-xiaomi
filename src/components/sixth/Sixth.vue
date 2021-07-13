<template>
  <div>
    <div class="six">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="num" label="Order_No" width="450" align="center">
        </el-table-column>
        <el-table-column prop="price" label="price" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="status"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="danger" v-if="(scope.row.status === 0)">pending</el-tag>
            <el-tag type="success" v-if="(scope.row.status === 1)">success</el-tag>
          </template>
        </el-table-column>
      </el-table>
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
      list: [],
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/orderData")
        .then((res) => {
          // console.log(res.data.data);
          this.list = res.data.data;
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
.six {
  padding: 10px;
  background: white;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>