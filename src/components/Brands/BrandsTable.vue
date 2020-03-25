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
            <template v-slot:cell(setting)="row">
                <b-button variant="outline-success" :href="'/goods/brand_reg/'+row.item.no">수정</b-button>
                &emsp;
                <b-button variant="outline-danger" @click="$emit('delete', row.item.no)">삭제</b-button>
            </template>
        </b-table>
    </b-col>
</template>
<script>
export default {
    props: ['items'],
    data: () => ({
        fields: [
            {key: 'no', label: 'No', class: "text-center"}, 
            {key: 'brandName', label: '브랜드명'}, 
            {key: 'image', label: '이미지', class: "text-center"}, 
            {key: 'setting', label: '관리', class: "text-center"}
        ]
    }),
}
</script>