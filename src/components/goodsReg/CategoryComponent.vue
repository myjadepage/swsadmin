<template>
  <b-table 
    :items="cateogries"
    :fields="fields" 
    small
  >
    <template v-slot:cell(selected) = "category">
      <template v-if="category.item.procTypeCode !== 4">
        <input type="radio" name="selectCategoeyRadio" />
      </template>
    </template>
    <template v-slot:cell(text) = "category">
      <template v-if="category.item.procTypeCode !== 4">
        <p v-html="generateCategoryList(category.item)"></p>
      </template>
    </template>
    <template v-slot:cell(delete) = "category">
      <template v-if="category.item.procTypeCode !== 4">
        <b-button variant="outline-danger" size="sm" @click="category.item.procTypeCode = 4">삭제</b-button>
      </template>
    </template>
  </b-table>
  <!-- <table id="tb_category" summary="상품 분류 목록 입니다.">
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
  </table> -->
</template>
<script>
export default {
  data: () => ({
    fields: [
      {key: 'selected', label: '기본', thStyle: 'width: 50px'},
      {key: 'text', label: '분류'},
      {key: 'delete', label: '삭제', thStyle: 'width: 50px'}
    ],

  }),
  props: ['cateogries'],
  methods: {
    generateCategoryList: function (item) {
      let textArray = new Array()
      for (let i = 0 ; i < 5 ; i++) {
        if (item['categorySysId' + (i + 1)] > 0) {
          textArray[i] = item['categoryText' + (i + 1)]
        }
      }
      return textArray.join('>')
    },
    deleteRow: function (event, item) {
      this.cateogries.splice(item.index, 1)
    }
  }
};
</script>