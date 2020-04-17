import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminBoardLayout from '@/views/layout/AdminBoardLayout.vue'
import VueJwtDecode from 'vue-jwt-decode'


/** 상품관리 */
import GoodsLeftMenu from '@/views/goods/LeftMenu'
// import GoodsIndex from '@/views/goods/index.vue'
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
// import OrderIndex from '@/views/order/index'
import OrderAllList from '@/views/order/OrderAllList'
import OrderPriceBefore from '@/views/order/OrderPriceBefore'
import OrderPriceComplete from '@/views/order/OrderPriceComplete'
import OrderProductReady from '@/views/order/OrderProductReady'
import OrderProductLeave from '@/views/order/OrderProductLeave'
import OrderCancel from '@/views/order/OrderCancel'
import OrderDecide from '@/views/order/OrderDecide'
import OrderConsult from '@/views/order/OrderConsult'
import OrderCancelBeforePrice from '@/views/order/OrderCancelBeforePrice'
import OrderCancelCheckPrice from '@/views/order/OrderCancelCheckPrice'
import OrderExchangeJoin from '@/views/order/OrderExchangeJoin'
import OrderExchangeComplete from '@/views/order/OrderExchangeComplete'
import OrderRejectJoin from '@/views/order/OrderRejectJoin'
import OrderRejectComplete from '@/views/order/OrderRejectComplete'


/** 회원관리 */
import MemberLeftMenu from '@/views/member/LeftMenu'
import ConfigMember from '@/views/member/ConfigMember'
// import MemberIndex from '@/views/member/MemberIndex'
import MemberList from '@/views/member/MemberList'
import MemberDel from '@/views/member/MemberDel'
import MemberBuyList from '@/views/member/MemberBuyList'
import MemberMail from '@/views/member/MemberMail'

/** 운영관리 */
import ManagementLeftMenu from '@/views/management/LeftMenu'
// import ManagementIndex from '@/views/management/ManagementIndex'
import NoticeList from '@/views/management/NoticeList'
import NoticeReg from '@/views/management/NoticeReg'
import NoticeDetail from '@/views/management/NoticeDetail'
import ReviewList from '@/views/management/ReviewList'
import ReviewListAll from '@/views/management/ReviewListAll'
import QnaList from '@/views/management/QnaList'
import FaqList from '@/views/management/FaqList'
import FaqReg from '@/views/management/FaqReg'
import FaqDetail from '@/views/management/FaqDetail'
import InquiryList from '@/views/management/InquiryList'
import InquiryDetail from '@/views/management/InquiryDetail'
import ComplainList from '@/views/management/ComplainList'
import ComplainDetail from '@/views/management/ComplainDetail'
import BlockList from '@/views/management/BlockList'
import PunishList from '@/views/management/PunishList'
import CouponList from '@/views/management/CouponList'
import CouponReg from '@/views/management/CouponReg'


/** 환경설정 */
import SetupLeftMenu from '@/views/setup/LeftMenu'
// import SetupIndex from '@/views/setup/SetupIndex'
import ConfigManager from '@/views/setup/ConfigManager'
import ConfigSite from '@/views/setup/ConfigSite'
import ConfigDealer from '@/views/setup/ConfigDealer'
import ConfigVocab from '@/views/setup/ConfigVocab'
import ConfigDelivery from '@/views/setup/ConfigDelivery'
import ConfigDiscount from '@/views/setup/ConfigDiscount'
import MemberLevel from '@/views/setup/MemberLevel'
import ConfigPoint from '@/views/setup/ConfigPoint'
import NotifyTpl from '@/views/setup/NotifyTpl'
import ManagerList from '@/views/setup/ManagerList'
import ConfigPolicy from '@/views/setup/ConfigPolicy'
import ConfigTermsHistory from '@/views/setup/ConfigTermsHistory'
import ConfigPay from '@/views/setup/ConfigPay'
import ConfigPayOnline from '@/views/setup/ConfigPayOnline'
import Configkakaopay from '@/views/setup/Configkakaopay'

/** 통계 */
import StatisticsLeftMenu from '@/views/statistic/LeftMenu'
// import StatisticsIndex from '@/views/statistic/StatisticsIndex'
import SaleGoods from '@/views/statistic/SaleGoods'
import SaleTotal from '@/views/statistic/SaleTotal'
import SaleMember from '@/views/statistic/SaleMember'
import MemberGender from '@/views/statistic/MemberGender'
import MemberAge from '@/views/statistic/MemberAge'
import MemberArea from '@/views/statistic/MemberArea'
import VisitCount from '@/views/statistic/VisitCount'
import VisitFromSite from '@/views/statistic/VisitFromSite'
import GoodsTotal from '@/views/statistic/GoodsTotal'
import GoodsWish from '@/views/statistic/GoodsWish'
import GoodsMarks from '@/views/statistic/GoodsMarks'
import MarketingUsePoint from '@/views/statistic/MarketingUsePoint'

