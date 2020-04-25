<template>
  <div class="selectAppliedPrdtWrap">
      <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
      <div class="row">
          <div class="left-section col col-3">
            <CatBox  @catSelect="catSelect" :cats=[categories1,categories2,categories3,categories4,categories5] />
            <Search  @search="search" :brands="brands" />
          </div>
          <div class="col col-9">
            <PrdtList @checkAll="checkAllChange" @select="select" :checkAllFlag="checkAll"  :currentPage="currentPage" :perPage="perPage" :products="products" />
          </div>
      </div>
        <Footer @reset="reset" @close="close"  @selectAll="selectAll" @paging="paging" :totalCnt="totalPrdtLength" :perPage="perPage" :currentPage="currentPage" />
  </div>
</template>

<script>
import commmonJs from '@/assets/js/common.js'
import CatBox from "./SelectPrdt/CartegoryBox"
import Search from "./SelectPrdt/Search"
import PrdtList from "./SelectPrdt/PrdtList"
import Footer from "./Shared/Footer"


export default {
    components:{
        CatBox,Search,PrdtList,Footer
    },
    mixins: [commmonJs],
data(){
    return{
        categories1:[],
        categories2:[],
        categories3:[],
        categories4:[],
        categories5:[],
        selectCat : [0,0,0,0,0],
        products:[],
        brands:[],
        currentPage:1,
        totalPrdtLength:0,
        perPage:15,
        searchInfo:{},
        selectPrdts:null,
        checkAll:false
    }
},
created(){
    this.axiosGetRequest('/api/v1/categories', {categoryLevel: 1}, 
     (res=>{
         this.categories1 = res.data.jsonData.categories
     }))


    this.axiosGetRequest('api/v1/products/lists',
    {
    startIndex:0, 
    rowCount:100
    },
    (res)=>{
        this.totalPrdtLength = res.data.jsonData.products.length;
        this.products =[]
            res.data.jsonData.products.splice(0,this.perPage).forEach(p=>{
                this.products.push({
                    ...p, isChecked: false
                })
            })
         })


    this.axiosGetRequest('/api/v1/brands','',(res)=>{
        this.brands = res.data.jsonData.brands
    })


},
methods:{
    catSelect(catInfo){
        console.log(catInfo);
        


        this.axiosGetRequest('/api/v1/categories', {categoryLevel: catInfo[1]+1, parentSysId:catInfo[0]}, 
     (res=>{
         this[`categories${catInfo[1]+1}`] = res.data.jsonData.categories
     }))

        this.selectCat[catInfo[1]-1] = catInfo[0]
        for (let i = catInfo[1]; i < 5; i++) {
            this.selectCat[i] = 0
        }

        for(let i = 5; i >= catInfo[1]+2; i--){
            this[`categories${i}`] = []
        }


        this.currentPage = 1
        this.searchInfo = {}
        this.checkAll = false

        this.axiosGetRequest('api/v1/products/lists',
        {
        startIndex:0, 
        rowCount:100, 
        categorySysId1:this.selectCat[0], 
        categorySysId2:this.selectCat[1]?this.selectCat[1]:null, 
        categorySysId3:this.selectCat[2]?this.selectCat[2]:null, 
        categorySysId4:this.selectCat[3]?this.selectCat[3]:null, 
        categorySysId5:this.selectCat[4]?this.selectCat[4]:null
        },
        (res)=>{
            if(res.data.jsonData.products){
                this.totalPrdtLength = res.data.jsonData.products.length;
                this.products =[]
                res.data.jsonData.products.splice(0,this.perPage).forEach(p=>{
                    this.products.push({
                        ...p, isChecked: false
                    })
                })
            }else{
                this.products = []
                this.totalPrdtLength = 0
            }
       })



     },

     paging(x){
         this.currentPage = x
         this.checkAll = false
         this.axiosGetRequest('api/v1/products/lists',
         {
        startIndex:(this.currentPage-1) * x, 
        rowCount:this.perPage, 
        categorySysId1:this.selectCat[0]?this.selectCat[0]:null, 
        categorySysId2:this.selectCat[1]?this.selectCat[1]:null, 
        categorySysId3:this.selectCat[2]?this.selectCat[2]:null, 
        categorySysId4:this.selectCat[3]?this.selectCat[3]:null, 
        categorySysId5:this.selectCat[4]?this.selectCat[4]:null,
        brandSysId:this.searchInfo.brandSysId,
        name:this.searchInfo.searchType===0?this.searchInfo.keyword:null,
        prdtCode:this.searchInfo.searchType===1?this.searchInfo.keyword:null,
        },
         (res)=>{
        this.products = []
         res.data.jsonData.products.forEach(p=>{
                this.products.push({
                    ...p, isChecked: false
                })
            })
       })
     },
     search(data){
         this.searchInfo = data
         this.currentPage = 1

         this.axiosGetRequest('api/v1/products/lists',
         {
        startIndex:0, 
        rowCount:100, 
        categorySysId1:this.selectCat[0]?this.selectCat[0]:null, 
        categorySysId2:this.selectCat[1]?this.selectCat[1]:null, 
        categorySysId3:this.selectCat[2]?this.selectCat[2]:null, 
        categorySysId4:this.selectCat[3]?this.selectCat[3]:null, 
        categorySysId5:this.selectCat[4]?this.selectCat[4]:null,
        brandSysId:this.searchInfo.brandSysId,
        name:this.searchInfo.searchType===0?this.searchInfo.keyword:null,
        prdtCode:this.searchInfo.searchType===1?this.searchInfo.keyword:null,
        },
         (res)=>{
        if(res.data.jsonData.products){
            this.totalPrdtLength = res.data.jsonData.products.length;
            this.products = []
            res.data.jsonData.products.splice(0,this.perPage).forEach(p=>{
                    this.products.push({
                        ...p, isChecked: false
                    })
                })
             }else{
                 this.products = []
                 this.totalPrdtLength = 0
             }
       })
     },
     selectAll(){
         let isAlreadyHave = false
         if(this.selectPrdts===null){
             this.selectPrdts = new Map()
         }

         this.products.forEach(p=>{
             if(p.isChecked){
                 if(this.selectPrdts.has(p.prdtSysId)){
                     isAlreadyHave = true
                     return
                 }else{
                     this.selectPrdts.set(p.prdtSysId,p.name)
                 }
             }
         })

        if(this.selectPrdts.size===0){
            alert('상품을 선택해주세요.')
            return
        }


         if(isAlreadyHave){
             alert('중복된 상품이 있습니다.')
         }else{
             alert('상품이 추가되었습니다.')
         }

     },

     select(item){
         if(this.selectPrdts===null){
             this.selectPrdts = new Map()
         }

        if(this.selectPrdts.has(item.id)){
            alert('이미 추가된 상품입니다.')
            return
        }else{
            this.selectPrdts.set(item.id,item.name)
        }

        alert('추가되었습니다.')
     },

     close(){
         let event = new CustomEvent("addItem", {
                            detail: {
                                target:this.$route.query.target,
                                selectPrdts: this.selectPrdts
                            }
                        });
            window.dispatchEvent(event);
            window.close()
         },
     checkAllChange(x){
         this.checkAll = x;
     },

     reset(){
        this.categories1 =[]
        this.categories2=[]
        this.categories3=[]
        this.categories4=[]
        this.categories5=[]
        this.selectCat = [0,0,0,0,0]
        this.products=[]
        this.brands=[]
        this.currentPage=1
        this.totalPrdtLength=0
        this.perPage=15
        this.searchInfo={}
        this.selectPrdts=null
        this.checkAll=false




         this.axiosGetRequest('/api/v1/categories', {categoryLevel: 1}, 
     (res=>{
         this.categories1 = res.data.jsonData.categories
     }))


    this.axiosGetRequest('api/v1/products/lists',
    {
    startIndex:0, 
    rowCount:100
    },
    (res)=>{
        this.totalPrdtLength = res.data.jsonData.products.length;
        this.products =[]
            res.data.jsonData.products.splice(0,this.perPage).forEach(p=>{
                this.products.push({
                    ...p, isChecked: false
                })
            })
         })


    


     }
    }
}
</script>

<style>

</style>