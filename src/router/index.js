import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminBoardLayout from '@/views/layout/AdminBoardLayout.vue'

/** 상품관리 */
import GoodsLeftMenu from '@/views/goods/LeftMenu'
import BrandList from '@/views/goods/BrandList.vue'
import GoodsReg from '@/views/goods/GoodsReg.vue'
import Category from '@/views/goods/Category.vue'
import GoodsList from '@/views/goods/GoodsList.vue'
import GoodsSort from '@/views/goods/GoodsSort.vue'
import TrashList from '@/views/goods/TrashList.vue'
import Marketing from '@/views/goods/Marketing.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '쉘위샵',
    component: AdminBoardLayout,
    redirect: '/goods_reg',
    children: [
      {
        path: '/goods_reg',
        name: '상품 등록',
        components:
          {
            LeftMenu: GoodsLeftMenu,
            Contents: GoodsReg
          }
      },
      {
        path: '/brand_list',
        name: '브랜드 리스트',
        components:
          {
            LeftMenu: GoodsLeftMenu,
            Contents: BrandList
          }
      },
      {
        path: '/category',
        name: '카테고리 관리',
        components:
          {
            LeftMenu: GoodsLeftMenu,
            Contents: Category
          }
      },
      {
        path: '/goods_list',
        name: '상품 목록',
        components:
          {
            LeftMenu: GoodsLeftMenu,
            Contents: GoodsList
          }
      },
      {
        path: '/goods_sort',
        name: '상품진열설정',
        components:
          {
            LeftMenu: GoodsLeftMenu,
            Contents: GoodsSort
          }
      },
      {
        path: '/trash_list',
        name: '상품휴지통',
        components:
          {
            LeftMenu: GoodsLeftMenu,
            Contents: TrashList
          }
      },
      {
        path: '/marketing',
        name: '상품연동관리',
        components:
          {
            LeftMenu: GoodsLeftMenu,
            Contents: Marketing
          }
      }
    ]
  }
]

// mode: 'history',
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
