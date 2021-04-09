<template>
  <div>
    <div class="head_titlt">
      <div class="last_head">
        <div class="crumb felx_d">
          <ul class="felx_d">
            <li>您的位置：</li>
            <li>
              <a @click="GoIndex()">
                <img src="../assets/img/home.png" alt class="home" /> 网站首页
              </a>
              <img src="../assets/img/decorate.png" alt class="img" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="main_content">
        <!-- 内容 -->
        <div class="con_list">
          <div class="c_con">
            <div class="c_right">
              <div class="new_con">
                <ul v-show="fg == 'art'">
                  <li v-for="item in art_arr" :key="item.article_id">
                    <a @click="GoArticle(item)" class="atc_new_list">
                      <span class="new_title">
                        <span class="img">
                          <img src="../assets/img/li_bg01.png" alt />
                        </span>
                        <span class="title">{{item.article_name}}</span>
                      </span>
                      <span>{{item.update_time}}</span>
                    </a>
                  </li>
                </ul>
                <ul v-show="fg == 'col'">
                  <li v-for="item in 10" :key="item">
                    <a href="./atc_text.html" class="atc_new_list">
                      <span class="new_title">
                        <span class="img">
                          <img src="../assets/img/li_bg01.png" alt />
                        </span>
                        <span class="title">北京大学化学学院2019年全国优秀大学生夏令营圆满结束</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="length">
            <div class="length_conn">
              <ul class="pagination">
                <li class="page_item">
                  <a @click="GoUp()" class="page_link">上一页</a>
                </li>
                <li class="page_item">
                  <a @click="GoNext()" class="page_link pull_right">下一页</a>
                </li>
              </ul>
            </div>
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
  name: 'searchlist',
  data () {
    return {
      fg: '', // 分类
      name: '', // 搜索的名字
      art_arr: [], // 文章列表
      pageNum: 1, // 分页
      pageSize: 25,
      page: {
        totalPage: 1
      } // 存分页信息
    }
  },
  components: {},
  watch: {
    $route (to, from) {
      // 监听路由是否变化
      const that = this
      if (to.query.name != from.query.name) {
        // 执行事件
        that.GoSearchInfo()
      }
    }
  },
  mounted () {},
  created () {
    const that = this
    that.GoSearchInfo()
  },
  methods: {
    GoSearchInfo () {
      const that = this
      that.fg = that.$route.query.fg
      that.name = that.$route.query.name
      that.GoInfo(1)
    },
    // 获取数据
    GoInfo (num) {
      const that = this
      that.pageNum = num
      if (that.fg == 'art') {
        var op_data = {
          that: that,
          _url: pub_link,
          ur: pub._DetailApi.module_article_list,
          cbk: that.cb_module_article_list, // 回调
          data: {
            show_status: 'show',
            pageNum: num,
            pageSize: that.pageSize,
            article_name: that.name
          } // 形参
        }
        pub._InitAjax(op_data)
      } else if (that.fg == 'col') {
        var op_data = {
          that: that,
          _url: pub_link,
          ur: pub._DetailApi.module_columns_list,
          cbk: that.cb_module_columns_list, // 回调
          data: {} // 形参
        }
        pub._InitAjax(op_data)
      }
    },
    // 数据回调
    cb_module_article_list (res) {
      const that = this
      if (res.stateCode == '200' || res.code == '0') {
        that.art_arr = []
        that.page.totalPage = res.page.totalPage
        for (let ar in res.page.list) {
          that.art_arr.push(res.page.list[ar])
        }
      } else {
        that.$message({
          message: res.stateMsg ? res.stateMsg : res.msg,
          type: 'info',
          duration: 2000
        })
      }
    },
    // 下一页
    GoNext () {
      const that = this
      if (that.pageNum < that.page.totalPage) {
        this.pageNum++
        that.GoInfo(this.pageNum)
      } else {
        that.$message({
          message: '已经是最后一页!',
          type: 'success',
          duration: 2000
        })
      }
    },
    // 上一页
    GoUp () {
      const that = this
      if (that.pageNum > 1) {
        this.pageNum--
        that.GoInfo(this.pageNum)
      } else {
        that.$message({
          message: '已经是第一页了!',
          type: 'success',
          duration: 2000
        })
      }
    },
    // 文章详情
    GoArticle (item) {
      const that = this
      that.$router.push({
        path: '/article',
        name: 'article',
        query: {
          a_id: item.article_id,
          fg: '2' // 2 没有栏目即没有上下篇
        }
      })
    },
    // 首页
    GoIndex () {
      LinkIndexGo()
    }
  }
}
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

.c_con {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0px 0 30px;
}

.c_right {
  width: 70%;
  margin: 0 auto;
  border: 1px solid #eee;
  border-top: none;
  padding: 0 20px;
}

.new_con {
  width: 100%;
  padding: 10px 0;
}

.new_con ul {
  width: 100%;
}

.atc_new_list {
  color: #242424;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 15px;
  font-weight: 300;
  padding: 10px 0;
}
.title {
  display: inline-block;
  width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.atc_new_list:hover .title {
  color: #888;
}

.new_title {
  display: flex;
}
.new_title .img {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}

.new_title .img img {
  width: 100%;
}

/*上下篇*/
.length {
  /* border-top: 1px solid #f0f2f5; */
  padding-bottom: 30px;
  width: 72%;
  margin: 0 auto;
}

/* .length_conn {
  padding-top: 30px;
} */

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
