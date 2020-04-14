<template>
<div>
  <div class="section_head">
      <h4>상품 선택</h4>
      <div>
          <b-button variant="outline-secondary" style="margin-right:5px" @click="$refs.addPrdModal.show()">상품추가</b-button>
          <b-button variant="outline-danger">상품삭제</b-button>
       </div>
  </div>

  <b-modal ref="addPrdModal">
        <template v-slot:modal-title>
            <font-awesome-icon icon="info-circle" /> 회원정보
        </template>
        <table class="mform">
            <caption>회원 정보 내역</caption>
            <colgroup><col width="70"><col width="*"><col width="70"><col width="*"></colgroup>
            <tbody>
                <tr>
                    <th>회원상태</th>
                    <td colspan="3"><span>일반</span></td>
                </tr>
                <tr>
                    <th>아이디</th>
                    <td colspan="3"><span>mallstore</span></td>
                </tr>
                <tr>
                    <th>성명</th>
                    <td>몰스토어</td>
                    <th>회원등급</th>
                    <td>코알라회원</td>
                </tr>             
            </tbody>
        </table>
    </b-modal>
</div>
</template>

<script>
import commonJs from '@/assets/js/common.js'

export default {
    mixins: [ commonJs ],
    data() {
        return {
            
        }
    },
    methods: {
    }
}
</script>

<style>

</style>