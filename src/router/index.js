import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminBoardLayout from '@/views/layout/AdminBoardLayout.vue'

/** 상품관리 */
import GoodsLeftMenu from '@/views/goods/LeftMenu'
import GoodsIndex from '@/views/goods/index.vue'
import BrandList from '@/views/goods/BrandList.vue'
import BrandReg from '@/views/goods/BrandReg.vue'
import GoodsReg from '@/views/goods/GoodsReg.vue'
import Category from '@/views/goods/Category.vue'
import GoodsList from '@/views/goods/GoodsList.vue'
import GoodsSort from '@/views/goods/GoodsSort.vue'
import TrashList from '@/views/goods/TrashList.vue'
import Marketing from '@/views/goods/Marketing.vue'

/** 주문/매출관리 */
import OrderLeftMenu from '@/views/order/LeftMenu'
import OrderIndex from '@/views/order/index'
import OrderAllList from '@/views/order/OrderAllList'
import OrderPriceBefore from '@/views/order/OrderPriceBefore'
import OrderPriceComplete from '@/views/order/OrderPriceComplete'
import OrderProductReady from '@/views/order/OrderProductReady'
import OrderProductLeave from '@/views/order/OrderProductLeave'
import OrderCancel from '@/views/order/OrderCancel'
import OrderDecide from '@/views/order/OrderDecide'
import OrderConsult from '@/views/order/OrderConsult'


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
import FaqReg from '@/views/management/FaqReg'
import FaqDetail from '@/views/management/FaqDetail'
import InquiryList from '@/views/management/InquiryList'
import InquiryDetail from '@/views/management/InquiryDetail'
import CouponList from '@/views/management/CouponList'
import CouponReg from '@/views/management/CouponReg'

/** 환경설정 */
import SetupLeftMenu from '@/views/setup/LeftMenu'
import SetupIndex from '@/views/setup/SetupIndex'
import ConfigManager from '@/views/setup/ConfigManager'
import ConfigSite from '@/views/setup/ConfigSite'

/** 통계 */
import StatisticsLeftMenu from '@/views/statistic/LeftMenu'
import StatisticsIndex from '@/views/statistic/StatisticsIndex'

/** 정산관리 */
import AccountMenu from '@/views/account/LeftMenu'
import AccountIndex from '@/views/account/index'
import Account from '@/views/account/Account'
import AccountForSeller from '@/views/account/AccountForSeller'

/* 로그인, 회원가입 */
import MainPage from "@/views/main/MainPage"

