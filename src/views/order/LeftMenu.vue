<template>
    <div id="aside">
        <h2>주문/매출관리</h2>
        <dl>
            <dt><font-awesome-icon icon="minus" /> 전체주문</dt>
            <dd class="side_small_menu">
                <a href="/order/order_list" class="">전체주문</a>
            </dd>
            <dt><font-awesome-icon icon="minus" /> 주문관리</dt>
            <dd class="side_small_menu">
                <a href="/order/order_price_before" class="">입금확인중</a>
                <a href="/order/order_price_complete" class="">결제완료</a>
                <a href="/order/order_product_ready" class="">상품준비중</a>
                <a href="/order/order_product_leave" class="">발송완료</a>
                <a href="/order/order_cancel" class="">주문취소</a>
                <a href="/order/order_list?menu=account" class="">구매확정</a>
                <a href="/order/consult_list" class="">주문상담</a>
                <a href="/order/invoice" class="">일괄배송관리</a>
            </dd>
            <dt><font-awesome-icon icon="minus" /> 취소/교환/반품신청관리</dt>
            <dd class="side_small_menu">
                <a href="/order/order_list?menu=cancel_new" class="">주문취소신청(입금전)</a>
                <a href="/order/order_list?menu=cancel_confirm">주문취소신청(입금확인)</a>
                <a href="/order/order_list?menu=change">주문교환신청</a>
                <a href="/order/order_list?menu=change_finish">주문교환완료</a>
                <a href="/order/order_list?menu=return">주문반품신청</a>
                <a href="/order/order_list?menu=return_finish">주문반품완료</a>
            </dd>
            <dt><font-awesome-icon icon="minus" /> 거래증빙서류관리</dt>
            <dd class="side_small_menu">
                <a href="/order/tax_list" class="">세금계산서신청관리</a>
                <a href="/order/cashreceipt_list" class="">현금영수증신청관리</a>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {}
</script>

<style>
</style>