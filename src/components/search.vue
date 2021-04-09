<template>
  <div>
    <div class="search-form">
      <div id="search-bd" class="search-bd">
        <ul>
          <li @click="GoAct('art')" class="selected">找文章</li>
          <li @click="GoAct('col')">找栏目</li>
        </ul>
      </div>
      <div id="search-hd" class="search-hd">
        <div class="search-bg"></div>
        <input type="text" id="s1" class="search-input" v-model="art_name" />
        <input type="text" id="s2" class="search-input" v-model="col_name" />
        <span class="s1 pholder">搜文章名称</span>
        <span class="s2 pholder">搜栏目名称</span>
        <button id="submit" class="btn-search" @click="GoSearch()" value="搜索">搜索</button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { pub } from '../assets/js/pub.js'
export default {
  name: 'search',
  data () {
    return {
      act: 'art',
      col_name: '',
      art_name: '',
      search_fg: true // 输入框的展示
    }
  },
  components: {
    // searchlist
  },
  watch: {
    $route (to, from) {
      // 监听路由是否变化
      const that = this
      if (to.query.c_id != from.query.c_id) {
        // 执行事件
      }
    }
  },
  mounted () {
    $(function () {
      // 通用头部搜索切换
      $('#search-hd .search-input').on('input propertychange', function () {
        var val = $(this).val()
        if (val.length > 0) {
          $('#search-hd .pholder').hide(0)
        } else {
          var index = $('#search-bd li.selected').index()
          $('#search-hd .pholder')
            .eq(index)
            .show()
            .siblings('.pholder')
            .hide(0)
        }
      })
      $('#search-bd li').click(function () {
        var index = $(this).index()
        $('#search-hd .pholder')
          .eq(index)
          .show()
          .siblings('.pholder')
          .hide(0)
        $('#search-hd .search-input')
          .eq(index)
          .show()
          .siblings('.search-input')
          .hide(0)
        $(this)
          .addClass('selected')
          .siblings()
          .removeClass('selected')
        $('#search-hd .search-input').val('')
      })
    })
  },
  created () {
    const that = this
    that.search_fg = false
  },
  methods: {
    GoAct (state) {
      const that = this
      that.act = state
    },
    GoSearch () {
      const that = this
      if (that.act == 'art') {
        if (!this.art_name) {
          that.$message({
            message: '输入内容1',
            type: 'info',
            duration: 2000
          })
        } else {
          that.$router.push({
            path: '/searchlist',
            name: 'searchlist',
            query: {
              fg: that.act, // 文章
              name: that.art_name
            }
          })
        }
      } else {
        // if (!this.art_name) {
        //   that.$message({
        //     message: "输入内容2",
        //     type: "info",
        //     duration: 2000
        //   });
        // } else {
        //   that.$router.push({
        //     path: "/seachlist",
        //     name: "seachlist",
        //     query: {
        //       fg: that.act, // 栏目
        //       name: that.col_name
        //     }
        //   });
        // }
      }
      // that.$router.push({
      //   path: "/seachlist",
      //   name: "seachlist",
      //   query: {
      //     fg: that.act, // 文章
      //     name: that.act == "art" ? that.art_name : that.col_name
      //   }
      // });
    }
  }
}
</script>
<style scoped>
.search-form {
  width: 760px;
  margin: 100px auto;
  overflow: hidden;
}

.search-form .search-bd {
  margin: 0 50px;
  height: 32px;
}

.search-form .search-bd li {
  font-size: 12px;
  width: 70px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  float: left;
  cursor: pointer;
  background-color: #f7f7f7;
  color: #666;
}

.search-form .search-bd li.selected {
  color: #fff;
  font-weight: 700;
  background-color: #009255;
}

.search-form .search-hd {
  margin: 0 50px;
  height: 46px;
  background-color: #009255;
  padding: 3px;
  position: relative;
}

.search-form .search-hd .search-input {
  width: 553px;
  height: 100%;
  line-height: 28px;
  padding: 6px 0;
  padding-left: 10px;
  background: none;
  text-indent: 10px;
  border: 0;
  outline: none;
  position: relative;
  left: 3px;
  top: 0;
  z-index: 5;
  margin-left: -3px;
}

.search-form .search-hd .btn-search {
  width: 105px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 3px;
  top: 3px;
  border: 0;
  z-index: 6;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  font-weight: 300;
  background: none;
  outline: none;
}

.search-form .search-hd .pholder {
  display: inline-block;
  padding: 2px 0;
  font-size: 12px;
  color: #999;
  position: absolute;
  left: 13px;
  z-index: 4;
  background: url("../assets/img/search.png") no-repeat 0 0;
  padding-left: 25px;
  top: 14px;
}

.search-form .search-hd .s2,
.search-form .search-hd #s2 {
  display: none;
}

.search-form .search-bg {
  width: 546px;
  height: 40px;
  background-color: #fff;
  position: absolute;
  left: 3px;
  top: 3px;
  z-index: 1;
}
</style>
