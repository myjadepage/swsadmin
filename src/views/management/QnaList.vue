<template>
  <div id="contents">
    <h3><font-awesome-icon icon="play-circle" /> 상품Q＆A관리</h3>
    <ul class="navi">
        <li class="home"><a href="/" target="_top">홈</a></li>
        <li>운영관리</li>
        <li>게시판운영관리</li>
        <li class="on">상품Q＆A관리</li>
    </ul>
    <ul class="helpbox">
        <li>상품의 Q＆A를 관리합니다.</li>
    </ul>
    
    <div class="section_head">
        <h4>등록된 Q＆A는 총 <strong> {{ qnaListData.length }}</strong>개입니다.</h4>
        <div class="mgb5">
         <!--   <select id="skey" name="skey" class="text_input">
                <option value="">전체</option>
                <option value="goods">상품명</option>
                <option value="subject">제목</option>
                <option value="content">내용</option>
                <option value="answer">답변</option>
                <option value="user">질문자</option>
                <option value="dealer">답변자</option>
            </select> -->
        <input type="text" name="sword" maxlength="50" placeholder="검색어" class="text_input" style="width:150px; margin:0 5px">
            <!-- <b-button variant="outline-secondary" size="sm">검색</b-button> -->
        </div>
    </div>

    <form name="Frm">
        <b-table ref="qnaTable" head-variant="light" striped    
                :fields="fields"
                :items="qnaListData"
                :keyword="searchQuery"                
            >
            <template v-slot:table-colgroup>
                <col width="100">
                <col width="150">            
                <col width="*">
                <col width="300">
                <col width="150">
                <col width="150">
                <col width="150">
            </template>
        
            <template  v-slot:cell(image) = "row">
                <img :src="row.item.image">                 
            </template>

            <template  v-slot:cell(name) = "row">           
                <router-link :to="'/product/'+ row.item.prdtSysId">
                    <p style="margin-top :5px"> {{ row.item.name }}</p>
                </router-link>
            </template>  

            <template v-slot:cell(show_details)="row">
                <b-button size="sm" @click="row.toggleDetails">
                    {{ row.detailsShowing ? '상세닫기' : '상세보기'}}
                </b-button>
            </template>

            <template v-slot:row-details = "row">              
                <div style="margin-left:100px; margin-right:50px">                         
                    <b-card>
                        <b-row class="mb-2">                   
                            <b-col><strong>문의 :</strong> {{ row.item.content }}</b-col>
                            <b-col sm="2" class="text-sm-right">
                                <b-button variant="outline-danger" size="sm" style="margin:0 5px" @click="deleteQnaClicked(row)">삭제</b-button>                              
                                <b-button variant="outline-secondary" size="sm" @click="answerClicked(row)">답변</b-button>
                            </b-col>
                        </b-row>
                        <b-row v-if="row.item.treatFlag === '답변완료'">                           
                            <b-col><strong>답변 :</strong> {{ row.item.answer }}</b-col>
                        </b-row>
                    </b-card>   
                </div>           
            </template>  
        </b-table>
    </form>
    
    <!-- qna답변 모달-->
    <b-modal ref="answerQnaModal" size="lg" @ok="answerQnaSubmit">
        <template v-slot:modal-title>
            <font-awesome-icon icon="info-circle" /> Q＆A 답변
        </template>        
        <p>
            <table class="mform">
                <caption>답변 등록 폼</caption>
                <colgroup><col width="50"><col width="*"></colgroup>
                <tbody>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea style="width:100%; min-height:200px" class="text_input" v-model="answerQna"></textarea>
                        </td>
                    </tr>                
                </tbody>
            </table>
        </p>       
    </b-modal>
  </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'

export default {
    mixins: [commonJs],
    data() {
        return {
            pageNumber:0,
            perPage: 15,
            searchQuery:'',
            editQna:'',
            userId:'',
            answerQna: '',
            answerQnaView:'',
            prdtQuestionSysId:'',
            prdtSysId:'',
            fields:[
                {key : 'prdtQuestionSysId', label : 'No', sortable: true},
                {key : 'image', label : '상품이미지', sortable: false},
                {key : 'name', label : '상품명', sortable: true},
                {key : 'userId', label : '아이디', sortable: true},
                {key : 'createdAt', label : '등록일', sortable: true},
                {key : 'treatFlag', label : '답변여부', sortable: true},
                {key : 'show_details', label : '상세보기', sortable: false}
            ],
            qnaListData: []
        }
    },
     mounted () {
        this.axiosGetRequest('/api/v1/products/questions/list', '', this.loadQnaList)
    },
     methods: {
        loadQnaList(res) {
            console.log(res.data.jsonData.questions)
            let result = res.data.jsonData.questions           
            if(result) {
                for(let i=0 ; i < result.length; i++ ) {
                    this.qnaListData.push({
                        'prdtQuestionSysId': result[i].prdtQuestionSysId,
                        'image': result[i].smallImageUrl,
                        'name': result[i].name,
                        'userId': result[i].userId,
                        'createdAt': this.changeDate(result[i].createdAt),
                        'content': result[i].content,
                        'treatFlag': this.changeTreat(result[i].treatFlag),
                        'answer' : result[i].answer,
                        'prdtSysId': result[i].prdtSysId
                        // '_showDetails': false
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
        changeTreat(flag) {
            return (flag === 0) ? '답변대기' : '답변완료'
        },        
         answerClicked(row) {
            this.answerQna = row.item.answer 
            this.prdtSysId = row.item.prdtSysId
            this.prdtQuestionSysId = row.item.prdtQuestionSysId
            this.$refs.answerQnaModal.show()
        },
        answerQnaSubmit() {            
            let jsonData = {
                'answer' : this.answerQna,
                'treatFlag' : '1'
            }
            this.axiosPatchRequest('/api/v1/products/' + this.prdtSysId + '/questions/' + this.prdtQuestionSysId + '/answer',{ jsonData : jsonData}, this.answerQnaCallback,'',sessionStorage.getItem('accessToken'))
        },
        answerQnaCallback(res) {            
            if(res.data.jsonData.resultCode === '0001'){
               window.location.reload()
               alert('답변이 등록되었습니다.')              
            }
        },
        deleteQnaClicked(row) {
            this.axiosDeleteRequest('/api/v1/products/' + row.item.prdtSysId + '/questions/' + row.item.prdtQuestionSysId,'', this.deleteQnaCallback,'', sessionStorage.getItem('accessToken'))
        },
        deleteQnaCallback(res) {
            if(res.data.jsonData.resultCode === '0001'){
                alert('상품평이 삭제되었습니다.')
                window.location.reload()
            }
        }
     }
}
</script>

<style>

</style>