<template>
  <div class="addition_container" style="width:100%">
    <ul class="over_h mgb10">
      <li class="fr">
        <b-button @click="addAdditionOptionRow()">추가구성 추가</b-button>
      </li>
    </ul>
    <div class="addition_unit" v-for="(item, mainIndex) in additionOptions" :key="mainIndex">
      <template v-if="item.procTypeCode !== 4">
        <dl class="addition_unit addition_dl">
          <dt>추가구성명</dt>
          <dd>
            <input type="text" v-model="item.itemGroup" class="text_input" maxlength="50" />
          </dd>
        </dl>
        <table class="addition_unit addition_table">
          <col width="*" />
          <col width="10%" />
          <col width="10%" />
          <col width="9%" />
          <col width="9%" />
          <col width="10%" />
          <thead>
            <tr>
              <th>추가구성항목</th>
              <th>추가금액</th>
              <th>재고수량</th>
              <th>품절여부</th>
              <th>숨김여부</th>
              <th>
                <b-button size="sm" style="height: 19px;font-size: 10px;" @click="addSubAdditionOptionRow(item, mainIndex)">추가</b-button>&emsp;
                <b-button size="sm" style="height: 19px;font-size: 10px;" variant="danger" @click="removeAdditionOptionRow(item)" >삭제</b-button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subItem, index) in item.subAdditionOptions" :key="index">
              <template v-if="subItem.procTypeCode !== 4">
                <td><input type="text" class="text_input" v-model="subItem.item" /></td>
                <td><input type="text" class="text_input number_input" v-model="subItem.price" /></td>
                <td><input type="text" class="text_input number_input" v-model="subItem.stockQty" /></td>
                <td style="vertical-align:middle"><input type="checkbox" v-model="subItem.isSoldout" /></td>
                <td><input type="checkbox" v-model="subItem.isHide" /></td>
                <td><b-button variant="danger" size="sm" style="height: 19px;font-size: 10px; margin-left: 37px" @click="removeSubAdditionOptionRow(mainIndex, subItem)">삭제</b-button></td>
              </template>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["additionOptions", "productData"],
  methods: {
    addAdditionOptionRow: function() {
      this.additionOptions.push({
        itemGroup: "",
        subAdditionOptions: [
          {
            item: "",
            price: "",
            stockQty: "",
            isSoldout: false,
            isHide: false,
            procTypeCode: 2
          }
        ],
        procTypeCode: 2
      });
    },
    removeAdditionOptionRow: function(_item) {
      _item.procTypeCode = 4
    },
    addSubAdditionOptionRow: function(object, mainIndex) {
      this.additionOptions[mainIndex].subAdditionOptions.push({
        item: "",
        price: "",
        stockQty: "",
        isSoldout: false,
        isHide: false,
        procTypeCode: 2
      });
    },
    removeSubAdditionOptionRow: function(mainInx, item) {
      item.procTypeCode = 4
    }
  }
};
</script>