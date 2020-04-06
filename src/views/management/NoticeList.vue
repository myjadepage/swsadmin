<template>
  <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">{{ $route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>공지사항을 관리하실 수 있습니다.</li>
                </ul>

                <form name="Frm">
                    <div class="section_head">                       
                        <div class="mgb5">
                            <!-- <select id="skey" name="skey" class="text_input" @change="loadSearchNotice">
                                <option value="1">제목</option>
                                <option value="2">내용</option>
                            </select>
                            <input type="text" name="keyword" v-model="keyword" class="text_input" style="width:150px; margin:0 5px" maxlength="50">
                            <b-button variant="outline-secondary" size="sm" @click="searchButton">검색</b-button> -->
                        </div>
                    </div>

                    <table class="t_list">
                        <caption>공지사항 리스트</caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                            <col width="250">
                            <col width="150">
                            <col width="100">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>No</th>                              
                                <th>제목</th>
                                <th>등록일</th>    
                                <th>노출여부</th>                           
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="noticeData === null || noticdData === undefined">
                                <td colspan="5">등록된 데이타가 없습니다.</td>
                            </tr>
                            <tr v-for="item in noticeData" :key="item.noticeSysId">
                                <td>{{ item.noticeSysId }}</td>                               
                                <td class="left">
                                    <router-link :to="'/management/notice_detail/'+ item.noticeSysId">{{ item.title }}</router-link>
                                </td>
                                <td>{{ changeDate(item.createdAt) }}</td>      
                                <td>{{ changeIsDisplay(item.isDisplay)}}</td>                         
                                <td>
                                    <span class="button small">
                                        <b-button variant="outline-danger" size="sm" @click="deleteNotice(item.noticeSysId)">삭제</b-button>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="paging" style="margin-top:20px">                                         
                        <b-button variant="secondary" style="margin:0 5px"> 1 </b-button>                       
                    </div>
                    <div class="btn_center">
                        <b-button variant="outline-info" size="lg" @click="$router.push('/management/notice_reg')">등록</b-button>
                    </div>
                </form>
  </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'

export default {
    mixins: [ commonJs ],
    data() {
        return {
            noticeData: []
        }
    },
    mounted () {     
      this.axiosGetRequest('/api/v1/operations/notices/alllist','',this.loadNoticeList)  
    },
    methods: {       
        loadNoticeList(res) {
           console.log(res)
           this.noticeData = res.data.jsonData.notices
        },    
        changeIsDisplay(num) {
            return num === 0 ? '미표시' : '표시'
        },       
        changeDate(date) {
            var y = date.substr(0, 4)
            var m = date.substr(4, 2)
            var d = date.substr(6, 2)
            return y + '-' + m + '-' + d
        },
        deleteNotice(noticeSysId) {
            this.axiosDeleteRequest('/api/v1/operations/notices/' + noticeSysId,'',this.deleteNoticeStatus)  
        },
        deleteNoticeStatus(res) {
            confirm('삭제하시겠습니까?')
            console.log(res)
            window.location.reload()
            alert('삭제하였습니다.')
        }
    }
}
</script>

<style>

</style>