<template>
<div id="contents">
    <h3><font-awesome-icon icon="play-circle" />  브랜드관리</h3>
    <ul class="navi">
        <li class="home"><a href="/" target="_top">홈</a></li>
        <li>입점업체관리</li>
        <li>판매자관리</li>
        <li class="on">브랜드관리</li>
    </ul>
    <ul class="helpbox">
        <li>판매자에게서 신청된 브랜드에 관하여 관리합니다.</li>
    </ul>

    <div class="section_head">
        <h4>총 <strong class="red">2</strong>건의 정보가 등록되어 있습니다.</h4>
        <div>                         
            <select id="skey" name="skey" class="text_input">
                <option value="brand">브랜드명</option>
                <option value="dealer">업체명</option>
            </select>
             <input type="text" name="sword" class="text_input" style="width:150px; margin:0 5px">
            <b-button variant="outline-secondary" size="sm">검색</b-button>
        </div>
    </div>
    <form name="Frm" style="margin-top:10px">
        <b-table
            hover
            head-variant="light"
            :fields="fields"  
            :items="brandData"
        >
            <template v-slot:table-colgroup>
                <col width="100">
                <col width="250">
                <col width="*">
                <col width="200">
                <col width="250">
                <col width="100">
            </template>
            <template v-slot:cell(setting)>
                <b-button variant="secondary">수정</b-button>
                <b-button variant="secondary">삭제</b-button>
                <b-button variant="secondary">승인</b-button>
            </template>
        </b-table>

        <b-pagination 
            v-model="currentPage" 
            :total-rows="totalPage"
            :per-page="perPage"
             align="center"
        >
        </b-pagination>
    </form>
</div>
</template>

<script>
import commonJs from '@/assets/js/common.js'

export default {
     mixins: [commonJs],
     data() {
         return {
            brandData:[],
            totalPage: 0,
            currentPage: 1,
            perPage: 10,
            fields:[
                {key : 'no', label : 'No', sortable: true},
                {key : 'name', label : '판매점명', sortable: true},
                {key : 'brand', label : '브랜드명', sortable: true},
                {key : 'state', label : '상태', sortable: true},
                {key : 'mobile', label : '휴대폰번호', sortable: true},
                {key : 'setting', label : '관리', sortable : false},               
             ]
         }
     },
    mounted () {
        this.axiosGetRequest(`/api/v1/sellers/1/brands`,'',this.loadBrandList)
    },
     methods: {
        loadBrandList(res) {
            console.log(res)
        }
     }

}
</script>

<style>

</style>