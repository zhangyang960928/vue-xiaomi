<template>
  <div>
    <div class="eighth">
      <div class="eighthWord1 displayF justify-contentE align-itemsC">
        Todo List
      </div>
      <div class="eighthWord2">
        <div v-if="list.length === 0">暂无数据</div>
        <template v-else>
          <template v-if="activeIndex === 1">
            <div class="checkbox" v-for="(item, index) in list" :key="item.id">
              <div class="box displayF justify-contentB align-itemsC">
                <div>
                  <el-checkbox
                    class="el-checkbox__inner1"
                    :label="item.name"
                    v-model="item.checked"
                  ></el-checkbox>
                </div>
                <div class="remove" @click="remove(item, index)">X</div>
              </div>
            </div>
          </template>

          <template v-if="activeIndex === 2">
            <div
              class="checkbox"
              v-for="(item, index) in  this.list.filter((item) => {
                return item.checked === false;
              })"
              :key="item.id"
            >
              <div class="box displayF justify-contentB align-itemsC">
                <div>
                  <el-checkbox
                    class="el-checkbox__inner1"
                    :label="item.name"
                    v-model="item.checked"
                  ></el-checkbox>
                </div>
                <div class="remove" @click="remove(item, index)">X</div>
              </div>
            </div>
          </template>

          <template v-if="activeIndex === 3">
            <div
              class="checkbox"
              v-for="(item, index) in this.list.filter((item) => {
                return item.checked === true;
              })"
              :key="item.id"
            >
              <div class="box displayF justify-contentB align-itemsC">
                <div>
                  <el-checkbox
                    class="el-checkbox__inner1"
                    :label="item.name"
                    v-model="item.checked"
                  ></el-checkbox>
                </div>
                <div class="remove" @click="remove(item, index)">X</div>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="eighthWord3 displayF align-itemsC">
        <div class="endone">{{ sum.length }} items left</div>
        <div class="endtwo1 displayF justify-contentC align-itemsC">
          <div
            class="endtwo displayF justify-contentC align-itemsC"
            @click="all"
          >
            All
          </div>
        </div>
        <div class="endthree1 displayF justify-contentC align-itemsC">
          <div
            class="endthree displayF justify-contentC align-itemsC"
            @click="active"
          >
            Active
          </div>
        </div>
        <div class="endfour1 displayF justify-contentC align-itemsC">
          <div
            class="endfour displayF justify-contentC align-itemsC"
            @click="completed"
          >
            Completed
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [
        {
          name: "star this repository",
          checked: false,
          id: 1,
        },
        {
          name: "fork this repository",
          checked: false,
          id: 2,
        },
        {
          name: "follow author",
          checked: false,
          id: 3,
        },
        {
          name: "vue-admin",
          checked: false,
          id: 4,
        },
        {
          name: "vue",
          checked: false,
          id: 5,
        },
        {
          name: "element-ui",
          checked: false,
          id: 6,
        },
        {
          name: "axios",
          checked: true,
          id: 7,
        },
        {
          name: "webpack",
          checked: true,
          id: 8,
        },
      ],
      // 记录选值   1是一加载|all 2是未完成 3是已完成
      activeIndex: 1,
    };
  },
  components: {},
  methods: {
    // 删除
    remove(item, index) {
      this.list = this.list.filter((item1) => {
        return item1.name !== item.name;
      });
    },
    // 点击全部
    all() {
      // 将activeIndex 设置为1
      this.activeIndex = 1;
    },
    // 点击未完成
    active() {
      // 将activeIndex设置为2
      this.activeIndex = 2;
    },
    // 点击已完成
    completed() {
      // 将activeIndex设置为3
      this.activeIndex = 3;
    },
  },
  mounted() {},
  computed: {
    sum() {
      return this.list.filter((item) => {
        return item.checked === false;
      });
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.eighth {
  width: 400px;
  height: 400px;
  background: white;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 10px;
  .eighthWord1 {
    width: 380px;
    height: 30px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    margin-left: 10px;
  }
  .eighthWord2 {
    padding: 10px 20px;
    font-size: 14px;
  }
  .eighthWord3 {
    width: 380px;
    margin-left: 10px;
    height: 50px;
    border-top: 1px solid #eee;
    font-size: 14px;
    .endone {
      margin-left: 42px;
    }
    .endtwo1 {
      width: 43px;
      height: 23px;
      margin-left: 40px;
    }
    .endtwo {
      width: 40px;
      height: 20px;
      padding: 3px;
      &:hover {
        cursor: pointer;
        border: 1px solid #eee;
      }
    }
    .endthree1 {
      width: 53px;
      height: 23px;
      margin-left: 20px;
    }
    .endthree {
      width: 50px;
      height: 20px;
      padding: 3px;
      &:hover {
        cursor: pointer;
        border: 1px solid #eee;
      }
    }
    .endfour1 {
      width: 83px;
      height: 23px;
      margin-left: 20px;
    }
    .endfour {
      width: 80px;
      height: 20px;
      padding: 3px;
      &:hover {
        cursor: pointer;
        border: 1px solid #eee;
      }
    }
  }
}
.checkbox {
  padding: 8px;
  &:hover {
    background: #eee;
    .remove {
      display: block;
      cursor: pointer;
    }
  }
}
.remove {
  display: none;
}
</style>