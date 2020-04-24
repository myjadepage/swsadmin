<template>
  <div class="selectMemberWrap">
      <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
      <SearchTable/>
      <List :currentPage="currentPage" :perPage="perPage" :members="memberList" />
      <Footer :totalCnt="memberList.length" :perPage="perPage" :currentPage="currentPage" />
  </div>
</template>

<script>
import SearchTable from "./SelectMember/SearchTable"
import List from "./SelectMember/MemberList"
import Footer from "./Shared/Footer"

export default {
  components:{
    SearchTable,List,Footer
  },
  data(){
    return{
      memberList:[
        {
          id:'aaaaaaa',
          name:'홍길동',
          gradeSysId:0,
          gender:'M',
          age:20,
          didBuy:0
        },
        {
          id:'bbbbbb',
          name:'홍길순',
          gradeSysId:0,
          gender:'F',
          age:19,
          didBuy:1
        },
        {
          id:'cccccc',
          name:'John Doe',
          gradeSysId:1,
          gender:'M',
          age:22,
          didBuy:0
        },
        {
          id:'dddddd',
          name:'Jane Doe',
          gradeSysId:0,
          gender:'F',
          age:30,
          didBuy:1
        },
      ],
      currentPage:1,
      perPage:15,
    }
  }
}
</script>

<style>

</style>