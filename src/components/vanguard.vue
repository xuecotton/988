<template>
  <div>
    <div id="app">
      <div class="example_item">
        <div class="title_img">
          <h1>
            <img :src="c_obj.additional_cover" alt />
          </h1>
          <div class="sub_explain">
            <h2 class="subtitle">{{c_obj.column_title}}</h2>
            <div class="explain">{{c_obj.column_remarks}}</div>
          </div>
        </div>
        <h2 class="title_e">{{c_obj.column_name}}</h2>
        <div class="example_list">
          <div class="example_con vanguard" v-for="item in art_list" :key="item.article_id">
            <div class="img">
              <a @click="GoArticle(item)" target="_blank">
                <img :src="item.additional_cover" alt />
              </a>
            </div>
            <div class="con">
              <a @click="GoArticle(item)" target="_blank">{{item.article_name}}</a>
            </div>
          </div>
        </div>
        <div class="img_flex">
          <el-pagination
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
            :total="page_obj.totalCount"
            layout="prev, pager, next"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { pub } from "../assets/js/pub.js";
export default {
  name: "vanguard",
  data() {
    return {
      c_id: "",
      c_obj: {},
      page_obj: {},
      pageNum: 1,
      pageSize: 16,
      art_list: [],
      totalCount: 0
    };
  },
  components: {},
  watch: {
    $route(to, from) {
      //监听路由是否变化
      const that = this;
      if (to.query.c_id != from.query.c_id) {
        // 执行事件
        that.c_id = that.$route.query.c_id;
        that.GoInfo(that.pageNum);
        that.GoColumn();
      }
    }
  },
  mounted() {},
  created() {
    const that = this;
    that.c_id = that.$route.query.c_id;
    that.GoInfo(that.pageNum);
    that.GoColumn();
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
    // 栏目文章列表分页
    GoInfo(num) {
      const that = this;
      var op_data = {
        that: that,
        _url: pub_link,
        ur: pub._DetailApi.web_column_column_articles_list_page_easy, // 具体接口
        cbk: that.cb_web_column_column_articles_list_page_easy, // 回调
        data: {
          pageNum: num,
          pageSize: that.pageSize,
          column_id: that.c_id
        } // 形参
      };
      pub._InitAjax(op_data);
    },
    cb_web_column_column_articles_list_page_easy(res) {
      const that = this;
      if (res.stateCode == "200" || res.code == "0") {
        that.page_obj = res.page;
        that.totalCount = res.page.totalCount;
        that.art_list = res.page.list;
      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: "info",
          duration: 2000
        });
      }
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
    handleCurrentChange(val) {
      const that = this;
      that.GoInfo(val);
    },
    GoArticle(item) {
      const that = this;
      that.$router.push({
        path: "/article",
        name: "article",
        query: {
          a_id: item.article_id,
          c_id: that.c_id,
          fg: "1" // 2 没有栏目即没有上下篇  1 有上下篇
        }
      });
    }
  }
};
</script>
<style scoped>
.example_item .title_e {
  font-weight: 600;
  text-align: center;
  color: #fff100;
  font-size: 28px;
  background-color: #ee1d24;
  padding: 13px 0px;
  line-height: 34px;
}
.example_item .title_img h1 {
  width: 50%;
  margin: 50px auto;
}
.example_item .title_img h1 img {
  width: 100%;
}
.example_item .title_img .sub_explain {
  background-color: #f5f5f5;
  padding: 15px 5px;
  text-align: left;
}
.example_item .title_img .subtitle {
  color: #ee1d24;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
}
.example_item .title_img .explain {
  font-size: 22px;
  color: #292929;
  line-height: 32px;
  text-indent: 2em;
  padding: 24px 16px 0;
  font-weight: normal;
}
/* 榜样 */
.example_item {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;
}
.example_item h2 {
  padding: 13px 36px;
  line-height: 20px;
  color: #242424;
  font-size: 18px;
  background-color: #f5f5f5;
}
.example_list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 20px 0 35px;
}

.example_con {
  padding: 10px;
  transition: all 0.6s;
  width: calc(25% - 20px);
  margin: 10px 0;
}
.eexample_list .img {
  width: 100%;
  height: 100%;
}
.example_list .img img {
  width: 100%;
  height: 100%;
  display: block;
  transition: all 0.6s;
}
.example_list .con a {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 500;
  display: block;
  white-space: nowrap;
  color: #2f2f2f;
  padding: 10px 0;
}
.example_con:hover {
  box-shadow: 0px 5px 15px 5px rgba(128, 128, 128, 0.25);
}
.example_con:hover .con a {
  text-decoration: underline;
}
.example_con:hover .img {
  opacity: 0.9;
}
</style>