import DashBoardIndex from "@/views/dashboard/DashBoardIndex"
import DashBoardMenu from "@/views/dashboard/DashBoardMenu"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/goods/goods_list'
  },
  {
    path: '/goods',
    name: '상품관리',
    component: AdminBoardLayout,
    redirect: '/goods/index',
    children: [
      {
        path: '/goods/index',
        name: '상품 관리',
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsIndex}
      },
      {
        path: '/goods/goods_reg',
        name: '상품 등록',
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsReg}
      },
      {
        path: '/goods/goods_reg/:productSysId',
        name: '상품 수정',
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsReg}
      },
      {
        path: '/goods/brand_list/',
        name: '브랜드 관리',
        components: { LeftMenu: GoodsLeftMenu, Contents: BrandList}
      },
      {
        path: '/goods/brand_reg/',
        name: '브랜드 추가',
        components: { LeftMenu: GoodsLeftMenu, Contents: BrandReg}
      },
      {
        path: '/goods/brand_reg/:brandSysId',
        name: '브랜드 수정',
        components: { LeftMenu: GoodsLeftMenu, Contents: BrandReg}
      },
      {
        path: '/goods/category',
        name: '카테고리 관리',
        components: { LeftMenu: GoodsLeftMenu, Contents: Category}
      },
      {
        path: '/goods/goods_list',
        name: '상품 목록',
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsList }
      },
      {
        path: '/goods/goods_sort',
        name: '상품진열설정',
        components: { LeftMenu: GoodsLeftMenu, Contents: GoodsSort }
      },
      {
        path: '/goods/trash_list',
        name: '상품휴지통',
        components: { LeftMenu: GoodsLeftMenu, Contents: TrashList }
      },
      {
        path: '/goods/marketing',
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
        path: '/management/',
        name: '운영관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: ManagementIndex }
      }, 
      {
        path: '/management/review_list',
        name: '상품평관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: ReviewList }
      }, 
      {
        path: '/management/qna_list',
        name: '상품Q＆A관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: QnaList }
      }, 
      {
        path: '/management/faq_list',
        name: 'FAQ관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: FaqList }
      }, 
      {
        path: '/management/faq_reg',
        name: 'FAQ관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: FaqReg }
      },
      {
        path: '/management/faq_reg/:siteFaqSysId',
        name: 'FAQ관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: FaqDetail }
      },
      {
        path: '/management/inquiry_list',
        name: '1:1문의관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: InquiryList }
      },
      {
        path: '/management/inquiry_detail',
        name: '1:1문의관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: InquiryDetail }
      }, 
      {
        path: '/management/coupon_list',
        name: '상품쿠폰관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: CouponList }
      },
      {
        path: '/management/coupon_reg',
        name: '상품쿠폰관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: CouponReg }
      }    
    ]
  },
  {
    path: '/setup/',
    name: '환경설정',    
    component: AdminBoardLayout,
    redirect: '/setup/',
    children: [
      {
        path: '/setup/',
        name: '환경설정',
        components: { LeftMenu: SetupLeftMenu, Contents: SetupIndex }
      }, 
      {
        path: '/setup/config_manager',
        name: '상점환경설정',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigManager }
      }, 
      {
        path: '/setup/config_site',
        name: '사이트설정',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigSite }
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
        path: '/setup/statistics/',
        name: '통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: StatisticsIndex }
      }, 
    ]
  },
  {
    path: '/order/',
    name: '주문/매출관리',
    component: AdminBoardLayout,
    redirect: '/order/index',
    children:[
      {
        path: '/order/index',
        name: '주문 관리',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderIndex }
      }, 
      {
        path: '/order/order_list/',
        name: '전체 주문',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderAllList }
      }, 
      {
        path: '/order/order_price_before/',
        name: '입금확인중',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderPriceBefore }
      }, 
      {
        path: '/order/order_price_complete/',
        name: '결재완료',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderPriceComplete }
      }, 
      {
        path: '/order/order_product_ready/',
        name: '상품준비중',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderProductReady }
      }, 
      {
        path: '/order/order_product_leave/',
        name: '발송완료',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderProductLeave }
      }, 
      {
        path: '/order/order_cancel/',
        name: '주문취소',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderCancel }
      }, 
      {
        path: '/order/order_decide/',
        name: '주문확정',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderDecide }
      }, 
      {
        path: '/order/order_consult/',
        name: '구매상담',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderConsult }
      }
    ]
  },
  {
    path: '/account/',
    name: '정산관리',
    component: AdminBoardLayout,
    redirect: '/account/index',
    children:[
      {
        path: '/account/index',
        name: '본사정산',
        components: { LeftMenu: AccountMenu, Contents: AccountIndex }
      },
      {
        path: '/account/account',
        name: '정산관리',
        components: { LeftMenu: AccountMenu, Contents: Account }
      },
      {
        path: '/account/dealer_account',
        name: '판매자정산',
        components: { LeftMenu: AccountMenu, Contents: AccountForSeller }
      }
    ]
  },
  {
    path: '/login',
    name: '로그인',
    component: MainPage
  },
  {
    path:'/dashboard',
    name:'대시보드',
    component: AdminBoardLayout,
    redirect:'/dashboard/index',
    children:[
      {
        path: '/dashboard/index',
        name: '대시보드 메인',
        components: { LeftMenu: DashBoardMenu, Contents: DashBoardIndex }
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
