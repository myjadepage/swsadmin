<template>
    <div>
        <div class="float-right">
            <b-button variant="info" size="sm" @click="addFileUploader">파일 추가</b-button>
        </div>
        <div class="float-left">
            <p v-for="(file, index) in userFiles" :key="index" class="mb-1">
                <b-col style="padding-right:0px">
                    <span style="width:20px">{{index + 1}}.</span>&emsp;
                    <span>
                    <b-input-group size="sm">
                        <b-form-input disabled squared placeholder="파일 업로드" style="width: 350px" v-model="file.fileDir" ></b-form-input>
                        <b-input-group-append>
                        <b-button size="sm" squared text="Button" @click="onClickObject('fileObject'+index)">파일 업로드</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </span>
                    <span class="ml-2"><b-button variant="light" size="sm" @click="removeFile($event, index)">파일삭제</b-button></span>
                    <input type="file" :id="'fileObject'+index" style="display:none" @change="onFileObjOpenFn($event, file)"/>
                </b-col>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['userFiles'],
    methods:{
        onClickObject: function (id) {
            document.getElementById(id).click()
        },
        addFileUploader: function () {
            if (this.userFiles.length > 9) {
                alert('10개 이상으로 추가할수 없습니다.')
                return false
            }
            this.userFiles.push({
                fileDir: ''
            })
        },
        onFileObjOpenFn: function (evt, file){
            const fileObj = evt.target.files[0]
            file.fileDir= fileObj.name
        },
        removeFile: function (evt, index){
            if(confirm('업로드된 파일이 존재할수 있습니다. 그래도 삭제하시겠습니까?')) {
                this.userFiles.splice(index, 1)
            }
        }
    }
}
</script>

<style>

</style>