<template>
  <div>
    <top></top>
    <second></second>
    <div class="middle displayF justify-contentB">
      <third></third>
      <fourth></fourth>
      <fifth></fifth>
    </div>
    <div class="foot displayF justify-contentB">
      <sixth></sixth>
      <seventh></seventh>
    </div>
    <eighth></eighth>
  </div>
</template>

<script>
import Second from "../components/second/Second.vue";
import top from "../components/top/Top";
import third from "../components/third/Third";
import Fourth from '../components/fourth/Fourth.vue';
import Fifth from '../components/fifth/Fifth.vue';
import Sixth from '../components/sixth/Sixth.vue';
import Seventh from '../components/seventh/Seventh.vue';
import Eighth from '../components/eighth/Eighth.vue';
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    top,
    Second,
    third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Eighth,
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.middle {
  margin-top: 20px;
}
.foot {
  margin-top: 20px;
}
</style>
