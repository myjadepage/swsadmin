/* eslint-disable no-unused-vars */
import $ from 'jquery'
export default {
  data: () =>({
    // 1차 카테고리
    categories1Level: {
        categoriesLevel: 1,
        parentSysId: '',
        children: []
    },
    // 2차 카테고리
    categories2Level: {
        categoriesLevel: 2,
        parentSysId: '',
        children: []
    },
    // 3차 카테고리
    categories3Level: {
        categoriesLevel: 3,
        parentSysId: '',
        children: []
    },
    // 4차 카테고리
    categories4Level: {
        categoriesLevel: 4,
        parentSysId: '',
        children: []
    },
    // 5차 카테고리
    categories5Level: {
        categoriesLevel: 5,
        parentSysId: '',
        children: []
    }
  }),
  mounted () {
      
  },
  methods: {
    selectLevelCategory: function (item) {
        switch(item.categoryLevel){
            case 1:
                this.selectCategory.categories[0] = item
                this.selectCategory.categories.splice(1,1)
                this.selectCategory.categories.splice(2,1)
                this.selectCategory.categories.splice(3,1)
                this.selectCategory.categories.splice(4,1)
                $('.category-item.add-btn').css('display', 'none')
                $('.category-item.add-btn.category1').css('display', 'block')
                $('.category-item.add-btn.category2').css('display', 'block')
                break
            case 2:
                this.selectCategory.categories[1] = item
                this.selectCategory.categories.splice(2,1)
                this.selectCategory.categories.splice(3,1)
                this.selectCategory.categories.splice(4,1)
                $('.category-item.add-btn').css('display', 'none')
                $('.category-item.add-btn.category1').css('display', 'block')
                $('.category-item.add-btn.category2').css('display', 'block')
                $('.category-item.add-btn.category3').css('display', 'block')
                break
            case 3:
                this.selectCategory.categories[2] = item
                this.selectCategory.categories.splice(3,1)
                this.selectCategory.categories.splice(4,1)
                $('.category-item.add-btn').css('display', 'none')
                $('.category-item.add-btn.category1').css('display', 'block')
                $('.category-item.add-btn.category2').css('display', 'block')
                $('.category-item.add-btn.category3').css('display', 'block')
                $('.category-item.add-btn.category4').css('display', 'block')
                break
            case 4:
                this.selectCategory.categories[3] = item
                this.selectCategory.categories.splice(4,1)
                $('.category-item.add-btn').css('display', 'none')
                $('.category-item.add-btn.category1').css('display', 'block')
                $('.category-item.add-btn.category2').css('display', 'block')
                $('.category-item.add-btn.category3').css('display', 'block')
                $('.category-item.add-btn.category4').css('display', 'block')
                $('.category-item.add-btn.category5').css('display', 'block')
                break
        }
    },
    setSelectCategory: function (item){
        this.selectLevelCategory(item)
        this.setCloseButtonEventFn()
        this.selectCategory.title = item.name
        this.selectCategory.feeRate = ($.isNumeric(item.feeRate) ? item.feeRate * 100 : 0)
        this.selectCategory.isHide = item.isHide
        this.selectCategory.categoryCode = item.categoryCode
        this.selectCategory.categorySysId = item.categorySysId
        this.selectCategory.categoryLevel = item.categoryLevel
        this.selectCategory.parentSysId = item.parentSysId
        this.selectCategory.topDesignHTML = item.topDesignHTML
    },
    // 카테고리 로딩 : 카테고리 불러오기
    clickCategoryLevel: function (item) {
        this.setSelectCategory(item)
        const param = {
            categoryLevel: (item.categoryLevel + 1),
            parentSysId: item.categorySysId
        }
        this.axiosGetRequest('/api/v1/categories', param, this.insertCategoryFn, this.exceptionCategoryFn)
    },
    // 카테고리 로딩 : 로딩된 카테고리 삽입
    insertCategoryFn: function (res) {
        var data = res.data.jsonData.categories
        var targetObject = this.loadCategoryObject(res.data.jsonData.categoryLevel)
        targetObject.children.splice(0)
        targetObject.parentSysId = data[0].parentSysId
        for (var i = 0; i < data.length; i++) {
          targetObject.children.push(data[i])
        }
    },
    // 카테고리 로딩 : 카테고리 레벨에 따른 배열객체 불러오기
    loadCategoryObject: function (lv) {
        switch(lv) {
            case 1:
                return this.categories1Level
            case 2:
                return this.categories2Level
            case 3:
                return this.categories3Level
            case 4:
                return this.categories4Level
            case 5:
                return this.categories5Level
        }
    },
    // 카테고리 클릭시에 하위 카테고리 없는 경우, 초기화 
    exceptionCategoryFn: function (err) {
      switch(parseInt(this.selectCategory.categoryLevel)) {
          case 0:
              this.categories2Level.children.splice(0)
              this.categories3Level.children.splice(0)
              this.categories4Level.children.splice(0)
              this.categories5Level.children.splice(0)
              break
          case 1:
              this.categories2Level.children.splice(0)
              this.categories3Level.children.splice(0)
              this.categories4Level.children.splice(0)
              this.categories5Level.children.splice(0)
              break
          case 2:
              this.categories3Level.children.splice(0)
              this.categories4Level.children.splice(0)
              this.categories5Level.children.splice(0)
              break
          case 3:
              this.categories4Level.children.splice(0)
              this.categories5Level.children.splice(0)
              break
          case 4:
              this.categories5Level.children.splice(0)
              break
      }
      console.log(err)
    },
    // 카테고리 아이템 : 삭제버튼 이벤트
    setCloseButtonEventFn: function () {
        $('.category-dashboard .category-item').find('.close-btn').css('display','none')
        $('.category-dashboard .category-item').find('.modify-btn').css('display','none')
    },
    categoryOverFn: function (event) {
        this.setCloseButtonEventFn()
        $(event.target).siblings('a').toggle()
    },
    // ROOT 카테고리 추가
    showInsertModal: function (categoryLevel) {
        this.insertSelectCategory.text = ''
        var parentsCategory = ''
        if (categoryLevel === 1) {
            this.insertSelectCategory.parentSysId = 0
        } else {
            // 2를 뺀 이유 : 배열이 0부터 시작하는 것 + 본 차수보다 1차수 위의 것을 구해야 하는것
            this.insertSelectCategory.parentSysId = this.selectCategory.categories[categoryLevel - 2].categorySysId
        }
        this.insertSelectCategory.categoryLevel = categoryLevel
        this.selectCategory.title=''
        this.$refs['root-my-modal'].show()
    },
    // 카테고리 등록
    insertRootCategory: function (event) {
        var getData = this.insertSelectCategory
        var param = {
            categoryLevel: getData.categoryLevel,
            parentSysId: getData.parentSysId,
            name: getData.text
        }
        var failcallbackFn = function (err) {
            console.log(err)
        }
        this.axiosPostRequest('/api/v1/categories', {jsonData: param}, this.insertSuccessFn, failcallbackFn)
    },
    // 등록 성공
    insertSuccessFn: function (res) {
        var result = res.data.jsonData
        if (result.code === 200) {
            alert('카테고리가 등록되었습니다.')
            this.hideModelFn('root-my-modal')
            this.reloadCategoryData()
        }
    },
    hideModelFn: function (modalId){
        this.$refs[modalId].hide()
    },
    // 등록 성공후 데이터 리로딩 
    reloadCategoryData: function () {
        var param = {
            categoryLevel: this.insertSelectCategory.categoryLevel,
            parentSysId: this.insertSelectCategory.parentSysId
        }
        this.axiosGetRequest('/api/v1/categories',param, this.reloadInsertCategoryFn, this.exceptionCategoryFn)
    },
    // 카테고리 로딩 : 로딩된 카테고리 삽입
    reloadInsertCategoryFn: function (res) {
        var data = res.data.jsonData.categories
        var targetObject = this.loadCategoryObject(res.data.jsonData.categoryLevel)
        targetObject.children.splice(0)
        targetObject.parentSysId = data[0].parentSysId
        switch(targetObject.categoryLevel){
            case 1:
                this.categories2Level.children.splice(0)
                this.categories3Level.children.splice(0)
                this.categories4Level.children.splice(0)
                this.categories5Level.children.splice(0)
                break
            case 2:
                this.categories3Level.children.splice(0)
                this.categories4Level.children.splice(0)
                this.categories5Level.children.splice(0)
                break
            case 3:
                this.categories4Level.children.splice(0)
                this.categories5Level.children.splice(0)
                break
            case 4:
                this.categories5Level.children.splice(0)
                break
        }
        for (var i = 0; i < data.length; i++) {
          targetObject.children.push(data[i])
        }
    },

    // 카테고리 삭제
    deleteCategory: function (item) {
        if (confirm('하위의 카테고리가 존재할수 있습니다. 삭제하시겠습니까?')) {
            var param = {
                categorySysId: item.categorySysId,
                categoryCode: item.categoryCode
            }
            var failFn = function (err) {
                console.log(err)
            }
            this.axiosDeleteRequest('/api/v1/categories/'+item.categorySysId, {jsonData: param}, this.deleteCategorySuccess, failFn)
        }
    },
    deleteCategorySuccess: function (res) {
        var data = res.data.jsonData
        if(data.code === 200){
            alert('삭제가 완료되었습니다.')
            this.insertSelectCategory.categoryLevel = (this.selectCategory.categoryLevel === 0 ? 0 : this.selectCategory.categoryLevel - 1)
            this.insertSelectCategory.parentSysId = this.selectCategory.parentSysId
            this.reloadCategoryData()
        }
    },
    // 카테고리 디자인 및 하단 수정
    modifyCategory: function (event) {
        var param = {
            categorySysId: this.selectCategory.categorySysId,
            categoryLevel: this.selectCategory.categoryLevel,
            categoryCode: this.selectCategory.categoryCode,
            parentSysId: this.selectCategory.parentSysId,
            name: this.selectCategory.title,
            feeRate: parseInt(this.selectCategory.feeRate) / 100,
            isHide: Boolean(this.selectCategory.isHide),
            topDesignHTML: (this.isEmpty(this.selectCategory.topDesignHTML) ? '' : this.selectCategory.topDesignHTML),
            isApplyChildCategory: Boolean(this.selectCategory.isApplyChildCategory)
        }
        var failcallbackFn = function (err) {
            alert('카테고리 실패 !')
            console.log(err)
        }
        this.axiosPatchRequest('/api/v1/categories/'+this.selectCategory.categorySysId, {jsonData: param}, this.modifyCategorySuccess, failcallbackFn)
    },
    modifyCategorySuccess: function (res) {
        var result = res.data.jsonData
        if (result.code === 200) {
            alert('카테고리가 등록되었습니다.')
            this.insertSelectCategory.categoryLevel = this.selectCategory.categoryLevel
            this.insertSelectCategory.parentSysId = this.selectCategory.parentSysId
            this.reloadCategoryData()
        }
    }
  }
}