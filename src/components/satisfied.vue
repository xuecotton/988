<template>
  <div>
    <div class="evale">
      <div class="l_con">
        <div class="scan">
          <h2>扫码测评</h2>
          <div class="scan_img">
            <img src="../assets/img/scan_img.png" alt />
          </div>
          <div class="explain">
            <div class="img">
              <img src="../assets/img/scan.png" alt />
            </div>
            <div class="txt">请使用微信扫一扫扫描二维码测评</div>
          </div>
        </div>
        <div class="scan_e">
          <div class="scan_p">
            <img src="../assets/img/scan_2.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { pub } from '../assets/js/pub.js'
export default {
  name: 'satisfied',
  data () {
    return {}
  },
  components: {},
  watch: {
    $route (to, from) {
      // 监听路由是否变化
      const that = this
      if (to.query.c_id != from.query.c_id) {
        // 执行事件
      }
    }
  },
  mounted () {},
  created () {},
  methods: {}
}
</script>
<style scoped>
.evale {
  width: 1200px;
  margin: 20px auto 60px;
}
.l_con {
  width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.scan {
  text-align: center;
  width: 50%;
  border-right: 1px solid #f5f5f5;
}
.scan h2 {
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 20px;
}
.scan .scan_img {
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 0 auto;
  border: 1px solid #f5f5f5;
}
.scan .scan_img img {
  width: 100%;
}
.scan .explain {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 12px;
}
.scan .explain .img {
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.scan .explain .img img {
  width: 100%;
}
.scan .explain .txt {
  width: 96px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
}
.scan_e {
  width: 50%;
}
.scan_e .scan_p {
  width: 264px;
  margin: 0 auto;
  overflow: hidden;
}
.scan_e .scan_p img {
  width: 100%;
}
</style>
