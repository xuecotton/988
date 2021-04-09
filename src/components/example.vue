<template>
  <div>
    <div>
      <div class="example_item">
        <h2>{{c_obj.column_title}}</h2>
        <div class="example_list">
          <div class="example_con" v-for="item in art_list" :key="item.article_id">
            <div class="img">
              <a @click="GoArticle(item)">
                <img :src="item.additional_cover" alt />
              </a>
            </div>
            <div class="con">
              <a @click="GoArticle(item)">{{item.article_name}}</a>
            </div>
          </div>
        </div>
        <div class="img_flex page">
          <el-pagination
            :hide-on-single-page="true"
            @current-change="handleCurrentChange"
            class="page_num"
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
  name: "example",
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

