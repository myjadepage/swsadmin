<template>
    <b-row>
        <b-col cols="2">
            <b-input-group>
                <b-form-input size="sm" id="example-input" v-model="parentData.startDate" type="text" placeholder="시작일자 (YYYY-MM-DD)"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker button-variant="outline-secondary" size="sm" v-model="parentData.startDate" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col cols="2">
            <b-input-group>
                <b-form-input size="sm" id="example-input" v-model="parentData.endDate" type="text" placeholder="종료일자 (YYYY-MM-DD)"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker button-variant="outline-secondary" size="sm" v-model="parentData.endDate" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col> 
        <b-col cols="12" class="mt-2 dateLimitDisplay">
            <b-button variant="outline-secondary" @click="selectedDate('today')" size="sm">오늘</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('yester')" size="sm">어제</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('3date')" size="sm">3일간</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('7date')" size="sm">7일간</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('10date')" size="sm">10일간</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('20date')" size="sm">20일간</b-button>&emsp;
            <b-button variant="outline-secondary" @click="selectedDate('1month')" size="sm">1달</b-button>&emsp;
        </b-col>
    </b-row>
</template>

<script>
import moment from 'moment'
export default {
    props: ['parentData'],
    mounted () {
        this.parentData.startDate = moment(new Date()).add(-1, 'M').format('YYYY-MM-DD')
        this.parentData.endDate = moment(new Date()).format('YYYY-MM-DD')
    },
    methods:{
        selectedDate: function (flag) {
            switch(flag){
                case 'today':
                    this.parentData.startDate = moment(new Date()).format('YYYY-MM-DD')
                    this.parentData.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case 'yester':
                    this.parentData.startDate = moment(new Date()).add(-1, 'd').format('YYYY-MM-DD')
                    this.parentData.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '3date':
                    this.parentData.startDate = moment(new Date()).add(-3, 'd').format('YYYY-MM-DD')
                    this.parentData.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '7date':
                    this.parentData.startDate = moment(new Date()).add(-7, 'd').format('YYYY-MM-DD')
                    this.parentData.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '10date':
                    this.parentData.startDate = moment(new Date()).add(-10, 'd').format('YYYY-MM-DD')
                    this.parentData.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '20date':
                    this.parentData.startDate = moment(new Date()).add(-20, 'd').format('YYYY-MM-DD')
                    this.parentData.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break
                case '1month':
                    this.parentData.startDate = moment(new Date()).add(-1, 'M').format('YYYY-MM-DD')
                    this.parentData.endDate = moment(new Date()).format('YYYY-MM-DD')
                    break

            }
        }
    }
}
</script>

<style>
.dropdown-menu.show { 
    transform: none !important;
    top: 25px !important;
    left: -255px !important;
}
</style>
