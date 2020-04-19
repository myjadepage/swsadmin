<template>
    <b-col>
        <b-table :fields="fields" :items="items" head-variant="light">
            <template v-slot:cell(no)="data">
                {{data.index + 1}}
            </template>
            <template v-slot:cell(brandName)="item">
                <b-span>{{item.value}}</b-span>
            </template>
            <template v-slot:cell(image)="row">
                <img :src="row.value" width="150px"/>
            </template>
            <template v-slot:cell(managerName)="row">
                {{row.item.managerName}}
            </template>
            <template v-slot:cell(setting)="row">
                <b-button size="sm" variant="outline-secondary" :href="'/goods/brand_reg/'+row.item.no"><font-awesome-icon icon="pencil-alt"/> 수정</b-button>
                &emsp;&emsp;
                <b-button size="sm" variant="outline-secondary" @click="$emit('delete', row.item.no)"><font-awesome-icon icon="trash" /> 삭제</b-button>
            </template>
        </b-table>
    </b-col>
</template>
<script>
export default {
    props: ['items'],
    data: () => ({
        fields: [
            {key: 'no', label: 'No', class: "text-right", thStyle: 'width : 100px'},
            {key: 'brandName', label: '브랜드명', class: "text-left"}, 
            {key: 'image', label: '이미지', class: "text-left"}, 
            {key: 'managerName', label: '담당자', class: "text-left", thStyle: 'width: 150px'}, 
            {key: 'setting', label: '관리', class: "text-center", thStyle: 'width : 150px'}
        ]
    }),
}
</script>