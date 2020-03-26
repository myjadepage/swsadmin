<template>
  <b-row>
      <b-col cols="12" class="mb-2">
          <div class="float-left">
              <b>총 9건의 주문이 조회되었습니다.</b>
          </div>
          <div class="float-right">
              <select class="text_input mr-2">
                  <option>10줄씩 보기</option>
              </select>
              <select class="text_input">
                  <option>주문일자</option>
                  <option>주문번호</option>
              </select>
          </div>
      </b-col>
      <b-col cols="12">
          <b-table
            :fields="fields"
            :items="items"
            :busy="true" 
            head-variant="light"
            :select-mode="'single'"
          >
            <template v-slot:empty>
                <p class="text-center">죄송합니다. 데이터를 찾을수 없습니다.</p>
            </template>
          </b-table>
      </b-col>
  </b-row>
</template>

<script>
export default {
    props: ['items'],
    data: () => ({
        fields: [
            {key: 'no', label: 'NO', class: 'text-center'},
            {key: 'order_code', label: '주문번호', class: 'text-center'},
            {key: 'order_date', label: '주문일시', class: 'text-center'},
            {key: 'cost_total', label: '총주문금액', class: 'text-center'},
            {key: 'cost_delivery', label: '배송비', class: 'text-center'},
            {key: 'order', label: '주문자', class: 'text-center'},
            {key: 'cost_status', label: '결재상태', class: 'text-center'},
            {key: 'progress', label: '진행상태', class: 'text-center'}
        ]
    })
}
</script>

<style>

</style>