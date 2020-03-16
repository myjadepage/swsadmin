<template>
    <div id="contents">
        <h3>{{ $route.name }}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>상품관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>각 디렉토리별로 브랜드별 정리를 하실 수 있는 곳입니다.</li>
            <li>브랜드명을 적으시고 추가 해 주시면 상품등록에서 브랜드를 선택해 주시면 됩니다.</li>
        </ul>
        <b-row cols="1">
            <b-col>
                <h4><i class="xi-check-circle"></i> 총 <strong>9</strong>개의 정보가 등록되어있습니다.</h4>
                <div>
                    <select id="skey" name="skey" class="text_input">
                        <option value="name">브랜드명</option>
                    </select>
                    <input type="text" name="sword" value="" class="text_input" style="width:150px">
                    <button type="submit" class="btn btn-sm btn-default">검색</button>
                </div>
            </b-col>
            <b-col>
                <b-table :fields="fields" :items="items">
                    <template v-slot:cell(brandName)="item">
                        <b-span>{{item.value}}</b-span>
                    </template>
                    <template v-slot:cell(image)="row">
                        <img :src="row.value" />
                    </template>
                    <template v-slot:cell(setting)="row">
                        <b-button variant="outline-success">수정</b-button>
                        &emsp;
                        <b-button variant="outline-danger" @click="deleteBrandsFn(row.value)">삭제</b-button>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <div class="float-right">
            <b-button href="/brand_reg"><font-awesome-icon icon="plus-circle" /> 추가하기</b-button>
        </div>
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
export default {
  data: () => ({
      fields: [
          {key: 'no', label: 'No'}, 
          {key: 'brandName', label: '브랜드명'}, 
          {key: 'image', label: '이미지'}, 
          {key: 'setting', label: '관리'}
      ],
      items: [
          {no: '1', brandName: 'FRED PERRY', image: 'https://lh3.googleusercontent.com/proxy/bde_tKkn7g-HqZck7n_7SoBynYjaLkYluoo67yWr3ft6CfCBNkO-fwCqHt1LfIb0UDGYWTMTDzvEg82V0PdIe0KyMBOKUzkg0LMVEc0auZ8'}
      ]
  }),
  mixins: [commonJs],
  mounted () {
      console.log(this.$route.params)
      this.init()
  },
  methods: {
      initialBrandListSuccess: function (res) {
          var data = res.data.jsonData
          for (var i = 0 ; i < data.length ; i++) {
              this.items.push({
                  no: data[i].brandSysId,
                  brandName: data[i].name,
                  image: 'https://lh3.googleusercontent.com/proxy/bde_tKkn7g-HqZck7n_7SoBynYjaLkYluoo67yWr3ft6CfCBNkO-fwCqHt1LfIb0UDGYWTMTDzvEg82V0PdIe0KyMBOKUzkg0LMVEc0auZ8',
              })
          }
      },
      init: function () {
          this.axiosGetRequest('/api/v1/brands','',this.initialBrandListSuccess)
      }
  }
}
</script>
