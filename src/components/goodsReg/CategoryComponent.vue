<template>
  <table id="tb_category" summary="상품 분류 목록 입니다.">
    <caption>상품 분류 목록</caption>
    <colgroup>
      <col width="20" />
      <col width="300" />
      <col width="50" />
      <col width="*" />
    </colgroup>
    <thead>
      <tr>
        <th>기본</th>
        <th>분류</th>
        <th>삭제</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in categoryTable" :key="index">
        <template v-if="row.procTypeCode !== 4">
          <td>
            <input
              type="radio"
              :id="row.id"
              :value="row.id"
              name="selectCategory"
              @change="$emit('onSelectCate',$event)"
              v-model="selectedCategoryTable"
            />
          </td>
          <td style="text-align: left">{{ row.text }}</td>
          <td>
            <b-button variant="light" size="sm" style="height: 18px" @click="row.procTypeCode=4">삭제</b-button>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data: () => ({}),
  props: ["categoryTable", "selectedCategoryTable", "productData"],
  methods: {}
};
</script>