<template>
  <div></div>
</template>
<script>
import $ from "jquery";
import { pub } from "../assets/js/pub.js";
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  watch: {
    $route(to, from) {
      //监听路由是否变化
      const that = this;
      if (to.query.c_id != from.query.c_id) {
        // 执行事件
      }
    }
  },
  mounted() {},
  created() {},
  methods: {}
};
</script>
<style scoped>
</style>

