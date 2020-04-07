/* eslint-disable no-unused-vars */
import commonJs from '@/assets/js/common.js'

export function setOrderItem(item) {
    // 결재형태 임시값 ***** 삭제요망
    item.orderPay = {
        payTypeCode: 1
    }
    // ******************************
    
    for(let _k in item){
        if(('amount # couponDiscount # usedPoint').indexOf(_k) > -1) {
            item[_k] = (new Intl.NumberFormat().format(item[_k]))+' 원'
        } else if (('orderPay').indexOf(_k) > -1) {
            item.orderPay.payTypeCode = codeMapper({type: 'payTypeCode', value: item.orderPay.payTypeCode})
        } else if(('statusCode').indexOf(_k) > -1) {
            item.statusCode = codeMapper({type: 'statusCode', value: item.statusCode})
        }
    }
    item.orderProducts.forEach(subItem => {
        for (let _p in subItem) {
            if (_p === 'deliveryPriceTypeCode') {
                if (!commonJs.methods.isEmpty('deliveryPriceTypeCode')) {
                    subItem[_p] = codeMapper({type: 'deliveryPriceTypeCode', value: subItem[_p]})
                }
            } else if(_p.match(/Amount/gi) !== null || _p.match(/price/gi) !== null) {
                subItem[_p] = (new Intl.NumberFormat().format(subItem[_p]))
            } else if(('statusCode').indexOf(_p) > -1) {
                subItem.statusCode = codeMapper({type: 'statusCode', value: subItem.statusCode})
            }
        }
        subItem._showDetails = true
    })
    item._showDetails = true

    return item
}

/**
 * 
 * item.type: 코드타입
 * item.value: 코드값 
 */
function codeMapper (item) {
    const codeType = item.type
    const codeValue = Number.parseInt(item.value)
    const codeData = {
        payTypeCode: [
            {value: 0, text: '전체'},
            {value: 1, text: '온라인입금'},
            {value: 2, text: '신용카드'},
            {value: 3, text: '계좌이체'},
            {value: 4, text: '가상계좌'}
        ],
        deliveryPriceTypeCode: [
            {value: 0, text: '무료배송'},
            {value: 1, text: '착불'},
            {value: 2, text: '선불'},
            {value: 3, text: '판매자정책'},
            {value: 4, text: '기본정책'}
        ],
        statusCode: [
            {value: 1, text: '입금확인중..'},
            {value: 2, text: '결재완료'},
            {value: 3, text: '상품준비중'},
            {value: 4, text: '발송완료'},
            {value: 5, text: '구매확정'},
            {value: 100, text: '주문취소신청'},
            {value: 101, text: '주문취소신청완료'},
            {value: 102, text: '주문교환신청'},
            {value: 103, text: '주문교환신청완료'},
            {value: 104, text: '주문반품신청'},
            {value: 105, text: '주문반품신청완료'}
        ]
    }
    let obj = {}
    codeData[codeType].forEach(item => {
        if (codeValue === item.value) {
            obj = item
        }
    })
    return obj
}