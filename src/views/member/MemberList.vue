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
                <!-- <tr>
                    <th>최근접속일</th>
                    <td>
                        <sws-date :parentData="FilterFields"></sws-date>
                    </td>
                </tr> -->
                <!-- <tr>
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
                </tr> -->
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
                            <option value="mobile">휴대폰번호</option>
                        </select>
                        <input type="text" name="sword" class="text_input" style="width:300px">
                        <b-button variant="secondary" size="sm" >검색</b-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="section_head">
            <h4>총 <strong class="red"> {{ memberData.length }}</strong> 명의 회원이 조회되었습니다.</h4>                        
        </div>
    </form>


    <form name="Frm">
        <b-table
            head-variant="light"
            :per-page="perPage"
            :current-page="currentPage"
            :fields="fields"  
            :items="memberData"
        >
            <template v-slot:cell(checked)>
                <input type="checkbox">
            </template>

            <template v-slot:cell(state)>
                <p>{{ state }}</p>
            </template>            
        </b-table>                    

        <div class="btn_right">
            <b-button variant="outline-danger" style="margin-right:5px" >선택삭제</b-button>
            <!-- <b-button variant="outline-secondary">엑셀로 받기</b-button> -->
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
                {key : 'checked', label : '', sortable: false},
                {key : 'isBlock', label : '상태', sortable: true},
                {key : 'userId', label : '아이디', sortable: true},
                {key : 'userGradeSysId', label : '회원등급', sortable: true},
                {key : 'name', label : '이름', sortable: true},
                {key : 'nickName', label : '닉네임', sortable: true},                
                {key : 'genderCode', label : '성별', sortable: true},               
                {key : 'point', label : '적립금', sortable: true},
                {key : 'connectionCount', label : '접속수', sortable: true},                
                {key : 'totalPurchase', label : '총구매금액', sortable: true},
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
        this.axiosGetRequest('/api/v1/users/all','',this.loadMemberList)
    },
    methods: {
        loadMemberList(res) {
            console.log(res)
            let result = res.data.jsonData.users
            if(result) {
                for(let i=0; i<result.length; i++) {
                    this.memberData.push({
                        'userSysId': result[i].userSysId,
                        'userId': result[i].userId,
                        'isBlock': this.changeBlock(result[i].isBlock),
                        'userGradeSysId': result[i].userGradeSysId,
                        'totalPurchase': result[i].totalPurchase,
                        'profileImgUrl': result[i].profileImgUrl,
                        'profile': result[i].profile,
                        'point': result[i].point,
                        'nickName': result[i].nickName,
                        'name': result[i].name,
                        'mobile': result[i].mobile,
                        'isDormancy': result[i].isDormancy,
                        'genderCode': this.changeGender(result[i].genderCode),
                        'createdAt': this.changeDate(result[i].createdAt),
                        'connectionCount':result[i].connectionCount
                    })
                }
            }
        },
        changeDate(date) {
            var y = date.substr(0, 4)
            var m = date.substr(4, 2)
            var d = date.substr(6, 2)
            return y + '-' + m + '-' + d
        },
        changeGender(num) {
            switch(num){
                case 0 : return "여성";
                case 1 : return "남성";
                default : return "";
            }         
        },
        changeBlock(num) {
            switch(num){
                case 0 : return "일반";
                case 1 : return "휴면";
            } 

        }
    }
}
</script>

<style>

</style>