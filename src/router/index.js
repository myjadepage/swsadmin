import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminBoardLayout from '@/views/layout/AdminBoardLayout.vue'

/** 상품관리 */
import GoodsLeftMenu from '@/views/goods/LeftMenu'
import BrandList from '@/views/goods/BrandList.vue'
import BrandReg from '@/views/goods/BrandReg.vue'
import GoodsReg from '@/views/goods/GoodsReg.vue'
import Category from '@/views/goods/Category.vue'
import GoodsList from '@/views/goods/GoodsList.vue'
import GoodsSort from '@/views/goods/GoodsSort.vue'
import TrashList from '@/views/goods/TrashList.vue'
import Marketing from '@/views/goods/Marketing.vue'

/** 회원관리 */
import MemberLeftMenu from '@/views/member/LeftMenu'
import ConfigMember from '@/views/member/ConfigMember'
import MemberIndex from '@/views/member/MemberIndex'
import MemberList from '@/views/member/MemberList'
import MemberDel from '@/views/member/MemberDel'
import MemberBuyList from '@/views/member/MemberBuyList'
import MemberMail from '@/views/member/MemberMail'

/** 운영관리 */
import ManagementLeftMenu from '@/views/management/LeftMenu'
import ManagementIndex from '@/views/management/ManagementIndex'
import ReviewList from '@/views/management/ReviewList'
import QnaList from '@/views/management/QnaList'
import FaqList from '@/views/management/FaqList'
import InquiryList from '@/views/management/InquiryList'
import CouponList from '@/views/management/CouponList'

/** 환경설정 */
import SetupLeftMenu from '@/views/setup/LeftMenu'
import SetupIndex from '@/views/setup/SetupIndex'

/** 통계 */
import StatisticsLeftMenu from '@/views/statistics/LeftMenu'
import StatisticsIndex from '@/views/statistics/StatisticsIndex'

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
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsReg}
      },
      {
        path: '/goods_reg/:productSysId',
        name: '상품 수정',
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsReg}
      },
      {
        path: '/brand_list/',
        name: '브랜드 관리',
        components: { LeftMenu: GoodsLeftMenu, Contents: BrandList}
      },
      {
        path: '/brand_reg/',
        name: '브랜드 추가',
        components: { LeftMenu: GoodsLeftMenu, Contents: BrandReg}
      },
      {
        path: '/category',
        name: '카테고리 관리',
        components: { LeftMenu: GoodsLeftMenu, Contents: Category}
      },
      {
        path: '/goods_list',
        name: '상품 목록',
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsList }
      },
      {
        path: '/goods_sort',
        name: '상품진열설정',
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsSort }
      },
      {
        path: '/trash_list',
        name: '상품휴지통',
        components: { LeftMenu: GoodsLeftMenu, Contents: TrashList }
      },
      {
        path: '/marketing',
        name: '상품연동관리',
        components: { LeftMenu: GoodsLeftMenu, Contents: Marketing }
      }
    ]
  },
  {
    path: '/member',
    name: '회원관리',    
    component: AdminBoardLayout,
    redirect: '/member/',
    children: [
      {
        path: '/member/',
        name: '회원관리',
        components: { LeftMenu: MemberLeftMenu, Contents: MemberIndex }
      },   
      {
        path: '/member/config_member',
        name: '회원가입설정',
        components: { LeftMenu: MemberLeftMenu, Contents: ConfigMember }
      },     
      {
        path: '/member/member_list',
        name: '회원목록',
        components: { LeftMenu: MemberLeftMenu, Contents: MemberList }
      },     
      {
        path: '/member/member_delete',
        name: '탈퇴회원목록',
        components: { LeftMenu: MemberLeftMenu, Contents: MemberDel }
      },
      {
        path: '/member/member_buy_list',
        name: '상품구매 회원목록',
        components: { LeftMenu: MemberLeftMenu, Contents: MemberBuyList }
      },
      {
        path: '/member/member_mailing',
        name: '회원메일발송',
        components: { LeftMenu: MemberLeftMenu, Contents: MemberMail }
      }
    ]
  },
  {
    path: '/management',
    name: '운영관리',    
    component: AdminBoardLayout,
    redirect: '/management/',
    children: [
      {
        path: '/',
        name: '운영관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: ManagementIndex }
      }, 
      {
        path: '/review_list',
        name: '상품평관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: ReviewList }
      }, 
      {
        path: '/review_list',
        name: '상품Q＆A관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: QnaList }
      }, 
      {
        path: '/faq_list',
        name: 'FAQ관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: FaqList }
      }, 
      {
        path: '/inquiry_list',
        name: '1:1문의관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: InquiryList }
      }, 
      {
        path: '/coupon_list',
        name: '상품쿠폰관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: CouponList }
      }  
    ]
  },
  {
    path: '/setup',
    name: '환경설정',    
    component: AdminBoardLayout,
    redirect: '/management/',
    children: [
      {
        path: '/',
        name: '환경설정',
        components: { LeftMenu: SetupLeftMenu, Contents: SetupIndex }
      }, 
    ]
  },
  {
    path: '/statistics',
    name: '통계',    
    component: AdminBoardLayout,
    redirect: '/statistics/',
    children: [
      {
        path: '/',
        name: '통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: StatisticsIndex }
      }, 
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
