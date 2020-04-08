/* eslint-disable no-unused-vars */
export function setOrderItem(item) {
    /******** 가 데이터 (삭제요망) ************* */
    item.orderPay = {
        orderPaySysId: 1,
        orderSysId: 1,
        paidAmount: 15000,
        totalAmount: 20000,
        payTypeCode: 1,
        feeRate: 0.2,
        fee: 2000,
        impUid: 'UID-342',
        createdAt: '2020-04-03 00:00:00',
        updatedAt: '2020-04-03 00:00:00'
    }
    item.iniPay = {
        amount: 200000,
        bank_code: '22',
        bank_name: '신한은행',
        card_name: '신한카드',
        card_quota: 5,
        card_type: '11',
        vbank_code: '1',
        vbank_holder: '김도령',
        vbank_name: '국민은행',
        vbank_num: '352-0699-7190-13'

    }
    /******** 가 데이터 (삭제요망) 끝 ************* */

    

    item.orderProducts.forEach(subItem => {
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
export function codeMapper (item) {
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
            {value: 1, text: '입금확인중'},
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