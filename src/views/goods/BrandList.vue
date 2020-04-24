<template>
    <div id="contents">
        <Text-align></Text-align>
        <div class="row">
            <div class="col-12 mb-2">
                <h5 class="mb-2"><i class="xi-check-circle"></i> 총 <strong>{{ items.length }}</strong>개의 정보가 등록되어있습니다.</h5>
                <div class="float-left">
                    <select class="text_input">
                        <option value="brandName">브랜드명</option>
                    </select>
                    &emsp;
                    <input type="text" class="text_input" style="width:150px" v-model="filterText">
                    <b-button variant="outline-secondary" size="sm">검색</b-button>
                </div>
                <div class="float-right">
                    <select class="text_input" v-model="viewPage">
                        <option value="10">10개 보기</option>
                        <option value="30">30개 보기</option>
                        <option value="50">50개 보기</option>
                    </select>
                </div>
            </div>
            <Brands-list 
                :items="items" 
                :viewPage="viewPage" 
                :searchFilter="filterText"
                @search="searchBrandsList" 
                @refreshList="refreshBrandsList" 
                @delete="deleteBrandsFn" 
            />
        </div>
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
import TextAlign from '@/components/brands/TextAlign'
import BrandsList from '@/components/brands/BrandsTable'
export default {
    data: () => ({
        items: [],
        viewPage: 10,
        filterText: ''
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
            this.axiosGetRequest('/api/v1/brands/list','',this.refreshBrandsList,'',sessionStorage.getItem('accessToken'))
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
                this.items.push(item)
            }
        }
    } 
}
</script>