/** 업체관리 */
// import MimIndex from '@/views/mim/MimIndex'
import MimLeftMenu from '@/views/mim/MimLeftMenu'
import DealerRegist from '@/views/mim/DealerRegist.vue'
import DealerRegistList from '@/views/mim/DealerRegistList'
import DealerList from '@/views/mim/DealerList'
import DealerDetail from '@/views/mim/DealerDetail'
import DealerSecessionList from '@/views/mim/DealerSecessionList'
import DealerQnaList from '@/views/mim/DealerQnaList'
import DealerGoodsList from '@/views/mim/GoodsList'
import DealerBrandList from '@/views/mim/DealerBrandList'
import EventList from '@/views/mim/EventList'


/** 정산관리 */
import AccountLeftMenu from '@/views/account/AccountLeftMenu'
// import AccountIndex from '@/views/account/index'
import Account from '@/views/account/Account'
import AccountForSeller from '@/views/account/AccountForSeller'

/** 방송관리 */
import BroadcastLeftMenu from '@/views/broadcast/BroadcastLeftMenu'
// import BroadcastIndex from '@/views/broadcast/Index'
import BroadcastRequest from '@/views/broadcast/BroadcastRequest'
import BroadcastReg from '@/views/broadcast/BroadcastReg'
import BroadcastDetail from '@/views/broadcast/BroadcastDetail'
import BroadcastStop from '@/views/broadcast/BroadcastStop'
import BroadcastSend from '@/views/broadcast/BroadcastSend'
import VodBox from '@/views/broadcast/VodBox'
import TimeTable from '@/views/broadcast/TimeTable'
import TimeTableReg from '@/views/broadcast/TimeTableReg'


/* 로그인, 회원가입 */
import MainPage from "@/views/main/MainPage"

import DashBoardIndex from "@/views/dashboard/DashBoardIndex"
import DashBoardMenu from "@/views/dashboard/DashBoardMenu"


