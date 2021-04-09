<template>
  <div>
    <div class="head_titlt">
      <div class="last_head">
        <div class="crumb felx_d">
          <ul class="felx_d">
            <li>您的位置：</li>
            <li>
              <a href="#">
                <img src="../assets/img/home.png" alt class="home" /> 网站首页
              </a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
            <li v-show="fg == '1'">
              <a @click="GoBack()">{{c_obj.column_name}}</a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="main_content">
        <div class="con_list">
          <div class="c_con act_info">
            <div class="c_right act_con">
              <div class="content">
                <h2>{{art_obj.article_name}}</h2>
                <div class="time">
                  <span>{{art_obj.update_time}}</span>
                </div>
              </div>
              <div class="article" v-html="art_obj.ueditor_text"></div>
              <div class="length" v-show="fg == '1'">
                <div class="length_conn">
                  <ul class="pagination">
                    <li class="page_item">
                      <a @click="GoSimple(art_obj.PREV_ID)" class="page_link">
                        上一篇
                        <span class="down">:</span>
                        <span class="down">{{art_obj.PREV_NAME}}</span>
                      </a>
                    </li>
                    <li class="page_item">
                      <a @click="GoSimple(art_obj.NEXT_ID)" class="page_link pull_right">
                        下一篇
                        <span class="down">: {{art_obj.NEXT_NAME}}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { pub } from "../assets/js/pub.js";
let Base64 = require("js-base64").Base64;
export default {
  name: "",
  data() {
    return {
      a_id: "",
      fg: "", // 1 显示上下文 2 没有上下文
      art_obj: {},
      c_obj: {} // 栏目信息
    };
  },
  components: {},
  watch: {
    $route(to, from) {
      // 监听路由是否变化
      const that = this;
      if (to.query.a_id != from.query.a_id) {
        // 执行事件
        that.GoArticleInfo();
      }
    }
  },
  mounted() {},
  created() {
    const that = this;
    that.GoArticleInfo();
  },
  methods: {
    // 查询栏目信息
    GoColumn() {
      const that = this;
      var column = {
        that: that,
        _url: pub_link,
        ur: pub._DetailApi.module_columns_find, // 具体接口
        cbk: that.cb_module_columns_find, // 回调
        data: {
          column_id: that.c_id
        } // 形参
      };
      pub._InitAjax(column);
    },
    cb_module_columns_find(res) {
      const that = this;
      if (res.stateCode == "200" || res.code == "0") {
        that.c_obj = res.data;
      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: "info",
          duration: 2000
        });
      }
    },
    // 查询栏目详情
    GoArticleInfo() {
      const that = this;
      that.fg = that.$route.query.fg;
      that.a_id = that.$route.query.a_id;
      that.c_id = that.$route.query.fg == "2" ? "" : that.$route.query.c_id;

      if (that.fg == "1") {
        that.GoColumn();
        var op_data = {
          that: that,
          _url: pub_link,
          ur: pub._DetailApi.module_article_find_article_msg, // 具体接口
          cbk: that.cb_module_article_find, // 回调
          data: {
            article_id: that.a_id,
            column_id: that.c_id
          } // 形参
        };
        pub._InitAjax(op_data);
      } else {
        var op_data = {
          that: that,
          _url: pub_link,
          ur: pub._DetailApi.module_article_find, // 具体接口
          cbk: that.cb_module_article_find, // 回调
          data: {
            article_id: that.a_id
          } // 形参
        };
        pub._InitAjax(op_data);
      }
    },
    cb_module_article_find(res) {
      const that = this;
      if (res.stateCode == "200" || res.code == "0") {
        res.data.ueditor_text = Base64.decode(res.data.ueditor_text);
        that.art_obj = res.data;
      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: "info",
          duration: 2000
        });
      }
    },
    GoSimple(id) {
      const that = this;
      that.$router.push({
        path: "/article",
        name: "article",
        query: {
          a_id: id,
          c_id: that.c_id,
          fg: "1"
        }
      });
    },
    GoBack() {
      const that = this;
      that.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.head_titlt {
  width: 100%;
  border-bottom: 1px solid rgb(240, 242, 245);
}

.last_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  font-family: "Source Han Serif SC", "Source Han Serif", "source-han-serif-sc",
    "PT Serif", "SongTi SC", "MicroSoft Yahei", Source Han Sans SC,
    Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}

.felx_d ul {
  font-size: 12px;
  color: #242424;
}

.felx_d {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.crumb li a {
  color: #242424;
}

.crumb li a:hover {
  color: #009255;
}

.crumb li:last-child .img {
  display: none;
}

.crumb li img {
  width: 10px;
  height: 10px;
  margin: 0 10px;
}

.crumb li .home {
  width: 12px;
  height: 12px;
}

.main_content {
  width: 1200px;
  margin: 0 auto;
}

.c_right .content {
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
}
.c_right .content h2 {
  font-size: 20px;
  font-weight: 600;
  color: #009255;
  padding: 15px 0;
}
.c_right .time {
  color: #888;
  font-weight: 300;
  font-size: 14px;
}
.c_right .article {
  font-size: 16px;
  color: #242424;
}
.c_right .article .img {
  width: 550px;
  height: 370px;
  margin: 10px auto;
}
.c_right .article .img img {
  width: 100%;
  height: 100%;
}

.act_info {
  padding-top: 0;
}

.act_con {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #f2f2f2;
  box-shadow: 0 1px 3px rgba(0, 37, 55, 0.05);
  border-top: 0;
  padding: 0 10px;
  z-index: 999;
}
.act_con .content {
  width: calc(100% - 40px);
  padding: 0 20px;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 20px;
}
.act_con .article {
  padding: 20px;
  width: calc(100% - 40px);
}

/*上下篇*/
.length {
  border-top: 1px solid #f0f2f5;
  padding-bottom: 30px;
}

.length_conn {
  padding-top: 30px;
}

.pagination {
  width: 100%;
  display: flex;
  padding: 0;
}

.page_item {
  width: calc(50% - 20px);
  margin: 0 10px;
  color: #242424;
  display: inline-block;
}

.page_link {
  max-width: calc(100% - 30px);
  border: 1px solid #e4eaec;
  border-radius: 2px;
  position: relative;
  float: left;
  color: #242424;
  font-size: 14px;
  font-weight: 300;
  background-color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 15px;
}
.pull_right {
  float: right;
}
.page_link:hover {
  background-color: #f0f2f5;
  color: #009255;
}
</style>
