<template>
  <b-row>
      <b-col cols="12">
          <div class="float-left">
              총 9건의 주문이 조회되었습니다.
          </div>
          <div class="float-right">
              TEST111
          </div>
      </b-col>
      <b-col cols="12">
          <b-table
            :fields="fields"
            :busy="true" 
            head-variant="light"
            :select-mode="'single'"
          >
          </b-table>
      </b-col>
  </b-row>
</template>

<script>
export default {
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