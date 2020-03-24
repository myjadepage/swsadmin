<template>
    <div id="contents">
        <Text-align></Text-align>
        <b-row cols="1">
            <b-col>
                <h4><i class="xi-check-circle"></i> 총 <strong>{{ items.length }}</strong>개의 정보가 등록되어있습니다.</h4>
                <div>
                    <select id="skey" name="skey" class="text_input">
                        <option value="name">브랜드명</option>
                    </select>
                    <input type="text" name="sword" value="" class="text_input" style="width:150px">
                    <button type="submit" class="btn btn-sm btn-default">검색</button>
                </div>
            </b-col>
            <Brands-list
                :items="items"
                @search="searchBrandsList"
                @refreshList="refreshBrandsList"
                @delete="deleteBrandsFn"
            ></Brands-list>
        </b-row>
        <div class="float-right">
            <b-button href="/brand_reg"><font-awesome-icon icon="plus-circle" /> 추가하기</b-button>
        </div>
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
import TextAlign from '@/components/Brands/TextAlign'
import BrandsList from '@/components/Brands/BrandsTable'
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
        this.axiosGetRequest('/api/v1/brands','',this.refreshBrandsList)
    },
    methods: {
        deleteBrandsFn: function (key) {
            if (confirm('브랜드를 삭제하시겠습니까?')) {
                this.axiosDeleteRequest('/api/v1/brands/'+key, {jsonData: {brandSysId: key}}, function (res) {
                    console.log(res)
                    alert('삭제가 완료되었습니다.')
                })
            }
        },
        searchBrandsList: function () {
            
        },
        // 브랜드 리스트 리로딩 및 초기 로딩     
        refreshBrandsList: function (res) {
            let loadData = res.data.jsonData.brands
            for (const item of loadData) {
                this.items.push({no: item.brandSysId, brandName: item.name, image: item.imageUrl})
            }
    }
  }
}
</script>
