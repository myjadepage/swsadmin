<template>
    <div class="option_tab option_kind_2_tab">
        <ul class="option_explain">
            <li>재고를 설정할 수 없는 입력방식입니다. (옵션가격 설정가능)</li>
            <li>각 옵션항목은 " <strong>;</strong> "로 구분하여 입력하고, 옵션가격이 있는 경우 각 옵션항목내에서 " <strong>^</strong> "로 구분하여 입력합니다.<br>(옵션가격이 없는 경우 제외 가능)</li>
            <li><strong class="red">옵션가격은 반드시 ","(콤마) 없이 숫자로만 입력해야 합니다.</strong></li>
            <li>품절된 옵션항목은 각 옵션항목의 마지막에 구분자를 삽입하고 <strong class="red">"품절"</strong> 을 입력해 주세요. 예)옵션^0^품절</li>
            <li>옵션항목은 최대 <strong class="red">2,000자</strong> 까지 입력할 수 있습니다.</li>
        </ul>

        <dl class="option_exam mgt10">
            <dt><strong>입력 예)</strong></dt>
            <dd>
                1. 기본입력: 선택안함;옵션 A^1000;옵션 B^-1000^품절;옵션 C^2000<br> 2. 품절입력: 옵션 A^품절;옵션 B^1500^품절;옵션 C^1000<br> 3. 추가구성: 선택안함;A상품^10000;B상품^11000<br>
            </dd>
        </dl>

        <div class="tr mgb5">
            <b-button @click="addProductOptionRow" size="sm">옵션 추가</b-button>
        </div>
        <table id="tb_option_100" summary="상품 일반옵션 폼 테이블 입니다." class="option_gnenral">
            <caption>상품 일반옵션 폼 테이블</caption>
            <colgroup>
                <col width="10">
                <col width="50">
                <col width="*">
                <col width="10">
                <col width="10">
            </colgroup>
            <thead>
                <tr>
                    <th>No</th>
                    <th>옵션명</th>
                    <th colspan="2">옵션항목</th>
                    <th class="last"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in nomarlOptions" :key="index">
                    <template v-if="item.procTypeCode !== 4">
                      <td>-</td>
                      <td class="txt"><input type="text" class="text_input" style="width: 90%;" maxlength="50" v-model="item.name"></td>
                      <td><textarea rows="3" class="text_input" maxlength="2000" style="width: 100%" v-model="item.content"></textarea></td>
                      <td class="size"><span>0</span><span style="color:black">/200</span></td>
                      <td><b-button variant="light" size="sm" @click="productsOptionRemove(item)">항목 삭제</b-button></td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  props: ['nomarlOptions','productData'],
  methods: {
    productsOptionRemove: function (item) {
      item.procTypeCode = 4
    },
    // setKeyUpCounter: function (obj) {
    //   var wordSizer = document.getElementsByName(obj.normalWordsize)
    //   var content = document.getElementsByName(obj.normalOptionContent)
    //   $(wordSizer).html(content[0].textLength)
    // },
    addProductOptionRow: function () {
      this.nomarlOptions.push({
        name: '',
        content: '',
        procTypeCode: 2
      })
    }
  }
}
</script>

<style>

</style>