// jwt decode
export const jwtDecode = function (str) {
  return VueJwtDecode.decode(str)
}
// 토큰 만료 여부 확인 (true:만료 false:기한남음)
export const isTokenExpired = function (token) {
  if(token){
    let tokenExp = jwtDecode(token).exp * 1000
    let now = new Date().getTime()
    let timeDiff = tokenExp - now
    // 86400 => 1일
    if (timeDiff < 86400) {
      return true
    } else {
      return false
    }
  }else{
    return true
  }
}



Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: '로그인',
    component: MainPage
  },
  {
    path: '/goods',
    name: '상품관리',
    component: AdminBoardLayout,
    redirect: '/goods/goods_list',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children: [
      // {
      //   path: '/goods/index',
      //   name: '상품 관리',
      //   components: { LeftMenu: GoodsLeftMenu, Contents: GoodsIndex}
      // },
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
    redirect: '/member/member_list',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children: [
      // {
      //   path: '/member/',
      //   name: '회원관리',
      //   components: { LeftMenu: MemberLeftMenu, Contents: MemberIndex }
      // },   
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
    redirect: '/management/notice_list',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children: [
      // {
      //   path: '/management/',
      //   name: '운영관리',
      //   components: { LeftMenu: ManagementLeftMenu, Contents: ManagementIndex }
      // },
      {
        path: '/management/notice_list',
        name: '공지사항',
        components: { LeftMenu: ManagementLeftMenu, Contents: NoticeList }
      },
      {
        path: '/management/notice_reg',
        name: '공지사항등록',
        components: { LeftMenu: ManagementLeftMenu, Contents: NoticeReg }
      },
      {
        path: '/management/notice_detail/:noticeSysId',
        name: '공지사항',
        components: { LeftMenu: ManagementLeftMenu, Contents: NoticeDetail }
      },  
      {
        path: '/management/review_list',
        name: '상품평관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: ReviewList }
      },
      {
        path: '/management/review_list_all',
        name: '상품평관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: ReviewListAll }
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
        path: '/management/faq_detail/:siteFaqSysId',
        name: 'FAQ관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: FaqDetail }
      },
      {
        path: '/management/inquiry_list',
        name: '1:1문의관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: InquiryList }
      },
      {
        path: '/management/inquiry_detail/:questionSysId',
        name: '1:1문의관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: InquiryDetail }
      },
      {
        path: '/management/complain_list',
        name: '신고내역관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: ComplainList }
      }, 
      {
        path: '/management/complain_detail',
        name: '신고내역관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: ComplainDetail }
      },
      {
        path: '/management/block_list',
        name: '차단내역관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: BlockList }
      }, 
      {
        path: '/management/punish_list',
        name: '제재내역관리',
        components: { LeftMenu: ManagementLeftMenu, Contents: PunishList }
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
    redirect: '/setup/config_manager',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children: [
      // {
      //   path: '/setup/',
      //   name: '환경설정',
      //   components: { LeftMenu: SetupLeftMenu, Contents: SetupIndex }
      // }, 
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
      {
        path: '/setup/config_dealer',
        name: '판매자승인환경설정',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigDealer }
      }, 
      {
        path: '/setup/config_vocab',
        name: '어휘설정',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigVocab }
      }, 
      {
        path: '/setup/config_delivery',
        name: '배송설정',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigDelivery }
      }, 
      {
        path: '/setup/config_discount',
        name: '할인액부담설정',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigDiscount }
      },  
      {
        path: '/setup/member_level',
        name: '회원등급관리',
        components: { LeftMenu: SetupLeftMenu, Contents: MemberLevel }
      }, 
      {
        path: '/setup/config_cmoney',
        name: '적립금설정',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigPoint }
      }, 
      {
        path: '/setup/notify_tpl',
        name: '상품정보고시관리',
        components: { LeftMenu: SetupLeftMenu, Contents: NotifyTpl }
      }, 
      {
        path: '/setup/manager_list',
        name: '부운영자관리',
        components: { LeftMenu: SetupLeftMenu, Contents: ManagerList }
      }, 
      {
        path: '/setup/config_policy',
        name: '상점운영정책',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigPolicy }
      }, 
      {
        path: '/setup/config_terms_history/:num',
        name: '약관',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigTermsHistory }
      }, 
      {
        path: '/setup/config_pay',
        name: '결제정보설정',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigPay }
      }, 
      {
        path: '/setup/config_pay_online',
        name: '온라인입금계좌',
        components: { LeftMenu: SetupLeftMenu, Contents: ConfigPayOnline }
      }, 
      {
        path: '/setup/config_kakaopay',
        name: '카카오페이결제정보설정',
        components: { LeftMenu: SetupLeftMenu, Contents: Configkakaopay }
      }, 
      
    ]
  },
  {
    path: '/statistic/',
    name: '통계',    
    component: AdminBoardLayout,
    redirect: '/statistic/sale_total',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children: [
      // {
      //   path: '/statistic/',
      //   name: '통계',
      //   components: { LeftMenu: StatisticsLeftMenu, Contents: StatisticsIndex }
      // }, 
      {
        path: '/statistic/sale_total',
        name: '전체매출통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: SaleTotal }
      }, 
      {
        path: '/statistic/sale_goods',
        name: '상품별매출통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: SaleGoods }
      }, 
      {
        path: '/statistic/sale_member',
        name: '회원별매출통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: SaleMember }
      }, 
      {
        path: '/statistic/member_gender',
        name: '남여비율통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: MemberGender }
      }, 
      {
        path: '/statistic/member_age',
        name: '연령대별통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: MemberAge }
      }, 
      {
        path: '/statistic/member_area',
        name: '거주지별통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: MemberArea }
      },
      {
        path: '/statistic/visit_count',
        name: '방문자접속통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: VisitCount }
      },
      {
        path: '/statistic/visit_fromsite',
        name: '접속방향통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: VisitFromSite }
      },
      {
        path: '/statistic/goods_total',
        name: '상품별통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: GoodsTotal }
      },
      {
        path: '/statistic/goods_wish',
        name: '상품보관함통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: GoodsWish }
      },
      {
        path: '/statistic/goods_marks',
        name: '고객평점통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: GoodsMarks }
      },
      {
        path: '/statistic/marketing_useCmoney',
        name: '적립금사용통계',
        components: { LeftMenu: StatisticsLeftMenu, Contents: MarketingUsePoint }
      },
    ]
  },
  {
    path: '/order/',
    name: '주문/매출관리',
    component: AdminBoardLayout,
    redirect: '/order/order_list/',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children:[
      // {
      //   path: '/order/',
      //   name: '주문 관리',
      //   components: { LeftMenu: OrderLeftMenu, Contents: OrderIndex }
      // }, 
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
      }, 
      /** 취소 /교환/반품신청 관리 */
      {
        path: '/order/order_cancel_before_price/',
        name: '주문취소신청(입금전)',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderCancelBeforePrice }
      },
      {
        path: '/order/order_cancel_check_price/',
        name: '주문취소신청(입금확인)',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderCancelCheckPrice }
      },
      {
        path: '/order/order_exchange_join/',
        name: '주문교환신청',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderExchangeJoin }
      },
      {
        path: '/order/order_exchange_complete/',
        name: '주문교환완료',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderExchangeComplete }
      },
      {
        path: '/order/order_reject_join/',
        name: '주문반품신청',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderRejectJoin }
      },
      {
        path: '/order/order_reject_complete/',
        name: '주문반품완료',
        components: { LeftMenu: OrderLeftMenu, Contents: OrderRejectComplete }
      }
    ]
  },
  {
    path: '/mim/',
    name: '입점업체관리',
    component: AdminBoardLayout,
    redirect: '/mim/dealer_regist_list',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children:[
      // {
      //   path: '/mim/',
      //   name: '판매자관리',
      //   components: { LeftMenu: MimLeftMenu, Contents: MimIndex }
      // },
      {
        path: '/mim/dealer_regist',
        name: '판매자신청',
        components: { LeftMenu: MimLeftMenu, Contents: DealerRegist }
      },
      {
        path: '/mim/dealer_regist_list',
        name: '판매자신청목록',
        components: { LeftMenu: MimLeftMenu, Contents: DealerRegistList }
      },
      {
        path: '/mim/dealer_list',
        name: '판매자목록',
        components: { LeftMenu: MimLeftMenu, Contents: DealerList }
      },
      {
        path: '/mim/dealer_detail/:sellerSysId',
        name: '판매자정보',
        components: { LeftMenu: MimLeftMenu, Contents: DealerDetail }
      },
      {
        path: '/mim/dealer_secession_list',
        name: '판매자탈퇴',
        components: { LeftMenu: MimLeftMenu, Contents: DealerSecessionList }
      },
      {
        path: '/mim/dealer_qna_list',
        name: '판매자문의',
        components: { LeftMenu: MimLeftMenu, Contents: DealerQnaList }
      },
      {
        path: '/mim/goods_list',
        name: '판매자상품관리',
        components: { LeftMenu: MimLeftMenu, Contents: DealerGoodsList }
      },
      {
        path: '/mim/dealer_brand_list',
        name: '판매자상품관리',
        components: { LeftMenu: MimLeftMenu, Contents: DealerBrandList }
      },
      {
        path: '/mim/event_list',
        name: '판매자이벤트관리',
        components: { LeftMenu: MimLeftMenu, Contents: EventList }
      }
    ]
  },
  {
    path: '/account/',
    name: '정산관리',
    component: AdminBoardLayout,
    redirect: '/account/account',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children:[
      // {
      //   path: '/account/index',
      //   name: '본사정산',
      //   components: { LeftMenu: AccountLeftMenu, Contents: AccountIndex }
      // },
      {
        path: '/account/account',
        name: '정산관리',
        components: { LeftMenu: AccountLeftMenu, Contents: Account }
      },
      {
        path: '/account/dealer_account',
        name: '판매자정산',
        components: { LeftMenu: AccountLeftMenu, Contents: AccountForSeller }
      }
    ]
  },
  {
    path: '/broadcast/',
    name: '방송관리',
    component: AdminBoardLayout,
    redirect: '/broadcast/BroadcastRequest',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
    children:[
      // {
      //   path: '/broadcast/',
      //   name: '방송관리',
      //   components: { LeftMenu: BroadcastLeftMenu, Contents: BroadcastIndex }
      // },
      {
        path: '/broadcast/BroadcastRequest',
        name: '방송신청',
        components: { LeftMenu: BroadcastLeftMenu, Contents: BroadcastRequest }
      },
      {
        path: '/broadcast/BroadcastReg',
        name: '방송신청',
        components: { LeftMenu: BroadcastLeftMenu, Contents: BroadcastReg }
      },
      {
        path: '/broadcast/BroadcastDetail',
        name: '방송신청',
        components: { LeftMenu: BroadcastLeftMenu, Contents: BroadcastDetail }
      },
      {
        path: '/broadcast/BroadcastStop',
        name: '방송중지',
        components: { LeftMenu: BroadcastLeftMenu, Contents: BroadcastStop }
      },
      {
        path: '/broadcast/VodBox',
        name: '방송송출',
        components: { LeftMenu: BroadcastLeftMenu, Contents: VodBox }
      },
      {
        path: '/broadcast/BroadcastSend',
        name: '방송송출',
        components: { LeftMenu: BroadcastLeftMenu, Contents: BroadcastSend }
      },
      {
        path: '/broadcast/TimeTable',
        name: '편성표관리',
        components: { LeftMenu: BroadcastLeftMenu, Contents: TimeTable }
      },
      {
        path: '/broadcast/TimeTableReg',
        name: '편성표관리',
        components: { LeftMenu: BroadcastLeftMenu, Contents: TimeTableReg }
      }
    ]
  },
  {
    path:'/dashboard',
    name:'대시보드',
    component: AdminBoardLayout,
    redirect:'/dashboard/index',
    // beforeEnter: (to, from, next) => {
    //   if(!isTokenExpired(sessionStorage.getItem('refreshToken'))){
    //     next()
    //   }else{
    //     next('/')
    //   }
    // },
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
