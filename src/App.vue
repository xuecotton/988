<template>
  <div id="app" v-cloak>
    <div id="page_nav">
      <div class="top_img">
        <img :src="logo.data_img" alt />
      </div>
      <div class="nav_b">
        <div class="main_nav">
          <ul class="top_nav">
            <li v-for="item in main_arr" class="drop_drow" :key="item.navigation_id">
              <a class="drop_a" @click="GoNav(item)">{{item.navigation_name}}</a>
              <div class="flex_col drop_list">
                <a
                  class="drop_list_a"
                  v-for="c_item in item.children"
                  :key="c_item.navigation_id"
                  @click="GoNav(c_item)"
                >{{c_item.navigation_name}}</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="nav_bot_img">
        <img
          v-for="item in theme_one"
          :src="item.event_img"
          :key="item.target_id1"
          alt
          @click="GoThemeOne(item)"
        />
      </div>
      <div class="two_nav">
        <ul class="teo_nav_con">
          <li class="hover" v-for="item in nav_center" :key="item.navigation_id">
            <a @click="GoNav(item)" class="s_q">
              <img :src="item.navigation_img" alt />
              <span class="s_t">{{item.navigation_name}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div id="page_middle">
      <router-view />
    </div>
    <!-- <p @click="text" >aljdh </p> -->
    <div id="page_foot">
      <footer>
        <div class="footer">
          <span class="copyright">{{copy.data_remark}}</span>
        </div>
        <div class="link">
          <div class="link_l">
            <p>{{ft1.data_remark}}</p>
            <h1>{{ft2.data_remark}}</h1>
            <p>
              <span>{{ft3.data_remark}}</span>
            </p>
            <p>
              <span>{{ft4.data_remark}}</span>
            </p>
            <p>
              <span>{{ft5.data_remark}}</span>
            </p>
            <p>
              <span>{{ft6.data_remark}}</span>
            </p>
          </div>
          <div class="link_r">
            <div class="link_c" v-for="item in link_bar" :key="item.navigation_id">
              <div class="link_title">{{item.navigation_name}}</div>
              <ul>
                <li v-for="a_item in item.children" :key="a_item.navigation_id">
                  <a :href="a_item.target_id1">{{a_item.navigation_name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { pub } from "./assets/js/pub.js";
export default {
  data() {
    return {
      main_arr: [], // 顶部导航
      logo: {}, // 顶部logo
      theme_one: [], // 页面顶部的第一个导航
      ft1: {}, // 底部左侧边
      ft2: {},
      ft3: {},
      ft4: {},
      ft5: {},
      ft6: {}, // 底部左侧边
      link_bar: [], // 底部右边侧边
      copy: {}, //版权
      nav_center: [] // 顶部的4个
    };
  },
  components: {},
  mounted() {},
  created() {
    /**
     * 获取头部和底部信息
     * 点击导航
     *      内部链接
     *          走内部链接的函数 每一个链接分别对应不同的页面
     *      外部链接
     *          直接跳转页面
     *      栏目
     *          走栏目的函数   根据不同的样式跳转不同页面
     *      文章事件
     *          直接走文章详情
     */
    const that = this;
    that.GoInfo();
  },
  methods: {
    GoInfo() {
      const that = this;
      var op_data_Header = {
        that: that,
        _url: pub_link,
        ur: pub._DetailApi.api_getHeader, // 具体接口
        cbk: that.cb_api_getHeader, // 回调
        data: {
          terminal_id: "1"
        } // 形参
      };
      pub._InitAjax(op_data_Header);
      var op_data = {
        that: that,
        _url: pub_link,
        ur: pub._DetailApi.api_getFooter, // 具体接口
        cbk: that.cb_api_getFooter, // 回调
        data: {} // 形参
      };
      pub._InitAjax(op_data);
      // var op_data1 = {
      //   that: that,
      //   _url: pub_link,
      //   ur: pub._DetailApi.web_homapage_getHomepage, // 具体接口
      //   cbk: that.cb_web_homapage_getHomepage, // 回调
      //   data: {
      //     terminal_id: "1"
      //   } // 形参
      // };
      // pub._InitAjax(op_data1);
    },
    cb_api_getHeader(res) {
      // console.log("顶部信息", res);
      const that = this;
      if (res.stateCode == "200" || res.code == "0") {
        that.log = {};
        for (let n in res.data.logo) {
          that.logo[n] = res.data.logo[n];
        }
        that.main_arr = [];
        for (let i in res.data.main_navigation.children) {
          that.main_arr.push(res.data.main_navigation.children[i]);
        }
        that.theme_one = [];
        for (let m in res.data.pc_theme_one.children) {
          that.theme_one.push(res.data.pc_theme_one.children[m]);
        }
        that.nav_center = [];
        for (let nc in res.data.pc_nav_center.children) {
          that.nav_center.push(res.data.pc_nav_center.children[nc]);
        }
        that.nav_center.length = 4;
      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: "info",
          duration: 2000
        });
      }
    },
    cb_api_getFooter(res) {
      // console.log("底部信息", res);
      const that = this;
      if (res.stateCode == "200" || res.code == "0") {
        if (res.data.ft1) {
          that.ft1 = res.data.ft1;
        }
        if (res.data.ft2) {
          that.ft2 = res.data.ft2;
        }
        if (res.data.ft3) {
          that.ft3 = res.data.ft3;
        }
        if (res.data.ft4) {
          that.ft4 = res.data.ft4;
        }
        if (res.data.ft5) {
          that.ft5 = res.data.ft5;
        }
        if (res.data.ft6) {
          that.ft6 = res.data.ft6;
        }
        if (res.data.copyright) {
          that.copy = res.data.copyright;
        }
        if (res.data.link_bar) {
          that.link_bar = res.data.link_bar.children;
        }
      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: "info",
          duration: 2000
        });
      }
    },
    cb_web_homapage_getHomepage(res) {
      // console.log("首页全部数据", res);
    },
    GoNav(item) {
      const that = this;
      switch (item.target_type) {
        case "target_internal_link":
          that.Go_target_internal_link(item);
          break;
        case "target_article":
          that.$router.push({
            path: "/article",
            name: "article",
            query: {
              c_id: item.target_id1, // 栏目
              a_id: item.target_id2 // 文章
            }
          });
          break;
        case "target_url":
          window.location.href = item.target_id1;
          break;
        case "target_column":
          that.GoStyleId(item);
          break;
      }
    },
    // 内部链接
    Go_target_internal_link(item) {
      const that = this;
      switch (item.target_id1) {
        case "0":
          LinkIndexGo();
          break;
        case "1":
          that.$router.push({
            path: "/search",
            name: "search"
          });
          break;
        case "2":
          that.$router.push({
            path: "/Mailbox",
            name: "Mailbox"
          });
          break;
        case "3":
          that.$router.push({
            path: "/satisfied",
            name: "satisfied"
          });
          break;
      }
    },
    // 通过style_id 跳转页面
    GoStyleId(item) {
      const that = this;
      console.log(item);
      switch (item.style_id) {
        case "02": // 网站导航
          that.$router.push({
            path: "/alldist",
            name: "alldist",
            query: {
              c_id: item.target_id1 // 栏目
            }
          });
          break;
        default:
          that.$router.push({
            path: "/sum",
            name: "sum",
            query: {
              column_id: item.target_id1,
              style_id: item.style_id,
              fg: "1",
              article_id: ""
            }
          });
          break;
      }
    },
    // 主题一
    GoThemeOne(item) {
      const that = this;
      if (item.target_type == "target_column") {
        that.$router.push({
          path: "/themeone",
          name: "themeone",
          query: {
            c_id: item.target_id1
          }
        });
      }
    },
    cb_module_column_find(res) {
      const that = this;
      if (res.stateCode == "200" || res.code == "0") {
        that.GoStyleId(res.data);
      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: "info",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import url("./assets/css/reset.css");

.page .el-pager li.active {
  color: #009255 !important;
}

.page .el-pagination.is-background .el-pager li:not(.disabled).active {
  color: white !important;
  background-color: #009255 !important;
}

.page .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  color: white !important;
  background-color: #009255 !important;
}
a {
  cursor: pointer;
}
// 头部
.top_img {
  width: 1200px;
  margin: 0 auto;
  height: 120px;
  overflow: hidden;
}

.top_img img {
  width: 100%;
}

.main_nav {
  width: 1200px;
  background-color: #009255;
  margin: 0 auto;
}

.two_nav {
  width: 1200px;
  margin: 0 auto;
}

.main_nav,
.two_nav {
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00690d', endColorstr='#75b348', GradientType=0);
  font-size: 16px;
  color: #242424;
}

:root .main_nav {
  filter: none;
}

.top_nav {
  display: flex;
  /* padding: 0 15px; */
  flex-wrap: wrap;
  justify-content: space-between;
}

.top_nav li {
  text-align: center;
}

:root top_nav li {
  filter: none;
}

.top_nav li .drop_a {
  display: inline-block;
  color: #fff;
  padding: 10px 14px;
}

.top_nav li a:hover {
  color: #fff;
  background-color: #005329;
}

.active {
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#afe454', endColorstr='#328c08 ', GradientType=0);
}

// 下拉框
.drop_drow {
  position: relative;
}
.drop_list {
  /*height: 0;*/
  transition: 0.5s;
  position: absolute;
  top: 37px;
  left: 0;
  overflow: hidden;
  background-color: #009255;
  width: 100%;
  z-index: 88;
  display: none;
}

.drop_drow:hover .drop_list {
  /*height: auto;*/
  display: block;
}

.drop_list_a {
  display: block;
  padding: 10px 0;
  font-size: 14px;
  color: white;
}
.top_nav .active a {
  color: #fff;
  background-color: #077145;
}

.nav_bot_img {
  width: 1200px;
  height: 84px;
  margin: 0 auto;
  overflow: hidden;
}

.nav_bot_img img {
  width: 100%;
  height: 84px;
}

.teo_nav_con {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
  padding: 15px 0px;
}

.teo_nav_con a {
  color: #242424;
  display: inline-block;
  text-align: center;
  width: 260px;
  height: 40px;
}

.teo_nav_con a:hover {
  color: #67996d;
}

.top_con {
  display: flex;
  justify-content: flex-start;
  border: 1px solid #f6f6f6;
}

.s_q {
  position: relative;
  color: #fff;
  font-weight: bold;
}

.s_q img {
  width: 100%;
  height: 40px;
}

.s_i .s_t {
  margin-left: -160px;
}

.s_t {
  position: absolute;
  top: 6px;
  left: 0;
  color: #005329;
  width: 100%;
  height: 100%;
}

.one {
  width: 380px;
  overflow: hidden;
  padding: 10px 10px 0;
  border-right: 1px solid #f6f6f6;
}

.one:last-child {
  border-right: none;
}

// 页底
footer {
  color: #616161;
  width: 100%;
}

.footer {
  margin: 0 auto;
  background: #009255;
  width: 100%;
  min-width: 960px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
}

.copyright {
  color: #fff;
  padding-right: 2px;
  font-weight: 300;
}

/* 链接 */
.link {
  display: flex;
  justify-content: center;
  width: 1200px;
  margin: 48px auto;
  color: #888;
}

.link_l {
  width: calc(36% - 107px);
  text-align: right;
  padding-right: 50px;
  border-right: 7px solid #ddd;
  font-size: 16px;
  margin-right: 50px;
}

.link_l h1 {
  font-size: 36px;
  padding: 10px 0;
  color: #009255;
}

.link_l p {
  height: 36px;
  line-height: 36px;
  font-weight: 300;
}

.link_r {
  width: 64%;
  font-size: 14px;
  font-weight: 300;
}

.link_r .link_title {
  width: 70px;
  font-size: 16px;
  color: #009255;
}

.link_c {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.link_c ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: calc(100% - 70px);
}

.link_c li a {
  display: inline-block;
  color: #888;
  margin-bottom: 10px;
  padding: 0 15px;
}

.link_c li a:hover {
  color: #009255;
}
// 页面的全屏问题
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Source Han Serif SC", "Source Han Serif", "source-han-serif-sc",
    "PT Serif", "SongTi SC", "MicroSoft Yahei", Source Han Sans SC,
    Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}
#page_middle {
  flex: 1;
}
#page_foot {
  flex: 0;
}
[v-cloak] {
  display: none !important;
}
</style>
