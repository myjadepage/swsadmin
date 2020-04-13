<template>
 <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> 판매자 신청목록</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>입점업체관리</li>
                    <li>판매자관리</li>
                    <li class="on">판매자 신청목록</li>
                </ul>
                <ul class="helpbox">
                    <li>쇼핑몰에 판매자 신청하신 목록을 관리하는 곳 입니다.</li>
                    <li>판매자의 상세내역을 잘 검토하시여 판매자 승인을 해 주시면 됩니다.</li>
                    <li>판매자 신청 목록에서 승인을 하시면 판매자목록으로 자동 등록됩니다.</li>
                </ul>

                <div class="section_head">
                    <h4>총 <strong class="red">{{ totalPage }}</strong>건이 있습니다.</h4>
                    <div>
                        <select id="skey" name="skey" class="text_input">
                            <option value="">전체</option>
                            <option value="id">아이디</option>
                            <option value="name">업체명</option>
                            <option value="charger">담당자</option>
                            <option value="bizno">사업자등록번호</option>
                            <option value="tel">전화번호</option>
                            <option value="mobile">핸드폰번호</option>
                            <option value="email">이메일</option>
                        </select>
                        <input type="text" name="sword" class="text_input" style="width:150px; margin:0 5px">
                        <b-button variant="outline-secondary" size="sm">검색</b-button>
                    </div>
                </div>

                <form name="Frm" style="margin-top:10px">
                    <b-table
                        hover
                        head-variant="light"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :fields="fields"  
                        :items="dealerData"
                    >
                        <template v-slot:table-colgroup>
                            <col width="17%">
                            <col width="*">
                            <col width="13%">
                            <col width="13%">
                            <col width="13%">
                            <col width="10%">
                            <col width="150">
                            <!-- <col width="50"> -->
                        </template>
                        <template v-slot:cell(detail) = "detail">
                            <b-button variant="outline-secondary" @click="$router.push(`/mim/dealer_detail/${ detail.item.sellerSysId}`)">상세정보</b-button>                              
                        </template>
                        <!-- <template v-slot:cell(check)>
                            <input type="checkbox"/>
                        </template> -->
                    </b-table>
<!-- 
                    <div class="btn_right">
                        <b-button variant="outline-danger" size="lg">선택삭제</b-button>
                    </div> -->

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
            totalPage: 0,
            currentPage: 1,
            perPage: 10,           
            fields:[
                {key : 'sellerId', label : '아이디', sortable: true},
                {key : 'name', label : '판매점명', sortable: true},
                {key : 'managerName', label : '담당자', sortable: true},
                {key : 'tel', label : '전화번호', sortable: true},
                {key : 'mobile', label : '휴대폰번호', sortable: true},
                {key : 'createdAt', label : '신청일', sortable : true},
                {key : 'detail', label : '상세정보', sortable: false},
                // {key : 'check', label : '',sortable: false}
            ],
            dealerData: [],
        }
    },
    mounted () {
        this.axiosGetRequest('/api/v1/sellers',{'proposalStatusCode' : 2}, this.loadDealerList)
    },
    methods: {
        loadDealerList(res) {
           let result = res.data.jsonData.sellers
           console.log(result)
           for (let i = 0 ; i < result.length ; i++) {
               this.dealerData.push({
                   sellerSysId: result[i].sellerSysId,
                   sellerId: result[i].sellerId,
                   name: result[i].name,
                   managerName: result[i].managerName,
                   tel: result[i].tel,
                   mobile: result[i].mobile,
                   createdAt: result[i].createdAt,
                   detail: result[i].sellerSysId,
                   check: ''
               })
           }
           this.totalPage = result.length
           this.currentPage = 1
        }
    }
}
</script>

<style>

</style>