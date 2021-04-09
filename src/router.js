
import Vue from 'vue'
import Router from 'vue-router'
import alldist from './components/alldist.vue'// 网盘列表  完成
import search from './components/search.vue' // 搜索页面 完成
import searchlist from './components/searchlist.vue' // 搜索结果页面
import article from './components/article.vue' // 文章详情
import themeone from './components/themeone.vue' // 主题一的栏目文章列表   一级栏目下直接走文章列表
import satisfied from './components/satisfied.vue' // 主题一的栏目文章列表   一级栏目下直接走文章列表
import vanguard from './components/vanguard.vue' // 先进先锋 样式 12
import example from './components/example.vue' // 身边的榜样 样式 06
// 马红伟
import Mailbox from './components/mailbox.vue' // 首长信箱页面
import sum from './components/sum.vue' // 左右侧边样式的栏目

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/alldist',
      name: 'alldist',
      component: alldist
    },
    {
      path: '/example',
      name: 'example',
      component: example
    },
    {
      path: '/vanguard',
      name: 'vanguard',
      component: vanguard
    },
    {
      path: '/satisfied',
      name: 'satisfied',
      component: satisfied
    },
    {
      path: '/themeone',
      name: 'themeone',
      component: themeone
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/searchlist',
      name: 'searchlist',
      component: searchlist
    },
    // 马红伟
    {
      path: '/Mailbox',
      name: 'Mailbox',
      component: Mailbox
    } ,
    {
      path:'/sum',
      name:'sum',
      component:sum
    },

  ]
})
