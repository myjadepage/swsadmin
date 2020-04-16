<template>
  <div id="contents">
    <h3><font-awesome-icon icon="play-circle" /> 회원목록</h3>
    <ul class="navi">
        <li class="home"><a href="/" target="_top">홈</a></li>
        <li>회원관리</li>
        <li>회원관리</li>
        <li class="on">회원목록</li>
    </ul>
    <ul class="helpbox">
        <li>다음은 사이트에 가입한 회원목록 입니다.</li>
        <li><strong>총구매금액</strong> 산출 = (판매가 + 옵션가) × 수량</li>
        <li>배송비 및 적립금, 쿠폰 등의 할인내역은 금액에 포함되지 않습니다.</li>
    </ul>


    <form name="sFrm">
        <table class="t_form">
            <caption>회원 검색 폼</caption>
            <tbody>
                <tr>
                    <th>가입일</th>
                    <td>
                        <sws-date :parentData="FilterFields"></sws-date>
                    </td>
                </tr>
                <tr>
                    <th>최근접속일</th>
                    <td>
                        <sws-date :parentData="FilterFields"></sws-date>
                    </td>
                </tr>
                <tr>
                    <th>그룹별</th>
                    <td>
                        <select id="slevel" name="slevel" class="text_input">
                            <option value="">회원등급</option>
                            <option value="1">일반회원</option>
                            <option value="4">코알라회원</option>
                        </select>
                        <select id="sgender" name="sgender" class="text_input">
                            <option value="">성별</option>
                            <option value="100">남자</option>
                            <option value="200">여자</option>
                        </select>
                </td>
                </tr>
                <tr>
                    <th>회원상태</th>
                    <td>
                        <label><input type="radio" name="ssleep" value="0" checked>전체회원</label>
                        <label style="margin:0 20px"><input type="radio" name="ssleep" value="1">일반회원</label>
                        <label><input type="radio" name="ssleep" value="2">휴면회원</label>
                    </td>
                </tr>
                <tr>
                    <th>총구매금액</th>
                    <td>
                        <input type="text" class="text_input" style="width:100px" > 원 ~
                        <input type="text" class="text_input" style="width:100px" > 원
                    </td>
                </tr>
                <tr>
                    <th>보유적립금</th>
                    <td>
                        <input type="text" class="text_input" style="width:100px" > 원 ~
                        <input type="text" class="text_input" style="width:100px" > 원
                    </td>
                </tr>
                <tr>
                    <th>직접검색</th>
                    <td>
                        <select id="skey" name="skey" class="text_input">
                            <option value="">전체</option>
                            <option value="id">회원아이디</option>
                            <option value="name">회원명</option>
                            <option value="tel">전화번호</option>
                            <option value="mobile">휴대폰번호</option>
                            <option value="email">이메일</option>
                        </select>
                    <input type="text" name="sword" class="text_input" style="width:300px">
                        <b-button variant="secondary" size="sm" >검색</b-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="section_head">
            <h4>총 <strong class="red"> {{ totalPage }}</strong> 명의 회원이 조회 되었으며, 오늘 가입한 회원은 <strong class="red">0</strong> 명입니다.</h4>                        
        </div>
    </form>


    <form name="Frm">
        <b-table
            hover
            head-variant="light"
            :per-page="perPage"
            :current-page="currentPage"
            :fields="fields"  
            :items="memberData"
        >
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                    </div>
            </template>
            <template v-slot:cell(check)>
                <input type="checkbox"/>
            </template>
            <template v-slot:cell(state)>
                <p>{{ state }}</p>
            </template>
            <template v-slot:empty>
                <p class="text-center">죄송합니다. 데이터를 찾을수 없습니다.</p>
            </template>
        </b-table>
                    <table class="t_list">
                        <caption>가입한 회원 목록</caption>
                        <colgroup>
                            <col width="30">
                            <col width="7%">
                            <col width="*">
                            <col width="10%">
                            <col width="12%">
                            <col width="35">
                            <col width="35">
                            <col width="12%">
                            <col width="7%">
                            <col width="9%">
                            <col width="12%">
                            <col width="9%">
                        </colgroup>                       
                    </table>

                    <div class="section_head">
                        <h4><font-awesome-icon icon="check-circle" /> 회원상태변경</h4>
                    </div>
                    <table class="t_form">
                        <caption>회원상태변경 폼</caption>
                        <tbody>
                            <tr>
                                <th>일괄변경</th>
                                <td>
                                    선택한 회원을 일반회원으로 
                                    <b-button variant="secondary">전환하기</b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_right">
                        <b-button variant="outline-danger" style="margin-right:5px" >선택삭제</b-button>
                        <b-button variant="outline-secondary">엑셀로 받기</b-button>
                    </div>

                </form>
  </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'
import SwsDate from '@/components/common/SwsDate'

export default {
    mixins: [commonJs],
    components: {
        SwsDate
    },
    data () {
        return {
            totalPage: 0,
            currentPage: 1,
            perPage: 10,
            fields:[
                {key : 'check', label : '',sortable: false},
                {key : 'state', label : '상태', sortable: true},
                {key : 'id', label : '아이디', sortable: true},
                {key : 'level', label : '회원등급', sortable: true},
                {key : 'name', label : '성명', sortable: true},
                {key : 'gender', label : '성별', sortable: true},
                {key : 'age', label : '나이', sortable: true},
                {key : 'point', label : '적립금', sortable: true},
                {key : 'connectCount', label : '접속수', sortable: true},
                {key : 'connectAt', label : '최근접속일', sortable : true},
                {key : 'totalPrice', label : '총구매금액', sortable: true},
                {key : 'createdAt', label : '가입일', sortable: true},
            ],
            memberData: [],
            FilterFields: {
                startDate: '',
                endDate: ''
            }
        }
    },
    mounted () {         
        this.axiosGetRequest('/api/v1/products/lists','',this.loadMemberList)
    },
    methods: {
        loadMemberList(res) {
            console.log(res)
        }
    }
}
</script>

<style>

</style>