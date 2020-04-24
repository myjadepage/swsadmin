<template>
    <b-col>
        <b-table 
            :fields="fields" 
            :items="items"
            :per-page="viewPage"
            :currentPage="currentPage"
            head-variant="light"
        >
            <template v-slot:cell(no)="data">
                {{data.index + 1}}
            </template>
            <template v-slot:cell(sellerName)="item">
                {{item.value}}
            </template>
            <template v-slot:cell(brandName)="item">
                {{item.value}}
            </template>
            <template v-slot:cell(imageUrl)="row">
                <img :src="row.value" width="150px"/>
            </template>
            <template v-slot:cell(managerName)="row">
                {{row.item.managerName}}
            </template>
            <template v-slot:cell(setting)="row">
                <b-button size="sm" variant="outline-secondary" @click="$router.push(`/goods/brand_detail/${row.item.brandSysId}`)"><font-awesome-icon icon="pencil-alt"/> 수정</b-button>
                &emsp;&emsp;
                <b-button size="sm" variant="outline-secondary" @click="$emit('delete', row.item.no)"><font-awesome-icon icon="trash" /> 삭제</b-button>
            </template>
        </b-table>
        <div class="float-left">
            <b-button variant="outline-secondary" size="sm" @click="$router.push('/goods/brand_reg')"><font-awesome-icon icon="plus-circle" /> 추가하기</b-button>
        </div>
        <div class="float-right">
            <b-pagination  v-model="currentPage"  :total-rows="items.length" :per-page="viewPage"></b-pagination>
        </div>
    </b-col>
</template>
<script>
export default {
    props: ['viewPage', 'items'],
    data: () => ({
        currentPage: 1,
        fields: [
            {key: 'no', label: 'No', class: "text-right", thStyle: 'width : 50px'},
            {key: 'sellerName', label: '업체명', class: "text-left", thStyle: 'width : 150px'}, 
            {key: 'brandName', label: '브랜드명', class: "text-left"}, 
            {key: 'imageUrl', label: '이미지', class: "text-left", thStyle: 'width: 300px'}, 
            {key: 'managerName', label: '담당자', class: "text-center", thStyle: 'width: 150px'}, 
            {key: 'setting', label: '관리', class: "text-center", thStyle: 'width : 150px'}
        ]
    }),
}
</script>