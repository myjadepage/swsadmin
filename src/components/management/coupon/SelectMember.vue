<template>
  <div class="selectMemberWrap">
      <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
      <SearchTable :didBuy="didBuy" :dateInfo="dateInfo" @changeGroupType="changeGroupType" />
      <List @checkAll="checkAllChange" :checkAllFlag="checkAll" :currentPage="currentPage" :perPage="perPage" :members="searchResult" />
      <Footer @paging="paging" :totalCnt="memberList.length" :perPage="perPage" :currentPage="currentPage" />
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
  created(){
    this.searchResult = this.memberList    
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
          didBuy:0,
          isChecked:false
        },
        {
          id:'bbbbbb',
          name:'홍길순',
          gradeSysId:0,
          gender:'F',
          age:19,
          didBuy:1,
          isChecked:false
        },
        {
          id:'cccccc',
          name:'John Doe',
          gradeSysId:1,
          gender:'M',
          age:22,
          didBuy:0,
          isChecked:false
        },
        {
          id:'dddddd',
          name:'Jane Doe',
          gradeSysId:0,
          gender:'F',
          age:30,
          didBuy:1,
          isChecked:false
        },
      ],
      searchResult:[],
      currentPage:1,
      perPage:12,
      checkAll: false,
      dateInfo:{
               startDate:'',
               endDate:'',
           },
      groupType:{
          age:'',
          gender:'',
          grade:''
      },
      didBuy:'all'
    }
  },
  methods:{
    paging(x){
      this.currentPage = x
    },
    checkAllChange(x){
      this.checkAll = x;
    },
    changeGroupType(info){
     this.groupType[info[0]] = info[1]
     this.searchResult = this.memberList
     .filter(m=>{
        if(this.groupType.age){
          switch (this.groupType.age) {
            case 'under20':
              return m.age < 20
            case 'ages20':
              return m.age >= 20 && m.age < 30
            case 'ages30':
              return m.age >= 30 && m.age < 40
            case 'ages40':
              return m.age >= 40 && m.age < 50
            case 'ages50':
              return m.age >= 50 && m.age < 60
            case 'over60':
              return m.age >= 60
        default:
          break;
          }
        }else{
          return true
        }
       })
     .filter(m=>{
        if(this.groupType.gender){
          return m.gender===this.groupType.gender
        }else{
          return true
        }
       })
     .filter(m=>{
        if(this.groupType.grade){
          return m.gradeSysId==this.groupType.grade
        }else{
          return true
        }
       })
    }
  }
}
</script>

<style>

</style>