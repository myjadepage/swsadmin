<template>
  <div class="selectAppliedPrdtWrap">
      <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
      <div class="row">
        <CatBox class="col" @catSelect="catSelect" :cats=[categories1,categories2,categories3,categories4,categories5] />
            <div class="col">
                <Search class="row" @search="search" :brands="brands" />
                <PrdtList class="row" :currentPage="currentPage" :perPage="perPage" :products="products" />
                <Footer class="row" @selectAll="selectAll" :totalCnt="totalPrdtLength" :perPage="perPage" :currentPage="currentPage" @paging="paging" />
            </div>

      </div>
  </div>
</template>

<script>
import commmonJs from '@/assets/js/common.js'
import CatBox from "./SelectPrdt/CartegoryBox"
import Search from "./SelectPrdt/Search"
import PrdtList from "./SelectPrdt/PrdtList"
import Footer from "./SelectPrdt/Footer"


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
        searchInfo:{

        }
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
        
        
        this.axiosGetRequest('/api/v1/categories', {categoryLevel: catInfo[1]+1, parentSysId:catInfo[0]}, 
     (res=>{
         
         this[`categories${catInfo[1]+1}`] = res.data.jsonData.categories
     }))

        this.selectCat[catInfo[1]-1] = catInfo[0]
        for (let i = catInfo[1]; i < 5; i++) {
            this.selectCat[i] = 0
        }
        this.currentPage = 1


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
            this.totalPrdtLength = res.data.jsonData.products.length;
            this.products =[]
            res.data.jsonData.products.splice(0,this.perPage).forEach(p=>{
                this.products.push({
                    ...p, isChecked: false
                })
            })
       })



     },

     paging(x){
         this.currentPage = x
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
        this.totalPrdtLength = res.data.jsonData.products.length;
        this.products = []
        res.data.jsonData.products.splice(0,this.perPage).forEach(p=>{
                this.products.push({
                    ...p, isChecked: false
                })
            })
       })
     },
     selectAll(){
         this.products.forEach(p=>{
             if(p.isChecked){
                 if(sessionStorage.getItem('selectedPrdt')){
                let list = JSON.parse(sessionStorage.getItem('selectedPrdt'))
                if(!list.includes(p.prdtSysId)){
                    list.push(p.prdtSysId)
                }
                sessionStorage.setItem('selectedPrdt', JSON.stringify(list))
            }else{
             sessionStorage.setItem('selectedPrdt',JSON.stringify([p.prdtSysId]))
            }
             }
         })

        let event = new CustomEvent("addItem", {
        detail: {
            selectedPrdt: JSON.parse(sessionStorage.getItem('selectedPrdt'))
        }
        });
        window.dispatchEvent(event);


     }
    }
}
</script>

<style>

</style>