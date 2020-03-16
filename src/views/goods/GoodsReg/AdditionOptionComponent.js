const AdditionOption = {
  data () {
    return {
      additionOptionsCounter: 1,
      subAdditionOptionsCounter: 1,
      additionOptions: [
        {id: 1, itemGroupName: 'itemGroupName1', detailsTable: 'detailsTable1', subAdditionOptions: [{id: 1, item: 'item1', price: 'price1', stockQty: 'stockQty1', isSoldout: 'isSoldout1', isHide: 'isHide1'}]}
      ]
    }
  },
  methods: {
    addAdditionOptionRow: function () {
      this.additionOptionsCounter++
      var Ix = this.additionOptionsCounter
      this.additionOptions.push({id: Ix, itemGroupName: 'itemGroupName' + Ix, detailsTable: 'detailsTable' + Ix, subAdditionOptions: [{id: 1, item: 'item1', price: 'price1', stockQty: 'stockQty1', isSoldout: 'isSoldout1', isHide: 'isHide1'}]})
    },
    removeAdditionOptionRow: function (index) {
      this.additionOptions.splice(index, 1)
    },
    addSubAdditionOptionRow: function (object, mainIndex) {
      this.subAdditionOptionsCounter++
      var subInx = this.subAdditionOptionsCounter
      this.additionOptions[mainIndex].subAdditionOptions.push({id: subInx, item: 'item' + subInx, price: 'price' + subInx, stockQty: 'stockQty' + subInx, isSoldout: 'isSoldout' + subInx, isHide: 'isHide' + subInx})
    },
    removeSubAdditionOptionRow: function (mainInx, inx) {
      this.additionOptions[mainInx].subAdditionOptions.splice(inx, 1)
    }
  }
}

export default AdditionOption
