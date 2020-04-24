<template>
    <div id="contents">
        <Text-align></Text-align>
        <b-row cols="1">
            <b-col>
                <div class="section_head"> 
                    <h4>총 <strong class="red">{{ items.length }}</strong>개의 정보가 등록되어있습니다.</h4>
                   <div class="mgb5">
                        <select class="text_input">
                            <option value="name">브랜드명</option>
                        </select>
                        <input type="text" class="text_input" style="width:150px; margin:0 5px">                       
                        <b-button variant="outline-secondary" size="sm"> <font-awesome-icon icon="search" size="sm"/>&emsp;검색 </b-button>
                    </div>
                </div>
            </b-col>
            <Brands-list :items="items" @search="searchBrandsList" @refreshList="refreshBrandsList" @delete="deleteBrandsFn" />
        </b-row>
        <div class="float-right">
            <b-button variant="outline-secondary" size="sm" href="/goods/brand_reg"><font-awesome-icon icon="plus-circle" /> 추가하기</b-button>
        </div>
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
import TextAlign from '@/components/brands/TextAlign'
import BrandsList from '@/components/brands/BrandsTable'
export default {
    data: () => ({
        items: []
    }),
    mixins: [commonJs],
    components: {
        TextAlign,
        BrandsList
    },
    mounted () {
        this.loadBrandList()
    },
    methods: {
        loadBrandList: function () {
            this.axiosGetRequest('/api/v1/brands','',this.refreshBrandsList)
        },
        deleteBrandsFn: function (key) {
            if (confirm('브랜드를 삭제하시겠습니까?')) {
                this.axiosDeleteRequest('/api/v1/brands/'+key, {jsonData: {brandSysId: key}}, this.loadBrandList)
            }
        },

        searchBrandsList: function () {
            
        },
        // 브랜드 리스트 리로딩 및 초기 로딩     
        refreshBrandsList: function (res) {
            let loadData = res.data.jsonData.brands
            this.items.splice(0)
            for (const item of loadData) {
                this.items.push({no: item.brandSysId, brandName: item.name, image: item.imageUrl, managerName: item.managerName})
            }
    }
  }
}
</script>
